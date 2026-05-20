/**
 * Format a date string to French Canadian locale
 * @param {string} str - ISO date string
 * @returns {string}
 */
export function formatDate(str) {
  if (!str) return '—';
  try {
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    return d.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return str;
  }
}

/**
 * Format a datetime string to French Canadian locale
 * @param {string} str - ISO datetime string
 * @returns {string}
 */
export function formatDateTime(str) {
  if (!str) return '—';
  try {
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    return d.toLocaleDateString('fr-CA', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return str;
  }
}

/**
 * Get Tailwind badge classes for project status
 * @param {string} statut
 * @returns {string}
 */
export function getStatusBadgeClass(statut) {
  switch (statut) {
    case 'en cours':   return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'terminé':    return 'bg-green-100 text-green-800 border border-green-200';
    case 'en attente': return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'clos':       return 'bg-gray-100 text-gray-600 border border-gray-200';
    default:           return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
}

/**
 * Get Tailwind badge classes for priority
 * @param {string} priorite
 * @returns {string}
 */
export function getPriorityBadgeClass(priorite) {
  switch (priorite) {
    case 'élevé':  return 'bg-red-100 text-red-800 border border-red-200';
    case 'moyen':  return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'faible': return 'bg-green-100 text-green-800 border border-green-200';
    default:       return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
}

/**
 * Get Tailwind badge classes for risk level
 * @param {string} niveau_risque
 * @returns {string}
 */
export function getRiskBadgeClass(niveau_risque) {
  switch (niveau_risque) {
    case 'élevé':  return 'bg-red-100 text-red-800 border border-red-200';
    case 'moyen':  return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'faible': return 'bg-green-100 text-green-800 border border-green-200';
    default:       return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
}

/**
 * Get two-letter initials from first and last name
 * @param {string} prenom
 * @param {string} nom
 * @returns {string}
 */
export function getInitials(prenom, nom) {
  const p = (prenom || '').trim();
  const n = (nom || '').trim();
  const pi = p.length > 0 ? p[0].toUpperCase() : '';
  const ni = n.length > 0 ? n[0].toUpperCase() : '';
  return (pi + ni) || '??';
}

/**
 * Compute diff between two objects, returning changed fields
 * @param {Object} oldObj
 * @param {Object} newObj
 * @returns {Array<{field: string, oldValue: *, newValue: *}>}
 */
export function diffObjects(oldObj, newObj) {
  const changes = [];
  const allKeys = new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);
  for (const key of allKeys) {
    const oldVal = JSON.stringify((oldObj || {})[key]);
    const newVal = JSON.stringify((newObj || {})[key]);
    if (oldVal !== newVal) {
      changes.push({ field: key, oldValue: (oldObj || {})[key], newValue: (newObj || {})[key] });
    }
  }
  return changes;
}

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Parse query string from hash
 * @param {string} hash e.g. "#projects?statut=en%20cours"
 * @returns {{route: string, params: Object}}
 */
export function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '');
  const [route, query] = raw.split('?');
  const params = {};
  if (query) {
    query.split('&').forEach(part => {
      const [k, v] = part.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
  }
  return { route: route || '', params };
}

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Check if a date is in the past (overdue)
 * @param {string} dateStr
 * @returns {boolean}
 */
export function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

/**
 * Check if a date is within N days from now
 * @param {string} dateStr
 * @param {number} days
 * @returns {boolean}
 */
export function isWithinDays(dateStr, days) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);
  return d >= now && d <= future;
}

/**
 * Render avatar HTML with photo and fallback initials
 * @param {Object} person - { photo?, prenom, nom }
 * @param {string} [size='w-6 h-6'] - Tailwind size classes
 * @returns {string} HTML
 */
export function renderAvatarHtml(person, size = 'w-6 h-6') {
  if (!person) return '';
  const initials = getInitials(person.prenom, person.nom);
  const fallbackHtml = `<div class="${size} rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">${initials}</div>`;
  
  if (person.photo) {
    const imgHtml = `<img src="${escapeHtml(person.photo)}" alt="${escapeHtml(person.prenom)}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<div class=&quot;w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold&quot;>${initials}</div>';">`;
    return imgHtml;
  }
  
  return fallbackHtml;
}
