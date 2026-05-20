/**
 * History view — version lineage for a project
 */
import { formatDateTime, escapeHtml, getInitials } from '../utils.js';

/**
 * Render history for a project
 * @param {number} projectCode
 * @param {Array} historyEntries
 * @returns {string} HTML
 */
export function renderHistory(projectCode, historyEntries) {
  const sorted = [...historyEntries].sort((a, b) => b.version - a.version);
  const publishedCount = sorted.filter(e => e.action === 'published').length;
  const draftCount = sorted.filter(e => e.action === 'draft').length;

  return `
    <div id="history-root" class="animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 class="text-base font-semibold text-gray-800">
            Lignée — Projet <span class="text-blue-600">SPR-${String(projectCode).padStart(3,'0')}</span>
          </h2>
          <p class="text-xs text-gray-400 mt-0.5">
            ${sorted.length} version${sorted.length !== 1 ? 's' : ''} ·
            ${publishedCount} publiée${publishedCount !== 1 ? 's' : ''} ·
            ${draftCount} brouillon${draftCount !== 1 ? 's' : ''}
          </p>
        </div>

        <!-- Filter -->
        <div class="flex gap-1 shrink-0">
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-blue-600 text-white transition-colors" data-filter="all">
            Tout
          </button>
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors" data-filter="published">
            Publiées
          </button>
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors" data-filter="draft">
            Brouillons
          </button>
        </div>
      </div>

      ${sorted.length === 0
        ? `<div class="text-center py-12 text-gray-400">
            <svg class="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm">Aucun historique disponible.</p>
          </div>`
        : `<div class="relative">
            <div class="absolute left-5 top-0 bottom-0 w-px bg-gray-200"></div>
            <div class="space-y-4" id="history-timeline">
              ${sorted.map((entry, idx) => renderHistoryEntry(entry, idx, sorted)).join('')}
            </div>
          </div>`
      }
    </div>
  `;
}

function renderHistoryEntry(entry, idx, allEntries) {
  const isPublished = entry.action === 'published';
  const dotColor = isPublished ? 'bg-green-500' : 'bg-amber-400';
  const actionLabel = isPublished ? 'Publié' : 'Brouillon';
  const actionClass = isPublished
    ? 'bg-green-100 text-green-700 border border-green-200'
    : 'bg-amber-100 text-amber-700 border border-amber-200';

  const changedByInitials = (entry.changedBy || '?').split('@')[0].split('.').map(s => s[0]?.toUpperCase() || '?').join('').substring(0, 2);
  const changedByShort = (entry.changedBy || '—').split('@')[0].replace('.', ' ');

  const hasChanges = Array.isArray(entry.changes) && entry.changes.length > 0;
  const hasPrev = idx < allEntries.length - 1;
  const hasNext = idx > 0;

  return `
    <div class="history-entry pl-12 relative" data-action="${entry.action}" data-id="${entry.id}">
      <!-- Timeline dot -->
      <div class="absolute left-2.5 top-4 w-5 h-5 rounded-full ${dotColor} border-2 border-white shadow-sm flex items-center justify-center">
        ${isPublished
          ? `<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`
          : `<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/></svg>`
        }
      </div>

      <!-- Entry card -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-3 px-4 py-3 border-b border-gray-100">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Version badge -->
            <span class="px-2.5 py-1 bg-blue-100 text-blue-700 text-sm font-mono font-bold rounded-full">
              v${entry.version}
            </span>
            <!-- Action badge -->
            <span class="px-2 py-0.5 text-xs font-medium rounded-full ${actionClass}">
              ${actionLabel}
            </span>
            <!-- Date -->
            <span class="text-xs text-gray-400">${formatDateTime(entry.actionDate)}</span>
          </div>

          <!-- Author + actions -->
          <div class="flex items-center gap-2">
            <!-- Avatar -->
            <div class="flex items-center gap-1.5">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                ${changedByInitials}
              </div>
              <span class="text-xs text-gray-500 capitalize">${escapeHtml(changedByShort)}</span>
            </div>

            <!-- Expand button -->
            <button class="history-toggle-snapshot px-2 py-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded hover:bg-blue-50 transition-colors" data-id="${entry.id}">
              Voir les détails
            </button>

            <!-- Restore button -->
            <button class="history-restore-btn px-2 py-1 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors" data-id="${entry.id}" title="Restaurer cette version">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Changes summary (visible by default) -->
        ${hasChanges ? `
          <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p class="text-xs font-medium text-gray-500 mb-2">Champs modifiés :</p>
            <ul class="space-y-1.5">
              ${entry.changes.map(ch => renderChangeDiff(ch)).join('')}
            </ul>
          </div>
        ` : `
          <div class="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p class="text-xs text-gray-400">Aucun champ modifié enregistré.</p>
          </div>
        `}

        <!-- Snapshot (collapsed by default) -->
        <div id="snapshot-${entry.id}" class="hidden px-4 py-3 overflow-auto max-h-72">
          <p class="text-xs font-medium text-gray-500 mb-2">Instantané complet de la version :</p>
          ${renderSnapshotSummary(entry.snapshot)}
        </div>

        <!-- Navigation prev/next -->
        ${hasPrev || hasNext ? `
          <div class="flex justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
            ${hasNext
              ? `<a href="#" class="text-xs text-blue-600 hover:underline" onclick="event.preventDefault()">← Version précédente (v${allEntries[idx-1]?.version})</a>`
              : '<span></span>'
            }
            ${hasPrev
              ? `<a href="#" class="text-xs text-blue-600 hover:underline" onclick="event.preventDefault()">Version suivante (v${allEntries[idx+1]?.version}) →</a>`
              : '<span></span>'
            }
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderChangeDiff(change) {
  const fieldLabel = FIELD_LABELS[change.field] || change.field;
  const oldVal = formatChangeValue(change.oldValue);
  const newVal = formatChangeValue(change.newValue);

  return `
    <li class="text-xs">
      <span class="font-medium text-gray-700">${escapeHtml(fieldLabel)}</span>
      <span class="ml-1 text-gray-400">:</span>
      <span class="ml-1 line-through text-red-400 bg-red-50 px-1 rounded">${escapeHtml(oldVal)}</span>
      <span class="mx-1 text-gray-400">→</span>
      <span class="text-green-600 bg-green-50 px-1 rounded">${escapeHtml(newVal)}</span>
    </li>
  `;
}

function formatChangeValue(val) {
  if (val === null || val === undefined) return '(vide)';
  if (typeof val === 'boolean') return val ? 'Oui' : 'Non';
  if (Array.isArray(val)) return `[${val.length} éléments]`;
  if (typeof val === 'object') return '[objet]';
  const s = String(val);
  return s.length > 60 ? s.substring(0, 57) + '…' : s;
}

function renderSnapshotSummary(snapshot) {
  if (!snapshot) return '<p class="text-xs text-gray-400">Instantané non disponible.</p>';

  const fields = [
    { key: 'titre', label: 'Titre' },
    { key: 'statut', label: 'Statut' },
    { key: 'priorite', label: 'Priorité' },
    { key: 'niveau_risque', label: 'Risque' },
    { key: 'type_projet', label: 'Type de projet' },
    { key: 'reglement', label: 'Règlement' },
    { key: 'direction_principale', label: 'Direction principale' },
    { key: 'juridiction_principale', label: 'Juridiction principale' },
    { key: 'version', label: 'Version' },
  ];

  return `
    <dl class="grid grid-cols-2 gap-2">
      ${fields.map(f => snapshot[f.key] !== undefined ? `
        <div>
          <dt class="text-xs text-gray-400">${escapeHtml(f.label)}</dt>
          <dd class="text-xs font-medium text-gray-700 truncate">${escapeHtml(String(snapshot[f.key] ?? '—'))}</dd>
        </div>
      ` : '').join('')}
    </dl>
    ${snapshot.description ? `
      <div class="mt-3 pt-3 border-t border-gray-100">
        <dt class="text-xs text-gray-400 mb-1">Description</dt>
        <dd class="text-xs text-gray-600 leading-relaxed line-clamp-3">${escapeHtml(snapshot.description)}</dd>
      </div>
    ` : ''}
  `;
}

const FIELD_LABELS = {
  titre: 'Titre',
  statut: 'Statut',
  priorite: 'Priorité',
  niveau_risque: 'Niveau de risque',
  type_projet: 'Type de projet',
  reglement: 'Règlement',
  description: 'Description',
  enjeux: 'Enjeux',
  discussion: 'Discussion',
  direction_principale: 'Direction principale',
  juridiction_principale: 'Juridiction principale',
  impact_systeme: 'Impact système',
  impact_description: 'Description impact',
  loi: 'Lois applicables',
  direction_responsable: 'Directions responsables',
  Ressources_associees: 'Ressources associées',
  soutien_juridique: 'Soutien juridique',
  Comite_ACVM: 'Comité ACVM',
  groupe_de_travail: 'Groupe de travail',
  jalons: 'Jalons',
  rencontres_approbations: 'Rencontres/Approbations',
  developpements_significatifs: 'Développements significatifs',
  documents: 'Documents',
  media: 'Médias',
  version: 'Version',
};
