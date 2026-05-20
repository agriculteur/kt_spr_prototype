/**
 * SPR — Suivi des Projets Réglementaires
 * Main application entry point
 */
import { CONFIG } from './config.js';
import { generateMockProjects, generateMockUser, generateMockHistory, generateMockDraft } from './mock-data.js';
import * as api from './api.js';
import { initAuth, getCurrentUser, isContributor } from './auth.js';
import { showToast } from './components/toast.js';
import { getCachedProjects, saveProjectsCache } from './data-store.js';
import { renderDashboard, initDashboardCharts } from './views/dashboard.js';
import { renderProjectsList, attachProjectsListeners } from './views/projects.js';
import { renderProject, attachProjectListeners, getProjectEditMode } from './views/project.js';
import { renderHistory } from './views/history.js';
import { renderHelp, attachHelpListeners } from './views/help.js';
import { parseHash, escapeHtml, debounce } from './utils.js';

// ─── App State ────────────────────────────────────────────────────────────────

const state = {
  currentUser: null,
  projects: [],
  drafts: {},    // { code: draftData }
  histories: {}, // { code: [entries] }
  loading: false,
  CONFIG,        // expose for views
};

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function initApp() {
  try {
    // Auth
    state.currentUser = await initAuth();
    updateSidebarUser(state.currentUser);

    // Load projects (offline-capable)
    setLoading(true);

    // Try local cache first
    const cached = await getCachedProjects();
    if (cached.length > 0) {
      state.projects = cached;
      updateProjectCountBadge(state.projects.length);
      showToast('Chargement local des projets (hors connexion ou cache).', 'info', 3000);
    }

    if (CONFIG.DEV_MODE) {
      const projects = generateMockProjects();
      state.projects = projects;
      [1, 2, 3].forEach(code => {
        const proj = projects.find(p => p.code === code);
        if (proj) state.drafts[code] = generateMockDraft(proj);
      });
      await saveProjectsCache(projects);
      showToast('Mode développement: données fictives chargées.', 'success', 3000);
    } else {
      try {
        const projects = await api.getProjects();
        if (projects && projects.length > 0) {
          state.projects = projects;
          await saveProjectsCache(projects);
          showToast('Projets chargés depuis le serveur et mis en cache.', 'success', 2500);
        }
      } catch (err) {
        if (!state.projects || state.projects.length === 0) {
          showToast('Erreur réseau : utilisation du cache local', 'warning', 4500);
          state.projects = cached || [];
        } else {
          showToast('Erreur réseau lors de la mise à jour (cache local conservé).', 'warning', 4000);
        }
      }
    }

    setLoading(false);
    updateProjectCountBadge(state.projects.length);

    // Draft count badge
    updateDraftBadge(Object.keys(state.drafts).length);

    // Router
    window.addEventListener('hashchange', () => navigate(window.location.hash));
    navigate(window.location.hash || '#dashboard');

    // Refresh button
    document.getElementById('btn-refresh')?.addEventListener('click', async () => {
      await refreshProjects();
    });

    // Mobile menu button
    document.getElementById('btn-mobile-menu')?.addEventListener('click', toggleMobileSidebar);

    // Sidebar overlay click to close
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeMobileSidebar);

    // Sidebar nav links
    document.getElementById('sidebar-nav')?.addEventListener('click', (e) => {
      const link = e.target.closest('a[href], button[data-hash]');
      if (!link) return;
      const href = link.getAttribute('href') || link.dataset.hash;
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMobileSidebar();
        goTo(href);
      }
    });

    // Mobile sidebar nav
    document.getElementById('mobile-sidebar-nav')?.addEventListener('click', (e) => {
      const link = e.target.closest('a[href], button[data-hash]');
      if (!link) return;
      const href = link.getAttribute('href') || link.dataset.hash;
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMobileSidebar();
        goTo(href);
      }
    });

    // Theme
    initGlobalTheme();
    document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);

    // Common UI
    initResponsiveBehavior();
    syncTopSearchWithHash();

    // Top search (tests quick project filtering)
    document.getElementById('top-search')?.addEventListener('input', debounce((e) => {
      const value = (e.target.value || '').trim();
      const currentRoute = parseHash(window.location.hash).route || 'dashboard';
      const searchHash = value ? `#projects?search=${encodeURIComponent(value)}` : '#projects';
      if (currentRoute !== 'projects') {
        goTo(searchHash);
      } else {
        goTo(searchHash);
      }
    }, 350));

  } catch (err) {
    console.error('initApp error:', err);
    showToast('Erreur lors du chargement de l\'application.', 'error');
    setLoading(false);
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

async function navigate(hash) {
  const { route, params } = parseHash(hash);

  // Capture edit-mode BEFORE cleanup (cleanup resets it to false)
  const prevRoot = document.getElementById('project-root');
  const prevCode = prevRoot ? parseInt(prevRoot.dataset.code) : null;
  const incomingCode = route.startsWith('project-') ? parseInt(route.replace('project-', '')) : null;
  const editMode = (prevCode !== null && prevCode === incomingCode) ? getProjectEditMode() : false;

  if (prevRoot && typeof prevRoot._cleanup === 'function') {
    prevRoot._cleanup();
  }

  setLoading(true);
  scrollMainToTop();

  try {
    // Dashboard
    if (!route || route === 'dashboard') {
      updateBreadcrumb([{ label: 'Tableau de bord' }]);
      updateActiveSidebarLink('dashboard');
      const html = renderDashboard(state.projects, state.currentUser);
      setMainContent(html);
      requestAnimationFrame(() => {
        setTimeout(() => initDashboardCharts(state.projects), 100);
      });
    }

    // Projects list
    else if (route === 'projects') {
      updateBreadcrumb([{ label: 'Projets' }]);
      updateActiveSidebarLink('projects');

      const renderProjectsWithFilters = (filters) => {
        const html = renderProjectsList(state.projects, state.drafts, filters);
        setMainContent(html);

        attachProjectsListeners(state.projects, state.drafts, filters, (newFilters) => {
          const query = Object.entries(newFilters)
            .filter(([, v]) => v && v !== '')
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
          const newHash = query ? `#projects?${query}` : '#projects';
          // history.replaceState triggers a Chrome security warning on file:// URLs
          // (each file:// URL is treated as a unique origin). Skip it for file://;
          // filters still work — only the URL bar won't reflect them while browsing locally.
          if (window.location.protocol !== 'file:') {
            history.replaceState(null, '', newHash);
          }
          renderProjectsWithFilters(newFilters);
        });
      };

      renderProjectsWithFilters(params);
    }

    // Single project
    else if (route.startsWith('project-')) {
      const code = parseInt(route.replace('project-', ''));
      const project = state.projects.find(p => p.code === code);
      if (!project) {
        setMainContent(`<div class="text-center py-16 text-gray-500">
          <p class="text-lg font-medium">Projet introuvable (code: ${code})</p>
          <a href="#projects" class="text-blue-600 hover:underline mt-2 inline-block">← Retour aux projets</a>
        </div>`);
        setLoading(false);
        return;
      }

      // Load draft
      let draft = state.drafts[code] || null;
      if (!draft && !CONFIG.DEV_MODE) {
        try {
          draft = await api.getProjectDraft(code);
          if (draft) state.drafts[code] = draft;
        } catch { draft = null; }
      }

      const contributor = isContributor(project);

      updateBreadcrumb([
        { label: 'Projets', href: '#projects' },
        { label: `SPR-${String(code).padStart(3,'0')} — ${project.titre}` },
      ]);
      updateActiveSidebarLink('projects');

      const html = renderProject(project, draft, contributor, editMode);
      setMainContent(html);
      attachProjectListeners(project, draft, contributor, state, (h) => goTo(h), api, { getCurrentUser, isContributor });
    }

    // History
    else if (route.startsWith('history-')) {
      const code = parseInt(route.replace('history-', ''));
      const project = state.projects.find(p => p.code === code);

      let entries;
      if (state.histories[code]) {
        entries = state.histories[code];
      } else {
        if (CONFIG.DEV_MODE) {
          entries = project ? generateMockHistory(project) : [];
        } else {
          entries = await api.getProjectHistory(code);
        }
        state.histories[code] = entries;
      }

      updateBreadcrumb([
        { label: 'Projets', href: '#projects' },
        { label: `SPR-${String(code).padStart(3,'0')}`, href: `#project-${code}` },
        { label: 'Historique' },
      ]);
      updateActiveSidebarLink('projects');

      const html = renderHistory(code, entries);
      setMainContent(html);
    }

    // Help / Manuel
    else if (route === 'help') {
      updateBreadcrumb([{ label: 'Manuel d\'utilisation' }]);
      updateActiveSidebarLink('help');
      const html = renderHelp();
      setMainContent(html);
      requestAnimationFrame(() => attachHelpListeners());
    }

    // Fallback
    else {
      goTo('#dashboard');
      return;
    }
  } catch (err) {
    console.error('navigate error:', err);
    showToast('Erreur lors du chargement de la vue.', 'error');
  } finally {
    setLoading(false);
  }
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function setMainContent(html) {
  const main = document.getElementById('main-content');
  if (main) main.innerHTML = html;
}

function scrollMainToTop() {
  const main = document.getElementById('main-content');
  if (main) main.scrollTop = 0;
  window.scrollTo(0, 0);
}

function setLoading(loading) {
  state.loading = loading;
  const indicator = document.getElementById('loading-indicator');
  if (indicator) indicator.classList.toggle('hidden', !loading);

  const main = document.getElementById('main-content');
  if (main) {
    if (loading) {
      main.innerHTML = renderSkeletonView();
    } else {
      // do not clear content on false, router will set content.
    }
  }
}

function renderSkeletonView() {
  return `
    <div class="space-y-4 animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${Array.from({ length: 6 }).map(() => `
          <article class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div class="h-2 bg-gray-200 rounded w-1/2 mt-4"></div>
          </article>`).join('')}
      </div>
    </div>
  `;
}

function updateBreadcrumb(parts) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  bc.innerHTML = parts.map((p, i) => {
    const isLast = i === parts.length - 1;
    if (isLast || !p.href) {
      return `<span class="text-sm ${isLast ? 'text-gray-800 font-medium' : 'text-gray-500'} truncate max-w-xs">${escapeHtml(p.label)}</span>`;
    }
    return `
      <a href="${escapeHtml(p.href)}" class="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate max-w-xs">${escapeHtml(p.label)}</a>
      <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    `;
  }).join('');
}

function updateActiveSidebarLink(routeKey) {
  document.querySelectorAll('.sidebar-link').forEach(el => {
    const key = el.dataset.route;
    el.classList.toggle('active', key === routeKey);
  });
}

function updateSidebarUser(user) {
  const nameEl = document.getElementById('sidebar-user-name');
  const emailEl = document.getElementById('sidebar-user-email');
  const avatarEl = document.getElementById('sidebar-user-avatar');
  const mobileNameEl = document.getElementById('mobile-sidebar-user-name');
  const mobileEmailEl = document.getElementById('mobile-sidebar-user-email');
  const mobileAvatarEl = document.getElementById('mobile-sidebar-user-avatar');

  const initials = user?.name
    ? user.name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  if (nameEl) nameEl.textContent = user?.name || 'Utilisateur';
  if (emailEl) emailEl.textContent = user?.email || '';
  if (avatarEl) avatarEl.textContent = initials;

  if (mobileNameEl) mobileNameEl.textContent = user?.name || 'Utilisateur';
  if (mobileEmailEl) mobileEmailEl.textContent = user?.email || '';
  if (mobileAvatarEl) mobileAvatarEl.textContent = initials;
}

function updateProjectCountBadge(count) {
  const el = document.getElementById('projects-count-badge');
  if (el) el.textContent = count;
  const elMobile = document.getElementById('projects-count-badge-mobile');
  if (elMobile) elMobile.textContent = count;
}

function updateDraftBadge(count) {
  const el = document.getElementById('draft-count-badge');
  if (el) {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar?.classList.toggle('-translate-x-full');
  overlay?.classList.toggle('hidden');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar?.classList.add('-translate-x-full');
  overlay?.classList.add('hidden');
}

function initGlobalTheme() {
  const saved = localStorage.getItem('spr.theme') || 'light';
  const root = document.documentElement;
  const icon = document.getElementById('theme-icon');
  const apply = (mode) => {
    if (mode === 'dark') {
      root.classList.add('dark');
      icon.classList.add('text-yellow-400');
    } else {
      root.classList.remove('dark');
      icon.classList.remove('text-yellow-400');
    }
  };
  apply(saved);
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('spr.theme', next);
  initGlobalTheme();
}

function syncTopSearchWithHash() {
  const searchInput = document.getElementById('top-search');
  if (!searchInput) return;
  const { route, params } = parseHash(window.location.hash);
  if (route !== 'projects') return;
  searchInput.value = params.search || '';
}

function initResponsiveBehavior() {
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMobileSidebar();
  });
  window.addEventListener('hashchange', syncTopSearchWithHash);
}

async function refreshProjects() {
  setLoading(true);
  try {
    if (CONFIG.DEV_MODE) {
      showToast('Mode développement — données fictives actualisées.', 'info');
    } else {
      state.projects = await api.getProjects();
      showToast('Projets mis à jour.', 'success');
    }
    updateProjectCountBadge(state.projects.length);
    navigate(window.location.hash || '#dashboard');
  } catch (err) {
    showToast('Erreur lors de la mise à jour des projets.', 'error');
  } finally {
    setLoading(false);
  }
}


// ─── Quick Filter Sidebar Links ────────────────────────────────────────────────

document.addEventListener('click', (e) => {
  const quickFilter = e.target.closest('[data-quick-filter]');
  if (!quickFilter) return;
  e.preventDefault();
  const filter = quickFilter.dataset.quickFilter;
  const filterMap = {
    'en-cours': '#projects?statut=en%20cours',
    'en-attente': '#projects?statut=en%20attente',
    'priorite-elevee': '#projects?priorite=%C3%A9lev%C3%A9',
    'risque-eleve': '#projects?risque=%C3%A9lev%C3%A9',
  };
  const hash = filterMap[filter];
  if (hash) {
    closeMobileSidebar();
    goTo(hash);
  }
});

// ─── Navigation helper ─────────────────────────────────────────────────────────
// On file:// URLs Chrome treats every hash navigation as a cross-origin attempt
// and may block it with a SecurityError. Call navigate() directly instead of
// touching window.location so the router still works without triggering the error.

function goTo(hash) {
  if (window.location.protocol === 'file:') {
    navigate(hash);
  } else {
    window.location.hash = hash;
  }
}

// ─── Start ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', initApp);
