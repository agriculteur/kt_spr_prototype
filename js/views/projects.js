/**
 * Projects list view
 */
import {
  escapeHtml, getStatusBadgeClass, getPriorityBadgeClass, getRiskBadgeClass,
  getInitials, formatDate, debounce, renderAvatarHtml,
} from '../utils.js';

// Chart helpers
function computeProjectStatusChartData(projects) {
  const statuses = ['en cours', 'terminé', 'en attente', 'clos'];
  const counts = statuses.map(s => projects.filter(p => p.statut === s).length);
  return { statuses, counts };
}

function renderProjectsChart(projects) {
  const { statuses, counts } = computeProjectStatusChartData(projects);
  const chartContainer = document.getElementById('projects-stats-chart');
  if (!chartContainer || typeof Chart === 'undefined') return;

  const ctx = chartContainer.getContext('2d');
  if (!ctx) return;

  if (window.sprProjectsStatusChart) {
    window.sprProjectsStatusChart.data.labels = statuses;
    window.sprProjectsStatusChart.data.datasets[0].data = counts;
    window.sprProjectsStatusChart.update();
    return;
  }

  window.sprProjectsStatusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: statuses,
      datasets: [{
        data: counts,
        backgroundColor: ['#3b82f6', '#16a34a', '#d97706', '#6b7280'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, padding: 12, color: '#374151' } },
      },
    },
  });
}

// Current view state
let _currentView = localStorage.getItem('spr.projects.view') || 'cards'; // 'cards' | 'table'
let _currentSort = localStorage.getItem('spr.projects.sort') || 'code';
let _sortAsc = localStorage.getItem('spr.projects.sortAsc') !== 'false';

function persistProjectsViewState() {
  localStorage.setItem('spr.projects.view', _currentView);
  localStorage.setItem('spr.projects.sort', _currentSort);
  localStorage.setItem('spr.projects.sortAsc', String(_sortAsc));
}

/**
 * Render the projects list view
 * @param {Array} projects
 * @param {Object} drafts - {code: draftData}
 * @param {Object} filters - {search, statut, priorite, risque, direction, type}
 * @returns {string} HTML
 */
export function renderProjectsList(projects, drafts = {}, filters = {}) {
  const filtered = applyFilters(projects, filters);
  const sorted = sortProjects(filtered, _currentSort, _sortAsc);

  const directions = [...new Set(projects.map(p => p.direction_principale).filter(Boolean))].sort();
  const types = [...new Set(projects.map(p => p.type_projet).filter(Boolean))].sort();

  const draftCodes = Object.keys(drafts).map(Number);

  return `
    <div class="animate-fadeIn" id="projects-list-root">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Projets réglementaires</h1>
          <p class="text-sm text-gray-500 mt-0.5" id="projects-count">${sorted.length} projet${sorted.length !== 1 ? 's' : ''} trouvé${sorted.length !== 1 ? 's' : ''}</p>
        </div>
        <!-- View & sort order toggle -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex rounded-lg border border-gray-200 overflow-hidden">
            <button id="view-cards" class="px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${_currentView === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}" title="Vue cartes">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>
              <span class="hidden sm:inline">Cartes</span>
            </button>
            <button id="view-table" class="px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${_currentView === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}" title="Vue tableau">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18M3 18h18"/></svg>
              <span class="hidden sm:inline">Tableau</span>
            </button>
          </div>
          <button id="proj-sort-order" class="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50" title="Toggle tri ascendant/descendant">
            ${_sortAsc ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <!-- Search + Filters -->
      <div class="bg-white border border-gray-200 rounded-xl p-4 mb-5 shadow-sm">
        <div class="flex flex-col gap-3">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" id="proj-search" placeholder="Rechercher par titre, code, type, direction..."
              value="${escapeHtml(filters.search || '')}"
              class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
          </div>
          <!-- Filter row -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            ${filterSelect('proj-filter-statut', 'Statut', [
              {value: '', label: 'Tous les statuts'},
              {value: 'en cours', label: 'En cours'},
              {value: 'terminé', label: 'Terminé'},
              {value: 'en attente', label: 'En attente'},
              {value: 'clos', label: 'Clos'},
            ], filters.statut || '')}
            ${filterSelect('proj-filter-priorite', 'Priorité', [
              {value: '', label: 'Toutes les priorités'},
              {value: 'élevé', label: 'Élevé'},
              {value: 'moyen', label: 'Moyen'},
              {value: 'faible', label: 'Faible'},
            ], filters.priorite || '')}
            ${filterSelect('proj-filter-risque', 'Risque', [
              {value: '', label: 'Tous les risques'},
              {value: 'élevé', label: 'Élevé'},
              {value: 'moyen', label: 'Moyen'},
              {value: 'faible', label: 'Faible'},
            ], filters.risque || '')}
            ${filterSelect('proj-filter-direction', 'Direction', [
              {value: '', label: 'Toutes les directions'},
              ...directions.map(d => ({value: d, label: d.replace('Direction des ', 'Dir. ').replace('Direction de la ', 'Dir. ').replace("Direction de l'", 'Dir. ')})),
            ], filters.direction || '')}
            ${filterSelect('proj-filter-type', 'Type', [
              {value: '', label: 'Tous les types'},
              ...types.map(t => ({value: t, label: t})),
            ], filters.type || '')}
            ${filterSelect('proj-sort', 'Trier par', [
              {value: 'code', label: 'Code'},
              {value: 'titre', label: 'Titre'},
              {value: 'statut', label: 'Statut'},
              {value: 'priorite', label: 'Priorité'},
              {value: 'date', label: 'Date modification'},
            ], _currentSort)}
          </div>
          <!-- Active filters badges -->
          <div id="active-filters" class="flex flex-wrap gap-1.5">
            ${renderActiveFilterBadges(filters)}
          </div>

          <!-- Chart dynamique -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-5">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm font-semibold text-gray-700">Distribution par statut</h2>
              <p class="text-xs text-gray-500">Basé sur les filtres actifs</p>
            </div>
            <div class="h-48 relative">
              <canvas id="projects-stats-chart" aria-label="Graphique statut projets"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div id="projects-results">
        ${sorted.length === 0
          ? `<div class="text-center py-16 text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-lg font-medium">Aucun projet trouvé</p>
              <p class="text-sm mt-1">Modifiez vos critères de recherche</p>
            </div>`
          : _currentView === 'cards'
            ? renderCardsView(sorted, draftCodes)
            : renderTableView(sorted, draftCodes)
        }
      </div>
    </div>
  `;
}

function filterSelect(id, placeholder, options, currentValue) {
  return `
    <select id="${id}" class="px-2.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full">
      ${options.map(o => `<option value="${escapeHtml(o.value)}" ${o.value === currentValue ? 'selected' : ''}>${escapeHtml(o.label)}</option>`).join('')}
    </select>
  `;
}

function renderActiveFilterBadges(filters) {
  const badges = [];
  const labels = { statut: 'Statut', priorite: 'Priorité', risque: 'Risque', direction: 'Direction', type: 'Type', search: 'Recherche' };
  for (const [key, val] of Object.entries(filters)) {
    if (val && val !== '') {
      const shortVal = val.length > 20 ? val.substring(0, 18) + '…' : val;
      badges.push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        ${labels[key] || key}: ${escapeHtml(shortVal)}
        <button class="filter-remove-btn hover:text-blue-900 ml-0.5" data-filter="${key}">×</button>
      </span>`);
    }
  }
  return badges.join('');
}

function renderCardsView(projects, draftCodes) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${projects.map(p => renderProjectCard(p, draftCodes.includes(p.code))).join('')}
    </div>
  `;
}

function renderProjectCard(p, hasDraft) {
  const resources = (p.Ressources_associees || []).slice(0, 3);
  const extraResources = Math.max(0, (p.Ressources_associees || []).length - 3);
  const jalons = p.jalons || [];
  const completedJalons = jalons.filter(j => j.statut === 'complété').length;

  return `
    <article class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col" data-code="${p.code}">
      <!-- Card header -->
      <div class="flex items-start justify-between px-4 pt-4 pb-2 gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono font-bold">SPR-${String(p.code).padStart(3,'0')}</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(p.statut)}">${escapeHtml(p.statut)}</span>
          ${hasDraft ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>Brouillon</span>' : ''}
        </div>
      </div>

      <!-- Title -->
      <div class="px-4 pb-2 flex-1">
        <h3 class="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">${escapeHtml(p.titre)}</h3>
        <p class="text-xs text-gray-400">${escapeHtml(p.type_projet || '—')}</p>
      </div>

      <!-- Direction -->
      <div class="px-4 pb-2">
        <p class="text-xs text-gray-500 truncate" title="${escapeHtml(p.direction_principale || '')}">
          <span class="text-gray-400">Dir.:</span> ${escapeHtml(p.direction_principale || '—')}
        </p>
      </div>

      <!-- Badges -->
      <div class="flex flex-wrap items-center gap-1.5 px-4 pb-3">
        <span class="px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(p.priorite)}">Priorité: ${escapeHtml(p.priorite || '—')}</span>
        <span class="px-1.5 py-0.5 rounded text-xs font-medium ${getRiskBadgeClass(p.niveau_risque)}">Risque: ${escapeHtml(p.niveau_risque || '—')}</span>
      </div>

      <!-- Resources + Jalons -->
      <div class="flex items-center justify-between px-4 pb-3">
        <!-- Avatars -->
        <div class="flex items-center">
          ${resources.map((r, i) => `
            <div class="w-7 h-7 rounded-full border-2 border-white overflow-hidden ${i > 0 ? '-ml-2' : ''} shrink-0" title="${escapeHtml(r.prenom)} ${escapeHtml(r.nom)}">
              ${renderAvatarHtml(r, 'w-full h-full')}
            </div>
          `).join('')}
          ${extraResources > 0 ? `<div class="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium -ml-2">+${extraResources}</div>` : ''}
        </div>

        <!-- Jalons progress -->
        ${jalons.length > 0 ? `
          <div class="flex items-center gap-1" title="${completedJalons}/${jalons.length} jalons complétés">
            ${jalons.slice(0, 5).map(j => `
              <div class="w-2 h-2 rounded-full ${j.statut === 'complété' ? 'bg-green-400' : j.statut === 'en cours' ? 'bg-blue-400' : j.statut === 'reporté' ? 'bg-amber-400' : 'bg-gray-200'}"></div>
            `).join('')}
            ${jalons.length > 5 ? `<span class="text-xs text-gray-400">+${jalons.length - 5}</span>` : ''}
          </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <span class="text-xs text-gray-400">v${p.version || 1} · ${p.derniere_modification ? formatDate(p.derniere_modification) : '—'}</span>
        <a href="#project-${p.code}" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
          Voir →
        </a>
      </div>
    </article>
  `;
}

function renderTableView(projects, draftCodes) {
  return `
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200">
              <th class="px-4 py-3 text-left font-semibold">Code</th>
              <th class="px-4 py-3 text-left font-semibold">Titre</th>
              <th class="px-4 py-3 text-left font-semibold">Statut</th>
              <th class="px-4 py-3 text-left font-semibold">Priorité</th>
              <th class="px-4 py-3 text-left font-semibold">Risque</th>
              <th class="px-4 py-3 text-left font-semibold hidden lg:table-cell">Direction</th>
              <th class="px-4 py-3 text-left font-semibold hidden xl:table-cell">Équipe</th>
              <th class="px-4 py-3 text-center font-semibold hidden md:table-cell">Version</th>
              <th class="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${projects.map(p => `
              <tr class="hover:bg-gray-50 transition-colors" data-code="${p.code}">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">SPR-${String(p.code).padStart(3,'0')}</span>
                    ${draftCodes.includes(p.code) ? '<span class="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Brouillon en cours"></span>' : ''}
                  </div>
                </td>
                <td class="px-4 py-3 max-w-xs">
                  <a href="#project-${p.code}" class="text-gray-900 hover:text-blue-600 font-medium line-clamp-1 transition-colors">${escapeHtml(p.titre)}</a>
                  <p class="text-xs text-gray-400 truncate">${escapeHtml(p.type_projet || '')}</p>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(p.statut)}">${escapeHtml(p.statut)}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(p.priorite)}">${escapeHtml(p.priorite || '—')}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded text-xs font-medium ${getRiskBadgeClass(p.niveau_risque)}">${escapeHtml(p.niveau_risque || '—')}</span>
                </td>
                <td class="px-4 py-3 hidden lg:table-cell">
                  <span class="text-xs text-gray-600 line-clamp-1" title="${escapeHtml(p.direction_principale || '')}">${escapeHtml((p.direction_principale || '—').replace('Direction des ', '').replace('Direction de la ', '').replace("Direction de l'", ''))}</span>
                </td>
                <td class="px-4 py-3 hidden xl:table-cell">
                  <div class="flex -space-x-1">
                    ${(p.Ressources_associees || []).slice(0, 4).map(r => `
                      <div class="w-6 h-6 rounded-full border border-white overflow-hidden shrink-0" title="${escapeHtml(r.prenom)} ${escapeHtml(r.nom)}">
                        ${renderAvatarHtml(r, 'w-full h-full')}
                      </div>
                    `).join('')}
                  </div>
                </td>
                <td class="px-4 py-3 text-center hidden md:table-cell">
                  <span class="text-xs text-gray-500">v${p.version || 1}</span>
                </td>
                <td class="px-4 py-3 text-right">
                  <a href="#project-${p.code}" class="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                    Voir →
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Apply filters to projects array
 */
function applyFilters(projects, filters) {
  let result = [...projects];
  const { search, statut, priorite, risque, direction, type } = filters;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      (p.titre || '').toLowerCase().includes(q) ||
      String(p.code).includes(q) ||
      `spr-${String(p.code).padStart(3,'0')}`.includes(q) ||
      (p.type_projet || '').toLowerCase().includes(q) ||
      (p.direction_principale || '').toLowerCase().includes(q) ||
      (p.reglement || '').toLowerCase().includes(q)
    );
  }
  if (statut) result = result.filter(p => p.statut === statut);
  if (priorite) result = result.filter(p => p.priorite === priorite);
  if (risque) result = result.filter(p => p.niveau_risque === risque);
  if (direction) result = result.filter(p => p.direction_principale === direction);
  if (type) result = result.filter(p => p.type_projet === type);

  return result;
}

/**
 * Sort projects
 */
function sortProjects(projects, sortKey, asc) {
  return [...projects].sort((a, b) => {
    let va, vb;
    switch (sortKey) {
      case 'titre':
        va = (a.titre || '').toLowerCase();
        vb = (b.titre || '').toLowerCase();
        break;
      case 'statut':
        va = a.statut || '';
        vb = b.statut || '';
        break;
      case 'priorite': {
        const order = { 'élevé': 0, 'moyen': 1, 'faible': 2 };
        va = order[a.priorite] ?? 99;
        vb = order[b.priorite] ?? 99;
        break;
      }
      case 'date':
        va = a.derniere_modification || '';
        vb = b.derniere_modification || '';
        break;
      default: // code
        va = a.code;
        vb = b.code;
    }
    if (va < vb) return asc ? -1 : 1;
    if (va > vb) return asc ? 1 : -1;
    return 0;
  });
}

/**
 * Attach event listeners to the projects list
 * @param {Array} projects
 * @param {Object} drafts
 * @param {Object} currentFilters
 * @param {Function} onFilterChange - callback(newFilters)
 */
export function attachProjectsListeners(projects, drafts, currentFilters, onFilterChange) {
  const root = document.getElementById('projects-list-root');
  if (!root) return;

  const getFilters = () => ({
    search: document.getElementById('proj-search')?.value || '',
    statut: document.getElementById('proj-filter-statut')?.value || '',
    priorite: document.getElementById('proj-filter-priorite')?.value || '',
    risque: document.getElementById('proj-filter-risque')?.value || '',
    direction: document.getElementById('proj-filter-direction')?.value || '',
    type: document.getElementById('proj-filter-type')?.value || '',
  });

  const rerender = () => {
    const filters = getFilters();
    const sortEl = document.getElementById('proj-sort');
    if (sortEl) _currentSort = sortEl.value;
    persistProjectsViewState();
    renderProjectsChart(applyFilters(projects, filters));
    onFilterChange(filters);
  };

  const debouncedRerender = debounce(rerender, 250);

  // Render chart first time
  renderProjectsChart(applyFilters(projects, currentFilters));

  // Search
  document.getElementById('proj-search')?.addEventListener('input', debouncedRerender);

  // Dropdowns
  ['proj-filter-statut', 'proj-filter-priorite', 'proj-filter-risque',
    'proj-filter-direction', 'proj-filter-type', 'proj-sort'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', rerender);
  });

  // View toggle
  document.getElementById('view-cards')?.addEventListener('click', () => {
    _currentView = 'cards';
    persistProjectsViewState();
    rerender();
  });
  document.getElementById('view-table')?.addEventListener('click', () => {
    _currentView = 'table';
    persistProjectsViewState();
    rerender();
  });

  // Sort direction toggle
  document.getElementById('proj-sort-order')?.addEventListener('click', (event) => {
    _sortAsc = !_sortAsc;
    const button = event.currentTarget;
    if (button) button.textContent = _sortAsc ? '↑' : '↓';
    persistProjectsViewState();
    rerender();
  });

  // Remove filter badges
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-remove-btn');
    if (!btn) return;
    const key = btn.dataset.filter;
    const elMap = {
      statut: 'proj-filter-statut',
      priorite: 'proj-filter-priorite',
      risque: 'proj-filter-risque',
      direction: 'proj-filter-direction',
      type: 'proj-filter-type',
      search: 'proj-search',
    };
    const el = document.getElementById(elMap[key]);
    if (el) {
      el.value = '';
      rerender();
    }
  });
}
