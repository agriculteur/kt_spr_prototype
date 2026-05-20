/**
 * Single project view — display + edit mode
 */
import {
  escapeHtml, formatDate, formatDateTime,
  getStatusBadgeClass, getPriorityBadgeClass, getRiskBadgeClass,
  getInitials, diffObjects, renderAvatarHtml,
} from '../utils.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';
import { renderHistory } from './history.js';

let _editMode = false;
let _viewingDraft = false;
let _activeTab = 'general';

/** Read current edit-mode state (used by the router to preserve it across same-project navigations) */
export function getProjectEditMode() { return _editMode; }

/**
 * Render a single project page
 * @param {Object} project - published data
 * @param {Object|null} draft - draft data object or null
 * @param {boolean} isContributor
 * @param {boolean} editMode
 * @returns {string} HTML
 */
export function renderProject(project, draft, isContributor, editMode = false) {
  _editMode = editMode;
  const displayData = (_viewingDraft && draft) ? draft.data : project;

  return `
    <div class="animate-fadeIn" id="project-root" data-code="${project.code}">
      ${renderProjectHeader(project, displayData, draft, isContributor)}
      ${renderDraftBanner(draft, isContributor)}
      ${renderTabNav()}
      <div id="tab-content" class="mt-4">
        ${renderTabContent(displayData, draft, isContributor, _activeTab)}
      </div>
    </div>
  `;
}

function renderProjectHeader(project, displayData, draft, isContributor) {
  return `
    <div class="mb-4">
      <a href="#projects" class="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-3 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Projets
      </a>

      <div class="flex flex-col sm:flex-row sm:items-start gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-mono font-bold">
              SPR-${String(project.code).padStart(3,'0')}
            </span>
            <span class="px-2.5 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(displayData.statut)}">${escapeHtml(displayData.statut)}</span>
            <span class="px-2.5 py-1 rounded text-sm font-medium ${getPriorityBadgeClass(displayData.priorite)}">Priorité: ${escapeHtml(displayData.priorite)}</span>
            <span class="px-2.5 py-1 rounded text-sm font-medium ${getRiskBadgeClass(displayData.niveau_risque)}">Risque: ${escapeHtml(displayData.niveau_risque)}</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900 leading-tight">${escapeHtml(displayData.titre)}</h1>
          <p class="text-sm text-gray-500 mt-1">${escapeHtml(displayData.type_projet || '')} · ${escapeHtml(displayData.reglement || '')} · v${displayData.version || 1}</p>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-2 shrink-0 flex-wrap">
          ${draft && isContributor ? `
            <button id="toggle-draft-view" class="px-3 py-1.5 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors">
              ${_viewingDraft ? 'Voir version publiée' : 'Voir brouillon'}
            </button>
          ` : ''}
          ${isContributor && !_editMode ? `
            <button id="btn-edit-mode" class="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modifier
            </button>
          ` : ''}
          <button id="btn-preview" class="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Aperçu / PDF
          </button>
          ${isContributor && draft ? `
            <button id="btn-publish" class="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Publier v${(project.version || 1) + 1}
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderDraftBanner(draft, isContributor) {
  if (!draft || !isContributor) return '';
  return `
    <div class="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      <div class="flex-1">
        <p class="text-sm font-medium text-amber-800">Un brouillon est en cours</p>
        <p class="text-xs text-amber-600 mt-0.5">
          Modifié par ${escapeHtml(draft.modifie_par || '—')} ·
          ${draft.modifie_le ? formatDateTime(draft.modifie_le) : ''}
        </p>
      </div>
    </div>
  `;
}

function renderTabNav() {
  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'chronologie', label: 'Chronologie' },
    { id: 'documents', label: 'Documents' },
    { id: 'historique', label: 'Historique' },
  ];

  return `
    <div class="border-b border-gray-200">
      <nav class="flex gap-0 -mb-px overflow-x-auto" id="tab-nav">
        ${tabs.map(t => `
          <button class="tab-btn px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
            ${_activeTab === t.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }"
            data-tab="${t.id}">
            ${t.label}
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}

function renderTabContent(data, draft, isContributor, tab) {
  switch (tab) {
    case 'general':
      return _editMode ? renderEditForm(data) : renderGeneralTab(data);
    case 'equipe':
      return _editMode ? renderEditEquipeForm(data) : renderEquipeTab(data);
    case 'chronologie':
      return _editMode ? renderEditChronologieForm(data) : renderChronologieTab(data);
    case 'documents':
      return renderDocumentsTab(data);
    case 'historique':
      return renderHistoriqueTab(data.code);
    default:
      return renderGeneralTab(data);
  }
}

// ---- General Tab ----

function renderGeneralTab(data) {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-5">
        ${textBlock('Description', data.description)}
        ${textBlock('Enjeux', data.enjeux)}
        ${textBlock('Discussion', data.discussion)}
      </div>

      <!-- Sidebar metadata -->
      <div class="space-y-4">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Informations</h3>
          <dl class="space-y-2.5">
            ${metaItem('Règlement', data.reglement)}
            ${metaItem('Type de projet', data.type_projet)}
            ${metaItem('Juridiction principale', Array.isArray(data.juridiction_principale) ? data.juridiction_principale.join(', ') : data.juridiction_principale)}
            ${metaItem('Direction principale', data.direction_principale)}
          </dl>
        </div>

        ${(data.loi || []).length > 0 ? `
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Lois applicables</h3>
            <div class="flex flex-wrap gap-1.5">
              ${(data.loi || []).map(l => `<span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">${escapeHtml(l)}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${(data.direction_responsable || []).length > 0 ? `
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Directions responsables</h3>
            <ul class="space-y-1">
              ${(data.direction_responsable || []).map(d => `<li class="text-sm text-gray-700">• ${escapeHtml(d)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Impact système</h3>
          <div class="flex items-center gap-2">
            ${data.impact_systeme
              ? `<span class="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Impact identifié</span>`
              : `<span class="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Aucun impact</span>`
            }
          </div>
          ${data.impact_systeme && data.impact_description ? `<p class="text-sm text-gray-600 mt-2">${escapeHtml(data.impact_description)}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

function textBlock(label, text) {
  if (!text) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">${escapeHtml(label)}</h3>
      <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">${escapeHtml(text)}</p>
    </div>
  `;
}

function metaItem(label, value) {
  if (!value) return '';
  return `<div>
    <dt class="text-xs text-gray-400">${escapeHtml(label)}</dt>
    <dd class="text-sm text-gray-800 font-medium mt-0.5">${escapeHtml(value)}</dd>
  </div>`;
}

// ---- Équipe Tab ----

function renderEquipeTab(data) {
  return `
    <div class="space-y-6">
      ${renderPersonList('Ressources associées', data.Ressources_associees || [], true)}
      ${renderPersonList('Soutien juridique', data.soutien_juridique || [], true)}
      ${renderCommitteeTable('Comité ACVM', data.Comite_ACVM || [])}
      ${renderCommitteeTable('Groupe de travail', data.groupe_de_travail || [])}
    </div>
  `;
}

function renderPersonList(title, people, showRole) {
  if (!people.length) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-semibold text-gray-700 mb-4">${escapeHtml(title)}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${people.map(p => `
          <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full overflow-hidden shrink-0">
              ${renderAvatarHtml(p, 'w-full h-full')}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-800">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)}</p>
              ${showRole && p.role ? `<p class="text-xs text-blue-600">${escapeHtml(p.role)}</p>` : ''}
              <a href="mailto:${escapeHtml(p.email)}" class="text-xs text-gray-400 hover:text-blue-600 truncate block transition-colors">${escapeHtml(p.email)}</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCommitteeTable(title, members) {
  if (!members.length) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700">${escapeHtml(title)}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th class="px-4 py-2 text-left">Prénom</th>
            <th class="px-4 py-2 text-left">Nom</th>
            <th class="px-4 py-2 text-left">Courriel</th>
            <th class="px-4 py-2 text-left">Institution</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            ${members.map(m => `
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-2.5">${escapeHtml(m.prenom)}</td>
                <td class="px-4 py-2.5 font-medium">${escapeHtml(m.nom)}</td>
                <td class="px-4 py-2.5"><a href="mailto:${escapeHtml(m.email)}" class="text-blue-600 hover:underline text-xs">${escapeHtml(m.email)}</a></td>
                <td class="px-4 py-2.5 text-gray-500 text-xs">${escapeHtml(m.institution)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- Chronologie Tab ----

function renderChronologieTab(data) {
  return `
    <div class="space-y-6">
      ${renderTimelineSection('Jalons', data.jalons || [])}
      ${renderTimelineSection('Rencontres et approbations', data.rencontres_approbations || [])}
      ${renderTimelineSection('Développements significatifs', data.developpements_significatifs || [])}
    </div>
  `;
}

const TIMELINE_STATUS_COLORS = {
  'complété': 'bg-green-500',
  'tenu': 'bg-green-500',
  'planifié': 'bg-blue-400',
  'à venir': 'bg-blue-400',
  'en cours': 'bg-blue-500',
  'reporté': 'bg-amber-400',
  'annulé': 'bg-gray-300',
  'default': 'bg-gray-300',
};

function getTimelineDotColor(statut) {
  return TIMELINE_STATUS_COLORS[statut] || TIMELINE_STATUS_COLORS.default;
}

function renderTimelineSection(title, items) {
  if (!items.length) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">${escapeHtml(title)}</h3>
        <p class="text-sm text-gray-400">Aucune entrée.</p>
      </div>
    `;
  }
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-semibold text-gray-700 mb-5">${escapeHtml(title)} <span class="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">${items.length}</span></h3>
      <div class="relative">
        <div class="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
        <div class="space-y-6">
          ${items.map(item => {
            const dotColor = getTimelineDotColor(item.statut);
            const lastDate = (item.date_changement && item.date_changement.length > 0)
              ? item.date_changement[item.date_changement.length - 1]
              : item.date_initiale;
            const hasChanges = item.date_changement && item.date_changement.length > 0;
            return `
              <div class="pl-9 relative">
                <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full ${dotColor} border-2 border-white shadow-sm flex items-center justify-center">
                  ${item.statut === 'complété' || item.statut === 'tenu'
                    ? `<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`
                    : item.statut === 'annulé'
                    ? `<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>`
                    : ''
                  }
                </div>
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 leading-snug">${escapeHtml(item.description)}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                      <span class="text-xs text-gray-400">Date initiale: ${formatDate(item.date_initiale)}</span>
                      ${hasChanges ? `
                        <span class="text-xs text-amber-600">→ Révisé: ${formatDate(lastDate)}</span>
                        ${item.date_changement.length > 1 ? `<span class="text-xs text-gray-400">(${item.date_changement.length} révisions)</span>` : ''}
                      ` : ''}
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                    item.statut === 'complété' || item.statut === 'tenu' ? 'bg-green-100 text-green-700' :
                    item.statut === 'en cours' ? 'bg-blue-100 text-blue-700' :
                    item.statut === 'reporté' ? 'bg-amber-100 text-amber-700' :
                    item.statut === 'annulé' ? 'bg-gray-100 text-gray-500' :
                    'bg-blue-50 text-blue-600'
                  }">${escapeHtml(item.statut)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ---- Documents Tab ----

function renderDocumentsTab(data) {
  const docs = data.documents || [];
  const media = data.media || [];

  return `
    <div class="space-y-6">
      <!-- Documents -->
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div class="px-5 py-4 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-700">Documents <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">${docs.length}</span></h3>
        </div>
        ${docs.length === 0
          ? '<p class="text-sm text-gray-400 px-5 py-4">Aucun document associé.</p>'
          : `<div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th class="px-4 py-2 text-left">Titre</th>
                  <th class="px-4 py-2 text-left hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left hidden lg:table-cell">Description</th>
                  <th class="px-4 py-2 text-left hidden md:table-cell">Date</th>
                  <th class="px-4 py-2 text-left hidden xl:table-cell">Chargé par</th>
                  <th class="px-4 py-2 text-right">Lien</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-100">
                  ${docs.map(d => `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-2.5 font-medium text-gray-800">${escapeHtml(d.titre)}</td>
                      <td class="px-4 py-2.5 hidden sm:table-cell"><span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">${escapeHtml(d.type_document)}</span></td>
                      <td class="px-4 py-2.5 hidden lg:table-cell text-gray-500 max-w-xs truncate text-xs">${escapeHtml(d.description || '—')}</td>
                      <td class="px-4 py-2.5 hidden md:table-cell text-gray-500 text-xs">${formatDate(d.chargement_date)}</td>
                      <td class="px-4 py-2.5 hidden xl:table-cell text-gray-400 text-xs">${escapeHtml(d.chargement_par || '—')}</td>
                      <td class="px-4 py-2.5 text-right">
                        <a href="${escapeHtml(d.lien)}" target="_blank" rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          Ouvrir
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
        }
      </div>

      <!-- Media -->
      ${media.length > 0 ? `
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Médias <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">${media.length}</span></h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${media.map(m => `
              <a href="${escapeHtml(m.lien)}" target="_blank" rel="noopener noreferrer"
                class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">${escapeHtml(m.label)}</p>
                  <p class="text-xs text-gray-400">${escapeHtml(m.auteur || '')} · ${formatDate(m.chargement_date)}</p>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ---- Historique Tab ----

function renderHistoriqueTab(code) {
  return `
    <div id="history-tab-content">
      <p class="text-sm text-gray-400 py-6 text-center">Chargement de l'historique...</p>
    </div>
  `;
}

// ---- Edit Forms ----

function renderEditForm(data) {
  return `
    <form id="edit-form" class="space-y-5">
      <div class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <p class="text-sm text-amber-800">Mode édition — Les modifications seront enregistrées comme brouillon jusqu'à publication.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Titre -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Informations générales</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${formField('Titre du projet', 'text', 'edit-titre', data.titre, 'md:col-span-2')}
            ${formSelect('Type de projet', 'edit-type_projet', [
              'Avis',
              'Mandat spécial',
              'Québec seulement - nouveau règlement',
              'Québec seulement - modification et révision',
              'ACVM - nouveau règlement',
              'ACVM - modification et révision',
            ], data.type_projet)}
            ${formField('Règlement', 'text', 'edit-reglement', data.reglement)}
            ${formSelect('Statut', 'edit-statut', ['en cours', 'terminé', 'en attente', 'clos'], data.statut)}
            ${formSelect('Priorité', 'edit-priorite', ['faible', 'moyen', 'élevé'], data.priorite)}
            ${formSelect('Niveau de risque', 'edit-niveau_risque', ['faible', 'moyen', 'élevé'], data.niveau_risque)}
            ${formMultiSelect('Juridiction principale', 'edit-juridiction_principale', [
              'Ontario',
              'Québec',
              'Colombie-Britannique',
              'Alberta',
              'Manitoba',
              'Saskatchewan',
              'Nouveau-Brunswick',
              'Nouvelle-Écosse',
              'Île-du-Prince-Édouard',
              'Terre-Neuve-et-Labrador',
              'Yukon',
              'Territoires du Nord-Ouest',
              'Nunavut',
              'ACVM',
            ], data.juridiction_principale)}
            ${formSelect('Direction principale', 'edit-direction_principale', [
              'Direction des marchés des valeurs mobilières',
              'Direction de la réglementation',
              'Direction des affaires juridiques',
              'Direction de la conformité et des inspections',
              'Direction de la surveillance',
              'Direction des ressources humaines',
              'Direction des technologies de l\'information',
              'Direction des communications',
              'Direction des finances',
              'Direction de la protection des investisseurs',
            ], data.direction_principale)}
            ${formMultiSelect('Directions responsables', 'edit-direction_responsable', [
              'Direction des marchés des valeurs mobilières',
              'Direction de la réglementation',
              'Direction des affaires juridiques',
              'Direction de la conformité et des inspections',
              'Direction de la surveillance',
              'Direction des ressources humaines',
              'Direction des technologies de l\'information',
              'Direction des communications',
              'Direction des finances',
              'Direction de la protection des investisseurs',
            ], data.direction_responsable)}
          </div>
        </div>

        <!-- Description, Enjeux, Discussion -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Contenus textuels</h3>
          <div class="space-y-4">
            ${formTextarea('Description', 'edit-description', data.description, 4)}
            ${formTextarea('Enjeux', 'edit-enjeux', data.enjeux, 3)}
            ${formTextarea('Discussion', 'edit-discussion', data.discussion, 3)}
          </div>
        </div>

        <!-- Lois -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Lois applicables</h3>
          <div class="grid grid-cols-1">
            ${formMultiSelect('Lois applicables', 'edit-loi', ['LVM', 'LDPSF'], data.loi)}
          </div>
        </div>

        <!-- Impact système -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Impact système</h3>
          <label class="flex items-center gap-2 cursor-pointer mb-3">
            <input type="checkbox" id="edit-impact_systeme" ${data.impact_systeme ? 'checked' : ''} class="w-4 h-4 accent-blue-600">
            <span class="text-sm text-gray-700">Impact sur les systèmes identifié</span>
          </label>
          ${formTextarea('Description de l\'impact', 'edit-impact_description', data.impact_description, 3)}
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-3 pt-2">
        <button type="submit" id="btn-save-draft"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          Enregistrer le brouillon
        </button>
        <button type="button" id="btn-cancel-edit"
          class="px-5 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  `;
}

function renderEditEquipeForm(data) {
  return `
    <form id="edit-equipe-form" class="space-y-5">
      ${renderPersonArrayEditor('Ressources associées', 'Ressources_associees', data.Ressources_associees || [], true)}
      ${renderPersonArrayEditor('Soutien juridique', 'soutien_juridique', data.soutien_juridique || [], true)}
      ${renderCommitteeArrayEditor('Comité ACVM', 'Comite_ACVM', data.Comite_ACVM || [])}
      ${renderCommitteeArrayEditor('Groupe de travail', 'groupe_de_travail', data.groupe_de_travail || [])}

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" id="btn-save-draft"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Enregistrer le brouillon
        </button>
        <button type="button" id="btn-cancel-edit"
          class="px-5 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  `;
}

function renderPersonArrayEditor(title, fieldName, items, hasRole) {
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">${escapeHtml(title)}</h3>
      <input type="hidden" id="edit-${fieldName}" value="${escapeHtml(JSON.stringify(items))}">
      <div id="${fieldName}-list" class="space-y-2 mb-3">
        ${items.map((p, i) => `
          <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
            <span class="flex-1 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)} — ${escapeHtml(p.email)}${hasRole && p.role ? ` (${escapeHtml(p.role)})` : ''}</span>
            <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${fieldName}" data-index="${i}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        `).join('')}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter une personne</summary>
        <div class="mt-3 grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg" id="${fieldName}-add-form">
          <input type="text" placeholder="Prénom" class="person-add-prenom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="text" placeholder="Nom" class="person-add-nom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="email" placeholder="Courriel" class="person-add-email px-3 py-1.5 border border-gray-200 rounded text-sm col-span-2" data-field="${fieldName}">
          ${hasRole ? `<input type="text" placeholder="Rôle" class="person-add-role px-3 py-1.5 border border-gray-200 rounded text-sm col-span-2" data-field="${fieldName}">` : ''}
          <button type="button" class="person-add-btn col-span-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors" data-field="${fieldName}" data-has-role="${hasRole}">
            Ajouter
          </button>
        </div>
      </details>
    </div>
  `;
}

function renderCommitteeArrayEditor(title, fieldName, items) {
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">${escapeHtml(title)}</h3>
      <input type="hidden" id="edit-${fieldName}" value="${escapeHtml(JSON.stringify(items))}">
      <div id="${fieldName}-list" class="space-y-2 mb-3">
        ${items.map((m, i) => `
          <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
            <span class="flex-1 truncate">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)} — ${escapeHtml(m.institution)}</span>
            <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${fieldName}" data-index="${i}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        `).join('')}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter un membre</summary>
        <div class="mt-3 grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
          <input type="text" placeholder="Prénom" class="committee-add-prenom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="text" placeholder="Nom" class="committee-add-nom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="email" placeholder="Courriel" class="committee-add-email px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="text" placeholder="Institution" class="committee-add-institution px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <button type="button" class="committee-add-btn col-span-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors" data-field="${fieldName}">
            Ajouter
          </button>
        </div>
      </details>
    </div>
  `;
}

function renderEditChronologieForm(data) {
  return `
    <form id="edit-chrono-form" class="space-y-5">
      ${renderTimelineArrayEditor('Jalons', 'jalons', data.jalons || [])}
      ${renderTimelineArrayEditor('Rencontres et approbations', 'rencontres_approbations', data.rencontres_approbations || [])}
      ${renderTimelineArrayEditor('Développements significatifs', 'developpements_significatifs', data.developpements_significatifs || [])}

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" id="btn-save-draft"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Enregistrer le brouillon
        </button>
        <button type="button" id="btn-cancel-edit"
          class="px-5 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  `;
}

function renderTimelineArrayEditor(title, fieldName, items) {
  const statuts = ['à venir', 'en cours', 'complété', 'reporté', 'annulé', 'planifié', 'tenu'];
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">${escapeHtml(title)}</h3>
      <input type="hidden" id="edit-${fieldName}" value="${escapeHtml(JSON.stringify(items))}">
      <div id="${fieldName}-list" class="space-y-3 mb-3">
        ${items.map((item, i) => `
          <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div class="flex items-start justify-between gap-2 mb-2">
              <span class="text-sm font-medium text-gray-700 flex-1 truncate">${escapeHtml(item.description)}</span>
              <button type="button" class="timeline-remove text-red-400 hover:text-red-600 shrink-0" data-field="${fieldName}" data-index="${i}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>Date initiale: ${formatDate(item.date_initiale)}</span>
              ${item.date_changement && item.date_changement.length > 0
                ? `<span>→ Révisé: ${formatDate(item.date_changement[item.date_changement.length - 1])}</span>`
                : ''}
              <span class="ml-auto px-2 py-0.5 bg-white border border-gray-200 rounded">${escapeHtml(item.statut)}</span>
            </div>
            <!-- Add date change -->
            <div class="mt-2 flex gap-2">
              <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${fieldName}" data-index="${i}">
              <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${fieldName}" data-index="${i}">+ Date révision</button>
            </div>
          </div>
        `).join('')}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter une entrée</summary>
        <div class="mt-3 grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
          <div class="col-span-2">
            <input type="text" placeholder="Description" class="timeline-add-desc w-full px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Date initiale</label>
            <input type="date" class="timeline-add-date-init w-full px-2 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Statut</label>
            <select class="timeline-add-statut w-full px-2 py-1.5 border border-gray-200 rounded text-sm bg-white" data-field="${fieldName}">
              ${statuts.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
          <button type="button" class="timeline-add-btn col-span-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors" data-field="${fieldName}">
            Ajouter
          </button>
        </div>
      </details>
    </div>
  `;
}

function formField(label, type, id, value, extraClass = '') {
  return `
    <div class="${extraClass}">
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <input type="${type}" id="${id}" name="${id}" value="${escapeHtml(value || '')}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
    </div>
  `;
}

function formTextarea(label, id, value, rows = 3) {
  return `
    <div>
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <textarea id="${id}" name="${id}" rows="${rows}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y">${escapeHtml(value || '')}</textarea>
    </div>
  `;
}

function formSelect(label, id, options, currentValue) {
  return `
    <div>
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <select id="${id}" name="${id}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
        ${options.map(o => `<option value="${escapeHtml(o)}" ${o === currentValue ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
      </select>
    </div>
  `;
}

function formMultiSelect(label, id, options, currentValues) {
  const selected = Array.isArray(currentValues)
    ? currentValues
    : (currentValues ? currentValues.split(',').map(s => s.trim()).filter(Boolean) : []);
  return `
    <div class="md:col-span-2">
      <label class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <div id="${id}" class="border border-gray-200 rounded-lg bg-white p-2 grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-48 overflow-y-auto">
        ${options.map(o => `
          <label class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
            <input type="checkbox" name="${id}" value="${escapeHtml(o)}"
              class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              ${selected.includes(o) ? 'checked' : ''}>
            ${escapeHtml(o)}
          </label>`).join('')}
      </div>
    </div>
  `;
}

/**
 * Collect edit form data into an object
 * @param {Object} baseData - original project data to merge with
 * @returns {Object}
 */
function collectFormData(baseData) {
  const g = (id) => document.getElementById(id);
  const val = (id) => g(id)?.value ?? null;

  const data = { ...baseData };

  // General fields
  if (g('edit-titre')) data.titre = val('edit-titre');
  if (g('edit-type_projet')) data.type_projet = val('edit-type_projet');
  if (g('edit-reglement')) data.reglement = val('edit-reglement');
  if (g('edit-statut')) data.statut = val('edit-statut');
  if (g('edit-priorite')) data.priorite = val('edit-priorite');
  if (g('edit-niveau_risque')) data.niveau_risque = val('edit-niveau_risque');
  const juridictionChecked = document.querySelectorAll('#edit-juridiction_principale input[type="checkbox"]:checked');
  if (juridictionChecked.length > 0 || g('edit-juridiction_principale')) {
    data.juridiction_principale = Array.from(juridictionChecked).map(cb => cb.value);
  }
  if (g('edit-direction_principale')) data.direction_principale = val('edit-direction_principale');
  const dirRespChecked = document.querySelectorAll('#edit-direction_responsable input[type="checkbox"]:checked');
  if (dirRespChecked.length > 0 || g('edit-direction_responsable')) {
    data.direction_responsable = Array.from(dirRespChecked).map(cb => cb.value);
  }
  if (g('edit-description')) data.description = val('edit-description');
  if (g('edit-enjeux')) data.enjeux = val('edit-enjeux');
  if (g('edit-discussion')) data.discussion = val('edit-discussion');
  if (g('edit-impact_systeme')) data.impact_systeme = g('edit-impact_systeme').checked;
  if (g('edit-impact_description')) data.impact_description = val('edit-impact_description');
  const loiChecked = document.querySelectorAll('#edit-loi input[type="checkbox"]:checked');
  if (loiChecked.length > 0 || g('edit-loi')) {
    data.loi = Array.from(loiChecked).map(cb => cb.value);
  }

  // Array fields
  const arrayFields = ['Ressources_associees', 'soutien_juridique', 'Comite_ACVM', 'groupe_de_travail', 'jalons', 'rencontres_approbations', 'developpements_significatifs'];
  for (const field of arrayFields) {
    const el = g(`edit-${field}`);
    if (el) {
      try { data[field] = JSON.parse(el.value); } catch { /* keep original */ }
    }
  }

  return data;
}

/**
 * Attach event listeners for the project detail page
 * @param {Object} project
 * @param {Object|null} draft
 * @param {boolean} isContributor
 * @param {Object} state - app state reference
 * @param {Function} navigate
 * @param {Object} api
 * @param {Object} auth
 */
export function attachProjectListeners(project, draft, isContributor, state, navigate, api, auth) {
  const root = document.getElementById('project-root');
  if (!root) return;

  // Tab switching
  document.getElementById('tab-nav')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const tab = btn.dataset.tab;
    _activeTab = tab;

    // Update active styles
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('border-blue-500', b.dataset.tab === tab);
      b.classList.toggle('text-blue-600', b.dataset.tab === tab);
      b.classList.toggle('border-transparent', b.dataset.tab !== tab);
      b.classList.toggle('text-gray-500', b.dataset.tab !== tab);
    });

    const displayData = (_viewingDraft && draft) ? draft.data : project;
    const content = document.getElementById('tab-content');
    if (content) {
      content.innerHTML = renderTabContent(displayData, draft, isContributor, tab);
      if (tab === 'historique') {
        loadHistoryTab(project.code, state, api);
      }
    }
  });

  // Toggle draft view
  document.getElementById('toggle-draft-view')?.addEventListener('click', () => {
    _viewingDraft = !_viewingDraft;
    navigate(`#project-${project.code}`);
  });

  // Enter edit mode
  document.getElementById('btn-edit-mode')?.addEventListener('click', () => {
    _editMode = true;
    navigate(`#project-${project.code}`);
  });

  // Event delegation for forms
  document.addEventListener('click', handleProjectClick, { once: false });
  document.addEventListener('submit', handleProjectSubmit, { once: false });

  // Expose handlers so app.js can remove them on navigate away
  root._cleanup = () => {
    document.removeEventListener('click', handleProjectClick);
    document.removeEventListener('submit', handleProjectSubmit);
    _editMode = false;
    _viewingDraft = false;
    _activeTab = 'general';
  };

  function handleProjectClick(e) {
    if (!document.getElementById('project-root')) {
      document.removeEventListener('click', handleProjectClick);
      return;
    }

    // Preview / PDF
    if (e.target.closest('#btn-preview')) {
      const displayData = (_viewingDraft && draft) ? draft.data : project;
      openProjectPreview(displayData, project);
      return;
    }

    // Cancel edit
    if (e.target.closest('#btn-cancel-edit')) {
      _editMode = false;
      navigate(`#project-${project.code}`);
      return;
    }

    // Publish button
    if (e.target.closest('#btn-publish')) {
      confirmPublish(project, draft, state, navigate, api, auth);
      return;
    }

    // Person remove
    const personRemove = e.target.closest('.person-remove');
    if (personRemove) {
      removeArrayItem(personRemove.dataset.field, parseInt(personRemove.dataset.index));
      return;
    }

    // Person add
    const personAdd = e.target.closest('.person-add-btn');
    if (personAdd) {
      addPersonItem(personAdd.dataset.field, personAdd.dataset.hasRole === 'true');
      return;
    }

    // Committee member add
    const committeeAdd = e.target.closest('.committee-add-btn');
    if (committeeAdd) {
      addCommitteeMember(committeeAdd.dataset.field);
      return;
    }

    // Timeline remove
    const timelineRemove = e.target.closest('.timeline-remove');
    if (timelineRemove) {
      removeArrayItem(timelineRemove.dataset.field, parseInt(timelineRemove.dataset.index));
      return;
    }

    // Timeline add date revision
    const timelineAddDate = e.target.closest('.timeline-add-date');
    if (timelineAddDate) {
      addTimelineDate(timelineAddDate.dataset.field, parseInt(timelineAddDate.dataset.index));
      return;
    }

    // Timeline add new entry
    const timelineAddBtn = e.target.closest('.timeline-add-btn');
    if (timelineAddBtn) {
      addTimelineEntry(timelineAddBtn.dataset.field);
      return;
    }
  }

  function handleProjectSubmit(e) {
    if (!document.getElementById('project-root')) {
      document.removeEventListener('submit', handleProjectSubmit);
      return;
    }

    const form = e.target.closest('#edit-form, #edit-equipe-form, #edit-chrono-form');
    if (!form) return;

    e.preventDefault();
    saveDraftHandler(project, draft, state, navigate, api, auth);
  }

  async function saveDraftHandler(project, currentDraft, state, navigate, api, auth) {
    const displayData = (_viewingDraft && currentDraft) ? currentDraft.data : project;
    const newData = collectFormData(displayData);
    const currentUser = auth.getCurrentUser();
    const btn = document.getElementById('btn-save-draft');
    if (btn) { btn.disabled = true; btn.textContent = 'Enregistrement...'; }

    try {
      if (state.CONFIG && !state.CONFIG.DEV_MODE) {
        const draftId = currentDraft?.id || null;
        const result = await api.saveDraft(
          project.code, newData, draftId,
          currentUser.email, project.version || 1
        );
        const changes = diffObjects(project, newData);
        await api.addHistoryEntry(project.code, 'draft', newData, currentUser.email, changes, project.version || 1);
        state.drafts[project.code] = {
          id: result.id,
          ProjetCode: project.code,
          data: newData,
          modifie_par: currentUser.email,
          modifie_le: new Date().toISOString(),
          version_base: project.version || 1,
        };
      } else {
        // DEV_MODE
        state.drafts[project.code] = {
          id: 9000 + project.code,
          ProjetCode: project.code,
          data: newData,
          modifie_par: currentUser.email,
          modifie_le: new Date().toISOString(),
          version_base: project.version || 1,
        };
      }

      showToast('Brouillon enregistré avec succès.', 'success');
      _editMode = false;
      navigate(`#project-${project.code}`);
    } catch (err) {
      console.error('saveDraft error:', err);
      showToast('Erreur lors de l\'enregistrement du brouillon.', 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Enregistrer le brouillon'; }
    }
  }

  function confirmPublish(project, draft, state, navigate, api, auth) {
    const newVersion = (project.version || 1) + 1;
    openModal(`
      <div class="text-center py-4">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Publier la version ${newVersion} ?</h3>
        <p class="text-sm text-gray-500 mb-6">
          Le brouillon en cours sera publié comme version officielle v${newVersion} du projet
          <strong>SPR-${String(project.code).padStart(3,'0')}</strong>.
          Cette action est visible par tous les utilisateurs.
        </p>
        <div class="flex justify-center gap-3">
          <button id="modal-cancel-publish" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button id="modal-confirm-publish" class="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
            Confirmer la publication
          </button>
        </div>
      </div>
    `, { title: 'Confirmation de publication', size: 'sm' });

    document.getElementById('modal-cancel-publish')?.addEventListener('click', closeModal);
    document.getElementById('modal-confirm-publish')?.addEventListener('click', async () => {
      closeModal();
      await doPublish(project, draft, state, navigate, api, auth);
    });
  }

  async function doPublish(project, draft, state, navigate, api, auth) {
    const currentUser = auth.getCurrentUser();
    const newVersion = (project.version || 1) + 1;
    const publishData = { ...draft.data, version: newVersion };

    try {
      if (state.CONFIG && !state.CONFIG.DEV_MODE) {
        await api.publishProject(project.code, publishData, project._id, project.version || 1, currentUser.email);
        await api.deleteDraft(draft.id);
        await api.addHistoryEntry(project.code, 'published', publishData, currentUser.email,
          diffObjects(project, publishData), newVersion);
      }

      // Update state
      const idx = state.projects.findIndex(p => p.code === project.code);
      if (idx !== -1) {
        state.projects[idx] = {
          ...publishData,
          _id: project._id,
          version: newVersion,
          derniere_modification: new Date().toISOString(),
          modifie_par: currentUser.email,
        };
      }
      delete state.drafts[project.code];

      showToast(`Version ${newVersion} publiée avec succès.`, 'success');
      _editMode = false;
      navigate(`#project-${project.code}`);
    } catch (err) {
      console.error('publish error:', err);
      showToast('Erreur lors de la publication.', 'error');
    }
  }
}

async function loadHistoryTab(code, state, api) {
  const container = document.getElementById('history-tab-content');
  if (!container) return;

  try {
    let entries;
    if (state.histories[code]) {
      entries = state.histories[code];
    } else {
      if (state.CONFIG && !state.CONFIG.DEV_MODE) {
        entries = await api.getProjectHistory(code);
      } else {
        const { generateMockHistory } = await import('../mock-data.js');
        const proj = state.projects.find(p => p.code === code);
        entries = proj ? generateMockHistory(proj) : [];
      }
      state.histories[code] = entries;
    }

    container.innerHTML = renderHistory(code, entries);
    attachHistoryListeners(code, entries, state);
  } catch (err) {
    console.error('loadHistoryTab error:', err);
    container.innerHTML = '<p class="text-sm text-red-500 py-4">Erreur lors du chargement de l\'historique.</p>';
  }
}

function attachHistoryListeners(code, entries, state) {
  const container = document.getElementById('history-tab-content');
  if (!container) return;

  container.addEventListener('click', (e) => {
    // Expand/collapse snapshot
    const toggleBtn = e.target.closest('.history-toggle-snapshot');
    if (toggleBtn) {
      const snap = document.getElementById(`snapshot-${toggleBtn.dataset.id}`);
      if (snap) snap.classList.toggle('hidden');
      toggleBtn.textContent = snap?.classList.contains('hidden') ? 'Voir les détails' : 'Masquer';
    }

    // Restore version
    const restoreBtn = e.target.closest('.history-restore-btn');
    if (restoreBtn) {
      const id = parseInt(restoreBtn.dataset.id);
      const entry = entries.find(e => e.id === id);
      if (entry) confirmRestore(entry, code, state);
    }

    // Filter
    const filterBtn = e.target.closest('.history-filter-btn');
    if (filterBtn) {
      const filter = filterBtn.dataset.filter;
      document.querySelectorAll('.history-filter-btn').forEach(b => {
        b.classList.toggle('bg-blue-600', b.dataset.filter === filter);
        b.classList.toggle('text-white', b.dataset.filter === filter);
        b.classList.toggle('bg-white', b.dataset.filter !== filter);
        b.classList.toggle('text-gray-600', b.dataset.filter !== filter);
      });
      document.querySelectorAll('.history-entry').forEach(el => {
        const action = el.dataset.action;
        el.classList.toggle('hidden',
          filter !== 'all' && action !== filter
        );
      });
    }
  });
}

function confirmRestore(entry, code, state) {
  openModal(`
    <div class="text-center py-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Restaurer la version ${entry.version} ?</h3>
      <p class="text-sm text-gray-500 mb-6">
        Cette version (${entry.action === 'published' ? 'publiée' : 'brouillon'}) sera restaurée comme brouillon.
        Vous pourrez la réviser avant de publier.
      </p>
      <div class="flex justify-center gap-3">
        <button id="modal-cancel-restore" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Annuler</button>
        <button id="modal-confirm-restore" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Restaurer</button>
      </div>
    </div>
  `, { title: 'Restaurer une version', size: 'sm' });

  document.getElementById('modal-cancel-restore')?.addEventListener('click', closeModal);
  document.getElementById('modal-confirm-restore')?.addEventListener('click', () => {
    closeModal();
    state.drafts[code] = {
      id: null,
      ProjetCode: code,
      data: entry.snapshot,
      modifie_par: 'restauration',
      modifie_le: new Date().toISOString(),
      version_base: entry.version,
    };
    showToast(`Version ${entry.version} restaurée comme brouillon.`, 'success');
    navigate(`#project-${code}`);
  });
}

// ---- Helper functions for edit forms ----

function removeArrayItem(field, index) {
  const hidden = document.getElementById(`edit-${field}`);
  if (!hidden) return;
  let arr = [];
  try { arr = JSON.parse(hidden.value); } catch { arr = []; }
  arr.splice(index, 1);
  hidden.value = JSON.stringify(arr);

  // Re-render list visually
  const listEl = document.getElementById(`${field}-list`);
  if (!listEl) return;

  if (['jalons', 'rencontres_approbations', 'developpements_significatifs'].includes(field)) {
    listEl.innerHTML = arr.map((item, i) => `
      <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div class="flex items-start justify-between gap-2 mb-1">
          <span class="text-sm font-medium text-gray-700 flex-1 truncate">${escapeHtml(item.description)}</span>
          <button type="button" class="timeline-remove text-red-400 hover:text-red-600" data-field="${field}" data-index="${i}">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <span class="text-xs text-gray-400">${formatDate(item.date_initiale)} · ${escapeHtml(item.statut)}</span>
        <div class="mt-2 flex gap-2">
          <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${field}" data-index="${i}">
          <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${field}" data-index="${i}">+ Date révision</button>
        </div>
      </div>
    `).join('');
  } else {
    // Person list
    listEl.innerHTML = arr.map((p, i) => {
      const name = `${escapeHtml(p.prenom || '')} ${escapeHtml(p.nom || '')}`;
      const info = p.institution ? ` — ${escapeHtml(p.institution)}` : p.email ? ` — ${escapeHtml(p.email)}` : '';
      return `
        <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
          <span class="flex-1 truncate">${name}${info}</span>
          <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `;
    }).join('');
  }
}

function addPersonItem(field, hasRole) {
  const hidden = document.getElementById(`edit-${field}`);
  const container = document.getElementById(`${field}-add-form`);
  if (!hidden || !container) return;

  const prenom = container.querySelector('.person-add-prenom')?.value?.trim() || '';
  const nom = container.querySelector('.person-add-nom')?.value?.trim() || '';
  const email = container.querySelector('.person-add-email')?.value?.trim() || '';
  const role = hasRole ? (container.querySelector('.person-add-role')?.value?.trim() || '') : '';

  if (!prenom && !nom && !email) return;

  let arr = [];
  try { arr = JSON.parse(hidden.value); } catch { arr = []; }
  arr.push({ prenom, nom, email, role, photo: '' });
  hidden.value = JSON.stringify(arr);

  // Reset add form
  container.querySelectorAll('input').forEach(i => i.value = '');

  // Re-render list
  const listEl = document.getElementById(`${field}-list`);
  if (listEl) {
    listEl.innerHTML = arr.map((p, i) => `
      <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
        <span class="flex-1 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)} — ${escapeHtml(p.email)}${hasRole && p.role ? ` (${escapeHtml(p.role)})` : ''}</span>
        <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }
}

function addCommitteeMember(field) {
  const hidden = document.getElementById(`edit-${field}`);
  const container = document.querySelector(`#${field}-add-form`) || document.querySelector(`[data-field="${field}"].committee-add-institution`)?.closest('div.grid');
  if (!hidden) return;

  // Find inputs in the details block for this field
  const allInputs = document.querySelectorAll(`[data-field="${field}"]`);
  const prenom = [...allInputs].find(el => el.classList.contains('committee-add-prenom'))?.value?.trim() || '';
  const nom = [...allInputs].find(el => el.classList.contains('committee-add-nom'))?.value?.trim() || '';
  const email = [...allInputs].find(el => el.classList.contains('committee-add-email'))?.value?.trim() || '';
  const institution = [...allInputs].find(el => el.classList.contains('committee-add-institution'))?.value?.trim() || '';

  if (!prenom && !nom && !email) return;

  let arr = [];
  try { arr = JSON.parse(hidden.value); } catch { arr = []; }
  arr.push({ prenom, nom, email, institution });
  hidden.value = JSON.stringify(arr);

  // Reset inputs
  [...allInputs].forEach(el => {
    if (el.tagName === 'INPUT') el.value = '';
  });

  const listEl = document.getElementById(`${field}-list`);
  if (listEl) {
    listEl.innerHTML = arr.map((m, i) => `
      <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
        <span class="flex-1 truncate">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)} — ${escapeHtml(m.institution)}</span>
        <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }
}

function addTimelineDate(field, index) {
  const hidden = document.getElementById(`edit-${field}`);
  if (!hidden) return;

  const dateInputs = document.querySelectorAll(`.timeline-new-date[data-field="${field}"][data-index="${index}"]`);
  const dateInput = dateInputs[0];
  const dateVal = dateInput?.value;
  if (!dateVal) { showToast('Veuillez sélectionner une date.', 'warning'); return; }

  let arr = [];
  try { arr = JSON.parse(hidden.value); } catch { arr = []; }
  if (!arr[index]) return;
  if (!arr[index].date_changement) arr[index].date_changement = [];
  arr[index].date_changement.push(dateVal);
  hidden.value = JSON.stringify(arr);
  if (dateInput) dateInput.value = '';
  showToast('Date de révision ajoutée.', 'success');
}

function addTimelineEntry(field) {
  const hidden = document.getElementById(`edit-${field}`);
  if (!hidden) return;

  const descInputs = document.querySelectorAll(`.timeline-add-desc[data-field="${field}"]`);
  const dateInputs = document.querySelectorAll(`.timeline-add-date-init[data-field="${field}"]`);
  const statutInputs = document.querySelectorAll(`.timeline-add-statut[data-field="${field}"]`);

  const desc = descInputs[0]?.value?.trim() || '';
  const dateInit = dateInputs[0]?.value || '';
  const statut = statutInputs[0]?.value || 'à venir';

  if (!desc || !dateInit) { showToast('Veuillez remplir la description et la date.', 'warning'); return; }

  let arr = [];
  try { arr = JSON.parse(hidden.value); } catch { arr = []; }
  arr.push({ date_initiale: dateInit, date_changement: [], description: desc, statut });
  hidden.value = JSON.stringify(arr);

  // Reset
  if (descInputs[0]) descInputs[0].value = '';
  if (dateInputs[0]) dateInputs[0].value = '';

  const listEl = document.getElementById(`${field}-list`);
  if (listEl) {
    listEl.innerHTML = arr.map((item, i) => `
      <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div class="flex items-start justify-between gap-2 mb-1">
          <span class="text-sm font-medium text-gray-700 flex-1 truncate">${escapeHtml(item.description)}</span>
          <button type="button" class="timeline-remove text-red-400 hover:text-red-600" data-field="${field}" data-index="${i}">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <span class="text-xs text-gray-400">${formatDate(item.date_initiale)} · ${escapeHtml(item.statut)}</span>
        <div class="mt-2 flex gap-2">
          <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${field}" data-index="${i}">
          <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${field}" data-index="${i}">+ Date révision</button>
        </div>
      </div>
    `).join('');
  }
  showToast('Entrée ajoutée.', 'success');
}

// ─── Project Preview / PDF ─────────────────────────────────────────────────────

function openProjectPreview(data, project) {
  document.getElementById('spr-print-preview')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'spr-print-preview';
  overlay.className = 'fixed inset-0 z-[300] bg-white overflow-y-auto';
  overlay.innerHTML = `
    <div id="preview-action-bar" class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm flex items-center gap-3 px-6 py-3">
      <button id="btn-close-preview"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Retour
      </button>
      <span class="text-sm font-medium text-gray-700 flex-1">
        Aperçu — SPR-${String(project.code).padStart(3,'0')} · ${escapeHtml(data.titre)}
      </span>
      <button id="btn-browser-print"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
        </svg>
        Imprimer
      </button>
      <button id="btn-export-docx"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Exporter DOCX
      </button>
      <button id="btn-export-xlsx"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
        </svg>
        Exporter XLSX
      </button>
      <button id="btn-export-pdf"
        class="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Exporter PDF
      </button>
    </div>
    <div id="preview-content" class="max-w-4xl mx-auto px-8 py-10">
      ${renderProjectPreview(data, project)}
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#btn-close-preview').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#btn-browser-print').addEventListener('click', () => window.print());
  overlay.querySelector('#btn-export-docx').addEventListener('click', () => generateProjectDocx(data, project));
  overlay.querySelector('#btn-export-xlsx').addEventListener('click', () => generateProjectXlsx(data, project));
  overlay.querySelector('#btn-export-pdf').addEventListener('click', () => generateProjectPdf(data, project));
}

function renderProjectPreview(data, project) {
  const code = String(project.code).padStart(3, '0');
  const now = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });

  const pSection = (title, content) => `
    <div class="mb-8">
      <h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1.5 mb-4">${escapeHtml(title)}</h2>
      ${content}
    </div>`;

  const pField = (label, value) => {
    if (!value && value !== false) return '';
    const val = Array.isArray(value) ? value.join(', ') : String(value);
    if (!val) return '';
    return `<div>
      <p class="text-xs text-gray-400 mb-0.5">${escapeHtml(label)}</p>
      <p class="text-sm font-medium text-gray-800">${escapeHtml(val)}</p>
    </div>`;
  };

  const pText = (label, value) => {
    if (!value) return '';
    return `<div class="mb-4">
      <p class="text-xs font-semibold text-gray-500 mb-1">${escapeHtml(label)}</p>
      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">${escapeHtml(value)}</p>
    </div>`;
  };

  // ── Header ────────────────────────────────────────────────────────────────
  const header = `
    <div class="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-900">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span class="text-white text-xs font-black">SPR</span>
          </div>
          <span class="text-lg font-mono font-bold text-blue-700">SPR-${code}</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(data.statut)}">${escapeHtml(data.statut)}</span>
          <span class="px-2 py-0.5 rounded text-xs font-semibold ${getPriorityBadgeClass(data.priorite)}">Priorité : ${escapeHtml(data.priorite)}</span>
          <span class="px-2 py-0.5 rounded text-xs font-semibold ${getRiskBadgeClass(data.niveau_risque)}">Risque : ${escapeHtml(data.niveau_risque)}</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 leading-tight mb-1">${escapeHtml(data.titre)}</h1>
        <p class="text-sm text-gray-500">${escapeHtml(data.type_projet || '')}${data.reglement ? ' · ' + escapeHtml(data.reglement) : ''} · Version ${data.version || 1}</p>
      </div>
      <div class="text-right shrink-0 ml-6">
        <p class="text-xs text-gray-400">Généré le</p>
        <p class="text-sm font-medium text-gray-600">${now}</p>
      </div>
    </div>`;

  // ── Section 1: Informations générales ─────────────────────────────────────
  const lois = Array.isArray(data.loi) ? data.loi : (data.loi ? [data.loi] : []);
  const juridictions = Array.isArray(data.juridiction_principale)
    ? data.juridiction_principale
    : (data.juridiction_principale ? [data.juridiction_principale] : []);
  const dirsResp = Array.isArray(data.direction_responsable) ? data.direction_responsable : [];

  const infoGrid = `
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-4">
      ${pField('Règlement', data.reglement)}
      ${pField('Type de projet', data.type_projet)}
      ${pField('Statut', data.statut)}
      ${pField('Priorité', data.priorite)}
      ${pField('Niveau de risque', data.niveau_risque)}
      ${lois.length ? pField('Lois applicables', lois.join(', ')) : ''}
      ${juridictions.length ? pField('Juridiction principale', juridictions.join(', ')) : ''}
      ${pField('Direction principale', data.direction_principale)}
    </div>
    ${dirsResp.length ? `
      <div>
        <p class="text-xs text-gray-400 mb-1">Directions responsables</p>
        <div class="flex flex-wrap gap-1.5">
          ${dirsResp.map(d => `<span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">${escapeHtml(d)}</span>`).join('')}
        </div>
      </div>` : ''}`;

  // ── Section 2: Contenu ─────────────────────────────────────────────────────
  const contenu = `
    ${pText('Description', data.description)}
    ${pText('Enjeux', data.enjeux)}
    ${pText('Discussion', data.discussion)}`;

  // ── Section 3: Impact système ──────────────────────────────────────────────
  const impact = `
    <div class="flex items-center gap-2 mb-2">
      ${data.impact_systeme
        ? `<span class="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Impact identifié</span>`
        : `<span class="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">Aucun impact</span>`}
    </div>
    ${data.impact_systeme && data.impact_description
      ? `<p class="text-sm text-gray-700">${escapeHtml(data.impact_description)}</p>`
      : ''}`;

  // ── Section 4: Équipe ──────────────────────────────────────────────────────
  const renderPreviewPersons = (title, people, showRole) => {
    if (!people || !people.length) return '';
    return `
      <div class="mb-5">
        <p class="text-xs font-semibold text-gray-500 mb-2">${escapeHtml(title)}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${people.map(p => `
            <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                ${escapeHtml(getInitials(p.prenom, p.nom))}
              </div>
              <div class="min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)}</p>
                ${showRole && p.role ? `<p class="text-xs text-blue-600 truncate">${escapeHtml(p.role)}</p>` : ''}
                <p class="text-xs text-gray-400 truncate">${escapeHtml(p.email)}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  };

  const renderPreviewCommittee = (title, members) => {
    if (!members || !members.length) return '';
    return `
      <div class="mb-5">
        <p class="text-xs font-semibold text-gray-500 mb-2">${escapeHtml(title)}</p>
        <table class="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
          <thead><tr class="bg-gray-50 text-gray-500">
            <th class="px-3 py-1.5 text-left">Nom</th>
            <th class="px-3 py-1.5 text-left">Courriel</th>
            <th class="px-3 py-1.5 text-left">Institution</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            ${members.map(m => `
              <tr>
                <td class="px-3 py-1.5 font-medium">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)}</td>
                <td class="px-3 py-1.5 text-gray-500">${escapeHtml(m.email)}</td>
                <td class="px-3 py-1.5 text-gray-500">${escapeHtml(m.institution)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  };

  const equipe = `
    ${renderPreviewPersons('Ressources associées', data.Ressources_associees, true)}
    ${renderPreviewPersons('Soutien juridique', data.soutien_juridique, true)}
    ${renderPreviewCommittee('Comité ACVM', data.Comite_ACVM)}
    ${renderPreviewCommittee('Groupe de travail', data.groupe_de_travail)}`;

  // ── Section 5: Chronologie ─────────────────────────────────────────────────
  const renderPreviewTimeline = (title, items) => {
    if (!items || !items.length) return '';
    return `
      <div class="mb-5">
        <p class="text-xs font-semibold text-gray-500 mb-2">${escapeHtml(title)} <span class="font-normal text-gray-400">(${items.length})</span></p>
        <table class="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
          <thead><tr class="bg-gray-50 text-gray-500">
            <th class="px-3 py-1.5 text-left">Description</th>
            <th class="px-3 py-1.5 text-left">Date initiale</th>
            <th class="px-3 py-1.5 text-left">Dernière date</th>
            <th class="px-3 py-1.5 text-left">Statut</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            ${items.map(item => {
              const lastDate = (item.date_changement && item.date_changement.length)
                ? item.date_changement[item.date_changement.length - 1]
                : item.date_initiale;
              return `<tr>
                <td class="px-3 py-1.5">${escapeHtml(item.description)}</td>
                <td class="px-3 py-1.5 text-gray-500 whitespace-nowrap">${formatDate(item.date_initiale)}</td>
                <td class="px-3 py-1.5 ${lastDate !== item.date_initiale ? 'text-amber-600' : 'text-gray-400'} whitespace-nowrap">${formatDate(lastDate)}</td>
                <td class="px-3 py-1.5 text-gray-600">${escapeHtml(item.statut)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  };

  const chronologie = `
    ${renderPreviewTimeline('Jalons', data.jalons)}
    ${renderPreviewTimeline('Rencontres et approbations', data.rencontres_approbations)}
    ${renderPreviewTimeline('Développements significatifs', data.developpements_significatifs)}`;

  // ── Section 6: Documents ───────────────────────────────────────────────────
  const docs = data.documents || [];
  const media = data.media || [];
  const docsHtml = docs.length ? `
    <div class="mb-4">
      <p class="text-xs font-semibold text-gray-500 mb-2">Documents <span class="font-normal text-gray-400">(${docs.length})</span></p>
      <table class="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
        <thead><tr class="bg-gray-50 text-gray-500">
          <th class="px-3 py-1.5 text-left">Titre</th>
          <th class="px-3 py-1.5 text-left">Type</th>
          <th class="px-3 py-1.5 text-left">Description</th>
          <th class="px-3 py-1.5 text-left">Date</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100">
          ${docs.map(d => `<tr>
            <td class="px-3 py-1.5 font-medium">${escapeHtml(d.titre)}</td>
            <td class="px-3 py-1.5 text-gray-500">${escapeHtml(d.type_document)}</td>
            <td class="px-3 py-1.5 text-gray-500">${escapeHtml(d.description || '—')}</td>
            <td class="px-3 py-1.5 text-gray-400 whitespace-nowrap">${formatDate(d.chargement_date)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>` : '';

  const mediaHtml = media.length ? `
    <div>
      <p class="text-xs font-semibold text-gray-500 mb-2">Médias <span class="font-normal text-gray-400">(${media.length})</span></p>
      <ul class="space-y-1">
        ${media.map(m => `<li class="text-xs text-gray-700">• <span class="font-medium">${escapeHtml(m.label)}</span> — ${formatDate(m.chargement_date)} — ${escapeHtml(m.auteur || '')}</li>`).join('')}
      </ul>
    </div>` : '';

  // ── Assemble ───────────────────────────────────────────────────────────────
  return `
    ${header}
    ${pSection('Informations générales', infoGrid)}
    ${contenu ? pSection('Contenu', contenu) : ''}
    ${pSection('Impact système', impact)}
    ${(data.Ressources_associees?.length || data.soutien_juridique?.length || data.Comite_ACVM?.length || data.groupe_de_travail?.length) ? pSection('Équipe', equipe) : ''}
    ${(data.jalons?.length || data.rencontres_approbations?.length || data.developpements_significatifs?.length) ? pSection('Chronologie', chronologie) : ''}
    ${(docs.length || media.length) ? pSection('Documents et médias', docsHtml + mediaHtml) : ''}
    <div class="mt-10 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
      Suivi des Projets Réglementaires (SPR) · SPR-${code} · Imprimé le ${now}
    </div>
  `;
}

// ─── PDF Export (PDFMake) ──────────────────────────────────────────────────────

function generateProjectPdf(data, project) {
  const pdfLib = window.pdfMake;
  if (!pdfLib) {
    showToast('Bibliothèque PDF non disponible. Vérifiez votre connexion.', 'error');
    return;
  }

  showToast('Génération du PDF en cours…', 'info', 2000);

  const code  = String(project.code).padStart(3, '0');
  const now   = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  const fname = `SPR-${code}_${(data.titre || 'projet').replace(/[^\w\-]/g, '_').substring(0, 50)}.pdf`;

  // ── Palette ────────────────────────────────────────────────────────────────
  const C = {
    blue:      '#1D4ED8', blueMid: '#2563EB', blueLight: '#DBEAFE',
    gray900:   '#111827', gray700: '#374151', gray500: '#6B7280',
    gray400:   '#9CA3AF', gray200: '#E5E7EB', gray100: '#F3F4F6', gray50: '#F9FAFB',
    green:     '#065F46', greenBg: '#D1FAE5',
    amber:     '#92400E', amberBg: '#FEF3C7',
    red:       '#991B1B', redBg:   '#FEE2E2',
  };

  const statusColor = { 'en cours': C.blue,  'terminé': C.green,  'en attente': C.amber, 'clos': C.gray500 };
  const riskColor   = { 'élevé':    C.red,   'moyen':   C.amber,  'faible':     C.green  };

  const safe = (v) =>
    v == null ? '—' : Array.isArray(v) ? (v.join(', ') || '—') : String(v) || '—';

  // ── Reusable layout builders ───────────────────────────────────────────────

  /** Blue section title bar */
  const secHdr = (label) => ({
    table: { widths: ['*'], body: [[
      { text: label, fontSize: 8, bold: true, color: 'white', margin: [8, 5, 8, 5] }
    ]]},
    layout: { hLineWidth: () => 0, vLineWidth: () => 0, fillColor: () => C.blue },
    margin: [0, 14, 0, 8],
  });

  /** Bold sub-section label */
  const subHdr = (label) => ({ text: label, fontSize: 8, bold: true, color: C.gray700, margin: [0, 4, 0, 4] });

  /** Single labeled field stack */
  const field = (label, value) => {
    const v = Array.isArray(value) ? value.join(', ') : value;
    if (!v && v !== false) return null;
    return { stack: [
      { text: label, fontSize: 7, color: C.gray400, margin: [0, 0, 0, 1] },
      { text: String(v) || '—', fontSize: 9, bold: true, color: C.gray900 },
    ], margin: [0, 0, 0, 8] };
  };

  /** Two-column grid of labeled fields */
  const fieldGrid = (pairs) => {
    const valid = pairs.filter(Boolean);
    if (!valid.length) return null;
    const rows = [];
    for (let i = 0; i < valid.length; i += 2)
      rows.push([valid[i] || {text:''}, valid[i+1] || {text:''}]);
    return { table: { widths: ['*','*'], body: rows }, layout: 'noBorders', margin: [0,0,0,4] };
  };

  /** Paragraph body text */
  const body = (text) => ({ text: text || '', fontSize: 9, color: C.gray700, lineHeight: 1.5, margin: [0,0,0,6] });

  /** Striped data table with header row */
  const dataTable = (headers, rows, widths) => {
    if (!rows.length) return null;
    const tableLayout = {
      hLineWidth: (i, node) => (i === 0 || i === 1 || i === node.table.body.length) ? 0.5 : 0.3,
      hLineColor: () => C.gray200,
      vLineWidth: (i, node) => (i === 0 || i === node.table.widths.length) ? 0.5 : 0,
      vLineColor: () => C.gray200,
      fillColor: (ri) => ri === 0 ? C.gray100 : (ri % 2 === 0 ? null : C.gray50),
      paddingLeft: () => 5, paddingRight: () => 5,
      paddingTop: () => 3,  paddingBottom: () => 3,
    };
    return {
      table: {
        widths: widths || headers.map(() => '*'),
        headerRows: 1,
        body: [
          headers.map(h => ({ text: h, fontSize: 7, bold: true, color: C.gray500 })),
          ...rows.map(row => row.map(cell => ({ text: cell || '—', fontSize: 8, color: C.gray700 }))),
        ],
      },
      layout: tableLayout,
      margin: [0,0,0,10],
    };
  };

  // ── Content array ──────────────────────────────────────────────────────────
  const content = [];

  // ── Cover header ───────────────────────────────────────────────────────────
  const lois        = Array.isArray(data.loi) ? data.loi : (data.loi ? [data.loi] : []);
  const jurisds     = Array.isArray(data.juridiction_principale) ? data.juridiction_principale : (data.juridiction_principale ? [data.juridiction_principale] : []);
  const dirsResp    = Array.isArray(data.direction_responsable)  ? data.direction_responsable  : [];

  content.push({
    columns: [
      {
        stack: [
          { columns: [
            {
              table: { widths: [28], body: [[
                { text: 'SPR', bold: true, fontSize: 10, color: 'white', alignment: 'center', margin: [0,6,0,6] }
              ]]},
              layout: { hLineWidth:()=>0, vLineWidth:()=>0, fillColor:()=>C.blue },
              width: 34, margin: [0,0,8,0],
            },
            { stack: [
              { text: `SPR-${code}`, fontSize: 13, bold: true, color: C.blue },
              { text: `${safe(data.type_projet)}  ·  ${safe(data.reglement)}  ·  Version ${data.version || 1}`,
                fontSize: 8, color: C.gray500, margin: [0,2,0,0] },
            ]},
          ], margin: [0,0,0,8] },
          { text: data.titre || '', fontSize: 20, bold: true, color: C.gray900, margin: [0,0,0,8] },
          { columns: [
            { text: (data.statut || '').toUpperCase(), fontSize: 8, bold: true,
              color: statusColor[data.statut] || C.gray700, width: 'auto', margin: [0,0,10,0] },
            { text: `Priorité : ${safe(data.priorite)}`, fontSize: 8, color: C.gray700,
              width: 'auto', margin: [0,0,10,0] },
            { text: `Risque : ${safe(data.niveau_risque)}`, fontSize: 8, bold: true,
              color: riskColor[data.niveau_risque] || C.gray700, width: 'auto' },
          ]},
        ],
        width: '*',
      },
      { stack: [
        { text: 'Généré le', fontSize: 7, color: C.gray400, alignment: 'right' },
        { text: now, fontSize: 8, bold: true, color: C.gray700, alignment: 'right' },
      ], width: 110, margin: [0,4,0,0] },
    ],
  });

  // Blue rule
  content.push({ canvas: [{ type: 'line', x1:0, y1:4, x2:515, y2:4, lineWidth:2, lineColor:C.blue }], margin:[0,4,0,0] });

  // ── Section 1: Informations générales ──────────────────────────────────────
  content.push(secHdr('INFORMATIONS GÉNÉRALES'));
  const grid = fieldGrid([
    field('Règlement',          data.reglement),
    field('Type de projet',     data.type_projet),
    field('Statut',             data.statut),
    field('Priorité',           data.priorite),
    field('Niveau de risque',   data.niveau_risque),
    lois.length    ? field('Lois applicables',          lois.join(', '))    : null,
    jurisds.length ? field('Juridiction(s) principale(s)', jurisds.join(', ')) : null,
    field('Direction principale', data.direction_principale),
  ]);
  if (grid) content.push(grid);
  if (dirsResp.length) {
    content.push({ text: 'Directions responsables', fontSize: 7, color: C.gray400, margin: [0,0,0,2] });
    content.push({ text: dirsResp.join('  ·  '), fontSize: 9, bold: true, color: C.gray900, margin: [0,0,0,6] });
  }

  // ── Section 2: Contenu ─────────────────────────────────────────────────────
  if (data.description || data.enjeux || data.discussion) {
    content.push(secHdr('CONTENU'));
    if (data.description) { content.push({ text:'Description', fontSize:7, color:C.gray400, margin:[0,0,0,2] }); content.push(body(data.description)); }
    if (data.enjeux)      { content.push({ text:'Enjeux',      fontSize:7, color:C.gray400, margin:[0,0,0,2] }); content.push(body(data.enjeux)); }
    if (data.discussion)  { content.push({ text:'Discussion',  fontSize:7, color:C.gray400, margin:[0,0,0,2] }); content.push(body(data.discussion)); }
  }

  // ── Section 3: Impact système ──────────────────────────────────────────────
  content.push(secHdr('IMPACT SYSTÈME'));
  if (data.impact_systeme) {
    content.push({ text: '⚠  Impact identifié', fontSize:9, bold:true, color:C.red, margin:[0,0,0,4] });
    if (data.impact_description) content.push(body(data.impact_description));
  } else {
    content.push({ text: '✓  Aucun impact identifié', fontSize:9, bold:true, color:C.green, margin:[0,0,0,4] });
  }

  // ── Section 4: Équipe ──────────────────────────────────────────────────────
  const res  = data.Ressources_associees || [];
  const jur  = data.soutien_juridique    || [];
  const acvm = data.Comite_ACVM          || [];
  const gt   = data.groupe_de_travail    || [];
  if (res.length || jur.length || acvm.length || gt.length) {
    content.push(secHdr('ÉQUIPE'));
    if (res.length) {
      content.push(subHdr('Ressources associées'));
      const t = dataTable(['Prénom','Nom','Rôle','Courriel'], res.map(p=>[p.prenom,p.nom,p.role||'—',p.email]), ['auto','auto','*','*']);
      if (t) content.push(t);
    }
    if (jur.length) {
      content.push(subHdr('Soutien juridique'));
      const t = dataTable(['Prénom','Nom','Rôle','Courriel'], jur.map(p=>[p.prenom,p.nom,p.role||'—',p.email]), ['auto','auto','*','*']);
      if (t) content.push(t);
    }
    if (acvm.length) {
      content.push(subHdr('Comité ACVM'));
      const t = dataTable(['Prénom','Nom','Courriel','Institution'], acvm.map(m=>[m.prenom,m.nom,m.email,m.institution]), ['auto','auto','*','*']);
      if (t) content.push(t);
    }
    if (gt.length) {
      content.push(subHdr('Groupe de travail'));
      const t = dataTable(['Prénom','Nom','Courriel','Institution'], gt.map(m=>[m.prenom,m.nom,m.email,m.institution]), ['auto','auto','*','*']);
      if (t) content.push(t);
    }
  }

  // ── Section 5: Chronologie ─────────────────────────────────────────────────
  const jalons    = data.jalons                      || [];
  const rencontres = data.rencontres_approbations    || [];
  const devs      = data.developpements_significatifs || [];
  if (jalons.length || rencontres.length || devs.length) {
    content.push(secHdr('CHRONOLOGIE'));
    [['Jalons', jalons], ['Rencontres et approbations', rencontres], ['Développements significatifs', devs]].forEach(([title, items]) => {
      if (!items.length) return;
      content.push(subHdr(title));
      const t = dataTable(
        ['Description','Date initiale','Dernière date','Statut'],
        items.map(item => {
          const last = (item.date_changement?.length) ? item.date_changement[item.date_changement.length-1] : item.date_initiale;
          return [item.description, formatDate(item.date_initiale), formatDate(last), item.statut];
        }),
        ['*','auto','auto','auto']
      );
      if (t) content.push(t);
    });
  }

  // ── Section 6: Documents et médias ────────────────────────────────────────
  const docs  = data.documents || [];
  const media = data.media     || [];
  if (docs.length || media.length) {
    content.push(secHdr('DOCUMENTS ET MÉDIAS'));
    if (docs.length) {
      content.push(subHdr('Documents'));
      const t = dataTable(
        ['Titre','Type','Description','Date chargement'],
        docs.map(d => [d.titre, d.type_document, d.description||'—', formatDate(d.chargement_date)]),
        ['*','auto','*','auto']
      );
      if (t) content.push(t);
    }
    if (media.length) {
      content.push(subHdr('Médias'));
      const t = dataTable(
        ['Titre','Auteur','Date'],
        media.map(m => [m.label, m.auteur||'—', formatDate(m.chargement_date)]),
        ['*','auto','auto']
      );
      if (t) content.push(t);
    }
  }

  // ── Document definition ────────────────────────────────────────────────────
  const docDef = {
    pageSize: 'A4',
    pageMargins: [40, 65, 40, 50],
    header: (pg) => pg === 1 ? {} : {
      columns: [
        { text: `SPR-${code}  ·  ${data.titre || ''}`, fontSize: 7, color: C.gray400, margin: [40,18,0,0], width: '*' },
        { text: now, fontSize: 7, color: C.gray400, alignment: 'right', margin: [0,18,40,0], width: 100 },
      ],
    },
    footer: (pg, total) => ({
      columns: [
        { text: 'Suivi des Projets Réglementaires (SPR) — Confidentiel', fontSize: 7, color: C.gray400, margin: [40,8,0,0], width: '*' },
        { text: `${pg} / ${total}`, fontSize: 7, color: C.gray400, alignment: 'right', margin: [0,8,40,0], width: 40 },
      ],
    }),
    content,
    defaultStyle: { font: 'Roboto', fontSize: 9, color: C.gray700 },
  };

  pdfLib.createPdf(docDef).download(fname);
}

// ─── Word Export (docx.js) ─────────────────────────────────────────────────────

async function generateProjectDocx(data, project) {
  const docxLib = window.docx;
  if (!docxLib) {
    showToast('Bibliothèque Word non disponible. Vérifiez votre connexion.', 'error');
    return;
  }

  showToast('Génération du fichier Word…', 'info', 2000);

  const {
    Document, Paragraph, TextRun, Table, TableRow, TableCell,
    BorderStyle, WidthType, AlignmentType, Header, Footer,
    PageNumber, Packer,
  } = docxLib;

  const code  = String(project.code).padStart(3, '0');
  const now   = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  const fname = `SPR-${code}_${(data.titre || 'projet').replace(/[^\w\-]/g, '_').substring(0, 50)}.docx`;
  const safe  = (v) => v == null ? '—' : Array.isArray(v) ? (v.join(', ') || '—') : String(v) || '—';

  const BLUE  = '1D4ED8';
  const GRAY  = '374151';
  const GLGHT = 'F3F4F6';
  const WHITE = 'FFFFFF';
  const GBDR  = 'E5E7EB';

  const noBorder = {
    top:    { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left:   { style: BorderStyle.NONE },
    right:  { style: BorderStyle.NONE },
  };
  const thinBorder = (color) => ({ style: BorderStyle.SINGLE, color, size: 4 });

  const secHeading = (text) => new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: BLUE, font: 'Calibri' })],
    spacing: { before: 320, after: 80 },
    border: { bottom: thinBorder(BLUE) },
  });

  const fieldRow = (label, value) => new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 18, color: GRAY, font: 'Calibri' })] })],
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { fill: GLGHT },
        margins: { top: 60, bottom: 60, left: 100, right: 80 },
        borders: { ...noBorder, bottom: thinBorder(GBDR) },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: safe(value), size: 18, color: GRAY, font: 'Calibri' })] })],
        width: { size: 70, type: WidthType.PERCENTAGE },
        margins: { top: 60, bottom: 60, left: 100, right: 80 },
        borders: { ...noBorder, bottom: thinBorder(GBDR) },
      }),
    ],
  });

  const infoTable = (rows) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top:      thinBorder(GBDR),
      bottom:   thinBorder(GBDR),
      left:     { style: BorderStyle.NONE },
      right:    { style: BorderStyle.NONE },
      insideH:  thinBorder(GBDR),
      insideV:  { style: BorderStyle.NONE },
    },
  });

  const dataTable = (headers, rows) => {
    const headerCells = headers.map(h => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })] })],
      shading: { fill: BLUE },
      margins: { top: 60, bottom: 60, left: 100, right: 80 },
    }));
    const dataRows = rows.map((row, i) => new TableRow({
      children: row.map(cell => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: safe(cell), size: 18, color: GRAY, font: 'Calibri' })] })],
        shading: { fill: i % 2 === 0 ? WHITE : GLGHT },
        margins: { top: 60, bottom: 60, left: 100, right: 80 },
      })),
    }));
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({ tableHeader: true, children: headerCells }), ...dataRows],
    });
  };

  const subLabel = (text) => new Paragraph({
    children: [new TextRun({ text, bold: true, size: 18, color: GRAY, font: 'Calibri' })],
    spacing: { before: 120, after: 60 },
  });

  const bodyP = (text) => new Paragraph({
    children: [new TextRun({ text: safe(text), size: 18, color: GRAY, font: 'Calibri' })],
    spacing: { after: 100 },
  });

  const spacer = () => new Paragraph({ text: '', spacing: { after: 160 } });

  // ── Build document body ──────────────────────────────────────────────────
  const children = [];

  // Cover block
  children.push(new Paragraph({
    children: [new TextRun({ text: `SPR-${code}`, bold: true, size: 40, color: BLUE, font: 'Calibri' })],
    spacing: { after: 60 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: safe(data.titre), bold: true, size: 28, color: '111827', font: 'Calibri' })],
    spacing: { after: 120 },
  }));
  children.push(new Paragraph({
    children: [
      new TextRun({ text: `Statut: ${safe(data.statut)}   `, size: 18, color: GRAY, font: 'Calibri' }),
      new TextRun({ text: `Priorité: ${safe(data.priorite)}   `, size: 18, color: GRAY, font: 'Calibri' }),
      new TextRun({ text: `Risque: ${safe(data.niveau_risque)}`, size: 18, color: GRAY, font: 'Calibri' }),
    ],
    spacing: { after: 60 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: `Exporté le ${now}`, size: 16, color: '9CA3AF', font: 'Calibri' })],
    spacing: { after: 400 },
  }));

  // Informations générales
  children.push(secHeading('Informations générales'));
  children.push(infoTable([
    fieldRow('Code',                  `SPR-${code}`),
    fieldRow('Titre',                 data.titre),
    fieldRow('Statut',                data.statut),
    fieldRow('Priorité',              data.priorite),
    fieldRow('Niveau de risque',      data.niveau_risque),
    fieldRow('Type',                  data.type),
    fieldRow('Règlement / Initiative',data.reglement_initiative),
    fieldRow('Direction principale',  data.direction_principale),
    fieldRow('Direction responsable', data.direction_responsable),
    fieldRow('Juridiction principale',data.juridiction_principale),
    fieldRow('Lois applicables',      data.loi),
    fieldRow('Version',               data.version),
    fieldRow('Phase actuelle',        data.phase_actuelle),
    fieldRow('Date de début',         data.date_debut),
    fieldRow('Date de fin prévue',    data.date_fin_prevue),
    fieldRow('Date de fin réelle',    data.date_fin_reelle),
  ]));
  children.push(spacer());

  // Contenu
  children.push(secHeading('Contenu'));
  children.push(subLabel('Description'));
  children.push(bodyP(data.description));
  if (data.objectifs) {
    children.push(subLabel('Objectifs'));
    children.push(bodyP(data.objectifs));
  }
  if (data.portee) {
    children.push(subLabel('Portée'));
    children.push(bodyP(data.portee));
  }
  children.push(spacer());

  // Impact système
  const systemes = Array.isArray(data.systemes_touches) ? data.systemes_touches
    : (data.systemes_touches ? [data.systemes_touches] : []);
  if (systemes.length) {
    children.push(secHeading('Impact système'));
    children.push(dataTable(['Système touché'], systemes.map(s => [s])));
    children.push(spacer());
  }

  // Équipe
  const equipe = Array.isArray(data.equipe) ? data.equipe : [];
  if (equipe.length) {
    children.push(secHeading('Équipe'));
    children.push(dataTable(
      ['Nom', 'Prénom', 'Rôle', 'Courriel'],
      equipe.map(p => [p.nom, p.prenom, p.role, p.courriel]),
    ));
    children.push(spacer());
  }

  // Chronologie
  const etapes = Array.isArray(data.etapes) ? data.etapes : [];
  if (etapes.length) {
    children.push(secHeading('Chronologie'));
    children.push(dataTable(
      ['Étape', 'Statut', 'Date début', 'Date fin', 'Responsable'],
      etapes.map(e => [e.nom, e.statut, e.date_debut, e.date_fin, e.responsable]),
    ));
    children.push(spacer());
  }

  // Documents
  const documents = Array.isArray(data.documents) ? data.documents : [];
  if (documents.length) {
    children.push(secHeading('Documents et médias'));
    children.push(dataTable(
      ['Nom', 'Type', 'URL / Référence'],
      documents.map(d => [d.nom, d.type, d.url]),
    ));
    children.push(spacer());
  }

  // ── Assemble Document ────────────────────────────────────────────────────
  const doc = new Document({
    creator:     'SPR — Suivi des Projets Réglementaires',
    title:       `SPR-${code} — ${data.titre || ''}`,
    description: 'Fiche de projet réglementaire',
    sections: [{
      properties: { page: { margin: { top: 900, bottom: 900, left: 1080, right: 1080 } } },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [new TextRun({ text: `SPR-${code}  ·  ${data.titre || ''}`, size: 14, color: '9CA3AF', font: 'Calibri' })],
            border: { bottom: { color: GBDR, size: 4, space: 4, style: BorderStyle.SINGLE } },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: 'Suivi des Projets Réglementaires (SPR) — Confidentiel  ·  ', size: 14, color: '9CA3AF', font: 'Calibri' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 14, color: '9CA3AF', font: 'Calibri' }),
              new TextRun({ text: ' / ', size: 14, color: '9CA3AF', font: 'Calibri' }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: '9CA3AF', font: 'Calibri' }),
            ],
            alignment: AlignmentType.RIGHT,
          })],
        }),
      },
      children,
    }],
  });

  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fname;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('DOCX export error:', err);
    showToast('Erreur lors de la génération Word.', 'error');
  }
}

// ─── Excel Export (SheetJS) ───────────────────────────────────────────────────

function generateProjectXlsx(data, project) {
  const XLSX = window.XLSX;
  if (!XLSX) {
    showToast('Bibliothèque Excel non disponible. Vérifiez votre connexion.', 'error');
    return;
  }

  showToast('Génération du fichier Excel…', 'info', 2000);

  const code  = String(project.code).padStart(3, '0');
  const fname = `SPR-${code}_${(data.titre || 'projet').replace(/[^\w\-]/g, '_').substring(0, 50)}.xlsx`;
  const safe  = (v) => v == null ? '' : Array.isArray(v) ? v.join(', ') : String(v);

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Résumé ──────────────────────────────────────────────────────
  const resumeRows = [
    [`FICHE PROJET — SPR-${code}`],
    [],
    ['Code',                   `SPR-${code}`],
    ['Titre',                  safe(data.titre)],
    ['Statut',                 safe(data.statut)],
    ['Priorité',               safe(data.priorite)],
    ['Niveau de risque',       safe(data.niveau_risque)],
    ['Type',                   safe(data.type)],
    ['Règlement / Initiative', safe(data.reglement_initiative)],
    ['Direction principale',   safe(data.direction_principale)],
    ['Direction responsable',  safe(data.direction_responsable)],
    ['Juridiction principale', safe(data.juridiction_principale)],
    ['Lois applicables',       safe(data.loi)],
    ['Version',                safe(data.version)],
    ['Phase actuelle',         safe(data.phase_actuelle)],
    ['Date de début',          safe(data.date_debut)],
    ['Date de fin prévue',     safe(data.date_fin_prevue)],
    ['Date de fin réelle',     safe(data.date_fin_reelle)],
    [],
    ['Description',            safe(data.description)],
    ['Objectifs',              safe(data.objectifs)],
    ['Portée',                 safe(data.portee)],
    ['Systèmes touchés',       safe(data.systemes_touches)],
    ['Commentaires',           safe(data.commentaires)],
  ];
  const wsResume = XLSX.utils.aoa_to_sheet(resumeRows);
  wsResume['!cols'] = [{ wch: 28 }, { wch: 60 }];
  wsResume['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
  XLSX.utils.book_append_sheet(wb, wsResume, 'Résumé');

  // ── Sheet 2: Équipe ──────────────────────────────────────────────────────
  const equipe = Array.isArray(data.equipe) ? data.equipe : [];
  const equipeRows = [
    [`ÉQUIPE — SPR-${code}`],
    [],
    ['Nom', 'Prénom', 'Rôle', 'Courriel', 'Téléphone'],
    ...equipe.map(p => [safe(p.nom), safe(p.prenom), safe(p.role), safe(p.courriel), safe(p.telephone)]),
  ];
  const wsEquipe = XLSX.utils.aoa_to_sheet(equipeRows);
  wsEquipe['!cols'] = [{ wch: 18 }, { wch: 18 }, { wch: 24 }, { wch: 32 }, { wch: 16 }];
  wsEquipe['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
  XLSX.utils.book_append_sheet(wb, wsEquipe, 'Équipe');

  // ── Sheet 3: Chronologie ─────────────────────────────────────────────────
  const etapes = Array.isArray(data.etapes) ? data.etapes : [];
  const chronoRows = [
    [`CHRONOLOGIE — SPR-${code}`],
    [],
    ['Étape', 'Statut', 'Date début', 'Date fin', 'Responsable', 'Commentaire'],
    ...etapes.map(e => [safe(e.nom), safe(e.statut), safe(e.date_debut), safe(e.date_fin), safe(e.responsable), safe(e.commentaire)]),
  ];
  const wschrono = XLSX.utils.aoa_to_sheet(chronoRows);
  wschrono['!cols'] = [{ wch: 28 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 32 }];
  wschrono['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
  XLSX.utils.book_append_sheet(wb, wschrono, 'Chronologie');

  // ── Sheet 4: Documents ───────────────────────────────────────────────────
  const documents = Array.isArray(data.documents) ? data.documents : [];
  const docsRows = [
    [`DOCUMENTS — SPR-${code}`],
    [],
    ['Nom', 'Type', 'URL / Référence', 'Date'],
    ...documents.map(d => [safe(d.nom), safe(d.type), safe(d.url), safe(d.date)]),
  ];
  const wsDocs = XLSX.utils.aoa_to_sheet(docsRows);
  wsDocs['!cols'] = [{ wch: 32 }, { wch: 16 }, { wch: 48 }, { wch: 14 }];
  wsDocs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
  XLSX.utils.book_append_sheet(wb, wsDocs, 'Documents');

  try {
    XLSX.writeFile(wb, fname);
  } catch (err) {
    console.error('XLSX export error:', err);
    showToast('Erreur lors de la génération Excel.', 'error');
  }
}
