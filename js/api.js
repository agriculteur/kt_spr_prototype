/**
 * SharePoint REST API wrapper for SPR application
 */
import { CONFIG } from './config.js';

let _digestCache = null;
let _digestExpiry = 0;

/**
 * Get SharePoint form digest (cached)
 * @returns {Promise<string>}
 */
export async function getDigest() {
  const now = Date.now();
  if (_digestCache && now < _digestExpiry) {
    return _digestCache;
  }
  const resp = await fetch(`${CONFIG.SITE_URL}/_api/contextinfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=nometadata',
      'Content-Type': 'application/json;odata=nometadata',
    },
    credentials: 'same-origin',
  });
  if (!resp.ok) throw new Error(`getDigest failed: ${resp.status}`);
  const data = await resp.json();
  _digestCache = data.FormDigestValue;
  // Expire 1 minute before SharePoint's expiry (typically 30 min)
  _digestExpiry = now + 29 * 60 * 1000;
  return _digestCache;
}

/**
 * Invalidate digest cache (call after 403 errors)
 */
export function invalidateDigest() {
  _digestCache = null;
  _digestExpiry = 0;
}

/**
 * GET request to SharePoint REST API
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
export async function spGet(endpoint) {
  const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json;odata=nometadata',
    },
    credentials: 'same-origin',
  });
  if (!resp.ok) {
    if (resp.status === 403) {
      const err = new Error(`Accès refusé (403): ${endpoint}`);
      err.status = 403;
      throw err;
    }
    throw new Error(`GET ${endpoint} failed: ${resp.status}`);
  }
  return resp.json();
}

/**
 * POST request to SharePoint REST API
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise<any>}
 */
export async function spPost(endpoint, body) {
  const digest = await getDigest();
  const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=nometadata',
      'Content-Type': 'application/json;odata=nometadata',
      'X-RequestDigest': digest,
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    if (resp.status === 403) invalidateDigest();
    throw new Error(`POST ${endpoint} failed: ${resp.status}`);
  }
  // 204 No Content
  if (resp.status === 204) return null;
  return resp.json();
}

/**
 * PATCH (MERGE) request to SharePoint REST API
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise<null>}
 */
export async function spPatch(endpoint, body) {
  const digest = await getDigest();
  const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=nometadata',
      'Content-Type': 'application/json;odata=nometadata',
      'X-RequestDigest': digest,
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': '*',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    if (resp.status === 403) invalidateDigest();
    throw new Error(`PATCH ${endpoint} failed: ${resp.status}`);
  }
  return null;
}

/**
 * DELETE request to SharePoint REST API
 * @param {string} endpoint
 * @returns {Promise<null>}
 */
export async function spDelete(endpoint) {
  const digest = await getDigest();
  const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=nometadata',
      'X-RequestDigest': digest,
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*',
    },
    credentials: 'same-origin',
  });
  if (!resp.ok) {
    if (resp.status === 403) invalidateDigest();
    throw new Error(`DELETE ${endpoint} failed: ${resp.status}`);
  }
  return null;
}

/**
 * Get current SharePoint user
 * @returns {Promise<Object>}
 */
export async function getCurrentUser() {
  const data = await spGet('/_api/web/currentuser');
  return {
    name: data.Title,
    email: data.Email,
    loginName: data.LoginName,
    Title: data.Title,
    Id: data.Id,
  };
}

/**
 * Get all projects from SPR_Projets list
 * @returns {Promise<Array>}
 */
export async function getProjects() {
  const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.PROJETS}')/items?$top=200&$select=Id,ProjetCode,ProjetData,Version,DerniereModification,ModifiePar`;
  const data = await spGet(endpoint);
  return (data.value || []).map(item => {
    let projectData = {};
    try {
      projectData = JSON.parse(item.ProjetData || '{}');
    } catch {
      projectData = {};
    }
    return {
      ...projectData,
      _id: item.Id,
      code: item.ProjetCode || projectData.code,
      version: item.Version || projectData.version || 1,
      derniere_modification: item.DerniereModification || projectData.derniere_modification,
      modifie_par: item.ModifiePar || projectData.modifie_par,
    };
  });
}

/**
 * Get draft for a specific project code
 * @param {number} code
 * @returns {Promise<Object|null>}
 */
export async function getProjectDraft(code) {
  try {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items?$filter=ProjetCode eq ${code}&$top=1`;
    const data = await spGet(endpoint);
    const item = (data.value || [])[0];
    if (!item) return null;
    let draftData = {};
    try {
      draftData = JSON.parse(item.BrouillonData || '{}');
    } catch {
      draftData = {};
    }
    return {
      id: item.Id,
      ProjetCode: item.ProjetCode,
      data: draftData,
      modifie_par: item.ModifiePar,
      modifie_le: item.ModifieLe,
      version_base: item.VersionBase,
    };
  } catch (err) {
    if (err.status === 403) return null;
    throw err;
  }
}

/**
 * Save or update a draft
 * @param {number} code
 * @param {Object} data
 * @param {number|null} existingDraftId
 * @param {string} modifiePar
 * @param {number} versionBase
 * @returns {Promise<Object>}
 */
export async function saveDraft(code, data, existingDraftId, modifiePar, versionBase) {
  const body = {
    ProjetCode: code,
    BrouillonData: JSON.stringify(data),
    ModifiePar: modifiePar,
    ModifieLe: new Date().toISOString(),
    VersionBase: versionBase,
    '__metadata': { type: `SP.Data.${CONFIG.LISTS.BROUILLONS}ListItem` },
  };

  if (existingDraftId) {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items(${existingDraftId})`;
    await spPatch(endpoint, body);
    return { id: existingDraftId };
  } else {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items`;
    const result = await spPost(endpoint, body);
    return { id: result.Id };
  }
}

/**
 * Delete a draft
 * @param {number} draftId
 * @returns {Promise<null>}
 */
export async function deleteDraft(draftId) {
  const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items(${draftId})`;
  return spDelete(endpoint);
}

/**
 * Publish a project (update main list + increment version)
 * @param {number} code
 * @param {Object} data
 * @param {number} projectId  - SharePoint item ID
 * @param {number} currentVersion
 * @param {string} modifiePar
 * @returns {Promise<null>}
 */
export async function publishProject(code, data, projectId, currentVersion, modifiePar) {
  const newVersion = (currentVersion || 1) + 1;
  const body = {
    ProjetCode: code,
    ProjetData: JSON.stringify({ ...data, version: newVersion }),
    Version: newVersion,
    DerniereModification: new Date().toISOString(),
    ModifiePar: modifiePar,
    '__metadata': { type: `SP.Data.${CONFIG.LISTS.PROJETS}ListItem` },
  };
  const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.PROJETS}')/items(${projectId})`;
  return spPatch(endpoint, body);
}

/**
 * Get history entries for a project
 * @param {number} code
 * @returns {Promise<Array>}
 */
export async function getProjectHistory(code) {
  const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.HISTORIQUE}')/items?$filter=ProjetCode eq ${code}&$orderby=Version desc&$top=50`;
  const data = await spGet(endpoint);
  return (data.value || []).map(item => {
    let snapshot = {};
    let changes = [];
    try { snapshot = JSON.parse(item.Snapshot || '{}'); } catch { snapshot = {}; }
    try { changes = JSON.parse(item.ChangeSummary || '[]'); } catch { changes = []; }
    return {
      id: item.Id,
      ProjetCode: item.ProjetCode,
      version: item.Version,
      action: item.Action,
      changedBy: item.ChangedBy,
      actionDate: item.ActionDate,
      snapshot,
      changes,
    };
  });
}

/**
 * Add a history entry
 * @param {number} code
 * @param {string} action - 'published' | 'draft'
 * @param {Object} snapshot
 * @param {string} changedBy
 * @param {Array} changes
 * @param {number} version
 * @returns {Promise<Object>}
 */
export async function addHistoryEntry(code, action, snapshot, changedBy, changes, version) {
  const body = {
    ProjetCode: code,
    Action: action,
    Snapshot: JSON.stringify(snapshot),
    ChangeSummary: JSON.stringify(changes),
    ChangedBy: changedBy,
    ActionDate: new Date().toISOString(),
    Version: version,
    '__metadata': { type: `SP.Data.${CONFIG.LISTS.HISTORIQUE}ListItem` },
  };
  const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.HISTORIQUE}')/items`;
  return spPost(endpoint, body);
}
