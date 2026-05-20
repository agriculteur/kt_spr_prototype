/**
 * Authentication module for SPR application
 */
import { CONFIG } from './config.js';
import { generateMockUser } from './mock-data.js';
import * as api from './api.js';

let _currentUser = null;

/**
 * Initialize authentication — loads current user from SharePoint or mock
 * @returns {Promise<Object>}
 */
export async function initAuth() {
  if (CONFIG.DEV_MODE) {
    _currentUser = generateMockUser();
    return _currentUser;
  }
  try {
    _currentUser = await api.getCurrentUser();
    return _currentUser;
  } catch (err) {
    console.error('initAuth error:', err);
    // Fallback to anonymous-ish user
    _currentUser = { name: 'Utilisateur inconnu', email: '', loginName: '', Title: 'Inconnu', Id: 0 };
    return _currentUser;
  }
}

/**
 * Get currently authenticated user
 * @returns {Object|null}
 */
export function getCurrentUser() {
  return _currentUser;
}

/**
 * Check if current user is a contributor to the project
 * (present in Ressources_associees or soutien_juridique)
 * @param {Object} project
 * @returns {boolean}
 */
export function isContributor(project) {
  if (!_currentUser || !_currentUser.email) return false;
  const email = _currentUser.email.toLowerCase();

  const inRessources = (project.Ressources_associees || []).some(
    r => (r.email || '').toLowerCase() === email
  );
  if (inRessources) return true;

  const inSoutien = (project.soutien_juridique || []).some(
    r => (r.email || '').toLowerCase() === email
  );
  return inSoutien;
}

/**
 * Check if current user is a committee or working group member
 * @param {Object} project
 * @returns {boolean}
 */
export function isCommitteeMember(project) {
  if (!_currentUser || !_currentUser.email) return false;
  const email = _currentUser.email.toLowerCase();

  const inComite = (project.Comite_ACVM || []).some(
    m => (m.email || '').toLowerCase() === email
  );
  if (inComite) return true;

  const inGroupe = (project.groupe_de_travail || []).some(
    m => (m.email || '').toLowerCase() === email
  );
  return inGroupe;
}
