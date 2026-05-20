/**
 * Help / User Manual view — Manuel d'utilisation SPR
 */

const SECTIONS = [
  { id: 'overview',      label: 'Vue d\'ensemble' },
  { id: 'navigation',    label: 'Navigation' },
  { id: 'dashboard',     label: 'Tableau de bord' },
  { id: 'projects-list', label: 'Liste des projets' },
  { id: 'project-detail',label: 'Fiche projet' },
  { id: 'edit-mode',     label: 'Mode édition' },
  { id: 'drafts',        label: 'Brouillons' },
  { id: 'history',       label: 'Historique des versions' },
  { id: 'customization', label: 'Personnalisation' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function section(id, title, icon, body) {
  return `
    <section id="help-${id}" data-help-section="${id}" class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
          ${icon}
        </div>
        <h2 class="text-base font-bold text-gray-900">${title}</h2>
      </div>
      <div class="px-6 py-5 space-y-4 text-sm text-gray-700 leading-relaxed">
        ${body}
      </div>
    </section>
  `;
}

function tip(text) {
  return `
    <div class="flex items-start gap-2.5 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg">
      <svg class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-xs text-blue-700">${text}</p>
    </div>`;
}

function warn(text) {
  return `
    <div class="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-100 rounded-lg">
      <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      <p class="text-xs text-amber-700">${text}</p>
    </div>`;
}

function kv(label, desc) {
  return `<div class="flex gap-2"><span class="font-semibold text-gray-800 shrink-0 min-w-[9rem]">${label}</span><span class="text-gray-600">${desc}</span></div>`;
}

function badge(text, cls) {
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}">${text}</span>`;
}

function steps(items) {
  return `<ol class="space-y-2 pl-1">${items.map((s, i) => `
    <li class="flex gap-3">
      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">${i + 1}</span>
      <span>${s}</span>
    </li>`).join('')}</ol>`;
}

function bullets(items) {
  return `<ul class="space-y-1.5 pl-1">${items.map(s => `
    <li class="flex gap-2">
      <span class="text-blue-400 shrink-0 mt-1">▸</span>
      <span>${s}</span>
    </li>`).join('')}</ul>`;
}

function sub(title, body) {
  return `<div class="mt-2">
    <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">${title}</h3>
    ${body}
  </div>`;
}

// ─── Section bodies ───────────────────────────────────────────────────────────

function bodyOverview() {
  return `
    <p>
      <strong>SPR (Suivi des Projets Réglementaires)</strong> est une application de gestion et de suivi
      des projets réglementaires. Elle permet de consulter, analyser, modifier et publier les informations
      relatives aux projets en cours, en attente ou terminés.
    </p>

    ${sub('Fonctionnalités principales', bullets([
      'Tableau de bord avec indicateurs clés (KPIs) et graphiques analytiques',
      'Liste filtrée et triable de tous les projets réglementaires',
      'Fiches projets détaillées avec onglets (général, équipe, chronologie, documents, historique)',
      'Mode édition avec enregistrement de brouillons et publication versionnée',
      'Historique complet des modifications avec possibilité de restauration',
      'Fonctionnement hors connexion grâce au cache local (IndexedDB)',
    ]))}

    ${sub('Niveaux d\'accès', `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p class="font-semibold text-gray-800 mb-1">Tous les utilisateurs</p>
          ${bullets(['Consulter le tableau de bord', 'Parcourir et filtrer les projets', 'Lire les fiches projets et l\'historique'])}
        </div>
        <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p class="font-semibold text-blue-800 mb-1">Contributeurs</p>
          ${bullets(['Modifier les projets (brouillon)', 'Publier une nouvelle version', 'Restaurer une version antérieure'])}
          <p class="text-xs text-blue-600 mt-1.5">Un contributeur est une personne listée dans les <em>Ressources associées</em> ou le <em>Soutien juridique</em> d\'un projet.</p>
        </div>
      </div>
    `)}

    ${tip('En mode développement (<span class="font-mono text-xs bg-blue-100 px-1 rounded">DEV_MODE: true</span>), des données fictives sont utilisées et toutes les modifications sont locales — aucune écriture dans SharePoint.')}
  `;
}

function bodyNavigation() {
  return `
    ${sub('Barre latérale (Sidebar)', `
      <p class="mb-2">La sidebar est le point d\'entrée principal de la navigation. Elle est fixe sur bureau et s\'ouvre en glissant sur mobile (bouton ☰ en haut à gauche).</p>
      <div class="space-y-2">
        ${kv('Tableau de bord', 'Affiche les KPIs, graphiques et tables de synthèse.')}
        ${kv('Projets', 'Affiche la liste complète des projets réglementaires.')}
      </div>
    `)}

    ${sub('Filtres rapides', `
      <p class="mb-2">Quatre raccourcis de filtre sont disponibles directement dans la sidebar :</p>
      <div class="space-y-1.5">
        ${kv(badge('En cours', 'bg-blue-100 text-blue-700'), 'Projets avec statut <em>en cours</em>')}
        ${kv(badge('En attente', 'bg-amber-100 text-amber-700'), 'Projets avec statut <em>en attente</em>')}
        ${kv(badge('Priorité élevée', 'bg-red-100 text-red-700'), 'Projets avec priorité <em>élevé</em>')}
        ${kv(badge('Risque élevé', 'bg-orange-100 text-orange-700'), 'Projets avec niveau de risque <em>élevé</em>')}
      </div>
      <p class="mt-2 text-xs text-gray-500">Un clic amène directement sur la liste des projets avec le filtre pré-appliqué.</p>
    `)}

    ${sub('En-tête (Header)', `
      <div class="space-y-2">
        ${kv('Fil d\'Ariane', 'Indique la position dans l\'application. Les éléments cliquables permettent de remonter dans la hiérarchie.')}
        ${kv('Barre de recherche', 'Recherche textuelle globale : saisir du texte redirige vers la liste des projets avec le filtre de recherche actif. Visible à partir de md (≥ 768 px).')}
        ${kv('Brouillons ✏', 'Badge orange affichant le nombre de brouillons en cours. Visible uniquement s\'il y en a au moins un.')}
        ${kv('Actualiser ↺', 'Recharge les données depuis le serveur (hors DEV_MODE) ou affiche un message de confirmation en mode développement.')}
        ${kv('Mode sombre ☀/🌙', 'Bascule entre le thème clair et sombre. La préférence est mémorisée.')}
      </div>
    `)}

    ${tip('Sur mobile, fermer la sidebar en tapant sur le fond grisé ou sur le bouton ✕ en haut de la sidebar.')}
  `;
}

function bodyDashboard() {
  return `
    <p>Le tableau de bord offre une vue d\'ensemble analytique de tous les projets réglementaires.</p>

    ${sub('Indicateurs clés (KPIs — rangée principale)', `
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${kv(badge('Total', 'bg-blue-100 text-blue-700'), 'Nombre total de projets chargés.')}
        ${kv(badge('En cours', 'bg-blue-100 text-blue-700'), 'Projets avec statut <em>en cours</em>.')}
        ${kv(badge('Priorité élevée', 'bg-red-100 text-red-700'), 'Projets avec priorité <em>élevé</em>.')}
        ${kv(badge('Risque élevé', 'bg-orange-100 text-orange-700'), 'Projets avec niveau de risque <em>élevé</em>.')}
        ${kv(badge('Jalons à venir', 'bg-teal-100 text-teal-700'), 'Jalons non complétés dans les 30 prochains jours.')}
        ${kv(badge('Impact système', 'bg-purple-100 text-purple-700'), 'Projets nécessitant des modifications aux systèmes.')}
      </div>
    `)}

    ${sub('KPIs secondaires', `
      <div class="space-y-1">
        ${kv('Terminés', 'Projets avec statut <em>terminé</em>.')}
        ${kv('En attente', 'Projets avec statut <em>en attente</em>.')}
        ${kv('Clos', 'Projets avec statut <em>clos</em>.')}
        ${kv('Jalons en retard', 'Jalons dont la date est dépassée et le statut n\'est pas <em>complété</em> ou <em>annulé</em>.')}
      </div>
    `)}

    ${sub('Graphiques', `
      <div class="space-y-2">
        ${kv('Répartition par statut', 'Graphique donut — En cours, Terminé, En attente, Clos.')}
        ${kv('Répartition par priorité', 'Graphique donut — Élevé, Moyen, Faible.')}
        ${kv('Répartition par risque', 'Graphique donut — Élevé, Moyen, Faible.')}
        ${kv('Projets par direction', 'Graphique en barres horizontales — top 8 directions.')}
        ${kv('Jalons à venir', 'Graphique en barres — distribution des jalons sur les 6 prochains mois.')}
      </div>
    `)}

    ${sub('Tables analytiques', `
      <div class="space-y-2">
        ${kv('Jalons en retard', 'Projets classés par nombre de jalons en retard. Lien direct vers la fiche projet.')}
        ${kv('Modifiés récemment', 'Projets modifiés dans les 7 derniers jours, triés du plus récent au plus ancien.')}
        ${kv('Par type', 'Distribution des projets par type avec barres de progression.')}
        ${kv('Top 5 juridictions', 'Cinq juridictions principales avec leur nombre de projets.')}
        ${kv('Taux de complétion', 'Pourcentage de projets terminés par direction, trié par taux décroissant.')}
      </div>
    `)}

    ${tip('Le tableau de bord se met à jour automatiquement à chaque navigation. Utilisez le bouton ↺ pour forcer un rechargement depuis le serveur.')}
  `;
}

function bodyProjectsList() {
  return `
    <p>La liste des projets permet de parcourir, rechercher, filtrer et trier l\'ensemble des projets réglementaires.</p>

    ${sub('Barre d\'outils', `
      <div class="space-y-2">
        ${kv('Cartes / Tableau', 'Deux vues disponibles — cartes visuelles ou tableau de données. Le choix est mémorisé entre les sessions.')}
        ${kv('↑ / ↓', 'Inverse l\'ordre de tri (ascendant / descendant). Mémorisé entre les sessions.')}
      </div>
    `)}

    ${sub('Recherche et filtres', `
      <div class="space-y-2">
        ${kv('Recherche textuelle', 'Filtre simultanément sur le titre, le code (ex: SPR-042), le type de projet, la direction principale et le règlement.')}
        ${kv('Statut', 'En cours · Terminé · En attente · Clos')}
        ${kv('Priorité', 'Élevé · Moyen · Faible')}
        ${kv('Risque', 'Élevé · Moyen · Faible')}
        ${kv('Direction', 'Direction principale du projet.')}
        ${kv('Type', 'Type de projet (liste fixe).')}
        ${kv('Trier par', 'Code · Titre · Statut · Priorité · Date de modification')}
      </div>
      ${tip('Les filtres sont cumulatifs. Un badge de filtre actif apparaît pour chaque filtre. Cliquer sur <strong>×</strong> dans un badge supprime ce filtre.')}
    `)}

    ${sub('Graphique de distribution', `
      <p>Un graphique donut « Distribution par statut » est affiché dans la zone de filtres. Il est recalculé à chaque changement de filtre et reflète uniquement les projets actuellement affichés.</p>
    `)}

    ${sub('Vue Cartes', `
      <p class="mb-2">Chaque carte affiche :</p>
      ${bullets([
        'Code <span class="font-mono text-xs bg-blue-100 text-blue-700 px-1 rounded">SPR-XXX</span>, statut, indicateur de brouillon',
        'Titre du projet (2 lignes max) et type de projet',
        'Direction principale',
        'Badges priorité et risque',
        'Avatars des ressources associées (max 3 + compteur)',
        'Indicateurs de jalons (points colorés : vert = complété, bleu = en cours, orange = reporté)',
        'Version et date de dernière modification',
        'Bouton <strong>Voir →</strong> pour accéder à la fiche projet',
      ])}
    `)}

    ${sub('Vue Tableau', `
      <p class="mb-2">Colonnes disponibles (certaines masquées sur petit écran) :</p>
      ${bullets([
        '<strong>Code</strong> — avec indicateur de brouillon (point orange)',
        '<strong>Titre</strong> — lien cliquable vers la fiche + type sous le titre',
        '<strong>Statut</strong> · <strong>Priorité</strong> · <strong>Risque</strong> — badges colorés',
        '<strong>Direction</strong> — masquée sous lg',
        '<strong>Équipe</strong> — avatars empilés, masquée sous xl',
        '<strong>Version</strong> — masquée sous md',
        '<strong>Actions</strong> — bouton Voir →',
      ])}
    `)}
  `;
}

function bodyProjectDetail() {
  return `
    <p>La fiche projet regroupe toutes les informations d\'un projet réglementaire en cinq onglets.</p>

    ${sub('En-tête', `
      <div class="space-y-1.5">
        ${kv('Code SPR-XXX', 'Identifiant unique du projet (format numérique sur 3 chiffres).')}
        ${kv('Statut / Priorité / Risque', 'Badges colorés reflétant l\'état actuel (ou brouillon si en mode brouillon).')}
        ${kv('Titre', 'Nom complet du projet, type de projet, règlement et numéro de version.')}
        ${kv('Voir brouillon', 'Visible si un brouillon existe et si vous êtes contributeur. Bascule l\'affichage entre la version publiée et le brouillon en cours.')}
        ${kv('Modifier', 'Visible si vous êtes contributeur et non en mode édition. Active le mode édition.')}
        ${kv('Publier vN', 'Visible si un brouillon existe et si vous êtes contributeur. Ouvre la confirmation de publication.')}
      </div>
    `)}

    ${sub('Onglet Général', `
      <div class="space-y-1.5">
        ${kv('Description', 'Présentation générale du projet et de ses objectifs.')}
        ${kv('Enjeux', 'Problématiques et considérations à prendre en compte.')}
        ${kv('Discussion', 'Avancement des consultations et notes de travail.')}
        ${kv('Informations', 'Règlement applicable, type de projet, juridiction et direction principale.')}
        ${kv('Lois applicables', 'Liste des lois visées par ce projet.')}
        ${kv('Directions responsables', 'Directions chargées du projet (peut en lister plusieurs).')}
        ${kv('Impact système', 'Indique si le projet nécessite des adaptations techniques ou informatiques.')}
      </div>
    `)}

    ${sub('Onglet Équipe', `
      <div class="space-y-1.5">
        ${kv('Ressources associées', 'Membres de l\'équipe principale avec photo, rôle et courriel cliquable.')}
        ${kv('Soutien juridique', 'Conseillers juridiques associés.')}
        ${kv('Comité ACVM', 'Membres du comité inter-provincial (tableau avec institution).')}
        ${kv('Groupe de travail', 'Membres du groupe de travail (tableau avec institution).')}
      </div>
    `)}

    ${sub('Onglet Chronologie', `
      <p class="mb-2">Trois sections présentées en ligne du temps avec indicateurs colorés :</p>
      <div class="space-y-1.5">
        ${kv('Jalons', 'Étapes clés du projet avec date initiale et dates de révision.')}
        ${kv('Rencontres et approbations', 'Réunions planifiées ou tenues.')}
        ${kv('Développements significatifs', 'Événements importants affectant le projet.')}
      </div>
      <p class="mt-2 text-xs text-gray-500">Couleurs des indicateurs : <span class="text-green-600">●</span> complété/tenu · <span class="text-blue-500">●</span> en cours/à venir/planifié · <span class="text-amber-500">●</span> reporté · <span class="text-gray-400">●</span> annulé</p>
      ${tip('Quand une date a été révisée, la date initiale est affichée en gris et la date révisée en orange avec un <strong>→ Révisé :</strong>.')}
    `)}

    ${sub('Onglet Documents', `
      <div class="space-y-1.5">
        ${kv('Documents', 'Tableau avec titre, type, description, date de chargement, auteur et lien d\'ouverture.')}
        ${kv('Médias', 'Liens vers des ressources media (communiqués, vidéos, balados) avec auteur et date.')}
      </div>
    `)}

    ${sub('Onglet Historique', `
      <p>Affiche la lignée des versions directement dans la fiche projet (même contenu que la page d\'historique complète accessible via <span class="font-mono text-xs bg-gray-100 px-1 rounded">#history-N</span>).</p>
    `)}
  `;
}

function bodyEditMode() {
  return `
    ${warn('Le mode édition est réservé aux <strong>contributeurs</strong> d\'un projet : personnes listées dans <em>Ressources associées</em> ou <em>Soutien juridique</em>.')}

    ${sub('Activation', steps([
      'Ouvrir la fiche du projet souhaité.',
      'Vérifier que le bouton <strong>Modifier</strong> est présent en haut à droite de l\'en-tête.',
      'Cliquer sur <strong>Modifier</strong> — la zone de contenu se transforme en formulaire.',
    ]))}

    ${sub('Formulaire — Onglet Général', `
      <div class="space-y-1.5">
        ${kv('Titre du projet', 'Champ texte libre.')}
        ${kv('Type de projet', 'Liste de sélection fixe.')}
        ${kv('Règlement', 'Champ texte libre.')}
        ${kv('Statut / Priorité / Risque', 'Listes de sélection.')}
        ${kv('Juridiction principale', 'Champ texte libre.')}
        ${kv('Direction principale', 'Champ texte libre.')}
        ${kv('Description / Enjeux / Discussion', 'Zones de texte multi-lignes redimensionnables.')}
        ${kv('Lois applicables', 'Saisir une loi dans le champ, cliquer <strong>+</strong> pour l\'ajouter. Cliquer <strong>×</strong> sur un badge pour la retirer.')}
        ${kv('Impact système', 'Case à cocher + zone de description si coché.')}
      </div>
    `)}

    ${sub('Formulaire — Onglet Équipe', `
      <p class="mb-2">Pour chaque liste (Ressources, Soutien, Comité, Groupe de travail) :</p>
      ${bullets([
        'Cliquer <strong>×</strong> (bouton rouge) sur une entrée pour la supprimer.',
        'Déplier la section <strong>+ Ajouter une personne / un membre</strong> en bas du bloc.',
        'Remplir prénom, nom, courriel (et rôle pour les ressources).',
        'Cliquer <strong>Ajouter</strong>.',
      ])}
    `)}

    ${sub('Formulaire — Onglet Chronologie', `
      <p class="mb-2">Pour chaque section (Jalons, Rencontres, Développements) :</p>
      ${bullets([
        'Cliquer <strong>✕</strong> sur une entrée pour la supprimer.',
        'Pour ajouter une date de révision à un jalons existant : saisir la date dans le champ de date de l\'entrée et cliquer <strong>+ Date révision</strong>.',
        'Déplier <strong>+ Ajouter une entrée</strong> pour créer une nouvelle entrée (description, date initiale, statut).',
      ])}
    `)}

    ${sub('Enregistrer le brouillon', steps([
      'Remplir ou modifier les champs souhaités dans n\'importe quel onglet.',
      'Cliquer <strong>Enregistrer le brouillon</strong> en bas du formulaire.',
      'Une notification verte confirme l\'enregistrement. La fiche revient en mode lecture.',
      'Un badge <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Brouillon</span> apparaît dans l\'en-tête.',
    ]))}

    ${sub('Publier une version', steps([
      'S\'assurer qu\'un brouillon existe (badge visible dans l\'en-tête).',
      'Cliquer <strong>Publier vN</strong> (N = numéro de la prochaine version).',
      'Confirmer dans la boîte de dialogue.',
      'La version est publiée, le brouillon est supprimé et le numéro de version est incrémenté.',
    ]))}

    ${tip('En mode développement, le brouillon est sauvegardé uniquement en mémoire locale (non persisté dans SharePoint). Il sera perdu à la fermeture ou au rechargement de la page.')}
  `;
}

function bodyDrafts() {
  return `
    <p>Un <strong>brouillon</strong> représente une version modifiée d\'un projet non encore publiée. Il coexiste avec la version publiée jusqu\'à sa publication ou sa suppression.</p>

    ${sub('Indicateurs de brouillon', `
      <div class="space-y-2">
        ${kv('Liste des projets — carte', badge('Brouillon', 'bg-amber-100 text-amber-700') + ' — badge visible sur la carte ou dans la colonne Code (vue tableau).')}
        ${kv('Fiche projet — en-tête', 'Badge <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Brouillon</span> dans les badges de statut, si un brouillon existe.')}
        ${kv('Fiche projet — bannière', 'Bandeau orange sous l\'en-tête indiquant : qui a modifié le brouillon et quand.')}
        ${kv('En-tête global', 'Badge numérique orange sur l\'icône ✏ dans l\'en-tête principal, affichant le nombre total de brouillons en cours.')}
      </div>
    `)}

    ${sub('Visualisation brouillon vs publié', `
      <p class="mb-2">Sur la fiche d\'un projet ayant un brouillon (et si vous êtes contributeur) :</p>
      ${steps([
        'Cliquer sur <strong>Voir brouillon</strong> dans l\'en-tête pour basculer l\'affichage vers les données du brouillon.',
        'Tous les onglets reflètent alors le contenu du brouillon (non publié).',
        'Cliquer <strong>Voir version publiée</strong> pour revenir à la version officielle.',
      ])}
      ${tip('Cette bascule est uniquement visuelle — elle ne modifie pas les données.')}
    `)}

    ${sub('Suppression d\'un brouillon', `
      <p>Un brouillon est automatiquement supprimé lors de sa publication. Il n\'existe pas d\'action de suppression manuelle dans l\'interface actuelle — contacter l\'administrateur si nécessaire.</p>
    `)}
  `;
}

function bodyHistory() {
  return `
    <p>Chaque publication ou sauvegarde de brouillon crée une entrée dans l\'historique. Cela permet de suivre l\'évolution d\'un projet et de restaurer une version antérieure.</p>

    ${sub('Accès', `
      ${bullets([
        'Via l\'<strong>onglet Historique</strong> dans la fiche projet (chargement à la demande).',
        'Via l\'URL directe <span class="font-mono text-xs bg-gray-100 px-1 rounded">#history-N</span> (N = code du projet).',
      ])}
    `)}

    ${sub('Lecture de la timeline', `
      <div class="space-y-2">
        ${kv(badge('v3', 'bg-blue-100 text-blue-700 font-mono'), 'Numéro de version.')}
        ${kv(badge('Publié', 'bg-green-100 text-green-700'), 'Version officiellement publiée.')}
        ${kv(badge('Brouillon', 'bg-amber-100 text-amber-700'), 'Sauvegarde intermédiaire non publiée.')}
        ${kv('Champs modifiés', 'Affiche les champs qui ont changé avec l\'ancienne valeur <span class="line-through text-red-400">barrée</span> et la nouvelle valeur <span class="text-green-600">colorée en vert</span>.')}
        ${kv('Voir les détails', 'Déploie l\'instantané complet de la version (titre, statut, priorité, risque, etc.).')}
      </div>
    `)}

    ${sub('Filtres', `
      <p>Trois boutons permettent de filtrer les entrées :</p>
      ${bullets([
        '<strong>Tout</strong> — affiche toutes les entrées.',
        '<strong>Publiées</strong> — affiche uniquement les versions publiées.',
        '<strong>Brouillons</strong> — affiche uniquement les sauvegardes de brouillons.',
      ])}
    `)}

    ${sub('Restaurer une version', steps([
      'Repérer l\'entrée de version souhaitée dans la timeline.',
      'Cliquer sur l\'icône de restauration (flèche) à droite de l\'entrée.',
      'Confirmer dans la boîte de dialogue.',
      'L\'instantané de cette version est chargé comme nouveau brouillon.',
      'Réviser si nécessaire, puis publier pour rendre les modifications officielles.',
    ]))}

    ${warn('La restauration crée un <strong>brouillon</strong> — elle ne publie pas automatiquement. Vous devrez publier explicitement pour que la version restaurée devienne officielle.')}
  `;
}

function bodyCustomization() {
  return `
    ${sub('Mode sombre / clair', steps([
      'Cliquer sur l\'icône ☀ / 🌙 dans l\'en-tête principal (coin supérieur droit).',
      'Le thème bascule immédiatement.',
      'La préférence est mémorisée dans <span class="font-mono text-xs bg-gray-100 px-1 rounded">localStorage</span> et restaurée à la prochaine ouverture.',
    ]))}

    ${sub('Vue de la liste des projets', `
      <div class="space-y-1.5">
        ${kv('Vue Cartes', 'Activée via le bouton <strong>Cartes</strong> dans la barre d\'outils de la liste.')}
        ${kv('Vue Tableau', 'Activée via le bouton <strong>Tableau</strong>.')}
        ${kv('Persistance', 'Le choix de vue, le critère de tri et l\'ordre (ascendant/descendant) sont mémorisés dans <span class="font-mono text-xs bg-gray-100 px-1 rounded">localStorage</span>.')}
      </div>
    `)}

    ${sub('Cache hors connexion', `
      <p>Les projets chargés depuis le serveur sont automatiquement mis en cache dans une base de données locale <strong>IndexedDB</strong>. En cas de perte de connexion, l\'application charge les données depuis ce cache avec un message d\'information.</p>
      ${tip('En mode développement, le cache est alimenté par les données fictives générées automatiquement au démarrage.')}
    `)}

    ${sub('Langue', `
      <p>L\'application est entièrement en <strong>français canadien</strong> (fr-CA). Les dates et heures sont formatées selon cette locale. Il n\'existe pas d\'option de changement de langue dans l\'interface actuelle.</p>
    `)}
  `;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS = {
  overview:       `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  navigation:     `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>`,
  dashboard:      `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
  'projects-list':`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
  'project-detail':`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
  'edit-mode':    `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
  drafts:         `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`,
  history:        `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  customization:  `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
};

const BODIES = {
  overview:       bodyOverview,
  navigation:     bodyNavigation,
  dashboard:      bodyDashboard,
  'projects-list':bodyProjectsList,
  'project-detail':bodyProjectDetail,
  'edit-mode':    bodyEditMode,
  drafts:         bodyDrafts,
  history:        bodyHistory,
  customization:  bodyCustomization,
};

// ─── Main render ──────────────────────────────────────────────────────────────

export function renderHelp() {
  const tocLinks = SECTIONS.map(s => `
    <a href="#help-${s.id}" class="help-toc-link flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-600
       hover:text-blue-600 hover:bg-blue-50 transition-colors" data-section="${s.id}">
      <span class="w-4 h-4 shrink-0 text-gray-400">${ICONS[s.id]}</span>
      ${s.label}
    </a>`).join('');

  const sections = SECTIONS.map(s =>
    section(s.id, s.label, ICONS[s.id], BODIES[s.id]())
  ).join('');

  return `
    <div class="animate-fadeIn" id="help-root">

      <!-- Page title -->
      <div class="mb-5">
        <h1 class="text-2xl font-bold text-gray-900">Manuel d'utilisation</h1>
        <p class="text-sm text-gray-500 mt-1">Guide complet de l'application SPR — Suivi des Projets Réglementaires</p>
      </div>

      <!-- Search -->
      <div class="relative mb-5">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input id="help-search" type="search" placeholder="Rechercher dans le manuel…"
          class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white shadow-sm" />
        <div id="help-search-results"
          class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto">
        </div>
      </div>
      <!-- No-results banner (hidden by default) -->
      <div id="help-no-results" class="hidden mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 text-center">
        Aucune section ne correspond à votre recherche.
      </div>

      <div class="flex flex-col lg:flex-row gap-6">

        <!-- TOC -->
        <aside class="lg:w-52 shrink-0">

          <!-- Mobile: collapsible -->
          <div class="lg:hidden mb-4">
            <button id="help-toc-toggle"
              class="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm">
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                Table des matières
              </span>
              <svg id="help-toc-chevron" class="w-4 h-4 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <nav id="help-toc-mobile"
              class="hidden mt-1 bg-white border border-gray-200 rounded-xl shadow-sm p-2 space-y-0.5">
              ${tocLinks}
            </nav>
          </div>

          <!-- Desktop: sticky -->
          <div class="hidden lg:block sticky top-4">
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Table des matières</p>
              <nav class="space-y-0.5" id="help-toc-desktop">
                ${tocLinks}
              </nav>
            </div>
          </div>

        </aside>

        <!-- Sections -->
        <div class="flex-1 min-w-0 space-y-5" id="help-content">
          ${sections}
        </div>

      </div>
    </div>
  `;
}

// ─── Listeners ────────────────────────────────────────────────────────────────

export function attachHelpListeners() {
  // ── Mobile TOC toggle ──────────────────────────────────────────────────────
  const tocToggle  = document.getElementById('help-toc-toggle');
  const tocMobile  = document.getElementById('help-toc-mobile');
  const tocChevron = document.getElementById('help-toc-chevron');

  tocToggle?.addEventListener('click', () => {
    const open = !tocMobile.classList.contains('hidden');
    tocMobile.classList.toggle('hidden', open);
    tocChevron?.classList.toggle('rotate-180', !open);
  });

  // Close mobile TOC when a link is clicked
  tocMobile?.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      tocMobile.classList.add('hidden');
      tocChevron?.classList.remove('rotate-180');
    }
  });

  // ── Smooth scroll for TOC anchors ─────────────────────────────────────────
  document.querySelectorAll('.help-toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        // Offset for sticky header (~64px)
        const y = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
        const main = document.getElementById('main-content');
        if (main) {
          const yMain = target.getBoundingClientRect().top + main.scrollTop - 72;
          main.scrollTo({ top: yMain, behavior: 'smooth' });
        }
      }
    });
  });

  // ── Active TOC highlight (IntersectionObserver) ───────────────────────────
  const allSectionEls = document.querySelectorAll('[data-help-section]');
  if ('IntersectionObserver' in window && allSectionEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.helpSection;
          document.querySelectorAll('.help-toc-link').forEach(l => {
            const active = l.dataset.section === id;
            l.classList.toggle('bg-blue-50', active);
            l.classList.toggle('text-blue-600', active);
            l.classList.toggle('font-medium', active);
            l.classList.toggle('text-gray-600', !active);
          });
        }
      });
    }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });

    allSectionEls.forEach(el => observer.observe(el));
  }

  // ── Search ────────────────────────────────────────────────────────────────
  const searchInput   = document.getElementById('help-search');
  const searchResults = document.getElementById('help-search-results');
  const noResults     = document.getElementById('help-no-results');
  const helpContent   = document.getElementById('help-content');

  // Build a simple text index: {sectionId → plaintext}
  const index = {};
  allSectionEls.forEach(el => {
    index[el.dataset.helpSection] = el.textContent.toLowerCase();
  });

  const sectionLabel = {};
  SECTIONS.forEach(s => { sectionLabel[s.id] = s.label; });

  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();

    if (!q) {
      // Clear search: restore all sections, hide overlays
      searchResults.classList.add('hidden');
      searchResults.innerHTML = '';
      noResults.classList.add('hidden');
      allSectionEls.forEach(el => el.classList.remove('hidden'));
      return;
    }

    // Find matching sections
    const matches = SECTIONS.filter(s => index[s.id]?.includes(q));

    // Hide / show sections
    allSectionEls.forEach(el => {
      const match = matches.some(s => s.id === el.dataset.helpSection);
      el.classList.toggle('hidden', !match);
    });

    noResults.classList.toggle('hidden', matches.length > 0);

    // Dropdown results for quick jump
    if (matches.length) {
      searchResults.innerHTML = matches.map(s => `
        <button class="help-search-jump w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-100 last:border-0"
          data-section="${s.id}">
          <span class="w-5 h-5 shrink-0 text-blue-500">${ICONS[s.id]}</span>
          <span class="text-sm text-gray-800">${s.label}</span>
          <svg class="w-3.5 h-3.5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>`).join('');
      searchResults.classList.remove('hidden');

      searchResults.querySelectorAll('.help-search-jump').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = document.getElementById(`help-${btn.dataset.section}`);
          if (target) {
            const main = document.getElementById('main-content');
            if (main) {
              const yMain = target.getBoundingClientRect().top + main.scrollTop - 72;
              main.scrollTo({ top: yMain, behavior: 'smooth' });
            }
          }
          searchResults.classList.add('hidden');
          searchInput.value = '';
          allSectionEls.forEach(el => el.classList.remove('hidden'));
          noResults.classList.add('hidden');
        });
      });
    } else {
      searchResults.classList.add('hidden');
    }
  });

  // Close search dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!searchInput?.contains(e.target) && !searchResults?.contains(e.target)) {
      searchResults?.classList.add('hidden');
    }
  }, { capture: true });
}
