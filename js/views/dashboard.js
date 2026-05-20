/**
 * Dashboard view — KPIs, charts, tables
 */
import { formatDate, getStatusBadgeClass, getPriorityBadgeClass, getRiskBadgeClass, isOverdue, isWithinDays, escapeHtml } from '../utils.js';

// Chart instances registry
if (!window.sprCharts) window.sprCharts = {};

const CHART_COLORS = {
  blue:   '#3b82f6',
  green:  '#22c55e',
  amber:  '#f59e0b',
  red:    '#ef4444',
  purple: '#a855f7',
  teal:   '#14b8a6',
  gray:   '#9ca3af',
  indigo: '#6366f1',
  orange: '#f97316',
  cyan:   '#06b6d4',
};

/**
 * Compute all KPIs from project list
 */
function computeKPIs(projects) {
  const total = projects.length;
  const enCours = projects.filter(p => p.statut === 'en cours').length;
  const termines = projects.filter(p => p.statut === 'terminé').length;
  const enAttente = projects.filter(p => p.statut === 'en attente').length;
  const clos = projects.filter(p => p.statut === 'clos').length;
  const prioriteElevee = projects.filter(p => p.priorite === 'élevé').length;
  const risqueEleve = projects.filter(p => p.niveau_risque === 'élevé').length;
  const impactSysteme = projects.filter(p => p.impact_systeme).length;

  // Jalons analysis
  let jalonsBientot = 0;
  let jalonsRetard = 0;
  const now = new Date();

  for (const p of projects) {
    for (const j of (p.jalons || [])) {
      const dateRef = (j.date_changement && j.date_changement.length > 0)
        ? j.date_changement[j.date_changement.length - 1]
        : j.date_initiale;
      if (!dateRef) continue;
      const d = new Date(dateRef);
      const isCompleted = ['complété', 'annulé'].includes(j.statut);
      if (!isCompleted) {
        if (d < now) jalonsRetard++;
        else if (isWithinDays(dateRef, 30)) jalonsBientot++;
      }
    }
  }

  // Recently modified (7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentlyModified = projects.filter(p => {
    if (!p.derniere_modification) return false;
    return new Date(p.derniere_modification) >= sevenDaysAgo;
  });

  // Projects with overdue jalons
  const overdueByProject = projects.map(p => {
    const count = (p.jalons || []).filter(j => {
      const dateRef = (j.date_changement && j.date_changement.length > 0)
        ? j.date_changement[j.date_changement.length - 1]
        : j.date_initiale;
      if (!dateRef) return false;
      const isCompleted = ['complété', 'annulé'].includes(j.statut);
      return !isCompleted && new Date(dateRef) < now;
    }).length;
    return { project: p, count };
  }).filter(x => x.count > 0).sort((a, b) => b.count - a.count).slice(0, 10);

  // Count by direction
  const byDirection = {};
  for (const p of projects) {
    const d = p.direction_principale || 'Non définie';
    byDirection[d] = (byDirection[d] || 0) + 1;
  }

  // Count by type
  const byType = {};
  for (const p of projects) {
    const t = p.type_projet || 'Non défini';
    byType[t] = (byType[t] || 0) + 1;
  }

  // Count by juridiction
  const byJuridiction = {};
  for (const p of projects) {
    const j = p.juridiction_principale || 'Non définie';
    byJuridiction[j] = (byJuridiction[j] || 0) + 1;
  }

  // Jalons by month (next 6 months)
  const jalonsByMonth = {};
  const monthLabels = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('fr-CA', { month: 'short', year: '2-digit' });
    jalonsByMonth[key] = 0;
    monthLabels.push({ key, label });
  }
  for (const p of projects) {
    for (const j of (p.jalons || [])) {
      const dateRef = (j.date_changement && j.date_changement.length > 0)
        ? j.date_changement[j.date_changement.length - 1]
        : j.date_initiale;
      if (!dateRef) continue;
      const d = new Date(dateRef);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (jalonsByMonth[key] !== undefined) jalonsByMonth[key]++;
    }
  }

  // Completion rate by direction
  const completionByDir = {};
  for (const p of projects) {
    const d = p.direction_principale || 'Non définie';
    if (!completionByDir[d]) completionByDir[d] = { total: 0, done: 0 };
    completionByDir[d].total++;
    if (p.statut === 'terminé') completionByDir[d].done++;
  }

  return {
    total, enCours, termines, enAttente, clos,
    prioriteElevee, risqueEleve, impactSysteme,
    jalonsBientot, jalonsRetard,
    recentlyModified,
    overdueByProject,
    byDirection,
    byType,
    byJuridiction,
    jalonsByMonth,
    monthLabels,
    completionByDir,
  };
}

/**
 * Render the dashboard
 * @param {Array} projects
 * @param {Object} currentUser
 * @returns {string} HTML
 */
export function renderDashboard(projects, currentUser) {
  const kpi = computeKPIs(projects);

  const top5Juridiction = Object.entries(kpi.byJuridiction)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentList = [...kpi.recentlyModified]
    .sort((a, b) => new Date(b.derniere_modification) - new Date(a.derniere_modification))
    .slice(0, 10);

  return `
    <div class="animate-fadeIn">
      <!-- Page title -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Tableau de bord — Reddition de comptes</h1>
        <p class="text-sm text-gray-500 mt-1">${projects.length} projets réglementaires • Mis à jour ${new Date().toLocaleDateString('fr-CA', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
      </div>

      <!-- KPI Cards Row -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        ${kpiCard('Total', kpi.total, 'bg-blue-50 border-blue-100', 'text-blue-700', iconStack())}
        ${kpiCard('En cours', kpi.enCours, 'bg-blue-50 border-blue-100', 'text-blue-700', iconClock())}
        ${kpiCard('Priorité élevée', kpi.prioriteElevee, 'bg-red-50 border-red-100', 'text-red-700', iconAlert())}
        ${kpiCard('Risque élevé', kpi.risqueEleve, 'bg-orange-50 border-orange-100', 'text-orange-700', iconShield())}
        ${kpiCard('Jalons à venir', kpi.jalonsBientot, 'bg-teal-50 border-teal-100', 'text-teal-700', iconCalendar())}
        ${kpiCard('Impact système', kpi.impactSysteme, 'bg-purple-50 border-purple-100', 'text-purple-700', iconCog())}
      </div>

      <!-- Secondary KPIs -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">${kpi.termines}</div>
          <div class="text-xs text-gray-500 mt-1">Terminés</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-amber-600">${kpi.enAttente}</div>
          <div class="text-xs text-gray-500 mt-1">En attente</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-500">${kpi.clos}</div>
          <div class="text-xs text-gray-500 mt-1">Clos</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-red-600">${kpi.jalonsRetard}</div>
          <div class="text-xs text-gray-500 mt-1">Jalons en retard</div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Répartition par statut</h3>
          <div class="relative h-48">
            <canvas id="chart-statuts"></canvas>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Répartition par priorité</h3>
          <div class="relative h-48">
            <canvas id="chart-priorites"></canvas>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Répartition par risque</h3>
          <div class="relative h-48">
            <canvas id="chart-risques"></canvas>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Projets par direction principale</h3>
          <div class="relative h-64">
            <canvas id="chart-directions"></canvas>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Jalons à venir (6 prochains mois)</h3>
          <div class="relative h-64">
            <canvas id="chart-jalons"></canvas>
          </div>
        </div>
      </div>

      <!-- Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <!-- Overdue jalons -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700">Projets avec jalons en retard</h3>
          </div>
          ${kpi.overdueByProject.length === 0
            ? '<p class="text-sm text-gray-400 px-5 py-4">Aucun jalon en retard.</p>'
            : `<div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th class="px-4 py-2 text-left">Code</th>
                  <th class="px-4 py-2 text-left">Titre</th>
                  <th class="px-4 py-2 text-center">Retard</th>
                  <th class="px-4 py-2 text-right">Action</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-100">
                  ${kpi.overdueByProject.map(({ project: p, count }) => `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-2.5"><span class="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono font-bold">SPR-${String(p.code).padStart(3,'0')}</span></td>
                      <td class="px-4 py-2.5 max-w-[180px] truncate text-gray-800 font-medium">${escapeHtml(p.titre)}</td>
                      <td class="px-4 py-2.5 text-center"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">${count}</span></td>
                      <td class="px-4 py-2.5 text-right"><a href="#project-${p.code}" class="text-blue-600 hover:underline text-xs font-medium">Voir →</a></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`}
        </div>

        <!-- Recently modified -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700">Projets modifiés récemment</h3>
          </div>
          ${recentList.length === 0
            ? '<p class="text-sm text-gray-400 px-5 py-4">Aucune modification dans les 7 derniers jours.</p>'
            : `<div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th class="px-4 py-2 text-left">Titre</th>
                  <th class="px-4 py-2 text-center">Version</th>
                  <th class="px-4 py-2 text-right">Date</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-100">
                  ${recentList.map(p => `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-2.5 max-w-[200px] truncate"><a href="#project-${p.code}" class="text-blue-600 hover:underline font-medium">${escapeHtml(p.titre)}</a></td>
                      <td class="px-4 py-2.5 text-center text-xs text-gray-500">v${p.version || 1}</td>
                      <td class="px-4 py-2.5 text-right text-xs text-gray-500">${formatDate(p.derniere_modification)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`}
        </div>
      </div>

      <!-- Bottom analytics row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <!-- By type -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700">Projets par type</h3>
          </div>
          <div class="divide-y divide-gray-100">
            ${Object.entries(kpi.byType).sort((a,b) => b[1]-a[1]).map(([type, count]) => `
              <div class="flex items-center justify-between px-5 py-2.5">
                <span class="text-sm text-gray-700 truncate">${escapeHtml(type)}</span>
                <div class="flex items-center gap-2 shrink-0 ml-2">
                  <div class="w-20 bg-gray-100 rounded-full h-1.5">
                    <div class="bg-blue-500 h-1.5 rounded-full" style="width:${Math.round(count/kpi.total*100)}%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-600 w-6 text-right">${count}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Top 5 juridictions -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700">Top 5 juridictions</h3>
          </div>
          <div class="divide-y divide-gray-100">
            ${top5Juridiction.map(([jur, count]) => `
              <div class="flex items-center justify-between px-5 py-2.5">
                <span class="text-sm text-gray-700 truncate">${escapeHtml(jur)}</span>
                <div class="flex items-center gap-2 shrink-0 ml-2">
                  <div class="w-20 bg-gray-100 rounded-full h-1.5">
                    <div class="bg-teal-500 h-1.5 rounded-full" style="width:${Math.round(count/kpi.total*100)}%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-600 w-6 text-right">${count}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Completion rate by direction -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700">Taux de complétion par direction</h3>
          </div>
          <div class="divide-y divide-gray-100 overflow-y-auto max-h-72">
            ${Object.entries(kpi.completionByDir)
              .sort((a,b) => b[1].total - a[1].total)
              .map(([dir, { total, done }]) => {
                const pct = total > 0 ? Math.round(done/total*100) : 0;
                const shortDir = dir.replace('Direction des ', 'Dir. ').replace('Direction de la ', 'Dir. ').replace('Direction de l\'', 'Dir. ');
                return `
                  <div class="px-5 py-2.5">
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-gray-700 truncate max-w-[180px]" title="${escapeHtml(dir)}">${escapeHtml(shortDir)}</span>
                      <span class="text-gray-500 font-medium shrink-0 ml-1">${done}/${total} (${pct}%)</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-1.5">
                      <div class="bg-green-500 h-1.5 rounded-full transition-all" style="width:${pct}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function kpiCard(label, value, bgClass, textClass, icon) {
  return `
    <div class="bg-white border ${bgClass} rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
      <div class="w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center ${textClass}">
        ${icon}
      </div>
      <div class="text-2xl font-bold ${textClass}">${value}</div>
      <div class="text-xs text-gray-500 leading-tight">${label}</div>
    </div>
  `;
}

function iconStack() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`; }
function iconClock() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/></svg>`; }
function iconAlert() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`; }
function iconShield() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`; }
function iconCalendar() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>`; }
function iconCog() { return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`; }

/**
 * Initialize all dashboard charts using Chart.js
 * @param {Array} projects
 */
export function initDashboardCharts(projects) {
  const kpi = computeKPIs(projects);

  // Destroy existing
  Object.keys(window.sprCharts).forEach(k => {
    if (window.sprCharts[k]) {
      try { window.sprCharts[k].destroy(); } catch {}
    }
  });
  window.sprCharts = {};

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 11 }, padding: 10, boxWidth: 12 },
      },
    },
  };

  // Statuts doughnut
  const ctxStatuts = document.getElementById('chart-statuts');
  if (ctxStatuts) {
    window.sprCharts['statuts'] = new Chart(ctxStatuts, {
      type: 'doughnut',
      data: {
        labels: ['En cours', 'Terminé', 'En attente', 'Clos'],
        datasets: [{
          data: [kpi.enCours, kpi.termines, kpi.enAttente, kpi.clos],
          backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.amber, CHART_COLORS.gray],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: { ...chartDefaults, cutout: '65%' },
    });
  }

  // Priorités doughnut
  const ctxPriorites = document.getElementById('chart-priorites');
  if (ctxPriorites) {
    const faible = projects.filter(p => p.priorite === 'faible').length;
    const moyen = projects.filter(p => p.priorite === 'moyen').length;
    window.sprCharts['priorites'] = new Chart(ctxPriorites, {
      type: 'doughnut',
      data: {
        labels: ['Élevé', 'Moyen', 'Faible'],
        datasets: [{
          data: [kpi.prioriteElevee, moyen, faible],
          backgroundColor: [CHART_COLORS.red, CHART_COLORS.amber, CHART_COLORS.green],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: { ...chartDefaults, cutout: '65%' },
    });
  }

  // Risques doughnut
  const ctxRisques = document.getElementById('chart-risques');
  if (ctxRisques) {
    const risqueFaible = projects.filter(p => p.niveau_risque === 'faible').length;
    const risqueMoyen = projects.filter(p => p.niveau_risque === 'moyen').length;
    window.sprCharts['risques'] = new Chart(ctxRisques, {
      type: 'doughnut',
      data: {
        labels: ['Élevé', 'Moyen', 'Faible'],
        datasets: [{
          data: [kpi.risqueEleve, risqueMoyen, risqueFaible],
          backgroundColor: [CHART_COLORS.red, CHART_COLORS.amber, CHART_COLORS.green],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: { ...chartDefaults, cutout: '65%' },
    });
  }

  // Directions bar
  const ctxDirections = document.getElementById('chart-directions');
  if (ctxDirections) {
    const sorted = Object.entries(kpi.byDirection).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const shortNames = sorted.map(([d]) =>
      d.replace('Direction des ', '').replace('Direction de la ', '').replace('Direction de l\'', '').substring(0, 22)
    );
    window.sprCharts['directions'] = new Chart(ctxDirections, {
      type: 'bar',
      data: {
        labels: shortNames,
        datasets: [{
          label: 'Projets',
          data: sorted.map(([, c]) => c),
          backgroundColor: CHART_COLORS.blue,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: '#f1f5f9' } },
          x: { ticks: { font: { size: 9 }, maxRotation: 35 }, grid: { display: false } },
        },
      },
    });
  }

  // Jalons by month bar
  const ctxJalons = document.getElementById('chart-jalons');
  if (ctxJalons) {
    window.sprCharts['jalons'] = new Chart(ctxJalons, {
      type: 'bar',
      data: {
        labels: kpi.monthLabels.map(m => m.label),
        datasets: [{
          label: 'Jalons',
          data: kpi.monthLabels.map(m => kpi.jalonsByMonth[m.key] || 0),
          backgroundColor: CHART_COLORS.teal,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 11 } }, grid: { color: '#f1f5f9' } },
          x: { ticks: { font: { size: 11 } }, grid: { display: false } },
        },
      },
    });
  }
}
