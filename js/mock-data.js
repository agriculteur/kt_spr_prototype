/**
 * Mock data generator for SPR application (DEV_MODE only)
 */

const STATUTS = ['en cours', 'terminé', 'en attente', 'clos'];
const PRIORITES = ['faible', 'moyen', 'élevé'];
const RISQUES = ['élevé', 'moyen', 'faible'];

const TYPES_PROJET = [
  'Avis',
  'Mandat spécial',
  'Québec seulement - nouveau règlement',
  'Québec seulement - modification et révision',
  'ACVM - nouveau règlement',
  'ACVM - modification et révision',
];

const DIRECTIONS = [
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
];

const JURIDICTIONS = [
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
];

const REGLEMENTS = [
  '31-103',
  '45-106',
  '51-102',
  '52-109',
  '52-110',
  '54-101',
  '58-101',
  '81-101',
  '81-102',
  '94-101',
  'LVM',
  'LVMO',
  'LSA',
];

const LOIS_OPTIONS = [
  'LVM',
  'LDPSF',
];

const PRENOMS_F = [
  'Marie', 'Sophie', 'Julie', 'Isabelle', 'Nathalie', 'Catherine', 'Anne', 'Mélanie',
  'Valérie', 'Caroline', 'Émilie', 'Chantal', 'Martine', 'Karine', 'Stéphanie',
  'Josée', 'Geneviève', 'Roxanne', 'Véronique', 'Lucie', 'Christine', 'Dominique',
];

const PRENOMS_M = [
  'Jean', 'Pierre', 'Marc', 'François', 'Philippe', 'Patrick', 'Louis', 'Michel',
  'Luc', 'André', 'Paul', 'Jacques', 'Martin', 'Sébastien', 'Nicolas', 'Éric',
  'David', 'Simon', 'Thomas', 'Alexandre', 'Guillaume', 'Mathieu', 'Antoine',
];

const NOMS = [
  'Tremblay', 'Gagnon', 'Roy', 'Côté', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie',
  'Fortin', 'Gagné', 'Ouellet', 'Pelletier', 'Leblanc', 'Jobin', 'Bergeron',
  'Paradis', 'Simard', 'Desrosiers', 'Bélanger', 'Lévesque', 'Poirier', 'Dubois',
  'Fontaine', 'Perron', 'Lacroix', 'Lapointe', 'Caron', 'Dion', 'Girard', 'Vézina',
];

const INSTITUTIONS = [
  'Autorité des marchés financiers',
  'Commission des valeurs mobilières de l\'Ontario',
  'Alberta Securities Commission',
  'BC Securities Commission',
  'Commission des valeurs mobilières du Manitoba',
  'Financial and Consumer Affairs Authority of Saskatchewan',
  'Nova Scotia Securities Commission',
  'Financial Services Regulator Authority of Ontario',
  'Bureau du surintendant des institutions financières',
];

const ROLES = [
  'Chargé de projet',
  'Analyste principal',
  'Analyste réglementaire',
  'Conseiller juridique',
  'Directeur de projet',
  'Coordonnateur',
  'Expert en conformité',
  'Spécialiste en valeurs mobilières',
  'Agent de liaison',
  'Responsable des opérations',
];

const TITRES_PROJETS = [
  'Réforme du cadre réglementaire des conseillers en placement',
  'Modernisation des exigences de divulgation continue',
  'Révision des règles applicables aux fonds d\'investissement alternatifs',
  'Mise à jour du Règlement 31-103 sur les inscriptions',
  'Nouvelle approche réglementaire pour les crypto-actifs',
  'Révision du régime de dispense de prospectus',
  'Harmonisation des règles de gouvernance des fonds communs',
  'Réforme du cadre de divulgation des émetteurs assujettis',
  'Nouvelle réglementation sur les dérivés de gré à gré',
  'Modernisation du régime de rachat d\'actions',
  'Encadrement des plateformes de négociation alternatives',
  'Révision des exigences relatives aux auditeurs',
  'Mise en œuvre des recommandations du GROUPE ACVM sur l\'ESG',
  'Réforme du régime des offres d\'achat visant la mainmise',
  'Actualisation des règles sur les opérations d\'initiés',
  'Encadrement des activités de titrisation',
  'Révision du régime applicable aux organismes d\'autoréglementation',
  'Nouvelle approche pour l\'encadrement des robo-conseillers',
  'Harmonisation des règles de protection des investisseurs',
  'Mise à jour du Règlement 45-106 sur les dispenses',
  'Encadrement des fonds négociés en bourse de nouvelle génération',
  'Réforme du régime de surveillance des marchés',
  'Révision des obligations de déclaration des transactions',
  'Cadre réglementaire pour les plateformes de financement participatif',
  'Modernisation du régime de protection contre la fraude',
  'Révision des exigences de capital réglementaire',
  'Encadrement des activités de vente à découvert',
  'Actualisation des règles sur la manipulation de marché',
  'Nouvelle réglementation sur les services de compensation',
  'Révision du cadre applicable aux agences de notation',
  'Encadrement des activités de conseil en placement robotisé',
  'Modernisation des règles sur la commercialisation des fonds',
  'Révision des exigences de conduite professionnelle',
  'Cadre réglementaire pour les actifs numériques tokenisés',
  'Harmonisation des règles sur la protection des données',
  'Actualisation du régime de sanctions administratives',
  'Révision des règles sur les conflits d\'intérêts',
  'Encadrement des produits d\'investissement structurés',
  'Modernisation du régime d\'enregistrement des courtiers',
  'Révision des obligations de connaissance du client (KYC)',
  'Réforme du régime applicable aux conseillers de gestion de portefeuille',
  'Encadrement des fonds à capital fixe',
  'Révision des règles sur les distributions en dehors du Canada',
  'Nouvelle approche réglementaire pour les stablecoins',
  'Actualisation des règles sur la rémunération des intermédiaires',
  'Révision du cadre de résolution des litiges investisseur-courtier',
  'Encadrement des activités des courtiers en épargne collective',
  'Modernisation des exigences de formation continue',
  'Révision des règles applicables aux représentants inscrits',
  'Cadre réglementaire pour les fonds de capital-risque',
  'Harmonisation des règles de présentation des informations financières',
  'Révision du régime de contrôle des acquisitions',
  'Encadrement des activités de gestion collective',
  'Modernisation des exigences relatives aux prospectes',
  'Révision des règles sur les communications avec les actionnaires',
  'Actualisation du cadre de surveillance des émetteurs',
  'Encadrement des activités transfrontalières',
  'Révision des règles sur les fusions et acquisitions',
  'Nouvelle réglementation sur le courtage en ligne',
  'Harmonisation des exigences de gouvernance d\'entreprise',
  'Révision du régime des offres publiques d\'achat',
  'Encadrement des activités des fonds de couverture',
  'Modernisation du régime de divulgation des rémunérations',
  'Révision des règles applicables aux émetteurs fermés',
  'Cadre réglementaire pour les prêts de titres',
  'Actualisation des règles sur les prise ferme',
  'Révision du régime de surveillance des courtiers',
  'Encadrement des activités des gestionnaires de fonds d\'investissement',
  'Modernisation des règles sur les déclarations d\'initiés',
  'Révision du cadre réglementaire des placements privés',
  'Nouvelle approche pour l\'encadrement des contrats de différence',
  'Harmonisation des règles de résolution des réclamations',
  'Révision du régime applicable aux sociétés de personnes en commandite',
  'Encadrement des activités de gestion discrétionnaire',
  'Modernisation des exigences de capital des courtiers',
  'Révision des règles sur les distributions secondaires',
  'Cadre réglementaire pour les plateformes de prêt entre particuliers',
  'Actualisation des règles sur les émetteurs étrangers',
  'Révision du régime de supervision des marchés dérivés',
  'Encadrement des activités des agents de transfert',
  'Modernisation du régime d\'autorisation des bourses',
  'Révision des règles sur la transparence pré-négociation',
  'Nouvelle réglementation sur les ordres à fréquence élevée',
  'Harmonisation des règles sur les pratiques de vente',
  'Révision du régime applicable aux teneurs de marché',
  'Encadrement des activités des dépositaires de valeurs',
  'Modernisation des règles sur les enquêtes réglementaires',
  'Révision du cadre de coopération internationale',
  'Cadre réglementaire pour les programmes de fidélisation tokenisés',
  'Actualisation des règles sur les rapports de procuration',
  'Révision du régime des assemblées annuelles virtuelles',
  'Encadrement des activités de placement des émetteurs en démarrage',
  'Modernisation des exigences de test d\'adéquation',
  'Révision des règles sur les produits dérivés sur marchandises',
  'Nouvelle approche pour l\'encadrement des bourses de valeurs régionales',
  'Harmonisation des exigences relatives aux régimes de retraite',
  'Révision du régime de contrôle des fonds propres',
  'Encadrement des activités des organismes de placement collectif étrangers',
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(startYear = 2022, endYear = 2026) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
}

function randomFutureDate(months = 12) {
  const d = new Date();
  d.setDate(d.getDate() + randomInt(1, months * 30));
  return d.toISOString().split('T')[0];
}

function randomPastDate(months = 24) {
  const d = new Date();
  d.setDate(d.getDate() - randomInt(1, months * 30));
  return d.toISOString().split('T')[0];
}

function generatePerson(imgIndex) {
  const isFemale = Math.random() > 0.5;
  const prenom = isFemale ? randomFrom(PRENOMS_F) : randomFrom(PRENOMS_M);
  const nom = randomFrom(NOMS);
  const email = `${prenom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@autorite.qc.ca`;
  return {
    photo: `https://i.pravatar.cc/150?img=${imgIndex}`,
    prenom,
    nom,
    email,
    role: randomFrom(ROLES),
  };
}

function generateCommitteeMember(imgIndex) {
  const isFemale = Math.random() > 0.5;
  const prenom = isFemale ? randomFrom(PRENOMS_F) : randomFrom(PRENOMS_M);
  const nom = randomFrom(NOMS);
  const institution = randomFrom(INSTITUTIONS);
  const domain = institution.toLowerCase().includes('ontario') ? 'osc.ca'
    : institution.toLowerCase().includes('alberta') ? 'asc.ca'
    : institution.toLowerCase().includes('colombie') ? 'bcsc.bc.ca'
    : 'autorite.qc.ca';
  const email = `${prenom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@${domain}`;
  return { prenom, nom, email, institution };
}

function generateJalon(index) {
  const statuts = ['à venir', 'en cours', 'complété', 'reporté', 'annulé'];
  const descriptions = [
    'Publication du document de consultation',
    'Période de commentaires',
    'Analyse des commentaires reçus',
    'Rédaction du rapport final',
    'Approbation par le conseil d\'administration',
    'Publication du règlement définitif',
    'Entrée en vigueur',
    'Évaluation post-implantation',
    'Présentation au comité de direction',
    'Révision par les pairs',
    'Coordination avec les provinces',
    'Formation des intervenants',
    'Mise à jour des systèmes internes',
    'Communication externe',
    'Dépôt auprès du gouvernement',
  ];
  const dateInitiale = randomDate(2022, 2026);
  const hasChange = Math.random() > 0.5;
  return {
    date_initiale: dateInitiale,
    date_changement: hasChange ? [randomDate(2023, 2026)] : [],
    description: randomFrom(descriptions),
    statut: randomFrom(statuts),
  };
}

function generateDeveloppement() {
  const descriptions = [
    'Réception des commentaires des parties prenantes',
    'Réunion du groupe de travail interprovinces',
    'Publication d\'un document de travail préliminaire',
    'Consultation bilatérale avec l\'industrie',
    'Modification de l\'approche réglementaire suite aux retours',
    'Coordination avec le gouvernement fédéral',
    'Présentation devant le comité consultatif',
    'Révision du calendrier en raison de contraintes législatives',
    'Accord de principe entre les membres de l\'ACVM',
    'Publication d\'un avis de consultation',
    'Retrait d\'un aspect litigieux du projet',
    'Ajout d\'une dispense temporaire pendant la transition',
    'Mise à jour de l\'analyse d\'impact réglementaire',
  ];
  const statuts = ['complété', 'en cours', 'planifié', 'reporté'];
  const dateInitiale = randomDate(2022, 2025);
  const hasChange = Math.random() > 0.4;
  return {
    date_initiale: dateInitiale,
    date_changement: hasChange ? [randomDate(2023, 2026)] : [],
    description: randomFrom(descriptions),
    statut: randomFrom(statuts),
  };
}

function generateRencontre() {
  const descriptions = [
    'Réunion du Comité de coordination de la réglementation (CCR)',
    'Approbation par les chefs des autorités membres',
    'Présentation devant le conseil des gouverneurs',
    'Réunion du groupe de travail sur l\'harmonisation',
    'Consultation publique — séance d\'information',
    'Rencontre avec les associations professionnelles',
    'Approbation du document de consultation par le comité',
    'Réunion de coordination avec les provinces participantes',
    'Séance de travail sur les enjeux technologiques',
    'Rencontre avec le ministère des Finances',
  ];
  const statuts = ['planifié', 'tenu', 'reporté', 'annulé'];
  const dateInitiale = randomDate(2022, 2026);
  const hasChange = Math.random() > 0.5;
  return {
    date_initiale: dateInitiale,
    date_changement: hasChange ? [randomDate(2023, 2026)] : [],
    description: randomFrom(descriptions),
    statut: randomFrom(statuts),
  };
}

function generateDocument(chargeParEmail) {
  const types = ['Document de consultation', 'Règlement', 'Instruction', 'Avis', 'Rapport', 'Présentation', 'Lettre', 'Formulaire'];
  const titres = [
    'Document de consultation — version préliminaire',
    'Rapport d\'analyse réglementaire',
    'Résumé des commentaires reçus',
    'Projet de règlement modifié',
    'Note de service interne',
    'Présentation au comité directeur',
    'Analyse comparative internationale',
    'Formulaire de déclaration',
    'Guide d\'application',
    'Foire aux questions (FAQ)',
  ];
  return {
    titre: randomFrom(titres),
    type_document: randomFrom(types),
    lien: `https://lautorite.qc.ca/documents/${Math.random().toString(36).substring(2, 10)}`,
    description: 'Document généré dans le cadre du projet réglementaire.',
    chargement_date: randomPastDate(18),
    chargement_par: chargeParEmail,
  };
}

function generateMedia(chargeParEmail) {
  const labels = [
    'Communiqué de presse',
    'Article de blogue réglementaire',
    'Vidéo de présentation',
    'Infographie — impacts clés',
    'Webinaire enregistré',
    'Balado — Entretien réglementaire',
  ];
  return {
    lien: `https://lautorite.qc.ca/media/${Math.random().toString(36).substring(2, 10)}`,
    label: randomFrom(labels),
    chargement_date: randomPastDate(12),
    chargement_par: chargeParEmail,
    auteur: `${randomFrom(PRENOMS_M)} ${randomFrom(NOMS)}`,
  };
}

/**
 * Generate 100 mock regulatory projects
 * @returns {Array}
 */
export function generateMockProjects() {
  const projects = [];
  const titles = [...TITRES_PROJETS];

  // Shuffle titles
  for (let i = titles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [titles[i], titles[j]] = [titles[j], titles[i]];
  }

  const mockUser = generateMockUser();

  for (let code = 1; code <= 100; code++) {
    const titre = titles[code - 1] || `Projet réglementaire SPR-${String(code).padStart(3, '0')}`;
    const statut = randomFrom(STATUTS);
    const priorite = randomFrom(PRIORITES);
    const niveau_risque = randomFrom(RISQUES);
    const type_projet = randomFrom(TYPES_PROJET);
    const direction_principale = randomFrom(DIRECTIONS);
    const jurCount = randomInt(1, 3);
    const jurCopy = [...JURIDICTIONS];
    const juridiction_principale = [];
    for (let i = 0; i < jurCount; i++) {
      const idx = Math.floor(Math.random() * jurCopy.length);
      juridiction_principale.push(jurCopy.splice(idx, 1)[0]);
    }
    const reglement = randomFrom(REGLEMENTS);

    // Lois (pick 1-2)
    const loisCount = randomInt(1, 2);
    const loi = [];
    const loisCopy = [...LOIS_OPTIONS];
    for (let i = 0; i < loisCount; i++) {
      const idx = Math.floor(Math.random() * loisCopy.length);
      loi.push(loisCopy.splice(idx, 1)[0]);
    }

    // Directions responsables (1-3)
    const dirRespCount = randomInt(1, 3);
    const direction_responsable = [];
    const dirsCopy = [...DIRECTIONS];
    for (let i = 0; i < dirRespCount; i++) {
      const idx = Math.floor(Math.random() * dirsCopy.length);
      direction_responsable.push(dirsCopy.splice(idx, 1)[0]);
    }

    // Ressources (2-4)
    const ressourcesCount = randomInt(2, 4);
    const ressources = [];
    // For projects 1, 2, 3: ensure the mock user is a resource
    if (code <= 3) {
      ressources.push({
        photo: `https://i.pravatar.cc/150?img=1`,
        prenom: 'Marie',
        nom: 'Tremblay',
        email: mockUser.email,
        role: 'Chargée de projet',
      });
    }
    const startImg = code * 5;
    for (let i = ressources.length; i < ressourcesCount; i++) {
      ressources.push(generatePerson(startImg + i));
    }

    // Soutien juridique (1-2)
    const soutienCount = randomInt(1, 2);
    const soutien_juridique = [];
    for (let i = 0; i < soutienCount; i++) {
      soutien_juridique.push(generatePerson(startImg + 20 + i));
    }

    // Comité ACVM (2-5)
    const comiteCount = randomInt(2, 5);
    const Comite_ACVM = [];
    for (let i = 0; i < comiteCount; i++) {
      Comite_ACVM.push(generateCommitteeMember(startImg + 30 + i));
    }

    // Groupe de travail (2-4)
    const gtCount = randomInt(2, 4);
    const groupe_de_travail = [];
    for (let i = 0; i < gtCount; i++) {
      groupe_de_travail.push(generateCommitteeMember(startImg + 40 + i));
    }

    // Jalons (2-5)
    const jalonCount = randomInt(2, 5);
    const jalons = [];
    for (let i = 0; i < jalonCount; i++) {
      jalons.push(generateJalon(i));
    }

    // Rencontres (1-3)
    const rencontreCount = randomInt(1, 3);
    const rencontres_approbations = [];
    for (let i = 0; i < rencontreCount; i++) {
      rencontres_approbations.push(generateRencontre());
    }

    // Développements significatifs (1-3)
    const devCount = randomInt(1, 3);
    const developpements_significatifs = [];
    for (let i = 0; i < devCount; i++) {
      developpements_significatifs.push(generateDeveloppement());
    }

    // Documents (0-3)
    const docCount = randomInt(0, 3);
    const documents = [];
    const chargeParEmail = ressources[0].email;
    for (let i = 0; i < docCount; i++) {
      documents.push(generateDocument(chargeParEmail));
    }

    // Media (0-2)
    const mediaCount = randomInt(0, 2);
    const media = [];
    for (let i = 0; i < mediaCount; i++) {
      media.push(generateMedia(chargeParEmail));
    }

    const impact_systeme = Math.random() > 0.6;

    const descriptions = [
      `Ce projet vise à moderniser le cadre réglementaire applicable à ${titre.toLowerCase()}. L'objectif est d'harmoniser les exigences avec les pratiques internationales et de renforcer la protection des investisseurs québécois et canadiens.`,
      `Dans le cadre de ses activités de reddition de comptes, l'Autorité procède à une révision complète des règles applicables. Ce projet implique une étroite collaboration avec les membres de l'ACVM et les parties prenantes de l'industrie.`,
      `Ce projet réglementaire découle des recommandations du groupe de travail mis sur pied en 2022. Il vise à combler les lacunes identifiées dans le cadre actuel et à renforcer la cohérence avec les autres provinces canadiennes.`,
    ];

    const enjeux = [
      `Les principaux enjeux concernent l'équilibre entre la protection des investisseurs et la compétitivité des marchés financiers. Des considérations de coût pour l'industrie et d'harmonisation interprovinciale doivent être soigneusement pesées.`,
      `L'harmonisation avec les juridictions étrangères, notamment les États-Unis et l'Union européenne, représente un défi majeur. Les acteurs de l'industrie ont exprimé des préoccupations quant aux délais d'implantation proposés.`,
      `La complexité technique du cadre proposé pose des défis d'implantation pour les petits acteurs du marché. Des exemptions ou des périodes de transition pourraient être nécessaires.`,
    ];

    const discussions = [
      `Les consultations préliminaires ont démontré un intérêt général pour la réforme proposée, bien que certaines parties prenantes s'interrogent sur les modalités d'application. Des discussions sont en cours pour finaliser les détails techniques.`,
      `Le groupe de travail a tenu trois réunions au cours des six derniers mois. Des progrès significatifs ont été réalisés, mais des points de désaccord subsistent concernant la portée des nouvelles obligations.`,
      `Suite aux commentaires reçus lors de la consultation publique, le projet a été substantiellement révisé. La nouvelle approche proposée est généralement bien reçue par l'industrie et les autres membres de l'ACVM.`,
    ];

    const version = randomInt(1, 5);
    const derniere_modification = randomDate(2023, 2026);

    projects.push({
      code,
      titre,
      type_projet,
      reglement,
      statut,
      priorite,
      loi,
      niveau_risque,
      juridiction_principale,
      direction_principale,
      direction_responsable,
      Ressources_associees: ressources,
      soutien_juridique,
      Comite_ACVM,
      groupe_de_travail,
      description: randomFrom(descriptions),
      enjeux: randomFrom(enjeux),
      discussion: randomFrom(discussions),
      developpements_significatifs,
      rencontres_approbations,
      jalons,
      impact_systeme,
      impact_description: impact_systeme
        ? `Ce projet nécessite des modifications aux systèmes de déclaration électronique et aux portails de l\'Autorité. Une évaluation d\'impact technique est prévue au cours du prochain trimestre.`
        : '',
      documents,
      media,
      version,
      derniere_modification,
      modifie_par: chargeParEmail,
    });
  }

  return projects;
}

/**
 * Generate a mock current user
 * @returns {Object}
 */
export function generateMockUser() {
  return {
    name: 'Marie Tremblay',
    email: 'marie.tremblay@autorite.qc.ca',
    loginName: 'i:0#.f|membership|marie.tremblay@autorite.qc.ca',
    Title: 'Marie Tremblay',
    Id: 1,
  };
}

/**
 * Generate a mock draft for a project
 * @param {Object} project
 * @returns {Object}
 */
export function generateMockDraft(project) {
  const modified = { ...project };
  modified.discussion = modified.discussion + ' [Brouillon en cours de modification — données non publiées.]';
  return {
    id: 9000 + project.code,
    ProjetCode: project.code,
    data: modified,
    modifie_par: 'marie.tremblay@autorite.qc.ca',
    modifie_le: new Date().toISOString(),
    version_base: project.version,
  };
}

/**
 * Generate mock history for a project
 * @param {Object} project
 * @returns {Array}
 */
export function generateMockHistory(project) {
  const history = [];
  const actions = ['published', 'draft', 'published', 'draft', 'published'];
  const emails = [
    'marie.tremblay@autorite.qc.ca',
    'sophie.gagnon@autorite.qc.ca',
    'jean.roy@autorite.qc.ca',
  ];

  const fieldsPool = [
    { field: 'statut', oldValue: 'en attente', newValue: 'en cours' },
    { field: 'priorite', oldValue: 'faible', newValue: 'élevé' },
    { field: 'description', oldValue: 'Description initiale du projet.', newValue: 'Description mise à jour après consultation.' },
    { field: 'niveau_risque', oldValue: 'faible', newValue: 'moyen' },
    { field: 'direction_principale', oldValue: 'Direction des marchés des valeurs mobilières', newValue: 'Direction de la réglementation' },
    { field: 'titre', oldValue: project.titre + ' (v.initiale)', newValue: project.titre },
  ];

  for (let v = 1; v <= 5; v++) {
    const action = actions[v - 1];
    const d = new Date();
    d.setDate(d.getDate() - (5 - v) * 15);

    const changeCount = randomInt(1, 3);
    const changes = fieldsPool.slice(0, changeCount);

    history.push({
      id: project.code * 100 + v,
      ProjetCode: project.code,
      version: v,
      action,
      changedBy: randomFrom(emails),
      actionDate: d.toISOString(),
      snapshot: { ...project, version: v },
      changes,
    });
  }

  return history;
}
