(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // js/mock-data.js
  var mock_data_exports = {};
  __export(mock_data_exports, {
    generateMockDraft: () => generateMockDraft,
    generateMockHistory: () => generateMockHistory,
    generateMockProjects: () => generateMockProjects,
    generateMockUser: () => generateMockUser
  });
  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomDate(startYear = 2022, endYear = 2026) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split("T")[0];
  }
  function randomPastDate(months = 24) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - randomInt(1, months * 30));
    return d.toISOString().split("T")[0];
  }
  function generatePerson(imgIndex) {
    const isFemale = Math.random() > 0.5;
    const prenom = isFemale ? randomFrom(PRENOMS_F) : randomFrom(PRENOMS_M);
    const nom = randomFrom(NOMS);
    const email = `${prenom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.${nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@autorite.qc.ca`;
    const safeIndex = ((Number(imgIndex) - 1 + 70) % 70) + 1;
    return {
      photo: `https://i.pravatar.cc/150?img=${safeIndex}`,
      prenom,
      nom,
      email,
      role: randomFrom(ROLES)
    };
  }
  function generateCommitteeMember(imgIndex) {
    const isFemale = Math.random() > 0.5;
    const prenom = isFemale ? randomFrom(PRENOMS_F) : randomFrom(PRENOMS_M);
    const nom = randomFrom(NOMS);
    const institution = randomFrom(INSTITUTIONS);
    const domain = institution.toLowerCase().includes("ontario") ? "osc.ca" : institution.toLowerCase().includes("alberta") ? "asc.ca" : institution.toLowerCase().includes("colombie") ? "bcsc.bc.ca" : "autorite.qc.ca";
    const email = `${prenom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.${nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@${domain}`;
    return { prenom, nom, email, institution };
  }
  function generateJalon(index) {
    const statuts = ["\xE0 venir", "en cours", "compl\xE9t\xE9", "report\xE9", "annul\xE9"];
    const descriptions = [
      "Publication du document de consultation",
      "P\xE9riode de commentaires",
      "Analyse des commentaires re\xE7us",
      "R\xE9daction du rapport final",
      "Approbation par le conseil d'administration",
      "Publication du r\xE8glement d\xE9finitif",
      "Entr\xE9e en vigueur",
      "\xC9valuation post-implantation",
      "Pr\xE9sentation au comit\xE9 de direction",
      "R\xE9vision par les pairs",
      "Coordination avec les provinces",
      "Formation des intervenants",
      "Mise \xE0 jour des syst\xE8mes internes",
      "Communication externe",
      "D\xE9p\xF4t aupr\xE8s du gouvernement"
    ];
    const dateInitiale = randomDate(2022, 2026);
    const hasChange = Math.random() > 0.5;
    return {
      date_initiale: dateInitiale,
      date_changement: hasChange ? [randomDate(2023, 2026)] : [],
      description: randomFrom(descriptions),
      statut: randomFrom(statuts)
    };
  }
  function generateDeveloppement() {
    const descriptions = [
      "R\xE9ception des commentaires des parties prenantes",
      "R\xE9union du groupe de travail interprovinces",
      "Publication d'un document de travail pr\xE9liminaire",
      "Consultation bilat\xE9rale avec l'industrie",
      "Modification de l'approche r\xE9glementaire suite aux retours",
      "Coordination avec le gouvernement f\xE9d\xE9ral",
      "Pr\xE9sentation devant le comit\xE9 consultatif",
      "R\xE9vision du calendrier en raison de contraintes l\xE9gislatives",
      "Accord de principe entre les membres de l'ACVM",
      "Publication d'un avis de consultation",
      "Retrait d'un aspect litigieux du projet",
      "Ajout d'une dispense temporaire pendant la transition",
      "Mise \xE0 jour de l'analyse d'impact r\xE9glementaire"
    ];
    const statuts = ["compl\xE9t\xE9", "en cours", "planifi\xE9", "report\xE9"];
    const dateInitiale = randomDate(2022, 2025);
    const hasChange = Math.random() > 0.4;
    return {
      date_initiale: dateInitiale,
      date_changement: hasChange ? [randomDate(2023, 2026)] : [],
      description: randomFrom(descriptions),
      statut: randomFrom(statuts)
    };
  }
  function generateRencontre() {
    const descriptions = [
      "R\xE9union du Comit\xE9 de coordination de la r\xE9glementation (CCR)",
      "Approbation par les chefs des autorit\xE9s membres",
      "Pr\xE9sentation devant le conseil des gouverneurs",
      "R\xE9union du groupe de travail sur l'harmonisation",
      "Consultation publique \u2014 s\xE9ance d'information",
      "Rencontre avec les associations professionnelles",
      "Approbation du document de consultation par le comit\xE9",
      "R\xE9union de coordination avec les provinces participantes",
      "S\xE9ance de travail sur les enjeux technologiques",
      "Rencontre avec le minist\xE8re des Finances"
    ];
    const statuts = ["planifi\xE9", "tenu", "report\xE9", "annul\xE9"];
    const dateInitiale = randomDate(2022, 2026);
    const hasChange = Math.random() > 0.5;
    return {
      date_initiale: dateInitiale,
      date_changement: hasChange ? [randomDate(2023, 2026)] : [],
      description: randomFrom(descriptions),
      statut: randomFrom(statuts)
    };
  }
  function generateDocument(chargeParEmail) {
    const types = ["Document de consultation", "R\xE8glement", "Instruction", "Avis", "Rapport", "Pr\xE9sentation", "Lettre", "Formulaire"];
    const titres = [
      "Document de consultation \u2014 version pr\xE9liminaire",
      "Rapport d'analyse r\xE9glementaire",
      "R\xE9sum\xE9 des commentaires re\xE7us",
      "Projet de r\xE8glement modifi\xE9",
      "Note de service interne",
      "Pr\xE9sentation au comit\xE9 directeur",
      "Analyse comparative internationale",
      "Formulaire de d\xE9claration",
      "Guide d'application",
      "Foire aux questions (FAQ)"
    ];
    return {
      titre: randomFrom(titres),
      type_document: randomFrom(types),
      lien: `https://lautorite.qc.ca/documents/${Math.random().toString(36).substring(2, 10)}`,
      description: "Document g\xE9n\xE9r\xE9 dans le cadre du projet r\xE9glementaire.",
      chargement_date: randomPastDate(18),
      chargement_par: chargeParEmail
    };
  }
  function generateMedia(chargeParEmail) {
    const labels = [
      "Communiqu\xE9 de presse",
      "Article de blogue r\xE9glementaire",
      "Vid\xE9o de pr\xE9sentation",
      "Infographie \u2014 impacts cl\xE9s",
      "Webinaire enregistr\xE9",
      "Balado \u2014 Entretien r\xE9glementaire"
    ];
    return {
      lien: `https://lautorite.qc.ca/media/${Math.random().toString(36).substring(2, 10)}`,
      label: randomFrom(labels),
      chargement_date: randomPastDate(12),
      chargement_par: chargeParEmail,
      auteur: `${randomFrom(PRENOMS_M)} ${randomFrom(NOMS)}`
    };
  }
  function generateMockProjects() {
    const projects = [];
    const titles = [...TITRES_PROJETS];
    for (let i = titles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [titles[i], titles[j]] = [titles[j], titles[i]];
    }
    const mockUser = generateMockUser();
    for (let code = 1; code <= 100; code++) {
      const titre = titles[code - 1] || `Projet r\xE9glementaire SPR-${String(code).padStart(3, "0")}`;
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
      const loisCount = randomInt(1, 2);
      const loi = [];
      const loisCopy = [...LOIS_OPTIONS];
      for (let i = 0; i < loisCount; i++) {
        const idx = Math.floor(Math.random() * loisCopy.length);
        loi.push(loisCopy.splice(idx, 1)[0]);
      }
      const dirRespCount = randomInt(1, 3);
      const direction_responsable = [];
      const dirsCopy = [...DIRECTIONS];
      for (let i = 0; i < dirRespCount; i++) {
        const idx = Math.floor(Math.random() * dirsCopy.length);
        direction_responsable.push(dirsCopy.splice(idx, 1)[0]);
      }
      const ressourcesCount = randomInt(2, 4);
      const ressources = [];
      if (code <= 3) {
        ressources.push({
          photo: `https://i.pravatar.cc/150?img=1`,
          prenom: "Marie",
          nom: "Tremblay",
          email: mockUser.email,
          role: "Charg\xE9e de projet"
        });
      }
      const startImg = code * 5;
      for (let i = ressources.length; i < ressourcesCount; i++) {
        ressources.push(generatePerson(startImg + i));
      }
      const soutienCount = randomInt(1, 2);
      const soutien_juridique = [];
      for (let i = 0; i < soutienCount; i++) {
        soutien_juridique.push(generatePerson(startImg + 20 + i));
      }
      const comiteCount = randomInt(2, 5);
      const Comite_ACVM = [];
      for (let i = 0; i < comiteCount; i++) {
        Comite_ACVM.push(generateCommitteeMember(startImg + 30 + i));
      }
      const gtCount = randomInt(2, 4);
      const groupe_de_travail = [];
      for (let i = 0; i < gtCount; i++) {
        groupe_de_travail.push(generateCommitteeMember(startImg + 40 + i));
      }
      const jalonCount = randomInt(2, 5);
      const jalons = [];
      for (let i = 0; i < jalonCount; i++) {
        jalons.push(generateJalon(i));
      }
      const rencontreCount = randomInt(1, 3);
      const rencontres_approbations = [];
      for (let i = 0; i < rencontreCount; i++) {
        rencontres_approbations.push(generateRencontre());
      }
      const devCount = randomInt(1, 3);
      const developpements_significatifs = [];
      for (let i = 0; i < devCount; i++) {
        developpements_significatifs.push(generateDeveloppement());
      }
      const docCount = randomInt(0, 3);
      const documents = [];
      const chargeParEmail = ressources[0].email;
      for (let i = 0; i < docCount; i++) {
        documents.push(generateDocument(chargeParEmail));
      }
      const mediaCount = randomInt(0, 2);
      const media = [];
      for (let i = 0; i < mediaCount; i++) {
        media.push(generateMedia(chargeParEmail));
      }
      const impact_systeme = Math.random() > 0.6;
      const descriptions = [
        `Ce projet vise \xE0 moderniser le cadre r\xE9glementaire applicable \xE0 ${titre.toLowerCase()}. L'objectif est d'harmoniser les exigences avec les pratiques internationales et de renforcer la protection des investisseurs qu\xE9b\xE9cois et canadiens.`,
        `Dans le cadre de ses activit\xE9s de reddition de comptes, l'Autorit\xE9 proc\xE8de \xE0 une r\xE9vision compl\xE8te des r\xE8gles applicables. Ce projet implique une \xE9troite collaboration avec les membres de l'ACVM et les parties prenantes de l'industrie.`,
        `Ce projet r\xE9glementaire d\xE9coule des recommandations du groupe de travail mis sur pied en 2022. Il vise \xE0 combler les lacunes identifi\xE9es dans le cadre actuel et \xE0 renforcer la coh\xE9rence avec les autres provinces canadiennes.`
      ];
      const enjeux = [
        `Les principaux enjeux concernent l'\xE9quilibre entre la protection des investisseurs et la comp\xE9titivit\xE9 des march\xE9s financiers. Des consid\xE9rations de co\xFBt pour l'industrie et d'harmonisation interprovinciale doivent \xEAtre soigneusement pes\xE9es.`,
        `L'harmonisation avec les juridictions \xE9trang\xE8res, notamment les \xC9tats-Unis et l'Union europ\xE9enne, repr\xE9sente un d\xE9fi majeur. Les acteurs de l'industrie ont exprim\xE9 des pr\xE9occupations quant aux d\xE9lais d'implantation propos\xE9s.`,
        `La complexit\xE9 technique du cadre propos\xE9 pose des d\xE9fis d'implantation pour les petits acteurs du march\xE9. Des exemptions ou des p\xE9riodes de transition pourraient \xEAtre n\xE9cessaires.`
      ];
      const discussions = [
        `Les consultations pr\xE9liminaires ont d\xE9montr\xE9 un int\xE9r\xEAt g\xE9n\xE9ral pour la r\xE9forme propos\xE9e, bien que certaines parties prenantes s'interrogent sur les modalit\xE9s d'application. Des discussions sont en cours pour finaliser les d\xE9tails techniques.`,
        `Le groupe de travail a tenu trois r\xE9unions au cours des six derniers mois. Des progr\xE8s significatifs ont \xE9t\xE9 r\xE9alis\xE9s, mais des points de d\xE9saccord subsistent concernant la port\xE9e des nouvelles obligations.`,
        `Suite aux commentaires re\xE7us lors de la consultation publique, le projet a \xE9t\xE9 substantiellement r\xE9vis\xE9. La nouvelle approche propos\xE9e est g\xE9n\xE9ralement bien re\xE7ue par l'industrie et les autres membres de l'ACVM.`
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
        impact_description: impact_systeme ? `Ce projet n\xE9cessite des modifications aux syst\xE8mes de d\xE9claration \xE9lectronique et aux portails de l'Autorit\xE9. Une \xE9valuation d'impact technique est pr\xE9vue au cours du prochain trimestre.` : "",
        documents,
        media,
        version,
        derniere_modification,
        modifie_par: chargeParEmail
      });
    }
    return projects;
  }
  function generateMockUser() {
    return {
      name: "Marie Tremblay",
      email: "marie.tremblay@autorite.qc.ca",
      loginName: "i:0#.f|membership|marie.tremblay@autorite.qc.ca",
      Title: "Marie Tremblay",
      Id: 1
    };
  }
  function generateMockDraft(project) {
    const modified = __spreadValues({}, project);
    modified.discussion = modified.discussion + " [Brouillon en cours de modification \u2014 donn\xE9es non publi\xE9es.]";
    return {
      id: 9e3 + project.code,
      ProjetCode: project.code,
      data: modified,
      modifie_par: "marie.tremblay@autorite.qc.ca",
      modifie_le: (/* @__PURE__ */ new Date()).toISOString(),
      version_base: project.version
    };
  }
  function generateMockHistory(project) {
    const history2 = [];
    const actions = ["published", "draft", "published", "draft", "published"];
    const emails = [
      "marie.tremblay@autorite.qc.ca",
      "sophie.gagnon@autorite.qc.ca",
      "jean.roy@autorite.qc.ca"
    ];
    const fieldsPool = [
      { field: "statut", oldValue: "en attente", newValue: "en cours" },
      { field: "priorite", oldValue: "faible", newValue: "\xE9lev\xE9" },
      { field: "description", oldValue: "Description initiale du projet.", newValue: "Description mise \xE0 jour apr\xE8s consultation." },
      { field: "niveau_risque", oldValue: "faible", newValue: "moyen" },
      { field: "direction_principale", oldValue: "Direction des march\xE9s des valeurs mobili\xE8res", newValue: "Direction de la r\xE9glementation" },
      { field: "titre", oldValue: project.titre + " (v.initiale)", newValue: project.titre }
    ];
    for (let v = 1; v <= 5; v++) {
      const action = actions[v - 1];
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - (5 - v) * 15);
      const changeCount = randomInt(1, 3);
      const changes = fieldsPool.slice(0, changeCount);
      history2.push({
        id: project.code * 100 + v,
        ProjetCode: project.code,
        version: v,
        action,
        changedBy: randomFrom(emails),
        actionDate: d.toISOString(),
        snapshot: __spreadProps(__spreadValues({}, project), { version: v }),
        changes
      });
    }
    return history2;
  }
  var STATUTS, PRIORITES, RISQUES, TYPES_PROJET, DIRECTIONS, JURIDICTIONS, REGLEMENTS, LOIS_OPTIONS, PRENOMS_F, PRENOMS_M, NOMS, INSTITUTIONS, ROLES, TITRES_PROJETS;
  var init_mock_data = __esm({
    "js/mock-data.js"() {
      STATUTS = ["en cours", "termin\xE9", "en attente", "clos"];
      PRIORITES = ["faible", "moyen", "\xE9lev\xE9"];
      RISQUES = ["\xE9lev\xE9", "moyen", "faible"];
      TYPES_PROJET = [
        "Avis",
        "Mandat sp\xE9cial",
        "Qu\xE9bec seulement - nouveau r\xE8glement",
        "Qu\xE9bec seulement - modification et r\xE9vision",
        "ACVM - nouveau r\xE8glement",
        "ACVM - modification et r\xE9vision"
      ];
      DIRECTIONS = [
        "Direction des march\xE9s des valeurs mobili\xE8res",
        "Direction de la r\xE9glementation",
        "Direction des affaires juridiques",
        "Direction de la conformit\xE9 et des inspections",
        "Direction de la surveillance",
        "Direction des ressources humaines",
        "Direction des technologies de l'information",
        "Direction des communications",
        "Direction des finances",
        "Direction de la protection des investisseurs"
      ];
      JURIDICTIONS = [
        "Ontario",
        "Qu\xE9bec",
        "Colombie-Britannique",
        "Alberta",
        "Manitoba",
        "Saskatchewan",
        "Nouveau-Brunswick",
        "Nouvelle-\xC9cosse",
        "\xCEle-du-Prince-\xC9douard",
        "Terre-Neuve-et-Labrador",
        "Yukon",
        "Territoires du Nord-Ouest",
        "Nunavut",
        "ACVM"
      ];
      REGLEMENTS = [
        "31-103",
        "45-106",
        "51-102",
        "52-109",
        "52-110",
        "54-101",
        "58-101",
        "81-101",
        "81-102",
        "94-101",
        "LVM",
        "LVMO",
        "LSA"
      ];
      LOIS_OPTIONS = [
        "LVM",
        "LDPSF"
      ];
      PRENOMS_F = [
        "Marie",
        "Sophie",
        "Julie",
        "Isabelle",
        "Nathalie",
        "Catherine",
        "Anne",
        "M\xE9lanie",
        "Val\xE9rie",
        "Caroline",
        "\xC9milie",
        "Chantal",
        "Martine",
        "Karine",
        "St\xE9phanie",
        "Jos\xE9e",
        "Genevi\xE8ve",
        "Roxanne",
        "V\xE9ronique",
        "Lucie",
        "Christine",
        "Dominique"
      ];
      PRENOMS_M = [
        "Jean",
        "Pierre",
        "Marc",
        "Fran\xE7ois",
        "Philippe",
        "Patrick",
        "Louis",
        "Michel",
        "Luc",
        "Andr\xE9",
        "Paul",
        "Jacques",
        "Martin",
        "S\xE9bastien",
        "Nicolas",
        "\xC9ric",
        "David",
        "Simon",
        "Thomas",
        "Alexandre",
        "Guillaume",
        "Mathieu",
        "Antoine"
      ];
      NOMS = [
        "Tremblay",
        "Gagnon",
        "Roy",
        "C\xF4t\xE9",
        "Bouchard",
        "Gauthier",
        "Morin",
        "Lavoie",
        "Fortin",
        "Gagn\xE9",
        "Ouellet",
        "Pelletier",
        "Leblanc",
        "Jobin",
        "Bergeron",
        "Paradis",
        "Simard",
        "Desrosiers",
        "B\xE9langer",
        "L\xE9vesque",
        "Poirier",
        "Dubois",
        "Fontaine",
        "Perron",
        "Lacroix",
        "Lapointe",
        "Caron",
        "Dion",
        "Girard",
        "V\xE9zina"
      ];
      INSTITUTIONS = [
        "Autorit\xE9 des march\xE9s financiers",
        "Commission des valeurs mobili\xE8res de l'Ontario",
        "Alberta Securities Commission",
        "BC Securities Commission",
        "Commission des valeurs mobili\xE8res du Manitoba",
        "Financial and Consumer Affairs Authority of Saskatchewan",
        "Nova Scotia Securities Commission",
        "Financial Services Regulator Authority of Ontario",
        "Bureau du surintendant des institutions financi\xE8res"
      ];
      ROLES = [
        "Charg\xE9 de projet",
        "Analyste principal",
        "Analyste r\xE9glementaire",
        "Conseiller juridique",
        "Directeur de projet",
        "Coordonnateur",
        "Expert en conformit\xE9",
        "Sp\xE9cialiste en valeurs mobili\xE8res",
        "Agent de liaison",
        "Responsable des op\xE9rations"
      ];
      TITRES_PROJETS = [
        "R\xE9forme du cadre r\xE9glementaire des conseillers en placement",
        "Modernisation des exigences de divulgation continue",
        "R\xE9vision des r\xE8gles applicables aux fonds d'investissement alternatifs",
        "Mise \xE0 jour du R\xE8glement 31-103 sur les inscriptions",
        "Nouvelle approche r\xE9glementaire pour les crypto-actifs",
        "R\xE9vision du r\xE9gime de dispense de prospectus",
        "Harmonisation des r\xE8gles de gouvernance des fonds communs",
        "R\xE9forme du cadre de divulgation des \xE9metteurs assujettis",
        "Nouvelle r\xE9glementation sur les d\xE9riv\xE9s de gr\xE9 \xE0 gr\xE9",
        "Modernisation du r\xE9gime de rachat d'actions",
        "Encadrement des plateformes de n\xE9gociation alternatives",
        "R\xE9vision des exigences relatives aux auditeurs",
        "Mise en \u0153uvre des recommandations du GROUPE ACVM sur l'ESG",
        "R\xE9forme du r\xE9gime des offres d'achat visant la mainmise",
        "Actualisation des r\xE8gles sur les op\xE9rations d'initi\xE9s",
        "Encadrement des activit\xE9s de titrisation",
        "R\xE9vision du r\xE9gime applicable aux organismes d'autor\xE9glementation",
        "Nouvelle approche pour l'encadrement des robo-conseillers",
        "Harmonisation des r\xE8gles de protection des investisseurs",
        "Mise \xE0 jour du R\xE8glement 45-106 sur les dispenses",
        "Encadrement des fonds n\xE9goci\xE9s en bourse de nouvelle g\xE9n\xE9ration",
        "R\xE9forme du r\xE9gime de surveillance des march\xE9s",
        "R\xE9vision des obligations de d\xE9claration des transactions",
        "Cadre r\xE9glementaire pour les plateformes de financement participatif",
        "Modernisation du r\xE9gime de protection contre la fraude",
        "R\xE9vision des exigences de capital r\xE9glementaire",
        "Encadrement des activit\xE9s de vente \xE0 d\xE9couvert",
        "Actualisation des r\xE8gles sur la manipulation de march\xE9",
        "Nouvelle r\xE9glementation sur les services de compensation",
        "R\xE9vision du cadre applicable aux agences de notation",
        "Encadrement des activit\xE9s de conseil en placement robotis\xE9",
        "Modernisation des r\xE8gles sur la commercialisation des fonds",
        "R\xE9vision des exigences de conduite professionnelle",
        "Cadre r\xE9glementaire pour les actifs num\xE9riques tokenis\xE9s",
        "Harmonisation des r\xE8gles sur la protection des donn\xE9es",
        "Actualisation du r\xE9gime de sanctions administratives",
        "R\xE9vision des r\xE8gles sur les conflits d'int\xE9r\xEAts",
        "Encadrement des produits d'investissement structur\xE9s",
        "Modernisation du r\xE9gime d'enregistrement des courtiers",
        "R\xE9vision des obligations de connaissance du client (KYC)",
        "R\xE9forme du r\xE9gime applicable aux conseillers de gestion de portefeuille",
        "Encadrement des fonds \xE0 capital fixe",
        "R\xE9vision des r\xE8gles sur les distributions en dehors du Canada",
        "Nouvelle approche r\xE9glementaire pour les stablecoins",
        "Actualisation des r\xE8gles sur la r\xE9mun\xE9ration des interm\xE9diaires",
        "R\xE9vision du cadre de r\xE9solution des litiges investisseur-courtier",
        "Encadrement des activit\xE9s des courtiers en \xE9pargne collective",
        "Modernisation des exigences de formation continue",
        "R\xE9vision des r\xE8gles applicables aux repr\xE9sentants inscrits",
        "Cadre r\xE9glementaire pour les fonds de capital-risque",
        "Harmonisation des r\xE8gles de pr\xE9sentation des informations financi\xE8res",
        "R\xE9vision du r\xE9gime de contr\xF4le des acquisitions",
        "Encadrement des activit\xE9s de gestion collective",
        "Modernisation des exigences relatives aux prospectes",
        "R\xE9vision des r\xE8gles sur les communications avec les actionnaires",
        "Actualisation du cadre de surveillance des \xE9metteurs",
        "Encadrement des activit\xE9s transfrontali\xE8res",
        "R\xE9vision des r\xE8gles sur les fusions et acquisitions",
        "Nouvelle r\xE9glementation sur le courtage en ligne",
        "Harmonisation des exigences de gouvernance d'entreprise",
        "R\xE9vision du r\xE9gime des offres publiques d'achat",
        "Encadrement des activit\xE9s des fonds de couverture",
        "Modernisation du r\xE9gime de divulgation des r\xE9mun\xE9rations",
        "R\xE9vision des r\xE8gles applicables aux \xE9metteurs ferm\xE9s",
        "Cadre r\xE9glementaire pour les pr\xEAts de titres",
        "Actualisation des r\xE8gles sur les prise ferme",
        "R\xE9vision du r\xE9gime de surveillance des courtiers",
        "Encadrement des activit\xE9s des gestionnaires de fonds d'investissement",
        "Modernisation des r\xE8gles sur les d\xE9clarations d'initi\xE9s",
        "R\xE9vision du cadre r\xE9glementaire des placements priv\xE9s",
        "Nouvelle approche pour l'encadrement des contrats de diff\xE9rence",
        "Harmonisation des r\xE8gles de r\xE9solution des r\xE9clamations",
        "R\xE9vision du r\xE9gime applicable aux soci\xE9t\xE9s de personnes en commandite",
        "Encadrement des activit\xE9s de gestion discr\xE9tionnaire",
        "Modernisation des exigences de capital des courtiers",
        "R\xE9vision des r\xE8gles sur les distributions secondaires",
        "Cadre r\xE9glementaire pour les plateformes de pr\xEAt entre particuliers",
        "Actualisation des r\xE8gles sur les \xE9metteurs \xE9trangers",
        "R\xE9vision du r\xE9gime de supervision des march\xE9s d\xE9riv\xE9s",
        "Encadrement des activit\xE9s des agents de transfert",
        "Modernisation du r\xE9gime d'autorisation des bourses",
        "R\xE9vision des r\xE8gles sur la transparence pr\xE9-n\xE9gociation",
        "Nouvelle r\xE9glementation sur les ordres \xE0 fr\xE9quence \xE9lev\xE9e",
        "Harmonisation des r\xE8gles sur les pratiques de vente",
        "R\xE9vision du r\xE9gime applicable aux teneurs de march\xE9",
        "Encadrement des activit\xE9s des d\xE9positaires de valeurs",
        "Modernisation des r\xE8gles sur les enqu\xEAtes r\xE9glementaires",
        "R\xE9vision du cadre de coop\xE9ration internationale",
        "Cadre r\xE9glementaire pour les programmes de fid\xE9lisation tokenis\xE9s",
        "Actualisation des r\xE8gles sur les rapports de procuration",
        "R\xE9vision du r\xE9gime des assembl\xE9es annuelles virtuelles",
        "Encadrement des activit\xE9s de placement des \xE9metteurs en d\xE9marrage",
        "Modernisation des exigences de test d'ad\xE9quation",
        "R\xE9vision des r\xE8gles sur les produits d\xE9riv\xE9s sur marchandises",
        "Nouvelle approche pour l'encadrement des bourses de valeurs r\xE9gionales",
        "Harmonisation des exigences relatives aux r\xE9gimes de retraite",
        "R\xE9vision du r\xE9gime de contr\xF4le des fonds propres",
        "Encadrement des activit\xE9s des organismes de placement collectif \xE9trangers"
      ];
    }
  });

  // js/config.js
  var CONFIG = {
    DEV_MODE: true,
    // set false when deployed in SharePoint
    SITE_URL: "",
    // relative URL when hosted in SharePoint
    LISTS: {
      PROJETS: "SPR_Projets",
      BROUILLONS: "SPR_Projets_Brouillons",
      HISTORIQUE: "SPR_Projets_Historique"
    }
  };

  // js/app.js
  init_mock_data();

  // js/api.js
  var api_exports = {};
  __export(api_exports, {
    addHistoryEntry: () => addHistoryEntry,
    deleteDraft: () => deleteDraft,
    getCurrentUser: () => getCurrentUser,
    getDigest: () => getDigest,
    getProjectDraft: () => getProjectDraft,
    getProjectHistory: () => getProjectHistory,
    getProjects: () => getProjects,
    invalidateDigest: () => invalidateDigest,
    publishProject: () => publishProject,
    saveDraft: () => saveDraft,
    spDelete: () => spDelete,
    spGet: () => spGet,
    spPatch: () => spPatch,
    spPost: () => spPost
  });
  var _digestCache = null;
  var _digestExpiry = 0;
  async function getDigest() {
    const now = Date.now();
    if (_digestCache && now < _digestExpiry) {
      return _digestCache;
    }
    const resp = await fetch(`${CONFIG.SITE_URL}/_api/contextinfo`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=nometadata",
        "Content-Type": "application/json;odata=nometadata"
      },
      credentials: "same-origin"
    });
    if (!resp.ok)
      throw new Error(`getDigest failed: ${resp.status}`);
    const data = await resp.json();
    _digestCache = data.FormDigestValue;
    _digestExpiry = now + 29 * 60 * 1e3;
    return _digestCache;
  }
  function invalidateDigest() {
    _digestCache = null;
    _digestExpiry = 0;
  }
  async function spGet(endpoint) {
    const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=nometadata"
      },
      credentials: "same-origin"
    });
    if (!resp.ok) {
      if (resp.status === 403) {
        const err = new Error(`Acc\xE8s refus\xE9 (403): ${endpoint}`);
        err.status = 403;
        throw err;
      }
      throw new Error(`GET ${endpoint} failed: ${resp.status}`);
    }
    return resp.json();
  }
  async function spPost(endpoint, body) {
    const digest = await getDigest();
    const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=nometadata",
        "Content-Type": "application/json;odata=nometadata",
        "X-RequestDigest": digest
      },
      credentials: "same-origin",
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      if (resp.status === 403)
        invalidateDigest();
      throw new Error(`POST ${endpoint} failed: ${resp.status}`);
    }
    if (resp.status === 204)
      return null;
    return resp.json();
  }
  async function spPatch(endpoint, body) {
    const digest = await getDigest();
    const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=nometadata",
        "Content-Type": "application/json;odata=nometadata",
        "X-RequestDigest": digest,
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*"
      },
      credentials: "same-origin",
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      if (resp.status === 403)
        invalidateDigest();
      throw new Error(`PATCH ${endpoint} failed: ${resp.status}`);
    }
    return null;
  }
  async function spDelete(endpoint) {
    const digest = await getDigest();
    const resp = await fetch(`${CONFIG.SITE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=nometadata",
        "X-RequestDigest": digest,
        "X-HTTP-Method": "DELETE",
        "IF-MATCH": "*"
      },
      credentials: "same-origin"
    });
    if (!resp.ok) {
      if (resp.status === 403)
        invalidateDigest();
      throw new Error(`DELETE ${endpoint} failed: ${resp.status}`);
    }
    return null;
  }
  async function getCurrentUser() {
    const data = await spGet("/_api/web/currentuser");
    return {
      name: data.Title,
      email: data.Email,
      loginName: data.LoginName,
      Title: data.Title,
      Id: data.Id
    };
  }
  async function getProjects() {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.PROJETS}')/items?$top=200&$select=Id,ProjetCode,ProjetData,Version,DerniereModification,ModifiePar`;
    const data = await spGet(endpoint);
    return (data.value || []).map((item) => {
      let projectData = {};
      try {
        projectData = JSON.parse(item.ProjetData || "{}");
      } catch (e) {
        projectData = {};
      }
      return __spreadProps(__spreadValues({}, projectData), {
        _id: item.Id,
        code: item.ProjetCode || projectData.code,
        version: item.Version || projectData.version || 1,
        derniere_modification: item.DerniereModification || projectData.derniere_modification,
        modifie_par: item.ModifiePar || projectData.modifie_par
      });
    });
  }
  async function getProjectDraft(code) {
    try {
      const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items?$filter=ProjetCode eq ${code}&$top=1`;
      const data = await spGet(endpoint);
      const item = (data.value || [])[0];
      if (!item)
        return null;
      let draftData = {};
      try {
        draftData = JSON.parse(item.BrouillonData || "{}");
      } catch (e) {
        draftData = {};
      }
      return {
        id: item.Id,
        ProjetCode: item.ProjetCode,
        data: draftData,
        modifie_par: item.ModifiePar,
        modifie_le: item.ModifieLe,
        version_base: item.VersionBase
      };
    } catch (err) {
      if (err.status === 403)
        return null;
      throw err;
    }
  }
  async function saveDraft(code, data, existingDraftId, modifiePar, versionBase) {
    const body = {
      ProjetCode: code,
      BrouillonData: JSON.stringify(data),
      ModifiePar: modifiePar,
      ModifieLe: (/* @__PURE__ */ new Date()).toISOString(),
      VersionBase: versionBase,
      "__metadata": { type: `SP.Data.${CONFIG.LISTS.BROUILLONS}ListItem` }
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
  async function deleteDraft(draftId) {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.BROUILLONS}')/items(${draftId})`;
    return spDelete(endpoint);
  }
  async function publishProject(code, data, projectId, currentVersion, modifiePar) {
    const newVersion = (currentVersion || 1) + 1;
    const body = {
      ProjetCode: code,
      ProjetData: JSON.stringify(__spreadProps(__spreadValues({}, data), { version: newVersion })),
      Version: newVersion,
      DerniereModification: (/* @__PURE__ */ new Date()).toISOString(),
      ModifiePar: modifiePar,
      "__metadata": { type: `SP.Data.${CONFIG.LISTS.PROJETS}ListItem` }
    };
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.PROJETS}')/items(${projectId})`;
    return spPatch(endpoint, body);
  }
  async function getProjectHistory(code) {
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.HISTORIQUE}')/items?$filter=ProjetCode eq ${code}&$orderby=Version desc&$top=50`;
    const data = await spGet(endpoint);
    return (data.value || []).map((item) => {
      let snapshot = {};
      let changes = [];
      try {
        snapshot = JSON.parse(item.Snapshot || "{}");
      } catch (e) {
        snapshot = {};
      }
      try {
        changes = JSON.parse(item.ChangeSummary || "[]");
      } catch (e) {
        changes = [];
      }
      return {
        id: item.Id,
        ProjetCode: item.ProjetCode,
        version: item.Version,
        action: item.Action,
        changedBy: item.ChangedBy,
        actionDate: item.ActionDate,
        snapshot,
        changes
      };
    });
  }
  async function addHistoryEntry(code, action, snapshot, changedBy, changes, version) {
    const body = {
      ProjetCode: code,
      Action: action,
      Snapshot: JSON.stringify(snapshot),
      ChangeSummary: JSON.stringify(changes),
      ChangedBy: changedBy,
      ActionDate: (/* @__PURE__ */ new Date()).toISOString(),
      Version: version,
      "__metadata": { type: `SP.Data.${CONFIG.LISTS.HISTORIQUE}ListItem` }
    };
    const endpoint = `/_api/web/lists/getbytitle('${CONFIG.LISTS.HISTORIQUE}')/items`;
    return spPost(endpoint, body);
  }

  // js/auth.js
  init_mock_data();
  var _currentUser = null;
  async function initAuth() {
    if (CONFIG.DEV_MODE) {
      _currentUser = generateMockUser();
      return _currentUser;
    }
    try {
      _currentUser = await getCurrentUser();
      return _currentUser;
    } catch (err) {
      console.error("initAuth error:", err);
      _currentUser = { name: "Utilisateur inconnu", email: "", loginName: "", Title: "Inconnu", Id: 0 };
      return _currentUser;
    }
  }
  function getCurrentUser2() {
    return _currentUser;
  }
  function isContributor(project) {
    if (!_currentUser || !_currentUser.email)
      return false;
    const email = _currentUser.email.toLowerCase();
    const inRessources = (project.Ressources_associees || []).some(
      (r) => (r.email || "").toLowerCase() === email
    );
    if (inRessources)
      return true;
    const inSoutien = (project.soutien_juridique || []).some(
      (r) => (r.email || "").toLowerCase() === email
    );
    return inSoutien;
  }

  // js/components/toast.js
  var TYPE_CLASSES = {
    success: {
      container: "bg-green-50 border-green-300 text-green-800",
      icon: `<svg class="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    },
    error: {
      container: "bg-red-50 border-red-300 text-red-800",
      icon: `<svg class="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
    },
    warning: {
      container: "bg-amber-50 border-amber-300 text-amber-800",
      icon: `<svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`
    },
    info: {
      container: "bg-blue-50 border-blue-300 text-blue-800",
      icon: `<svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    }
  };
  function showToast(message, type = "info", duration = 4e3) {
    const container = document.getElementById("toast-container");
    if (!container)
      return;
    const style = TYPE_CLASSES[type] || TYPE_CLASSES.info;
    const toast = document.createElement("div");
    toast.className = `flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm w-full pointer-events-auto
    transform translate-x-full opacity-0 transition-all duration-300 ease-out
    ${style.container}`;
    toast.innerHTML = `
    ${style.icon}
    <p class="text-sm font-medium flex-1 leading-snug">${message}</p>
    <button class="shrink-0 ml-1 text-current opacity-60 hover:opacity-100 transition-opacity" aria-label="Fermer">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.remove("translate-x-full", "opacity-0");
        toast.classList.add("translate-x-0", "opacity-100");
      });
    });
    const dismiss = () => {
      toast.classList.remove("translate-x-0", "opacity-100");
      toast.classList.add("translate-x-full", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    };
    toast.querySelector("button").addEventListener("click", dismiss);
    let timer = setTimeout(dismiss, duration);
    toast.addEventListener("mouseenter", () => clearTimeout(timer));
    toast.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      timer = setTimeout(dismiss, 1500);
    });
  }

  // js/data-store.js
  var DB_NAME = "spr-db";
  var DB_VERSION = 1;
  var STORE_PROJECTS = "projects";
  function openDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
          db.createObjectStore(STORE_PROJECTS, { keyPath: "code" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async function getCachedProjects() {
    try {
      const db = await openDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_PROJECTS, "readonly");
        const store = tx.objectStore(STORE_PROJECTS);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.warn("IndexedDB unavailable", err);
      return [];
    }
  }
  async function saveProjectsCache(projects) {
    if (!Array.isArray(projects))
      return;
    try {
      const db = await openDb();
      const tx = db.transaction(STORE_PROJECTS, "readwrite");
      const store = tx.objectStore(STORE_PROJECTS);
      store.clear();
      projects.forEach((project) => {
        const item = __spreadProps(__spreadValues({}, project), { code: project.code });
        store.put(item);
      });
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn("IndexedDB unavailable", err);
    }
  }

  // js/utils.js
  function formatDate(str) {
    if (!str)
      return "\u2014";
    try {
      const d = new Date(str);
      if (isNaN(d.getTime()))
        return str;
      return d.toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return str;
    }
  }
  function formatDateTime(str) {
    if (!str)
      return "\u2014";
    try {
      const d = new Date(str);
      if (isNaN(d.getTime()))
        return str;
      return d.toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return str;
    }
  }
  function getStatusBadgeClass(statut) {
    switch (statut) {
      case "en cours":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "termin\xE9":
        return "bg-green-100 text-green-800 border border-green-200";
      case "en attente":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "clos":
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }
  function getPriorityBadgeClass(priorite) {
    switch (priorite) {
      case "\xE9lev\xE9":
        return "bg-red-100 text-red-800 border border-red-200";
      case "moyen":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "faible":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }
  function getRiskBadgeClass(niveau_risque) {
    switch (niveau_risque) {
      case "\xE9lev\xE9":
        return "bg-red-100 text-red-800 border border-red-200";
      case "moyen":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "faible":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }
  function getInitials(prenom, nom) {
    const p = (prenom || "").trim();
    const n = (nom || "").trim();
    const pi = p.length > 0 ? p[0].toUpperCase() : "";
    const ni = n.length > 0 ? n[0].toUpperCase() : "";
    return pi + ni || "??";
  }
  function diffObjects(oldObj, newObj) {
    const changes = [];
    const allKeys = /* @__PURE__ */ new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);
    for (const key of allKeys) {
      const oldVal = JSON.stringify((oldObj || {})[key]);
      const newVal = JSON.stringify((newObj || {})[key]);
      if (oldVal !== newVal) {
        changes.push({ field: key, oldValue: (oldObj || {})[key], newValue: (newObj || {})[key] });
      }
    }
    return changes;
  }
  function escapeHtml(str) {
    if (str == null)
      return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function parseHash(hash) {
    const raw = (hash || "").replace(/^#/, "");
    const [route, query] = raw.split("?");
    const params = {};
    if (query) {
      query.split("&").forEach((part) => {
        const [k, v] = part.split("=");
        if (k)
          params[decodeURIComponent(k)] = decodeURIComponent(v || "");
      });
    }
    return { route: route || "", params };
  }
  function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  function isWithinDays(dateStr, days) {
    if (!dateStr)
      return false;
    const d = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const future = /* @__PURE__ */ new Date();
    future.setDate(future.getDate() + days);
    return d >= now && d <= future;
  }
  function renderAvatarHtml(person, size = "w-6 h-6") {
    if (!person)
      return "";
    const faceSvg = `<div class="${size} rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    </div>`;
    if (person.photo) {
      try {
        const safeSrc = escapeHtml(person.photo);
        const imgHtml = `<img src="${safeSrc}" alt="${escapeHtml(person.prenom)}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML=\`<div class=&quot;${size} rounded-full bg-blue-100 flex items-center justify-center text-blue-600&quot;><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; class=&quot;w-4 h-4&quot; fill=&quot;currentColor&quot;><path d=&quot;M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z&quot;/></svg></div>\`">`;
        return imgHtml;
      } catch (e) {
        console.warn("Avatar rendering failed", e);
        return faceSvg;
      }
    }
    return faceSvg;
  }

  // js/views/dashboard.js
  if (!window.sprCharts)
    window.sprCharts = {};
  var CHART_COLORS = {
    blue: "#3b82f6",
    green: "#22c55e",
    amber: "#f59e0b",
    red: "#ef4444",
    purple: "#a855f7",
    teal: "#14b8a6",
    gray: "#9ca3af",
    indigo: "#6366f1",
    orange: "#f97316",
    cyan: "#06b6d4"
  };
  function computeKPIs(projects) {
    const total = projects.length;
    const enCours = projects.filter((p) => p.statut === "en cours").length;
    const termines = projects.filter((p) => p.statut === "termin\xE9").length;
    const enAttente = projects.filter((p) => p.statut === "en attente").length;
    const clos = projects.filter((p) => p.statut === "clos").length;
    const prioriteElevee = projects.filter((p) => p.priorite === "\xE9lev\xE9").length;
    const risqueEleve = projects.filter((p) => p.niveau_risque === "\xE9lev\xE9").length;
    const impactSysteme = projects.filter((p) => p.impact_systeme).length;
    let jalonsBientot = 0;
    let jalonsRetard = 0;
    const now = /* @__PURE__ */ new Date();
    for (const p of projects) {
      for (const j of p.jalons || []) {
        const dateRef = j.date_changement && j.date_changement.length > 0 ? j.date_changement[j.date_changement.length - 1] : j.date_initiale;
        if (!dateRef)
          continue;
        const d = new Date(dateRef);
        const isCompleted = ["compl\xE9t\xE9", "annul\xE9"].includes(j.statut);
        if (!isCompleted) {
          if (d < now)
            jalonsRetard++;
          else if (isWithinDays(dateRef, 30))
            jalonsBientot++;
        }
      }
    }
    const sevenDaysAgo = /* @__PURE__ */ new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentlyModified = projects.filter((p) => {
      if (!p.derniere_modification)
        return false;
      return new Date(p.derniere_modification) >= sevenDaysAgo;
    });
    const overdueByProject = projects.map((p) => {
      const count = (p.jalons || []).filter((j) => {
        const dateRef = j.date_changement && j.date_changement.length > 0 ? j.date_changement[j.date_changement.length - 1] : j.date_initiale;
        if (!dateRef)
          return false;
        const isCompleted = ["compl\xE9t\xE9", "annul\xE9"].includes(j.statut);
        return !isCompleted && new Date(dateRef) < now;
      }).length;
      return { project: p, count };
    }).filter((x) => x.count > 0).sort((a, b) => b.count - a.count).slice(0, 10);
    const byDirection = {};
    for (const p of projects) {
      const d = p.direction_principale || "Non d\xE9finie";
      byDirection[d] = (byDirection[d] || 0) + 1;
    }
    const byType = {};
    for (const p of projects) {
      const t = p.type_projet || "Non d\xE9fini";
      byType[t] = (byType[t] || 0) + 1;
    }
    const byJuridiction = {};
    for (const p of projects) {
      const j = p.juridiction_principale || "Non d\xE9finie";
      byJuridiction[j] = (byJuridiction[j] || 0) + 1;
    }
    const jalonsByMonth = {};
    const monthLabels = [];
    for (let i = 0; i < 6; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setMonth(d.getMonth() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("fr-CA", { month: "short", year: "2-digit" });
      jalonsByMonth[key] = 0;
      monthLabels.push({ key, label });
    }
    for (const p of projects) {
      for (const j of p.jalons || []) {
        const dateRef = j.date_changement && j.date_changement.length > 0 ? j.date_changement[j.date_changement.length - 1] : j.date_initiale;
        if (!dateRef)
          continue;
        const d = new Date(dateRef);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (jalonsByMonth[key] !== void 0)
          jalonsByMonth[key]++;
      }
    }
    const completionByDir = {};
    for (const p of projects) {
      const d = p.direction_principale || "Non d\xE9finie";
      if (!completionByDir[d])
        completionByDir[d] = { total: 0, done: 0 };
      completionByDir[d].total++;
      if (p.statut === "termin\xE9")
        completionByDir[d].done++;
    }
    const byReglement = {};
    for (const p of projects) {
      const r = p.reglement || "Non d\xE9fini";
      byReglement[r] = (byReglement[r] || 0) + 1;
    }
    const risquePrioriteCroix = {
      "\xE9lev\xE9": { "faible": 0, "moyen": 0, "\xE9lev\xE9": 0 },
      "moyen":       { "faible": 0, "moyen": 0, "\xE9lev\xE9": 0 },
      "faible":      { "faible": 0, "moyen": 0, "\xE9lev\xE9": 0 }
    };
    for (const p of projects) {
      const r = p.niveau_risque || "faible";
      const pr = p.priorite || "faible";
      if (risquePrioriteCroix[r] && risquePrioriteCroix[r][pr] !== undefined)
        risquePrioriteCroix[r][pr]++;
    }
    let jalonsTotal = 0;
    let jalonsCompletes = 0;
    for (const p of projects) {
      for (const j of p.jalons || []) {
        jalonsTotal++;
        if (["compl\xE9t\xE9", "annul\xE9"].includes(j.statut)) jalonsCompletes++;
      }
    }
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const modifiedLast30 = projects.filter((p) => p.derniere_modification && new Date(p.derniere_modification) >= thirtyDaysAgo).length;
    const tauxAchevement = total > 0 ? Math.round(termines / total * 100) : 0;
    return {
      total,
      enCours,
      termines,
      enAttente,
      clos,
      prioriteElevee,
      risqueEleve,
      impactSysteme,
      jalonsBientot,
      jalonsRetard,
      jalonsTotal,
      jalonsCompletes,
      recentlyModified,
      overdueByProject,
      byDirection,
      byType,
      byJuridiction,
      byReglement,
      jalonsByMonth,
      monthLabels,
      completionByDir,
      risquePrioriteCroix,
      modifiedLast30,
      tauxAchevement
    };
  }
  function renderDashboard(projects, currentUser) {
    const kpi = computeKPIs(projects);
    const top5Juridiction = Object.entries(kpi.byJuridiction).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const top8Reglements = Object.entries(kpi.byReglement).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const recentList = [...kpi.recentlyModified].sort((a, b) => new Date(b.derniere_modification) - new Date(a.derniere_modification)).slice(0, 8);
    const alerteTotal = kpi.prioriteElevee + kpi.risqueEleve;
    const shortDir = (d) => d.replace("Direction des ", "Dir.\u00a0").replace("Direction de la ", "Dir.\u00a0").replace("Direction de l'", "Dir.\u00a0");
    return `
    <div class="animate-fadeIn">
      <div class="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Tableau de bord \u2014 Reddition de comptes</h1>
          <p class="text-sm text-gray-500 mt-1">${projects.length} projets r\xE9glementaires \u2022 Mis \xE0 jour ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div class="flex flex-wrap gap-1.5 shrink-0">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">\u25cf En cours\u00a0${kpi.enCours}</span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">\u25cf En attente\u00a0${kpi.enAttente}</span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">\u25cf Termin\xE9s\u00a0${kpi.termines}</span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">\u25cf Clos\u00a0${kpi.clos}</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Portefeuille</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">${kpi.total}</p>
              <p class="text-xs text-gray-400 mt-0.5">projets r\xE9glementaires</p>
            </div>
            <div class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">${iconStack()}</div>
          </div>
          <div class="space-y-2">
            ${kpiBigStatusRow("En cours", kpi.enCours, kpi.total, "#3b82f6")}
            ${kpiBigStatusRow("En attente", kpi.enAttente, kpi.total, "#f59e0b")}
            ${kpiBigStatusRow("Termin\xE9s", kpi.termines, kpi.total, "#16a34a")}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avancement global</p>
              <p class="text-3xl font-bold text-green-600 mt-1">${kpi.tauxAchevement}%</p>
              <p class="text-xs text-gray-400 mt-0.5">${kpi.termines} termin\xE9${kpi.termines !== 1 ? "s" : ""} sur ${kpi.total}</p>
            </div>
            <div class="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-green-600 shrink-0">${iconCheckCircle()}</div>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-3 mb-3">
            <div class="bg-green-500 h-3 rounded-full transition-all" style="width:${kpi.tauxAchevement}%"></div>
          </div>
          <div class="grid grid-cols-3 gap-1 text-center">
            <div><p class="text-sm font-bold text-blue-600">${kpi.enCours}</p><p class="text-xs text-gray-400">Actifs</p></div>
            <div><p class="text-sm font-bold text-amber-600">${kpi.enAttente}</p><p class="text-xs text-gray-400">Attente</p></div>
            <div><p class="text-sm font-bold text-gray-400">${kpi.clos}</p><p class="text-xs text-gray-400">Clos</p></div>
          </div>
        </div>
        <div class="bg-white border border-red-100 rounded-xl p-5 shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs font-semibold text-red-400 uppercase tracking-wider">Vigilance</p>
              <p class="text-3xl font-bold text-red-600 mt-1">${alerteTotal}</p>
              <p class="text-xs text-gray-400 mt-0.5">indicateurs \xE0 surveiller</p>
            </div>
            <div class="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center text-red-600 shrink-0">${iconAlert()}</div>
          </div>
          <div class="space-y-2">
            ${kpiAlertRow("Priorit\xE9 \xE9lev\xE9e", kpi.prioriteElevee, "bg-red-400", "text-red-600")}
            ${kpiAlertRow("Risque \xE9lev\xE9", kpi.risqueEleve, "bg-orange-400", "text-orange-600")}
            ${kpiAlertRow("Impact syst\xE8me", kpi.impactSysteme, "bg-purple-400", "text-purple-600")}
          </div>
        </div>
        <div class="bg-white border border-amber-100 rounded-xl p-5 shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Jalons</p>
              <p class="text-3xl font-bold text-amber-600 mt-1">${kpi.jalonsTotal}</p>
              <p class="text-xs text-gray-400 mt-0.5">jalons au total</p>
            </div>
            <div class="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">${iconCalendar()}</div>
          </div>
          <div class="space-y-2">
            ${kpiAlertRow("En retard", kpi.jalonsRetard, "bg-red-500", "text-red-600")}
            ${kpiAlertRow("\xC0 venir (30\u00a0j)", kpi.jalonsBientot, "bg-teal-400", "text-teal-600")}
            ${kpiAlertRow("Compl\xE9t\xE9s", kpi.jalonsCompletes, "bg-green-400", "text-green-600")}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        ${miniKpi("Modifi\xE9s\u00a07\u00a0j", kpi.recentlyModified.length, "text-blue-600")}
        ${miniKpi("Modifi\xE9s\u00a030\u00a0j", kpi.modifiedLast30, "text-indigo-600")}
        ${miniKpi("Impact syst.", kpi.impactSysteme, "text-purple-600")}
        ${miniKpi("Jalons retard", kpi.jalonsRetard, "text-red-600")}
        ${miniKpi("Jalons \xE0 venir", kpi.jalonsBientot, "text-teal-600")}
        ${miniKpi("Directions", Object.keys(kpi.byDirection).length, "text-gray-600")}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">R\xE9partition par statut</h3>
          <div class="relative h-48"><canvas id="chart-statuts"></canvas></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">R\xE9partition par priorit\xE9</h3>
          <div class="relative h-48"><canvas id="chart-priorites"></canvas></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">R\xE9partition par risque</h3>
          <div class="relative h-48"><canvas id="chart-risques"></canvas></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Projets par direction principale</h3>
          <div class="relative h-64"><canvas id="chart-directions"></canvas></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Jalons \xE0 venir \u2014 6 prochains mois</h3>
          <div class="relative h-64"><canvas id="chart-jalons"></canvas></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">R\xE9partition par type de projet</h3>
          <div class="relative h-64"><canvas id="chart-types"></canvas></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Top r\xE8glements &amp; initiatives</h3>
          <div class="relative h-64"><canvas id="chart-reglements"></canvas></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Taux de compl\xE9tion par direction</h3>
          <div class="relative h-72"><canvas id="chart-completion"></canvas></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Croisement risque \xD7 priorit\xE9</h3>
          <div class="relative h-72"><canvas id="chart-matrice"></canvas></div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-700">Jalons en retard par projet</h3>
            ${kpi.jalonsRetard > 0 ? `<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">${kpi.jalonsRetard}</span>` : ""}
          </div>
          ${kpi.overdueByProject.length === 0 ? '<p class="text-sm text-gray-400 px-5 py-4">\u2713 Aucun jalon en retard.</p>' : `<div class="overflow-x-auto"><table class="w-full text-sm">
            <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th class="px-4 py-2 text-left">Code</th><th class="px-4 py-2 text-left">Titre</th><th class="px-4 py-2 text-center">Retards</th><th class="px-4 py-2 text-right"></th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100">
              ${kpi.overdueByProject.map(({ project: p, count }) => `
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono font-bold">SPR-${String(p.code).padStart(3, "0")}</span></td>
                  <td class="px-4 py-2.5 max-w-xs truncate text-gray-800 font-medium">${escapeHtml(p.titre)}</td>
                  <td class="px-4 py-2.5 text-center"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">${count}</span></td>
                  <td class="px-4 py-2.5 text-right"><a href="#project-${p.code}" class="text-blue-600 hover:underline text-xs font-medium">Voir \u2192</a></td>
                </tr>`).join("")}
            </tbody></table></div>`}
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-700">Modifications r\xE9centes</h3>
            <span class="text-xs text-gray-400">${kpi.modifiedLast30} ce mois-ci</span>
          </div>
          ${recentList.length === 0 ? '<p class="text-sm text-gray-400 px-5 py-4">Aucune modification r\xE9cente.</p>' : `<div class="overflow-x-auto"><table class="w-full text-sm">
            <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th class="px-4 py-2 text-left">Projet</th><th class="px-4 py-2 text-center">Statut</th><th class="px-4 py-2 text-center">v.</th><th class="px-4 py-2 text-right">Date</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100">
              ${recentList.map((p) => `
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-2.5 max-w-xs truncate"><a href="#project-${p.code}" class="text-blue-600 hover:underline font-medium text-xs">${escapeHtml(p.titre)}</a></td>
                  <td class="px-4 py-2.5 text-center"><span class="px-1.5 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(p.statut)}">${escapeHtml(p.statut)}</span></td>
                  <td class="px-4 py-2.5 text-center text-xs text-gray-500">v${p.version || 1}</td>
                  <td class="px-4 py-2.5 text-right text-xs text-gray-500 whitespace-nowrap">${formatDate(p.derniere_modification)}</td>
                </tr>`).join("")}
            </tbody></table></div>`}
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100"><h3 class="text-sm font-semibold text-gray-700">Top juridictions</h3></div>
          <div class="divide-y divide-gray-100">
            ${top5Juridiction.map(([jur, count]) => `
              <div class="flex items-center gap-3 px-5 py-2.5">
                <span class="text-sm text-gray-700 flex-1 truncate">${escapeHtml(jur)}</span>
                <div class="w-20 bg-gray-100 rounded-full h-1.5 shrink-0"><div class="bg-teal-500 h-1.5 rounded-full" style="width:${Math.round(count / kpi.total * 100)}%"></div></div>
                <span class="text-xs font-bold text-gray-600 w-5 text-right shrink-0">${count}</span>
              </div>`).join("")}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100"><h3 class="text-sm font-semibold text-gray-700">Top r\xE8glements</h3></div>
          <div class="divide-y divide-gray-100">
            ${top8Reglements.slice(0, 5).map(([reg, count]) => `
              <div class="flex items-center gap-3 px-5 py-2.5">
                <span class="text-sm text-gray-700 font-mono flex-1 truncate">${escapeHtml(reg)}</span>
                <div class="w-20 bg-gray-100 rounded-full h-1.5 shrink-0"><div class="bg-indigo-500 h-1.5 rounded-full" style="width:${Math.round(count / kpi.total * 100)}%"></div></div>
                <span class="text-xs font-bold text-gray-600 w-5 text-right shrink-0">${count}</span>
              </div>`).join("")}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100"><h3 class="text-sm font-semibold text-gray-700">Compl\xE9tion par direction</h3></div>
          <div class="divide-y divide-gray-100 overflow-y-auto max-h-52">
            ${Object.entries(kpi.completionByDir).sort((a, b) => b[1].total - a[1].total).map(([dir, { total: t, done }]) => {
              const pct = t > 0 ? Math.round(done / t * 100) : 0;
              return `<div class="px-5 py-2.5">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-700 truncate max-w-[150px]" title="${escapeHtml(dir)}">${escapeHtml(shortDir(dir))}</span>
                  <span class="text-gray-500 font-medium ml-1 shrink-0">${done}/${t} (${pct}%)</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-1.5"><div class="bg-green-500 h-1.5 rounded-full" style="width:${pct}%"></div></div>
              </div>`;
            }).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
  }
  function kpiBigStatusRow(label, count, total, color) {
    const pct = total > 0 ? Math.round(count / total * 100) : 0;
    return `<div class="flex items-center gap-2 text-xs">
      <span class="text-gray-500 w-16 shrink-0">${label}</span>
      <div class="flex-1 bg-gray-100 rounded-full h-1.5">
        <div class="h-1.5 rounded-full" style="width:${pct}%;background:${color}"></div>
      </div>
      <span class="text-gray-700 font-semibold w-14 text-right shrink-0">${count}\u00a0(${pct}%)</span>
    </div>`;
  }
  function kpiAlertRow(label, count, dotClass, textClass) {
    return `<div class="flex items-center justify-between text-xs">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full ${dotClass} shrink-0"></span>
        <span class="text-gray-600">${label}</span>
      </div>
      <span class="font-bold ${textClass}">${count}</span>
    </div>`;
  }
  function miniKpi(label, value, textClass) {
    return `<div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
      <div class="text-xl font-bold ${textClass}">${value}</div>
      <div class="text-xs text-gray-400 mt-0.5 leading-tight">${label}</div>
    </div>`;
  }
  function iconCheckCircle() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }
  function iconStack() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
  }
  function iconClock() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/></svg>`;
  }
  function iconAlert() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
  }
  function iconShield() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`;
  }
  function iconCalendar() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>`;
  }
  function iconCog() {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
  }
  function initDashboardCharts(projects) {
    const kpi = computeKPIs(projects);
    Object.keys(window.sprCharts).forEach((k) => {
      if (window.sprCharts[k]) {
        try {
          window.sprCharts[k].destroy();
        } catch (e) {
        }
      }
    });
    window.sprCharts = {};
    const chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 11 }, padding: 10, boxWidth: 12 }
        }
      }
    };
    const ctxStatuts = document.getElementById("chart-statuts");
    if (ctxStatuts) {
      window.sprCharts["statuts"] = new Chart(ctxStatuts, {
        type: "doughnut",
        data: {
          labels: ["En cours", "Termin\xE9", "En attente", "Clos"],
          datasets: [{
            data: [kpi.enCours, kpi.termines, kpi.enAttente, kpi.clos],
            backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.amber, CHART_COLORS.gray],
            borderWidth: 2,
            borderColor: "#fff"
          }]
        },
        options: __spreadProps(__spreadValues({}, chartDefaults), { cutout: "65%" })
      });
    }
    const ctxPriorites = document.getElementById("chart-priorites");
    if (ctxPriorites) {
      const faible = projects.filter((p) => p.priorite === "faible").length;
      const moyen = projects.filter((p) => p.priorite === "moyen").length;
      window.sprCharts["priorites"] = new Chart(ctxPriorites, {
        type: "doughnut",
        data: {
          labels: ["\xC9lev\xE9", "Moyen", "Faible"],
          datasets: [{
            data: [kpi.prioriteElevee, moyen, faible],
            backgroundColor: [CHART_COLORS.red, CHART_COLORS.amber, CHART_COLORS.green],
            borderWidth: 2,
            borderColor: "#fff"
          }]
        },
        options: __spreadProps(__spreadValues({}, chartDefaults), { cutout: "65%" })
      });
    }
    const ctxRisques = document.getElementById("chart-risques");
    if (ctxRisques) {
      const risqueFaible = projects.filter((p) => p.niveau_risque === "faible").length;
      const risqueMoyen = projects.filter((p) => p.niveau_risque === "moyen").length;
      window.sprCharts["risques"] = new Chart(ctxRisques, {
        type: "doughnut",
        data: {
          labels: ["\xC9lev\xE9", "Moyen", "Faible"],
          datasets: [{
            data: [kpi.risqueEleve, risqueMoyen, risqueFaible],
            backgroundColor: [CHART_COLORS.red, CHART_COLORS.amber, CHART_COLORS.green],
            borderWidth: 2,
            borderColor: "#fff"
          }]
        },
        options: __spreadProps(__spreadValues({}, chartDefaults), { cutout: "65%" })
      });
    }
    const ctxDirections = document.getElementById("chart-directions");
    if (ctxDirections) {
      const sorted = Object.entries(kpi.byDirection).sort((a, b) => b[1] - a[1]).slice(0, 8);
      const shortNames = sorted.map(
        ([d]) => d.replace("Direction des ", "").replace("Direction de la ", "").replace("Direction de l'", "").substring(0, 22)
      );
      window.sprCharts["directions"] = new Chart(ctxDirections, {
        type: "bar",
        data: {
          labels: shortNames,
          datasets: [{
            label: "Projets",
            data: sorted.map(([, c]) => c),
            backgroundColor: CHART_COLORS.blue,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "#f1f5f9" } },
            x: { ticks: { font: { size: 9 }, maxRotation: 35 }, grid: { display: false } }
          }
        }
      });
    }
    const ctxJalons = document.getElementById("chart-jalons");
    if (ctxJalons) {
      window.sprCharts["jalons"] = new Chart(ctxJalons, {
        type: "bar",
        data: {
          labels: kpi.monthLabels.map((m) => m.label),
          datasets: [{
            label: "Jalons",
            data: kpi.monthLabels.map((m) => kpi.jalonsByMonth[m.key] || 0),
            backgroundColor: CHART_COLORS.teal,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 11 } }, grid: { color: "#f1f5f9" } },
            x: { ticks: { font: { size: 11 } }, grid: { display: false } }
          }
        }
      });
    }
    // Chart: types de projets (barres horizontales)
    const ctxTypes = document.getElementById("chart-types");
    if (ctxTypes) {
      const typesSorted = Object.entries(kpi.byType).sort((a, b) => b[1] - a[1]).slice(0, 8);
      const typeColors = [CHART_COLORS.blue, CHART_COLORS.indigo, CHART_COLORS.purple, CHART_COLORS.teal, CHART_COLORS.cyan, CHART_COLORS.orange, CHART_COLORS.amber, CHART_COLORS.green];
      window.sprCharts["types"] = new Chart(ctxTypes, {
        type: "bar",
        data: {
          labels: typesSorted.map(([t]) => t.length > 30 ? t.substring(0, 28) + "\u2026" : t),
          datasets: [{ data: typesSorted.map(([, c]) => c), backgroundColor: typeColors.slice(0, typesSorted.length), borderRadius: 4 }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "#f1f5f9" } },
            y: { ticks: { font: { size: 10 } }, grid: { display: false } }
          }
        }
      });
    }
    // Chart: top règlements (barres horizontales)
    const ctxReglements = document.getElementById("chart-reglements");
    if (ctxReglements) {
      const regSorted = Object.entries(kpi.byReglement).sort((a, b) => b[1] - a[1]).slice(0, 10);
      window.sprCharts["reglements"] = new Chart(ctxReglements, {
        type: "bar",
        data: {
          labels: regSorted.map(([r]) => r),
          datasets: [{ data: regSorted.map(([, c]) => c), backgroundColor: CHART_COLORS.indigo, borderRadius: 4 }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "#f1f5f9" } },
            y: { ticks: { font: { size: 11 } }, grid: { display: false } }
          }
        }
      });
    }
    // Chart: taux de complétion par direction (barres horizontales)
    const ctxCompletion = document.getElementById("chart-completion");
    if (ctxCompletion) {
      const dirsSorted = Object.entries(kpi.completionByDir).sort((a, b) => b[1].total - a[1].total).slice(0, 8);
      const shortDirFn = (d) => d.replace("Direction des ", "Dir. ").replace("Direction de la ", "Dir. ").replace("Direction de l'", "Dir. ").substring(0, 22);
      window.sprCharts["completion"] = new Chart(ctxCompletion, {
        type: "bar",
        data: {
          labels: dirsSorted.map(([d]) => shortDirFn(d)),
          datasets: [
            { label: "Termin\xE9s", data: dirsSorted.map(([, v]) => v.done), backgroundColor: CHART_COLORS.green, borderRadius: 4, stack: "s" },
            { label: "En cours / attente", data: dirsSorted.map(([, v]) => v.total - v.done), backgroundColor: CHART_COLORS.blue, borderRadius: 4, stack: "s" }
          ]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { font: { size: 10 }, boxWidth: 10, padding: 8 } } },
          scales: {
            x: { beginAtZero: true, stacked: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "#f1f5f9" } },
            y: { stacked: true, ticks: { font: { size: 10 } }, grid: { display: false } }
          }
        }
      });
    }
    // Chart: croisement risque × priorité (barres groupées)
    const ctxMatrice = document.getElementById("chart-matrice");
    if (ctxMatrice) {
      const niveaux = ["\xE9lev\xE9", "moyen", "faible"];
      window.sprCharts["matrice"] = new Chart(ctxMatrice, {
        type: "bar",
        data: {
          labels: ["Priorit\xE9 \xE9lev\xE9e", "Priorit\xE9 moyenne", "Priorit\xE9 faible"],
          datasets: [
            { label: "Risque \xE9lev\xE9",  data: niveaux.map((pr) => kpi.risquePrioriteCroix["\xE9lev\xE9"][pr]),  backgroundColor: CHART_COLORS.red,   borderRadius: 4 },
            { label: "Risque moyen",  data: niveaux.map((pr) => kpi.risquePrioriteCroix["moyen"][pr]),  backgroundColor: CHART_COLORS.amber, borderRadius: 4 },
            { label: "Risque faible", data: niveaux.map((pr) => kpi.risquePrioriteCroix["faible"][pr]), backgroundColor: CHART_COLORS.green, borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { font: { size: 10 }, boxWidth: 10, padding: 8 } } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "#f1f5f9" } },
            x: { ticks: { font: { size: 10 } }, grid: { display: false } }
          }
        }
      });
    }
  }

  // js/views/projects.js
  function computeProjectStatusChartData(projects) {
    const statuses = ["en cours", "termin\xE9", "en attente", "clos"];
    const counts = statuses.map((s) => projects.filter((p) => p.statut === s).length);
    return { statuses, counts };
  }
  function renderProjectsChart(projects) {
    const { statuses, counts } = computeProjectStatusChartData(projects);
    const chartContainer = document.getElementById("projects-stats-chart");
    if (!chartContainer || typeof Chart === "undefined")
      return;
    const ctx = chartContainer.getContext("2d");
    if (!ctx)
      return;
    try {
      // Si toutes les valeurs sont 0, afficher un graphique avec une seule tranche "Aucun projet"
      const totalCount = counts.reduce((sum, count) => sum + count, 0);
      const displayStatuses = totalCount === 0 ? ["Aucun projet"] : statuses;
      const displayCounts = totalCount === 0 ? [1] : counts;
      const displayColors = totalCount === 0 ? ["#9ca3af"] : ["#3b82f6", "#16a34a", "#d97706", "#6b7280"];

      if (window.sprProjectsStatusChart) {
        if (!document.contains(window.sprProjectsStatusChart.canvas)) {
          // Canvas was replaced in the DOM — destroy the stale chart instance
          try { window.sprProjectsStatusChart.destroy(); } catch (e) {}
          window.sprProjectsStatusChart = null;
        } else {
          window.sprProjectsStatusChart.data.labels = displayStatuses;
          window.sprProjectsStatusChart.data.datasets[0].data = displayCounts;
          window.sprProjectsStatusChart.data.datasets[0].backgroundColor = displayColors;
          window.sprProjectsStatusChart.update();
          return;
        }
      }
      window.sprProjectsStatusChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: displayStatuses,
          datasets: [{
            data: displayCounts,
            backgroundColor: displayColors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 10, padding: 12, color: "#374151" } }
          }
        }
      });
    } catch (error) {
      console.error("Erreur lors du rendu du graphique projects-stats-chart:", error);
      // Essayer de recréer le graphique en cas d'erreur
      if (window.sprProjectsStatusChart) {
        try {
          window.sprProjectsStatusChart.destroy();
        } catch (e) {}
        window.sprProjectsStatusChart = null;
      }
      try {
        window.sprProjectsStatusChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Erreur"],
            datasets: [{
              data: [1],
              backgroundColor: ["#ef4444"],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom", labels: { boxWidth: 10, padding: 12, color: "#374151" } }
            }
          }
        });
      } catch (retryError) {
        console.error("Erreur lors de la recréation du graphique:", retryError);
      }
    }
  }
  var _currentView = localStorage.getItem("spr.projects.view") || "cards";
  var _currentSort = localStorage.getItem("spr.projects.sort") || "code";
  var _sortAsc = localStorage.getItem("spr.projects.sortAsc") !== "false";
  function persistProjectsViewState() {
    localStorage.setItem("spr.projects.view", _currentView);
    localStorage.setItem("spr.projects.sort", _currentSort);
    localStorage.setItem("spr.projects.sortAsc", String(_sortAsc));
  }
  function renderProjectsList(projects, drafts = {}, filters = {}) {
    const filtered = applyFilters(projects, filters);
    const sorted = sortProjects(filtered, _currentSort, _sortAsc);
    const directions = [...new Set(projects.map((p) => p.direction_principale).filter(Boolean))].sort();
    const types = [...new Set(projects.map((p) => p.type_projet).filter(Boolean))].sort();
    const draftCodes = Object.keys(drafts).map(Number);
    return `
    <div class="animate-fadeIn" id="projects-list-root">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Projets r\xE9glementaires</h1>
          <p class="text-sm text-gray-500 mt-0.5" id="projects-count">${sorted.length} projet${sorted.length !== 1 ? "s" : ""} trouv\xE9${sorted.length !== 1 ? "s" : ""}</p>
        </div>
        <!-- View & sort order toggle -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex rounded-lg border border-gray-200 overflow-hidden">
            <button id="view-cards" class="px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${_currentView === "cards" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}" title="Vue cartes">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>
              <span class="hidden sm:inline">Cartes</span>
            </button>
            <button id="view-table" class="px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${_currentView === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}" title="Vue tableau">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18M3 18h18"/></svg>
              <span class="hidden sm:inline">Tableau</span>
            </button>
          </div>
          <button id="proj-sort-order" class="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50" title="Toggle tri ascendant/descendant">
            ${_sortAsc ? "\u2191" : "\u2193"}
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
              value="${escapeHtml(filters.search || "")}"
              class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
          </div>
          <!-- Filter row -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            ${filterSelect("proj-filter-statut", "Statut", [
      { value: "", label: "Tous les statuts" },
      { value: "en cours", label: "En cours" },
      { value: "termin\xE9", label: "Termin\xE9" },
      { value: "en attente", label: "En attente" },
      { value: "clos", label: "Clos" }
    ], filters.statut || "")}
            ${filterSelect("proj-filter-priorite", "Priorit\xE9", [
      { value: "", label: "Toutes les priorit\xE9s" },
      { value: "\xE9lev\xE9", label: "\xC9lev\xE9" },
      { value: "moyen", label: "Moyen" },
      { value: "faible", label: "Faible" }
    ], filters.priorite || "")}
            ${filterSelect("proj-filter-risque", "Risque", [
      { value: "", label: "Tous les risques" },
      { value: "\xE9lev\xE9", label: "\xC9lev\xE9" },
      { value: "moyen", label: "Moyen" },
      { value: "faible", label: "Faible" }
    ], filters.risque || "")}
            ${filterSelect("proj-filter-direction", "Direction", [
      { value: "", label: "Toutes les directions" },
      ...directions.map((d) => ({ value: d, label: d.replace("Direction des ", "Dir. ").replace("Direction de la ", "Dir. ").replace("Direction de l'", "Dir. ") }))
    ], filters.direction || "")}
            ${filterSelect("proj-filter-type", "Type", [
      { value: "", label: "Tous les types" },
      ...types.map((t) => ({ value: t, label: t }))
    ], filters.type || "")}
            <div class="relative">
              <svg class="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9M3 12h5"/>
              </svg>
              <select id="proj-sort" title="Trier par" class="pl-7 pr-2.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full">
                <option value="code" ${_currentSort === "code" ? "selected" : ""}>Code</option>
                <option value="titre" ${_currentSort === "titre" ? "selected" : ""}>Titre</option>
                <option value="statut" ${_currentSort === "statut" ? "selected" : ""}>Statut</option>
                <option value="priorite" ${_currentSort === "priorite" ? "selected" : ""}>Priorit\xE9</option>
                <option value="date" ${_currentSort === "date" ? "selected" : ""}>Date modification</option>
              </select>
            </div>
          </div>
          <!-- Active filters badges -->
          <div id="active-filters" class="flex flex-wrap gap-1.5">
            ${renderActiveFilterBadges(filters)}
          </div>

          <!-- Chart dynamique -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-5">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm font-semibold text-gray-700">Distribution par statut</h2>
              <p class="text-xs text-gray-500">Bas\xE9 sur les filtres actifs</p>
            </div>
            <div class="h-48 relative">
              <canvas id="projects-stats-chart" aria-label="Graphique statut projets"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div id="projects-results">
        ${sorted.length === 0 ? `<div class="text-center py-16 text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-lg font-medium">Aucun projet trouv\xE9</p>
              <p class="text-sm mt-1">Modifiez vos crit\xE8res de recherche</p>
            </div>` : _currentView === "cards" ? renderCardsView(sorted, draftCodes) : renderTableView(sorted, draftCodes)}
      </div>
    </div>
  `;
  }
  function filterSelect(id, placeholder, options, currentValue) {
    return `
    <select id="${id}" class="px-2.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full">
      ${options.map((o) => `<option value="${escapeHtml(o.value)}" ${o.value === currentValue ? "selected" : ""}>${escapeHtml(o.label)}</option>`).join("")}
    </select>
  `;
  }
  function renderActiveFilterBadges(filters) {
    const badges = [];
    const labels = { statut: "Statut", priorite: "Priorit\xE9", risque: "Risque", direction: "Direction", type: "Type", search: "Recherche" };
    for (const [key, val] of Object.entries(filters)) {
      if (val && val !== "") {
        const shortVal = val.length > 20 ? val.substring(0, 18) + "\u2026" : val;
        badges.push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        ${labels[key] || key}: ${escapeHtml(shortVal)}
        <button class="filter-remove-btn hover:text-blue-900 ml-0.5" data-filter="${key}">\xD7</button>
      </span>`);
      }
    }
    return badges.join("");
  }
  function renderCardsView(projects, draftCodes) {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${projects.map((p) => renderProjectCard(p, draftCodes.includes(p.code))).join("")}
    </div>
  `;
  }
  function renderProjectCard(p, hasDraft) {
    const resources = (p.Ressources_associees || []).slice(0, 3);
    const extraResources = Math.max(0, (p.Ressources_associees || []).length - 3);
    const jalons = p.jalons || [];
    const completedJalons = jalons.filter((j) => j.statut === "compl\xE9t\xE9").length;
    return `
    <article class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col" data-code="${p.code}">
      <!-- Card header -->
      <div class="flex items-start justify-between px-4 pt-4 pb-2 gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono font-bold">SPR-${String(p.code).padStart(3, "0")}</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(p.statut)}">${escapeHtml(p.statut)}</span>
          ${hasDraft ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>Brouillon</span>' : ""}
        </div>
      </div>

      <!-- Title -->
      <div class="px-4 pb-2 flex-1">
        <h3 class="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">${escapeHtml(p.titre)}</h3>
        <p class="text-xs text-gray-400">${escapeHtml(p.type_projet || "\u2014")}</p>
      </div>

      <!-- Direction -->
      <div class="px-4 pb-2">
        <p class="text-xs text-gray-500 truncate" title="${escapeHtml(p.direction_principale || "")}">
          <span class="text-gray-400">Dir.:</span> ${escapeHtml(p.direction_principale || "\u2014")}
        </p>
      </div>

      <!-- Badges -->
      <div class="flex flex-wrap items-center gap-1.5 px-4 pb-3">
        <span class="px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(p.priorite)}">Priorit\xE9: ${escapeHtml(p.priorite || "\u2014")}</span>
        <span class="px-1.5 py-0.5 rounded text-xs font-medium ${getRiskBadgeClass(p.niveau_risque)}">Risque: ${escapeHtml(p.niveau_risque || "\u2014")}</span>
      </div>

      <!-- Resources + Jalons -->
      <div class="flex items-center justify-between px-4 pb-3">
        <!-- Avatars -->
        <div class="flex items-center">
          ${resources.map((r, i) => `
            <div class="w-7 h-7 rounded-full border-2 border-white overflow-hidden ${i > 0 ? "-ml-2" : ""} shrink-0" title="${escapeHtml(r.prenom)} ${escapeHtml(r.nom)}">
              ${renderAvatarHtml(r, "w-full h-full")}
            </div>
          `).join("")}
          ${extraResources > 0 ? `<div class="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium -ml-2">+${extraResources}</div>` : ""}
        </div>

        <!-- Jalons progress -->
        ${jalons.length > 0 ? `
          <div class="flex items-center gap-1" title="${completedJalons}/${jalons.length} jalons compl\xE9t\xE9s">
            ${jalons.slice(0, 5).map((j) => `
              <div class="w-2 h-2 rounded-full ${j.statut === "compl\xE9t\xE9" ? "bg-green-400" : j.statut === "en cours" ? "bg-blue-400" : j.statut === "report\xE9" ? "bg-amber-400" : "bg-gray-200"}"></div>
            `).join("")}
            ${jalons.length > 5 ? `<span class="text-xs text-gray-400">+${jalons.length - 5}</span>` : ""}
          </div>
        ` : ""}
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <span class="text-xs text-gray-400">v${p.version || 1} \xB7 ${p.derniere_modification ? formatDate(p.derniere_modification) : "\u2014"}</span>
        <a href="#project-${p.code}" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
          Voir \u2192
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
              <th class="px-4 py-3 text-left font-semibold">Priorit\xE9</th>
              <th class="px-4 py-3 text-left font-semibold">Risque</th>
              <th class="px-4 py-3 text-left font-semibold hidden lg:table-cell">Direction</th>
              <th class="px-4 py-3 text-left font-semibold hidden xl:table-cell">\xC9quipe</th>
              <th class="px-4 py-3 text-center font-semibold hidden md:table-cell">Version</th>
              <th class="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${projects.map((p) => `
              <tr class="hover:bg-gray-50 transition-colors" data-code="${p.code}">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">SPR-${String(p.code).padStart(3, "0")}</span>
                    ${draftCodes.includes(p.code) ? '<span class="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Brouillon en cours"></span>' : ""}
                  </div>
                </td>
                <td class="px-4 py-3 max-w-xs">
                  <a href="#project-${p.code}" class="text-gray-900 hover:text-blue-600 font-medium line-clamp-1 transition-colors">${escapeHtml(p.titre)}</a>
                  <p class="text-xs text-gray-400 truncate">${escapeHtml(p.type_projet || "")}</p>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(p.statut)}">${escapeHtml(p.statut)}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(p.priorite)}">${escapeHtml(p.priorite || "\u2014")}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded text-xs font-medium ${getRiskBadgeClass(p.niveau_risque)}">${escapeHtml(p.niveau_risque || "\u2014")}</span>
                </td>
                <td class="px-4 py-3 hidden lg:table-cell">
                  <span class="text-xs text-gray-600 line-clamp-1" title="${escapeHtml(p.direction_principale || "")}">${escapeHtml((p.direction_principale || "\u2014").replace("Direction des ", "").replace("Direction de la ", "").replace("Direction de l'", ""))}</span>
                </td>
                <td class="px-4 py-3 hidden xl:table-cell">
                  <div class="flex -space-x-1">
                    ${(p.Ressources_associees || []).slice(0, 4).map((r) => `
                      <div class="w-6 h-6 rounded-full border border-white overflow-hidden shrink-0" title="${escapeHtml(r.prenom)} ${escapeHtml(r.nom)}">
                        ${renderAvatarHtml(r, "w-full h-full")}
                      </div>
                    `).join("")}
                  </div>
                </td>
                <td class="px-4 py-3 text-center hidden md:table-cell">
                  <span class="text-xs text-gray-500">v${p.version || 1}</span>
                </td>
                <td class="px-4 py-3 text-right">
                  <a href="#project-${p.code}" class="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                    Voir \u2192
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }
  function applyFilters(projects, filters) {
    let result = [...projects];
    const { search, statut, priorite, risque, direction, type } = filters;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => (p.titre || "").toLowerCase().includes(q) || String(p.code).includes(q) || `spr-${String(p.code).padStart(3, "0")}`.includes(q) || (p.type_projet || "").toLowerCase().includes(q) || (p.direction_principale || "").toLowerCase().includes(q) || (p.reglement || "").toLowerCase().includes(q)
      );
    }
    if (statut)
      result = result.filter((p) => p.statut === statut);
    if (priorite)
      result = result.filter((p) => p.priorite === priorite);
    if (risque)
      result = result.filter((p) => p.niveau_risque === risque);
    if (direction)
      result = result.filter((p) => p.direction_principale === direction);
    if (type)
      result = result.filter((p) => p.type_projet === type);
    return result;
  }
  function sortProjects(projects, sortKey, asc) {
    return [...projects].sort((a, b) => {
      var _a, _b;
      let va, vb;
      switch (sortKey) {
        case "titre":
          va = (a.titre || "").toLowerCase();
          vb = (b.titre || "").toLowerCase();
          break;
        case "statut":
          va = a.statut || "";
          vb = b.statut || "";
          break;
        case "priorite": {
          const order = { "\xE9lev\xE9": 0, "moyen": 1, "faible": 2 };
          va = (_a = order[a.priorite]) != null ? _a : 99;
          vb = (_b = order[b.priorite]) != null ? _b : 99;
          break;
        }
        case "date":
          va = a.derniere_modification || "";
          vb = b.derniere_modification || "";
          break;
        default:
          va = a.code;
          vb = b.code;
      }
      if (va < vb)
        return asc ? -1 : 1;
      if (va > vb)
        return asc ? 1 : -1;
      return 0;
    });
  }
  function attachProjectsListeners(projects, drafts, currentFilters, onFilterChange) {
    var _a, _b, _c, _d;
    const root = document.getElementById("projects-list-root");
    if (!root)
      return;
    const getFilters = () => {
      var _a2, _b2, _c2, _d2, _e, _f;
      return {
        search: ((_a2 = document.getElementById("proj-search")) == null ? void 0 : _a2.value) || "",
        statut: ((_b2 = document.getElementById("proj-filter-statut")) == null ? void 0 : _b2.value) || "",
        priorite: ((_c2 = document.getElementById("proj-filter-priorite")) == null ? void 0 : _c2.value) || "",
        risque: ((_d2 = document.getElementById("proj-filter-risque")) == null ? void 0 : _d2.value) || "",
        direction: ((_e = document.getElementById("proj-filter-direction")) == null ? void 0 : _e.value) || "",
        type: ((_f = document.getElementById("proj-filter-type")) == null ? void 0 : _f.value) || ""
      };
    };
    const rerender = () => {
      const filters = getFilters();
      const sortEl = document.getElementById("proj-sort");
      if (sortEl)
        _currentSort = sortEl.value;
      persistProjectsViewState();
      renderProjectsChart(applyFilters(projects, filters));
      onFilterChange(filters);
    };
    const debouncedRerender = debounce(rerender, 250);
    renderProjectsChart(applyFilters(projects, currentFilters));
    (_a = document.getElementById("proj-search")) == null ? void 0 : _a.addEventListener("input", debouncedRerender);
    [
      "proj-filter-statut",
      "proj-filter-priorite",
      "proj-filter-risque",
      "proj-filter-direction",
      "proj-filter-type",
      "proj-sort"
    ].forEach((id) => {
      var _a2;
      (_a2 = document.getElementById(id)) == null ? void 0 : _a2.addEventListener("change", rerender);
    });
    (_b = document.getElementById("view-cards")) == null ? void 0 : _b.addEventListener("click", () => {
      _currentView = "cards";
      persistProjectsViewState();
      rerender();
    });
    (_c = document.getElementById("view-table")) == null ? void 0 : _c.addEventListener("click", () => {
      _currentView = "table";
      persistProjectsViewState();
      rerender();
    });
    (_d = document.getElementById("proj-sort-order")) == null ? void 0 : _d.addEventListener("click", (event) => {
      _sortAsc = !_sortAsc;
      const button = event.currentTarget;
      if (button)
        button.textContent = _sortAsc ? "\u2191" : "\u2193";
      persistProjectsViewState();
      rerender();
    });
    root.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-remove-btn");
      if (!btn)
        return;
      const key = btn.dataset.filter;
      const elMap = {
        statut: "proj-filter-statut",
        priorite: "proj-filter-priorite",
        risque: "proj-filter-risque",
        direction: "proj-filter-direction",
        type: "proj-filter-type",
        search: "proj-search"
      };
      const el = document.getElementById(elMap[key]);
      if (el) {
        el.value = "";
        rerender();
      }
    });
  }

  // js/components/modal.js
  var SIZE_CLASSES = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl"
  };
  function openModal(htmlContent, options = {}) {
    const { title = "", size = "md", showClose = true, onClose = null } = options;
    const container = document.getElementById("modal-container");
    if (!container)
      return;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    container.innerHTML = `
    <div id="modal-backdrop"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      aria-modal="true" role="dialog">
      <div class="relative bg-white rounded-xl shadow-2xl w-full ${sizeClass} flex flex-col max-h-[90vh] animate-slideUp"
        id="modal-dialog">
        ${title || showClose ? `
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          ${title ? `<h2 class="text-lg font-semibold text-gray-900">${title}</h2>` : "<div></div>"}
          ${showClose ? `
          <button id="modal-close-btn" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Fermer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>` : ""}
        </div>` : ""}
        <div class="flex-1 overflow-y-auto px-6 py-4" id="modal-body">
          ${htmlContent}
        </div>
      </div>
    </div>
  `;
    container.classList.remove("hidden");
    container._onClose = onClose;
    const backdrop = container.querySelector("#modal-backdrop");
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop)
        closeModal();
    });
    const closeBtn = container.querySelector("#modal-close-btn");
    if (closeBtn)
      closeBtn.addEventListener("click", closeModal);
    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleKey);
      }
    };
    document.addEventListener("keydown", handleKey);
    container._keyHandler = handleKey;
  }
  function closeModal() {
    const container = document.getElementById("modal-container");
    if (!container)
      return;
    const dialog = container.querySelector("#modal-dialog");
    if (dialog) {
      dialog.classList.add("opacity-0", "scale-95");
      dialog.style.transition = "opacity 150ms, transform 150ms";
    }
    setTimeout(() => {
      container.classList.add("hidden");
      container.innerHTML = "";
      if (container._keyHandler) {
        document.removeEventListener("keydown", container._keyHandler);
        container._keyHandler = null;
      }
      if (typeof container._onClose === "function") {
        container._onClose();
        container._onClose = null;
      }
    }, 150);
  }

  // js/views/history.js
  function renderHistory(projectCode, historyEntries) {
    const sorted = [...historyEntries].sort((a, b) => b.version - a.version);
    const publishedCount = sorted.filter((e) => e.action === "published").length;
    const draftCount = sorted.filter((e) => e.action === "draft").length;
    return `
    <div id="history-root" class="animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 class="text-base font-semibold text-gray-800">
            Lign\xE9e \u2014 Projet <span class="text-blue-600">SPR-${String(projectCode).padStart(3, "0")}</span>
          </h2>
          <p class="text-xs text-gray-400 mt-0.5">
            ${sorted.length} version${sorted.length !== 1 ? "s" : ""} \xB7
            ${publishedCount} publi\xE9e${publishedCount !== 1 ? "s" : ""} \xB7
            ${draftCount} brouillon${draftCount !== 1 ? "s" : ""}
          </p>
        </div>

        <!-- Filter -->
        <div class="flex gap-1 shrink-0">
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-blue-600 text-white transition-colors" data-filter="all">
            Tout
          </button>
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors" data-filter="published">
            Publi\xE9es
          </button>
          <button class="history-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors" data-filter="draft">
            Brouillons
          </button>
        </div>
      </div>

      ${sorted.length === 0 ? `<div class="text-center py-12 text-gray-400">
            <svg class="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm">Aucun historique disponible.</p>
          </div>` : `<div class="relative">
            <div class="absolute left-5 top-0 bottom-0 w-px bg-gray-200"></div>
            <div class="space-y-4" id="history-timeline">
              ${sorted.map((entry, idx) => renderHistoryEntry(entry, idx, sorted)).join("")}
            </div>
          </div>`}
    </div>
  `;
  }
  function renderHistoryEntry(entry, idx, allEntries) {
    var _a, _b;
    const isPublished = entry.action === "published";
    const dotColor = isPublished ? "bg-green-500" : "bg-amber-400";
    const actionLabel = isPublished ? "Publi\xE9" : "Brouillon";
    const actionClass = isPublished ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200";
    const changedByInitials = (entry.changedBy || "?").split("@")[0].split(".").map((s) => {
      var _a2;
      return ((_a2 = s[0]) == null ? void 0 : _a2.toUpperCase()) || "?";
    }).join("").substring(0, 2);
    const changedByShort = (entry.changedBy || "\u2014").split("@")[0].replace(".", " ");
    const hasChanges = Array.isArray(entry.changes) && entry.changes.length > 0;
    const hasPrev = idx < allEntries.length - 1;
    const hasNext = idx > 0;
    return `
    <div class="history-entry pl-12 relative" data-action="${entry.action}" data-id="${entry.id}">
      <!-- Timeline dot -->
      <div class="absolute left-2.5 top-4 w-5 h-5 rounded-full ${dotColor} border-2 border-white shadow-sm flex items-center justify-center">
        ${isPublished ? `<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>` : `<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/></svg>`}
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
              Voir les d\xE9tails
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
            <p class="text-xs font-medium text-gray-500 mb-2">Champs modifi\xE9s :</p>
            <ul class="space-y-1.5">
              ${entry.changes.map((ch) => renderChangeDiff(ch)).join("")}
            </ul>
          </div>
        ` : `
          <div class="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p class="text-xs text-gray-400">Aucun champ modifi\xE9 enregistr\xE9.</p>
          </div>
        `}

        <!-- Snapshot (collapsed by default) -->
        <div id="snapshot-${entry.id}" class="hidden px-4 py-3 overflow-auto max-h-72">
          <p class="text-xs font-medium text-gray-500 mb-2">Instantan\xE9 complet de la version :</p>
          ${renderSnapshotSummary(entry.snapshot)}
        </div>

        <!-- Navigation prev/next -->
        ${hasPrev || hasNext ? `
          <div class="flex justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
            ${hasNext ? `<a href="#" class="text-xs text-blue-600 hover:underline" onclick="event.preventDefault()">\u2190 Version pr\xE9c\xE9dente (v${(_a = allEntries[idx - 1]) == null ? void 0 : _a.version})</a>` : "<span></span>"}
            ${hasPrev ? `<a href="#" class="text-xs text-blue-600 hover:underline" onclick="event.preventDefault()">Version suivante (v${(_b = allEntries[idx + 1]) == null ? void 0 : _b.version}) \u2192</a>` : "<span></span>"}
          </div>
        ` : ""}
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
      <span class="mx-1 text-gray-400">\u2192</span>
      <span class="text-green-600 bg-green-50 px-1 rounded">${escapeHtml(newVal)}</span>
    </li>
  `;
  }
  function formatChangeValue(val) {
    if (val === null || val === void 0)
      return "(vide)";
    if (typeof val === "boolean")
      return val ? "Oui" : "Non";
    if (Array.isArray(val))
      return `[${val.length} \xE9l\xE9ments]`;
    if (typeof val === "object")
      return "[objet]";
    const s = String(val);
    return s.length > 60 ? s.substring(0, 57) + "\u2026" : s;
  }
  function renderSnapshotSummary(snapshot) {
    if (!snapshot)
      return '<p class="text-xs text-gray-400">Instantan\xE9 non disponible.</p>';
    const fields = [
      { key: "titre", label: "Titre" },
      { key: "statut", label: "Statut" },
      { key: "priorite", label: "Priorit\xE9" },
      { key: "niveau_risque", label: "Risque" },
      { key: "type_projet", label: "Type de projet" },
      { key: "reglement", label: "R\xE8glement" },
      { key: "direction_principale", label: "Direction principale" },
      { key: "juridiction_principale", label: "Juridiction principale" },
      { key: "version", label: "Version" }
    ];
    return `
    <dl class="grid grid-cols-2 gap-2">
      ${fields.map((f) => {
      var _a;
      return snapshot[f.key] !== void 0 ? `
        <div>
          <dt class="text-xs text-gray-400">${escapeHtml(f.label)}</dt>
          <dd class="text-xs font-medium text-gray-700 truncate">${escapeHtml(String((_a = snapshot[f.key]) != null ? _a : "\u2014"))}</dd>
        </div>
      ` : "";
    }).join("")}
    </dl>
    ${snapshot.description ? `
      <div class="mt-3 pt-3 border-t border-gray-100">
        <dt class="text-xs text-gray-400 mb-1">Description</dt>
        <dd class="text-xs text-gray-600 leading-relaxed line-clamp-3">${escapeHtml(snapshot.description)}</dd>
      </div>
    ` : ""}
  `;
  }
  var FIELD_LABELS = {
    titre: "Titre",
    statut: "Statut",
    priorite: "Priorit\xE9",
    niveau_risque: "Niveau de risque",
    type_projet: "Type de projet",
    reglement: "R\xE8glement",
    description: "Description",
    enjeux: "Enjeux",
    discussion: "Discussion",
    direction_principale: "Direction principale",
    juridiction_principale: "Juridiction principale",
    impact_systeme: "Impact syst\xE8me",
    impact_description: "Description impact",
    loi: "Lois applicables",
    direction_responsable: "Directions responsables",
    Ressources_associees: "Ressources associ\xE9es",
    soutien_juridique: "Soutien juridique",
    Comite_ACVM: "Comit\xE9 ACVM",
    groupe_de_travail: "Groupe de travail",
    jalons: "Jalons",
    rencontres_approbations: "Rencontres/Approbations",
    developpements_significatifs: "D\xE9veloppements significatifs",
    documents: "Documents",
    media: "M\xE9dias",
    version: "Version"
  };

  // js/views/project.js
  var _editMode = false;
  var _viewingDraft = false;
  var _activeTab = "general";
  function getProjectEditMode() {
    return _editMode;
  }
  function renderProject(project, draft, isContributor2, editMode = false) {
    _editMode = editMode;
    const displayData = _viewingDraft && draft ? draft.data : project;
    return `
    <div class="animate-fadeIn" id="project-root" data-code="${project.code}">
      ${renderProjectHeader(project, displayData, draft, isContributor2)}
      ${renderDraftBanner(draft, isContributor2)}
      ${renderTabNav()}
      <div id="tab-content" class="mt-4">
        ${renderTabContent(displayData, draft, isContributor2, _activeTab)}
      </div>
    </div>
  `;
  }
  function renderProjectHeader(project, displayData, draft, isContributor2) {
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
              SPR-${String(project.code).padStart(3, "0")}
            </span>
            <span class="px-2.5 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(displayData.statut)}">${escapeHtml(displayData.statut)}</span>
            <span class="px-2.5 py-1 rounded text-sm font-medium ${getPriorityBadgeClass(displayData.priorite)}">Priorit\xE9: ${escapeHtml(displayData.priorite)}</span>
            <span class="px-2.5 py-1 rounded text-sm font-medium ${getRiskBadgeClass(displayData.niveau_risque)}">Risque: ${escapeHtml(displayData.niveau_risque)}</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900 leading-tight">${escapeHtml(displayData.titre)}</h1>
          <p class="text-sm text-gray-500 mt-1">${escapeHtml(displayData.type_projet || "")} \xB7 ${escapeHtml(displayData.reglement || "")} \xB7 v${displayData.version || 1}</p>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-2 shrink-0 flex-wrap">
          ${draft && isContributor2 ? `
            <button id="toggle-draft-view" class="px-3 py-1.5 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors">
              ${_viewingDraft ? "Voir version publi\xE9e" : "Voir brouillon"}
            </button>
          ` : ""}
          ${isContributor2 && !_editMode ? `
            <button id="btn-edit-mode" class="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modifier
            </button>
          ` : ""}
          <button id="btn-preview" class="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Aper\xE7u / PDF
          </button>
          ${isContributor2 && draft ? `
            <button id="btn-publish" class="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Publier v${(project.version || 1) + 1}
            </button>
          ` : ""}
        </div>
      </div>
    </div>
  `;
  }
  function renderDraftBanner(draft, isContributor2) {
    if (!draft || !isContributor2)
      return "";
    return `
    <div class="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      <div class="flex-1">
        <p class="text-sm font-medium text-amber-800">Un brouillon est en cours</p>
        <p class="text-xs text-amber-600 mt-0.5">
          Modifi\xE9 par ${escapeHtml(draft.modifie_par || "\u2014")} \xB7
          ${draft.modifie_le ? formatDateTime(draft.modifie_le) : ""}
        </p>
      </div>
    </div>
  `;
  }
  function renderTabNav() {
    const tabs = [
      { id: "general", label: "G\xE9n\xE9ral" },
      { id: "equipe", label: "\xC9quipe" },
      { id: "chronologie", label: "Chronologie" },
      { id: "documents", label: "Documents" },
      { id: "historique", label: "Historique" }
    ];
    return `
    <div class="border-b border-gray-200">
      <nav class="flex gap-0 -mb-px overflow-x-auto" id="tab-nav">
        ${tabs.map((t) => `
          <button class="tab-btn px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
            ${_activeTab === t.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}"
            data-tab="${t.id}">
            ${t.label}
          </button>
        `).join("")}
      </nav>
    </div>
  `;
  }
  function renderTabContent(data, draft, isContributor2, tab) {
    switch (tab) {
      case "general":
        return _editMode ? renderEditForm(data) : renderGeneralTab(data);
      case "equipe":
        return _editMode ? renderEditEquipeForm(data) : renderEquipeTab(data);
      case "chronologie":
        return _editMode ? renderEditChronologieForm(data) : renderChronologieTab(data);
      case "documents":
        return renderDocumentsTab(data);
      case "historique":
        return renderHistoriqueTab(data.code);
      default:
        return renderGeneralTab(data);
    }
  }
  function renderGeneralTab(data) {
    return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Sidebar metadata -->
      <div class="space-y-4">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Informations</h3>
          <dl class="space-y-2.5">
            ${metaItem("R\xE8glement", data.reglement)}
            ${metaItem("Type de projet", data.type_projet)}
            ${metaItem("Juridiction principale", Array.isArray(data.juridiction_principale) ? data.juridiction_principale.join(", ") : data.juridiction_principale)}
            ${metaItem("Direction principale", data.direction_principale)}
          </dl>
        </div>

        ${(data.loi || []).length > 0 ? `
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Lois applicables</h3>
            <div class="flex flex-wrap gap-1.5">
              ${(data.loi || []).map((l) => `<span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">${escapeHtml(l)}</span>`).join("")}
            </div>
          </div>
        ` : ""}

        ${(data.direction_responsable || []).length > 0 ? `
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Directions responsables</h3>
            <ul class="space-y-1">
              ${(data.direction_responsable || []).map((d) => `<li class="text-sm text-gray-700">\u2022 ${escapeHtml(d)}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Impact syst\xE8me</h3>
          <div class="flex items-center gap-2">
            ${data.impact_systeme ? `<span class="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Impact identifi\xE9</span>` : `<span class="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Aucun impact</span>`}
          </div>
          ${data.impact_systeme && data.impact_description ? `<p class="text-sm text-gray-600 mt-2">${escapeHtml(data.impact_description)}</p>` : ""}
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-2 space-y-5">
        ${textBlock("Description", data.description)}
        ${textBlock("Enjeux", data.enjeux)}
        ${textBlock("Discussion", data.discussion)}
      </div>
    </div>
  `;
  }
  function textBlock(label, text) {
    if (!text)
      return "";
    return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">${escapeHtml(label)}</h3>
      <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">${escapeHtml(text)}</p>
    </div>
  `;
  }
  function metaItem(label, value) {
    if (!value)
      return "";
    return `<div>
    <dt class="text-xs text-gray-400">${escapeHtml(label)}</dt>
    <dd class="text-sm text-gray-800 font-medium mt-0.5">${escapeHtml(value)}</dd>
  </div>`;
  }
  function renderEquipeTab(data) {
    return `
    <div class="space-y-6">
      ${renderPersonList("Ressources associ\xE9es", data.Ressources_associees || [], true)}
      ${renderPersonList("Soutien juridique", data.soutien_juridique || [], true)}
      ${renderCommitteeTable("Comit\xE9 ACVM", data.Comite_ACVM || [])}
      ${renderCommitteeTable("Groupe de travail", data.groupe_de_travail || [])}
    </div>
  `;
  }
  function renderPersonList(title, people, showRole) {
    if (!people.length)
      return "";
    return `
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700">${escapeHtml(title)}</h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
        ${people.map((p) => `
          <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full overflow-hidden shrink-0">
              ${renderAvatarHtml(p, "w-full h-full")}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-800">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)}</p>
              ${showRole && p.role ? `<p class="text-xs text-blue-600">${escapeHtml(p.role)}</p>` : ""}
              <a href="mailto:${escapeHtml(p.email)}" class="text-xs text-gray-400 hover:text-blue-600 truncate block transition-colors">${escapeHtml(p.email)}</a>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  }
  function renderCommitteeTable(title, members) {
    if (!members.length)
      return "";
    return `
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700">${escapeHtml(title)}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th class="px-4 py-2 text-left">Pr\xE9nom</th>
            <th class="px-4 py-2 text-left">Nom</th>
            <th class="px-4 py-2 text-left">Courriel</th>
            <th class="px-4 py-2 text-left">Institution</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            ${members.map((m) => `
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-2.5">${escapeHtml(m.prenom)}</td>
                <td class="px-4 py-2.5 font-medium">${escapeHtml(m.nom)}</td>
                <td class="px-4 py-2.5"><a href="mailto:${escapeHtml(m.email)}" class="text-blue-600 hover:underline text-xs">${escapeHtml(m.email)}</a></td>
                <td class="px-4 py-2.5 text-gray-500 text-xs">${escapeHtml(m.institution)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }
  function renderChronologieTab(data) {
    return `
    <div class="space-y-6">
      ${renderTimelineSection("Jalons", data.jalons || [])}
      ${renderTimelineSection("Rencontres et approbations", data.rencontres_approbations || [])}
      ${renderTimelineSection("D\xE9veloppements significatifs", data.developpements_significatifs || [])}
    </div>
  `;
  }
  var TIMELINE_STATUS_COLORS = {
    "compl\xE9t\xE9": "bg-green-500",
    "tenu": "bg-green-500",
    "planifi\xE9": "bg-blue-400",
    "\xE0 venir": "bg-blue-400",
    "en cours": "bg-blue-500",
    "report\xE9": "bg-amber-400",
    "annul\xE9": "bg-gray-300",
    "default": "bg-gray-300"
  };
  function getTimelineDotColor(statut) {
    return TIMELINE_STATUS_COLORS[statut] || TIMELINE_STATUS_COLORS.default;
  }
  function renderTimelineSection(title, items) {
    if (!items.length) {
      return `
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">${escapeHtml(title)}</h3>
        <p class="text-sm text-gray-400">Aucune entr\xE9e.</p>
      </div>
    `;
    }
    return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-semibold text-gray-700 mb-5">${escapeHtml(title)} <span class="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">${items.length}</span></h3>
      <div class="relative">
        <div class="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
        <div class="space-y-6">
          ${items.map((item) => {
      const dotColor = getTimelineDotColor(item.statut);
      const lastDate = item.date_changement && item.date_changement.length > 0 ? item.date_changement[item.date_changement.length - 1] : item.date_initiale;
      const hasChanges = item.date_changement && item.date_changement.length > 0;
      return `
              <div class="pl-9 relative">
                <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full ${dotColor} border-2 border-white shadow-sm flex items-center justify-center">
                  ${item.statut === "compl\xE9t\xE9" || item.statut === "tenu" ? `<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>` : item.statut === "annul\xE9" ? `<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>` : ""}
                </div>
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 leading-snug">${escapeHtml(item.description)}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                      <span class="text-xs text-gray-400">Date initiale: ${formatDate(item.date_initiale)}</span>
                      ${hasChanges ? `
                        <span class="text-xs text-amber-600">\u2192 R\xE9vis\xE9: ${formatDate(lastDate)}</span>
                        ${item.date_changement.length > 1 ? `<span class="text-xs text-gray-400">(${item.date_changement.length} r\xE9visions)</span>` : ""}
                      ` : ""}
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${item.statut === "compl\xE9t\xE9" || item.statut === "tenu" ? "bg-green-100 text-green-700" : item.statut === "en cours" ? "bg-blue-100 text-blue-700" : item.statut === "report\xE9" ? "bg-amber-100 text-amber-700" : item.statut === "annul\xE9" ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-600"}">${escapeHtml(item.statut)}</span>
                </div>
              </div>
            `;
    }).join("")}
        </div>
      </div>
    </div>
  `;
  }
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
        ${docs.length === 0 ? '<p class="text-sm text-gray-400 px-5 py-4">Aucun document associ\xE9.</p>' : `<div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th class="px-4 py-2 text-left">Titre</th>
                  <th class="px-4 py-2 text-left hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left hidden lg:table-cell">Description</th>
                  <th class="px-4 py-2 text-left hidden md:table-cell">Date</th>
                  <th class="px-4 py-2 text-left hidden xl:table-cell">Charg\xE9 par</th>
                  <th class="px-4 py-2 text-right">Lien</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-100">
                  ${docs.map((d) => `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-2.5 font-medium text-gray-800">${escapeHtml(d.titre)}</td>
                      <td class="px-4 py-2.5 hidden sm:table-cell"><span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">${escapeHtml(d.type_document)}</span></td>
                      <td class="px-4 py-2.5 hidden lg:table-cell text-gray-500 max-w-xs truncate text-xs">${escapeHtml(d.description || "\u2014")}</td>
                      <td class="px-4 py-2.5 hidden md:table-cell text-gray-500 text-xs">${formatDate(d.chargement_date)}</td>
                      <td class="px-4 py-2.5 hidden xl:table-cell text-gray-400 text-xs">${escapeHtml(d.chargement_par || "\u2014")}</td>
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
                  `).join("")}
                </tbody>
              </table>
            </div>`}
      </div>

      <!-- Media -->
      ${media.length > 0 ? `
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">M\xE9dias <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">${media.length}</span></h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${media.map((m) => `
              <a href="${escapeHtml(m.lien)}" target="_blank" rel="noopener noreferrer"
                class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">${escapeHtml(m.label)}</p>
                  <p class="text-xs text-gray-400">${escapeHtml(m.auteur || "")} \xB7 ${formatDate(m.chargement_date)}</p>
                </div>
              </a>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
  }
  function renderHistoriqueTab(code) {
    return `
    <div id="history-tab-content">
      <p class="text-sm text-gray-400 py-6 text-center">Chargement de l'historique...</p>
    </div>
  `;
  }
  function renderEditForm(data) {
    return `
    <form id="edit-form" class="space-y-5">
      <div class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <p class="text-sm text-amber-800">Mode \xE9dition \u2014 Les modifications seront enregistr\xE9es comme brouillon jusqu'\xE0 publication.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Titre -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Informations g\xE9n\xE9rales</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${formField("Titre du projet", "text", "edit-titre", data.titre, "md:col-span-2")}
            ${formSelect("Type de projet", "edit-type_projet", [
      "Avis",
      "Mandat sp\xE9cial",
      "Qu\xE9bec seulement - nouveau r\xE8glement",
      "Qu\xE9bec seulement - modification et r\xE9vision",
      "ACVM - nouveau r\xE8glement",
      "ACVM - modification et r\xE9vision"
    ], data.type_projet)}
            ${formField("R\xE8glement", "text", "edit-reglement", data.reglement)}
            ${formSelect("Statut", "edit-statut", ["en cours", "termin\xE9", "en attente", "clos"], data.statut)}
            ${formSelect("Priorit\xE9", "edit-priorite", ["faible", "moyen", "\xE9lev\xE9"], data.priorite)}
            ${formSelect("Niveau de risque", "edit-niveau_risque", ["faible", "moyen", "\xE9lev\xE9"], data.niveau_risque)}
            ${formMultiSelect("Juridiction principale", "edit-juridiction_principale", [
      "Ontario",
      "Qu\xE9bec",
      "Colombie-Britannique",
      "Alberta",
      "Manitoba",
      "Saskatchewan",
      "Nouveau-Brunswick",
      "Nouvelle-\xC9cosse",
      "\xCEle-du-Prince-\xC9douard",
      "Terre-Neuve-et-Labrador",
      "Yukon",
      "Territoires du Nord-Ouest",
      "Nunavut",
      "ACVM"
    ], data.juridiction_principale)}
            ${formSelect("Direction principale", "edit-direction_principale", [
      "Direction des march\xE9s des valeurs mobili\xE8res",
      "Direction de la r\xE9glementation",
      "Direction des affaires juridiques",
      "Direction de la conformit\xE9 et des inspections",
      "Direction de la surveillance",
      "Direction des ressources humaines",
      "Direction des technologies de l'information",
      "Direction des communications",
      "Direction des finances",
      "Direction de la protection des investisseurs"
    ], data.direction_principale)}
            ${formMultiSelect("Directions responsables", "edit-direction_responsable", [
      "Direction des march\xE9s des valeurs mobili\xE8res",
      "Direction de la r\xE9glementation",
      "Direction des affaires juridiques",
      "Direction de la conformit\xE9 et des inspections",
      "Direction de la surveillance",
      "Direction des ressources humaines",
      "Direction des technologies de l'information",
      "Direction des communications",
      "Direction des finances",
      "Direction de la protection des investisseurs"
    ], data.direction_responsable)}
          </div>
        </div>

        <!-- Description, Enjeux, Discussion -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Contenus textuels</h3>
          <div class="space-y-4">
            ${formTextarea("Description", "edit-description", data.description, 4)}
            ${formTextarea("Enjeux", "edit-enjeux", data.enjeux, 3)}
            ${formTextarea("Discussion", "edit-discussion", data.discussion, 3)}
          </div>
        </div>

        <!-- Lois -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Lois applicables</h3>
          <div class="grid grid-cols-1">
            ${formMultiSelect("Lois applicables", "edit-loi", ["LVM", "LDPSF"], data.loi)}
          </div>
        </div>

        <!-- Impact syst\xE8me -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Impact syst\xE8me</h3>
          <label class="flex items-center gap-2 cursor-pointer mb-3">
            <input type="checkbox" id="edit-impact_systeme" ${data.impact_systeme ? "checked" : ""} class="w-4 h-4 accent-blue-600">
            <span class="text-sm text-gray-700">Impact sur les syst\xE8mes identifi\xE9</span>
          </label>
          ${formTextarea("Description de l'impact", "edit-impact_description", data.impact_description, 3)}
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
      ${renderPersonArrayEditor("Ressources associ\xE9es", "Ressources_associees", data.Ressources_associees || [], true)}
      ${renderPersonArrayEditor("Soutien juridique", "soutien_juridique", data.soutien_juridique || [], true)}
      ${renderCommitteeArrayEditor("Comit\xE9 ACVM", "Comite_ACVM", data.Comite_ACVM || [])}
      ${renderCommitteeArrayEditor("Groupe de travail", "groupe_de_travail", data.groupe_de_travail || [])}

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
            <span class="flex-1 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)} \u2014 ${escapeHtml(p.email)}${hasRole && p.role ? ` (${escapeHtml(p.role)})` : ""}</span>
            <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${fieldName}" data-index="${i}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        `).join("")}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter une personne</summary>
        <div class="mt-3 grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg" id="${fieldName}-add-form">
          <input type="text" placeholder="Pr\xE9nom" class="person-add-prenom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="text" placeholder="Nom" class="person-add-nom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
          <input type="email" placeholder="Courriel" class="person-add-email px-3 py-1.5 border border-gray-200 rounded text-sm col-span-2" data-field="${fieldName}">
          ${hasRole ? `<input type="text" placeholder="R\xF4le" class="person-add-role px-3 py-1.5 border border-gray-200 rounded text-sm col-span-2" data-field="${fieldName}">` : ""}
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
            <span class="flex-1 truncate">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)} \u2014 ${escapeHtml(m.institution)}</span>
            <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${fieldName}" data-index="${i}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        `).join("")}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter un membre</summary>
        <div class="mt-3 grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
          <input type="text" placeholder="Pr\xE9nom" class="committee-add-prenom px-3 py-1.5 border border-gray-200 rounded text-sm" data-field="${fieldName}">
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
      ${renderTimelineArrayEditor("Jalons", "jalons", data.jalons || [])}
      ${renderTimelineArrayEditor("Rencontres et approbations", "rencontres_approbations", data.rencontres_approbations || [])}
      ${renderTimelineArrayEditor("D\xE9veloppements significatifs", "developpements_significatifs", data.developpements_significatifs || [])}

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
    const statuts = ["\xE0 venir", "en cours", "compl\xE9t\xE9", "report\xE9", "annul\xE9", "planifi\xE9", "tenu"];
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
              ${item.date_changement && item.date_changement.length > 0 ? `<span>\u2192 R\xE9vis\xE9: ${formatDate(item.date_changement[item.date_changement.length - 1])}</span>` : ""}
              <span class="ml-auto px-2 py-0.5 bg-white border border-gray-200 rounded">${escapeHtml(item.statut)}</span>
            </div>
            <!-- Add date change -->
            <div class="mt-2 flex gap-2">
              <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${fieldName}" data-index="${i}">
              <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${fieldName}" data-index="${i}">+ Date r\xE9vision</button>
            </div>
          </div>
        `).join("")}
      </div>
      <details class="mt-2">
        <summary class="cursor-pointer text-xs text-blue-600 hover:text-blue-800">+ Ajouter une entr\xE9e</summary>
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
              ${statuts.map((s) => `<option value="${s}">${s}</option>`).join("")}
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
  function formField(label, type, id, value, extraClass = "") {
    return `
    <div class="${extraClass}">
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <input type="${type}" id="${id}" name="${id}" value="${escapeHtml(value || "")}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
    </div>
  `;
  }
  function formTextarea(label, id, value, rows = 3) {
    return `
    <div>
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <textarea id="${id}" name="${id}" rows="${rows}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y">${escapeHtml(value || "")}</textarea>
    </div>
  `;
  }
  function formSelect(label, id, options, currentValue) {
    return `
    <div>
      <label for="${id}" class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <select id="${id}" name="${id}"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
        ${options.map((o) => `<option value="${escapeHtml(o)}" ${o === currentValue ? "selected" : ""}>${escapeHtml(o)}</option>`).join("")}
      </select>
    </div>
  `;
  }
  function formMultiSelect(label, id, options, currentValues) {
    const selected = Array.isArray(currentValues) ? currentValues : currentValues ? currentValues.split(",").map((s) => s.trim()).filter(Boolean) : [];
    return `
    <div class="md:col-span-2">
      <label class="block text-xs font-medium text-gray-600 mb-1">${escapeHtml(label)}</label>
      <div id="${id}" class="border border-gray-200 rounded-lg bg-white p-2 grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-48 overflow-y-auto">
        ${options.map((o) => `
          <label class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
            <input type="checkbox" name="${id}" value="${escapeHtml(o)}"
              class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              ${selected.includes(o) ? "checked" : ""}>
            ${escapeHtml(o)}
          </label>`).join("")}
      </div>
    </div>
  `;
  }
  function collectFormData(baseData) {
    const g = (id) => document.getElementById(id);
    const val = (id) => {
      var _a, _b;
      return (_b = (_a = g(id)) == null ? void 0 : _a.value) != null ? _b : null;
    };
    const data = __spreadValues({}, baseData);
    if (g("edit-titre"))
      data.titre = val("edit-titre");
    if (g("edit-type_projet"))
      data.type_projet = val("edit-type_projet");
    if (g("edit-reglement"))
      data.reglement = val("edit-reglement");
    if (g("edit-statut"))
      data.statut = val("edit-statut");
    if (g("edit-priorite"))
      data.priorite = val("edit-priorite");
    if (g("edit-niveau_risque"))
      data.niveau_risque = val("edit-niveau_risque");
    const juridictionChecked = document.querySelectorAll('#edit-juridiction_principale input[type="checkbox"]:checked');
    if (juridictionChecked.length > 0 || g("edit-juridiction_principale")) {
      data.juridiction_principale = Array.from(juridictionChecked).map((cb) => cb.value);
    }
    if (g("edit-direction_principale"))
      data.direction_principale = val("edit-direction_principale");
    const dirRespChecked = document.querySelectorAll('#edit-direction_responsable input[type="checkbox"]:checked');
    if (dirRespChecked.length > 0 || g("edit-direction_responsable")) {
      data.direction_responsable = Array.from(dirRespChecked).map((cb) => cb.value);
    }
    if (g("edit-description"))
      data.description = val("edit-description");
    if (g("edit-enjeux"))
      data.enjeux = val("edit-enjeux");
    if (g("edit-discussion"))
      data.discussion = val("edit-discussion");
    if (g("edit-impact_systeme"))
      data.impact_systeme = g("edit-impact_systeme").checked;
    if (g("edit-impact_description"))
      data.impact_description = val("edit-impact_description");
    const loiChecked = document.querySelectorAll('#edit-loi input[type="checkbox"]:checked');
    if (loiChecked.length > 0 || g("edit-loi")) {
      data.loi = Array.from(loiChecked).map((cb) => cb.value);
    }
    const arrayFields = ["Ressources_associees", "soutien_juridique", "Comite_ACVM", "groupe_de_travail", "jalons", "rencontres_approbations", "developpements_significatifs"];
    for (const field of arrayFields) {
      const el = g(`edit-${field}`);
      if (el) {
        try {
          data[field] = JSON.parse(el.value);
        } catch (e) {
        }
      }
    }
    return data;
  }
  function attachProjectListeners(project, draft, isContributor2, state2, navigate3, api, auth) {
    var _a, _b, _c;
    const root = document.getElementById("project-root");
    if (!root)
      return;
    (_a = document.getElementById("tab-nav")) == null ? void 0 : _a.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn)
        return;
      const tab = btn.dataset.tab;
      _activeTab = tab;
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.toggle("border-blue-500", b.dataset.tab === tab);
        b.classList.toggle("text-blue-600", b.dataset.tab === tab);
        b.classList.toggle("border-transparent", b.dataset.tab !== tab);
        b.classList.toggle("text-gray-500", b.dataset.tab !== tab);
      });
      const displayData = _viewingDraft && draft ? draft.data : project;
      const content = document.getElementById("tab-content");
      if (content) {
        content.innerHTML = renderTabContent(displayData, draft, isContributor2, tab);
        if (tab === "historique") {
          loadHistoryTab(project.code, state2, api);
        }
      }
    });
    (_b = document.getElementById("toggle-draft-view")) == null ? void 0 : _b.addEventListener("click", () => {
      _viewingDraft = !_viewingDraft;
      navigate3(`#project-${project.code}`);
    });
    (_c = document.getElementById("btn-edit-mode")) == null ? void 0 : _c.addEventListener("click", () => {
      _editMode = true;
      navigate3(`#project-${project.code}`);
    });
    document.addEventListener("click", handleProjectClick, { once: false });
    document.addEventListener("submit", handleProjectSubmit, { once: false });
    root._cleanup = () => {
      document.removeEventListener("click", handleProjectClick);
      document.removeEventListener("submit", handleProjectSubmit);
      _editMode = false;
      _viewingDraft = false;
      _activeTab = "general";
    };
    function handleProjectClick(e) {
      if (!document.getElementById("project-root")) {
        document.removeEventListener("click", handleProjectClick);
        return;
      }
      if (e.target.closest("#btn-preview")) {
        const displayData = _viewingDraft && draft ? draft.data : project;
        openProjectPreview(displayData, project);
        return;
      }
      if (e.target.closest("#btn-cancel-edit")) {
        _editMode = false;
        navigate3(`#project-${project.code}`);
        return;
      }
      if (e.target.closest("#btn-publish")) {
        confirmPublish(project, draft, state2, navigate3, api, auth);
        return;
      }
      const personRemove = e.target.closest(".person-remove");
      if (personRemove) {
        removeArrayItem(personRemove.dataset.field, parseInt(personRemove.dataset.index));
        return;
      }
      const personAdd = e.target.closest(".person-add-btn");
      if (personAdd) {
        addPersonItem(personAdd.dataset.field, personAdd.dataset.hasRole === "true");
        return;
      }
      const committeeAdd = e.target.closest(".committee-add-btn");
      if (committeeAdd) {
        addCommitteeMember(committeeAdd.dataset.field);
        return;
      }
      const timelineRemove = e.target.closest(".timeline-remove");
      if (timelineRemove) {
        removeArrayItem(timelineRemove.dataset.field, parseInt(timelineRemove.dataset.index));
        return;
      }
      const timelineAddDate = e.target.closest(".timeline-add-date");
      if (timelineAddDate) {
        addTimelineDate(timelineAddDate.dataset.field, parseInt(timelineAddDate.dataset.index));
        return;
      }
      const timelineAddBtn = e.target.closest(".timeline-add-btn");
      if (timelineAddBtn) {
        addTimelineEntry(timelineAddBtn.dataset.field);
        return;
      }
    }
    function handleProjectSubmit(e) {
      if (!document.getElementById("project-root")) {
        document.removeEventListener("submit", handleProjectSubmit);
        return;
      }
      const form = e.target.closest("#edit-form, #edit-equipe-form, #edit-chrono-form");
      if (!form)
        return;
      e.preventDefault();
      saveDraftHandler(project, draft, state2, navigate3, api, auth);
    }
    async function saveDraftHandler(project2, currentDraft, state3, navigate4, api2, auth2) {
      const displayData = _viewingDraft && currentDraft ? currentDraft.data : project2;
      const newData = collectFormData(displayData);
      const currentUser = auth2.getCurrentUser();
      const btn = document.getElementById("btn-save-draft");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Enregistrement...";
      }
      try {
        if (state3.CONFIG && !state3.CONFIG.DEV_MODE) {
          const draftId = (currentDraft == null ? void 0 : currentDraft.id) || null;
          const result = await api2.saveDraft(
            project2.code,
            newData,
            draftId,
            currentUser.email,
            project2.version || 1
          );
          const changes = diffObjects(project2, newData);
          await api2.addHistoryEntry(project2.code, "draft", newData, currentUser.email, changes, project2.version || 1);
          state3.drafts[project2.code] = {
            id: result.id,
            ProjetCode: project2.code,
            data: newData,
            modifie_par: currentUser.email,
            modifie_le: (/* @__PURE__ */ new Date()).toISOString(),
            version_base: project2.version || 1
          };
        } else {
          state3.drafts[project2.code] = {
            id: 9e3 + project2.code,
            ProjetCode: project2.code,
            data: newData,
            modifie_par: currentUser.email,
            modifie_le: (/* @__PURE__ */ new Date()).toISOString(),
            version_base: project2.version || 1
          };
        }
        showToast("Brouillon enregistr\xE9 avec succ\xE8s.", "success");
        _editMode = false;
        navigate4(`#project-${project2.code}`);
      } catch (err) {
        console.error("saveDraft error:", err);
        showToast("Erreur lors de l'enregistrement du brouillon.", "error");
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Enregistrer le brouillon";
        }
      }
    }
    function confirmPublish(project2, draft2, state3, navigate4, api2, auth2) {
      var _a2, _b2;
      const newVersion = (project2.version || 1) + 1;
      openModal(`
      <div class="text-center py-4">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Publier la version ${newVersion} ?</h3>
        <p class="text-sm text-gray-500 mb-6">
          Le brouillon en cours sera publi\xE9 comme version officielle v${newVersion} du projet
          <strong>SPR-${String(project2.code).padStart(3, "0")}</strong>.
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
    `, { title: "Confirmation de publication", size: "sm" });
      (_a2 = document.getElementById("modal-cancel-publish")) == null ? void 0 : _a2.addEventListener("click", closeModal);
      (_b2 = document.getElementById("modal-confirm-publish")) == null ? void 0 : _b2.addEventListener("click", async () => {
        closeModal();
        await doPublish(project2, draft2, state3, navigate4, api2, auth2);
      });
    }
    async function doPublish(project2, draft2, state3, navigate4, api2, auth2) {
      const currentUser = auth2.getCurrentUser();
      const newVersion = (project2.version || 1) + 1;
      const publishData = __spreadProps(__spreadValues({}, draft2.data), { version: newVersion });
      try {
        if (state3.CONFIG && !state3.CONFIG.DEV_MODE) {
          await api2.publishProject(project2.code, publishData, project2._id, project2.version || 1, currentUser.email);
          await api2.deleteDraft(draft2.id);
          await api2.addHistoryEntry(
            project2.code,
            "published",
            publishData,
            currentUser.email,
            diffObjects(project2, publishData),
            newVersion
          );
        }
        const idx = state3.projects.findIndex((p) => p.code === project2.code);
        if (idx !== -1) {
          state3.projects[idx] = __spreadProps(__spreadValues({}, publishData), {
            _id: project2._id,
            version: newVersion,
            derniere_modification: (/* @__PURE__ */ new Date()).toISOString(),
            modifie_par: currentUser.email
          });
        }
        delete state3.drafts[project2.code];
        showToast(`Version ${newVersion} publi\xE9e avec succ\xE8s.`, "success");
        _editMode = false;
        navigate4(`#project-${project2.code}`);
      } catch (err) {
        console.error("publish error:", err);
        showToast("Erreur lors de la publication.", "error");
      }
    }
  }
  async function loadHistoryTab(code, state2, api) {
    const container = document.getElementById("history-tab-content");
    if (!container)
      return;
    try {
      let entries;
      if (state2.histories[code]) {
        entries = state2.histories[code];
      } else {
        if (state2.CONFIG && !state2.CONFIG.DEV_MODE) {
          entries = await api.getProjectHistory(code);
        } else {
          const { generateMockHistory: generateMockHistory2 } = await Promise.resolve().then(() => (init_mock_data(), mock_data_exports));
          const proj = state2.projects.find((p) => p.code === code);
          entries = proj ? generateMockHistory2(proj) : [];
        }
        state2.histories[code] = entries;
      }
      container.innerHTML = renderHistory(code, entries);
      attachHistoryListeners(code, entries, state2);
    } catch (err) {
      console.error("loadHistoryTab error:", err);
      container.innerHTML = `<p class="text-sm text-red-500 py-4">Erreur lors du chargement de l'historique.</p>`;
    }
  }
  function attachHistoryListeners(code, entries, state2) {
    const container = document.getElementById("history-tab-content");
    if (!container)
      return;
    container.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".history-toggle-snapshot");
      if (toggleBtn) {
        const snap = document.getElementById(`snapshot-${toggleBtn.dataset.id}`);
        if (snap)
          snap.classList.toggle("hidden");
        toggleBtn.textContent = (snap == null ? void 0 : snap.classList.contains("hidden")) ? "Voir les d\xE9tails" : "Masquer";
      }
      const restoreBtn = e.target.closest(".history-restore-btn");
      if (restoreBtn) {
        const id = parseInt(restoreBtn.dataset.id);
        const entry = entries.find((e2) => e2.id === id);
        if (entry)
          confirmRestore(entry, code, state2);
      }
      const filterBtn = e.target.closest(".history-filter-btn");
      if (filterBtn) {
        const filter = filterBtn.dataset.filter;
        document.querySelectorAll(".history-filter-btn").forEach((b) => {
          b.classList.toggle("bg-blue-600", b.dataset.filter === filter);
          b.classList.toggle("text-white", b.dataset.filter === filter);
          b.classList.toggle("bg-white", b.dataset.filter !== filter);
          b.classList.toggle("text-gray-600", b.dataset.filter !== filter);
        });
        document.querySelectorAll(".history-entry").forEach((el) => {
          const action = el.dataset.action;
          el.classList.toggle(
            "hidden",
            filter !== "all" && action !== filter
          );
        });
      }
    });
  }
  function confirmRestore(entry, code, state2) {
    var _a, _b;
    openModal(`
    <div class="text-center py-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Restaurer la version ${entry.version} ?</h3>
      <p class="text-sm text-gray-500 mb-6">
        Cette version (${entry.action === "published" ? "publi\xE9e" : "brouillon"}) sera restaur\xE9e comme brouillon.
        Vous pourrez la r\xE9viser avant de publier.
      </p>
      <div class="flex justify-center gap-3">
        <button id="modal-cancel-restore" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Annuler</button>
        <button id="modal-confirm-restore" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Restaurer</button>
      </div>
    </div>
  `, { title: "Restaurer une version", size: "sm" });
    (_a = document.getElementById("modal-cancel-restore")) == null ? void 0 : _a.addEventListener("click", closeModal);
    (_b = document.getElementById("modal-confirm-restore")) == null ? void 0 : _b.addEventListener("click", () => {
      closeModal();
      state2.drafts[code] = {
        id: null,
        ProjetCode: code,
        data: entry.snapshot,
        modifie_par: "restauration",
        modifie_le: (/* @__PURE__ */ new Date()).toISOString(),
        version_base: entry.version
      };
      showToast(`Version ${entry.version} restaur\xE9e comme brouillon.`, "success");
      navigate2(`#project-${code}`);
    });
  }
  function removeArrayItem(field, index) {
    const hidden = document.getElementById(`edit-${field}`);
    if (!hidden)
      return;
    let arr = [];
    try {
      arr = JSON.parse(hidden.value);
    } catch (e) {
      arr = [];
    }
    arr.splice(index, 1);
    hidden.value = JSON.stringify(arr);
    const listEl = document.getElementById(`${field}-list`);
    if (!listEl)
      return;
    if (["jalons", "rencontres_approbations", "developpements_significatifs"].includes(field)) {
      listEl.innerHTML = arr.map((item, i) => `
      <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div class="flex items-start justify-between gap-2 mb-1">
          <span class="text-sm font-medium text-gray-700 flex-1 truncate">${escapeHtml(item.description)}</span>
          <button type="button" class="timeline-remove text-red-400 hover:text-red-600" data-field="${field}" data-index="${i}">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <span class="text-xs text-gray-400">${formatDate(item.date_initiale)} \xB7 ${escapeHtml(item.statut)}</span>
        <div class="mt-2 flex gap-2">
          <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${field}" data-index="${i}">
          <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${field}" data-index="${i}">+ Date r\xE9vision</button>
        </div>
      </div>
    `).join("");
    } else {
      listEl.innerHTML = arr.map((p, i) => {
        const name = `${escapeHtml(p.prenom || "")} ${escapeHtml(p.nom || "")}`;
        const info = p.institution ? ` \u2014 ${escapeHtml(p.institution)}` : p.email ? ` \u2014 ${escapeHtml(p.email)}` : "";
        return `
        <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
          <span class="flex-1 truncate">${name}${info}</span>
          <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `;
      }).join("");
    }
  }
  function addPersonItem(field, hasRole) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const hidden = document.getElementById(`edit-${field}`);
    const container = document.getElementById(`${field}-add-form`);
    if (!hidden || !container)
      return;
    const prenom = ((_b = (_a = container.querySelector(".person-add-prenom")) == null ? void 0 : _a.value) == null ? void 0 : _b.trim()) || "";
    const nom = ((_d = (_c = container.querySelector(".person-add-nom")) == null ? void 0 : _c.value) == null ? void 0 : _d.trim()) || "";
    const email = ((_f = (_e = container.querySelector(".person-add-email")) == null ? void 0 : _e.value) == null ? void 0 : _f.trim()) || "";
    const role = hasRole ? ((_h = (_g = container.querySelector(".person-add-role")) == null ? void 0 : _g.value) == null ? void 0 : _h.trim()) || "" : "";
    if (!prenom && !nom && !email)
      return;
    let arr = [];
    try {
      arr = JSON.parse(hidden.value);
    } catch (e) {
      arr = [];
    }
    arr.push({ prenom, nom, email, role, photo: "" });
    hidden.value = JSON.stringify(arr);
    container.querySelectorAll("input").forEach((i) => i.value = "");
    const listEl = document.getElementById(`${field}-list`);
    if (listEl) {
      listEl.innerHTML = arr.map((p, i) => `
      <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
        <span class="flex-1 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)} \u2014 ${escapeHtml(p.email)}${hasRole && p.role ? ` (${escapeHtml(p.role)})` : ""}</span>
        <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join("");
    }
  }
  function addCommitteeMember(field) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const hidden = document.getElementById(`edit-${field}`);
    const container = document.querySelector(`#${field}-add-form`) || ((_a = document.querySelector(`[data-field="${field}"].committee-add-institution`)) == null ? void 0 : _a.closest("div.grid"));
    if (!hidden)
      return;
    const allInputs = document.querySelectorAll(`[data-field="${field}"]`);
    const prenom = ((_c = (_b = [...allInputs].find((el) => el.classList.contains("committee-add-prenom"))) == null ? void 0 : _b.value) == null ? void 0 : _c.trim()) || "";
    const nom = ((_e = (_d = [...allInputs].find((el) => el.classList.contains("committee-add-nom"))) == null ? void 0 : _d.value) == null ? void 0 : _e.trim()) || "";
    const email = ((_g = (_f = [...allInputs].find((el) => el.classList.contains("committee-add-email"))) == null ? void 0 : _f.value) == null ? void 0 : _g.trim()) || "";
    const institution = ((_i = (_h = [...allInputs].find((el) => el.classList.contains("committee-add-institution"))) == null ? void 0 : _h.value) == null ? void 0 : _i.trim()) || "";
    if (!prenom && !nom && !email)
      return;
    let arr = [];
    try {
      arr = JSON.parse(hidden.value);
    } catch (e) {
      arr = [];
    }
    arr.push({ prenom, nom, email, institution });
    hidden.value = JSON.stringify(arr);
    [...allInputs].forEach((el) => {
      if (el.tagName === "INPUT")
        el.value = "";
    });
    const listEl = document.getElementById(`${field}-list`);
    if (listEl) {
      listEl.innerHTML = arr.map((m, i) => `
      <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
        <span class="flex-1 truncate">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)} \u2014 ${escapeHtml(m.institution)}</span>
        <button type="button" class="person-remove text-red-400 hover:text-red-600 shrink-0 px-1" data-field="${field}" data-index="${i}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join("");
    }
  }
  function addTimelineDate(field, index) {
    const hidden = document.getElementById(`edit-${field}`);
    if (!hidden)
      return;
    const dateInputs = document.querySelectorAll(`.timeline-new-date[data-field="${field}"][data-index="${index}"]`);
    const dateInput = dateInputs[0];
    const dateVal = dateInput == null ? void 0 : dateInput.value;
    if (!dateVal) {
      showToast("Veuillez s\xE9lectionner une date.", "warning");
      return;
    }
    let arr = [];
    try {
      arr = JSON.parse(hidden.value);
    } catch (e) {
      arr = [];
    }
    if (!arr[index])
      return;
    if (!arr[index].date_changement)
      arr[index].date_changement = [];
    arr[index].date_changement.push(dateVal);
    hidden.value = JSON.stringify(arr);
    if (dateInput)
      dateInput.value = "";
    showToast("Date de r\xE9vision ajout\xE9e.", "success");
  }
  function addTimelineEntry(field) {
    var _a, _b, _c, _d;
    const hidden = document.getElementById(`edit-${field}`);
    if (!hidden)
      return;
    const descInputs = document.querySelectorAll(`.timeline-add-desc[data-field="${field}"]`);
    const dateInputs = document.querySelectorAll(`.timeline-add-date-init[data-field="${field}"]`);
    const statutInputs = document.querySelectorAll(`.timeline-add-statut[data-field="${field}"]`);
    const desc = ((_b = (_a = descInputs[0]) == null ? void 0 : _a.value) == null ? void 0 : _b.trim()) || "";
    const dateInit = ((_c = dateInputs[0]) == null ? void 0 : _c.value) || "";
    const statut = ((_d = statutInputs[0]) == null ? void 0 : _d.value) || "\xE0 venir";
    if (!desc || !dateInit) {
      showToast("Veuillez remplir la description et la date.", "warning");
      return;
    }
    let arr = [];
    try {
      arr = JSON.parse(hidden.value);
    } catch (e) {
      arr = [];
    }
    arr.push({ date_initiale: dateInit, date_changement: [], description: desc, statut });
    hidden.value = JSON.stringify(arr);
    if (descInputs[0])
      descInputs[0].value = "";
    if (dateInputs[0])
      dateInputs[0].value = "";
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
        <span class="text-xs text-gray-400">${formatDate(item.date_initiale)} \xB7 ${escapeHtml(item.statut)}</span>
        <div class="mt-2 flex gap-2">
          <input type="date" class="timeline-new-date px-2 py-1 border border-gray-200 rounded text-xs" data-field="${field}" data-index="${i}">
          <button type="button" class="timeline-add-date px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200" data-field="${field}" data-index="${i}">+ Date r\xE9vision</button>
        </div>
      </div>
    `).join("");
    }
    showToast("Entr\xE9e ajout\xE9e.", "success");
  }
  function openProjectPreview(data, project) {
    var _a;
    (_a = document.getElementById("spr-print-preview")) == null ? void 0 : _a.remove();
    const overlay = document.createElement("div");
    overlay.id = "spr-print-preview";
    overlay.className = "fixed inset-0 z-[300] bg-white overflow-y-auto";
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
        Aper\xE7u \u2014 SPR-${String(project.code).padStart(3, "0")} \xB7 ${escapeHtml(data.titre)}
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
    overlay.querySelector("#btn-close-preview").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#btn-browser-print").addEventListener("click", () => window.print());
    overlay.querySelector("#btn-export-docx").addEventListener("click", () => generateProjectDocx(data, project));
    overlay.querySelector("#btn-export-xlsx").addEventListener("click", () => generateProjectXlsx(data, project));
    overlay.querySelector("#btn-export-pdf").addEventListener("click", () => generateProjectPdf(data, project));
  }
  function renderProjectPreview(data, project) {
    var _a, _b, _c, _d, _e, _f, _g;
    const code = String(project.code).padStart(3, "0");
    const now = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
    const pSection = (title, content) => `
    <div class="mb-8">
      <h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1.5 mb-4">${escapeHtml(title)}</h2>
      ${content}
    </div>`;
    const pField = (label, value) => {
      if (!value && value !== false)
        return "";
      const val = Array.isArray(value) ? value.join(", ") : String(value);
      if (!val)
        return "";
      return `<div>
      <p class="text-xs text-gray-400 mb-0.5">${escapeHtml(label)}</p>
      <p class="text-sm font-medium text-gray-800">${escapeHtml(val)}</p>
    </div>`;
    };
    const pText = (label, value) => {
      if (!value)
        return "";
      return `<div class="mb-4">
      <p class="text-xs font-semibold text-gray-500 mb-1">${escapeHtml(label)}</p>
      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">${escapeHtml(value)}</p>
    </div>`;
    };
    const header = `
    <div class="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-900">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span class="text-white text-xs font-black">SPR</span>
          </div>
          <span class="text-lg font-mono font-bold text-blue-700">SPR-${code}</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(data.statut)}">${escapeHtml(data.statut)}</span>
          <span class="px-2 py-0.5 rounded text-xs font-semibold ${getPriorityBadgeClass(data.priorite)}">Priorit\xE9 : ${escapeHtml(data.priorite)}</span>
          <span class="px-2 py-0.5 rounded text-xs font-semibold ${getRiskBadgeClass(data.niveau_risque)}">Risque : ${escapeHtml(data.niveau_risque)}</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 leading-tight mb-1">${escapeHtml(data.titre)}</h1>
        <p class="text-sm text-gray-500">${escapeHtml(data.type_projet || "")}${data.reglement ? " \xB7 " + escapeHtml(data.reglement) : ""} \xB7 Version ${data.version || 1}</p>
      </div>
      <div class="text-right shrink-0 ml-6">
        <p class="text-xs text-gray-400">G\xE9n\xE9r\xE9 le</p>
        <p class="text-sm font-medium text-gray-600">${now}</p>
      </div>
    </div>`;
    const lois = Array.isArray(data.loi) ? data.loi : data.loi ? [data.loi] : [];
    const juridictions = Array.isArray(data.juridiction_principale) ? data.juridiction_principale : data.juridiction_principale ? [data.juridiction_principale] : [];
    const dirsResp = Array.isArray(data.direction_responsable) ? data.direction_responsable : [];
    const infoGrid = `
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-4">
      ${pField("R\xE8glement", data.reglement)}
      ${pField("Type de projet", data.type_projet)}
      ${pField("Statut", data.statut)}
      ${pField("Priorit\xE9", data.priorite)}
      ${pField("Niveau de risque", data.niveau_risque)}
      ${lois.length ? pField("Lois applicables", lois.join(", ")) : ""}
      ${juridictions.length ? pField("Juridiction principale", juridictions.join(", ")) : ""}
      ${pField("Direction principale", data.direction_principale)}
    </div>
    ${dirsResp.length ? `
      <div>
        <p class="text-xs text-gray-400 mb-1">Directions responsables</p>
        <div class="flex flex-wrap gap-1.5">
          ${dirsResp.map((d) => `<span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">${escapeHtml(d)}</span>`).join("")}
        </div>
      </div>` : ""}`;
    const contenu = `
    ${pText("Description", data.description)}
    ${pText("Enjeux", data.enjeux)}
    ${pText("Discussion", data.discussion)}`;
    const impact = `
    <div class="flex items-center gap-2 mb-2">
      ${data.impact_systeme ? `<span class="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Impact identifi\xE9</span>` : `<span class="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">Aucun impact</span>`}
    </div>
    ${data.impact_systeme && data.impact_description ? `<p class="text-sm text-gray-700">${escapeHtml(data.impact_description)}</p>` : ""}`;
    const renderPreviewPersons = (title, people, showRole) => {
      if (!people || !people.length)
        return "";
      return `
      <div class="mb-5">
        <p class="text-xs font-semibold text-gray-500 mb-2">${escapeHtml(title)}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${people.map((p) => `
            <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                ${escapeHtml(getInitials(p.prenom, p.nom))}
              </div>
              <div class="min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate">${escapeHtml(p.prenom)} ${escapeHtml(p.nom)}</p>
                ${showRole && p.role ? `<p class="text-xs text-blue-600 truncate">${escapeHtml(p.role)}</p>` : ""}
                <p class="text-xs text-gray-400 truncate">${escapeHtml(p.email)}</p>
              </div>
            </div>`).join("")}
        </div>
      </div>`;
    };
    const renderPreviewCommittee = (title, members) => {
      if (!members || !members.length)
        return "";
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
            ${members.map((m) => `
              <tr>
                <td class="px-3 py-1.5 font-medium">${escapeHtml(m.prenom)} ${escapeHtml(m.nom)}</td>
                <td class="px-3 py-1.5 text-gray-500">${escapeHtml(m.email)}</td>
                <td class="px-3 py-1.5 text-gray-500">${escapeHtml(m.institution)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
    };
    const equipe = `
    ${renderPreviewPersons("Ressources associ\xE9es", data.Ressources_associees, true)}
    ${renderPreviewPersons("Soutien juridique", data.soutien_juridique, true)}
    ${renderPreviewCommittee("Comit\xE9 ACVM", data.Comite_ACVM)}
    ${renderPreviewCommittee("Groupe de travail", data.groupe_de_travail)}`;
    const renderPreviewTimeline = (title, items) => {
      if (!items || !items.length)
        return "";
      return `
      <div class="mb-5">
        <p class="text-xs font-semibold text-gray-500 mb-2">${escapeHtml(title)} <span class="font-normal text-gray-400">(${items.length})</span></p>
        <table class="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
          <thead><tr class="bg-gray-50 text-gray-500">
            <th class="px-3 py-1.5 text-left">Description</th>
            <th class="px-3 py-1.5 text-left">Date initiale</th>
            <th class="px-3 py-1.5 text-left">Derni\xE8re date</th>
            <th class="px-3 py-1.5 text-left">Statut</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-100">
            ${items.map((item) => {
        const lastDate = item.date_changement && item.date_changement.length ? item.date_changement[item.date_changement.length - 1] : item.date_initiale;
        return `<tr>
                <td class="px-3 py-1.5">${escapeHtml(item.description)}</td>
                <td class="px-3 py-1.5 text-gray-500 whitespace-nowrap">${formatDate(item.date_initiale)}</td>
                <td class="px-3 py-1.5 ${lastDate !== item.date_initiale ? "text-amber-600" : "text-gray-400"} whitespace-nowrap">${formatDate(lastDate)}</td>
                <td class="px-3 py-1.5 text-gray-600">${escapeHtml(item.statut)}</td>
              </tr>`;
      }).join("")}
          </tbody>
        </table>
      </div>`;
    };
    const chronologie = `
    ${renderPreviewTimeline("Jalons", data.jalons)}
    ${renderPreviewTimeline("Rencontres et approbations", data.rencontres_approbations)}
    ${renderPreviewTimeline("D\xE9veloppements significatifs", data.developpements_significatifs)}`;
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
          ${docs.map((d) => `<tr>
            <td class="px-3 py-1.5 font-medium">${escapeHtml(d.titre)}</td>
            <td class="px-3 py-1.5 text-gray-500">${escapeHtml(d.type_document)}</td>
            <td class="px-3 py-1.5 text-gray-500">${escapeHtml(d.description || "\u2014")}</td>
            <td class="px-3 py-1.5 text-gray-400 whitespace-nowrap">${formatDate(d.chargement_date)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>` : "";
    const mediaHtml = media.length ? `
    <div>
      <p class="text-xs font-semibold text-gray-500 mb-2">M\xE9dias <span class="font-normal text-gray-400">(${media.length})</span></p>
      <ul class="space-y-1">
        ${media.map((m) => `<li class="text-xs text-gray-700">\u2022 <span class="font-medium">${escapeHtml(m.label)}</span> \u2014 ${formatDate(m.chargement_date)} \u2014 ${escapeHtml(m.auteur || "")}</li>`).join("")}
      </ul>
    </div>` : "";
    return `
    ${header}
    ${pSection("Informations g\xE9n\xE9rales", infoGrid)}
    ${contenu ? pSection("Contenu", contenu) : ""}
    ${pSection("Impact syst\xE8me", impact)}
    ${((_a = data.Ressources_associees) == null ? void 0 : _a.length) || ((_b = data.soutien_juridique) == null ? void 0 : _b.length) || ((_c = data.Comite_ACVM) == null ? void 0 : _c.length) || ((_d = data.groupe_de_travail) == null ? void 0 : _d.length) ? pSection("\xC9quipe", equipe) : ""}
    ${((_e = data.jalons) == null ? void 0 : _e.length) || ((_f = data.rencontres_approbations) == null ? void 0 : _f.length) || ((_g = data.developpements_significatifs) == null ? void 0 : _g.length) ? pSection("Chronologie", chronologie) : ""}
    ${docs.length || media.length ? pSection("Documents et m\xE9dias", docsHtml + mediaHtml) : ""}
    <div class="mt-10 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
      Suivi des Projets R\xE9glementaires (SPR) \xB7 SPR-${code} \xB7 Imprim\xE9 le ${now}
    </div>
  `;
  }
  function generateProjectPdf(data, project) {
    const pdfLib = window.pdfMake;
    if (!pdfLib) {
      showToast("Biblioth\xE8que PDF non disponible. V\xE9rifiez votre connexion.", "error");
      return;
    }
    showToast("G\xE9n\xE9ration du PDF en cours\u2026", "info", 2e3);
    const code = String(project.code).padStart(3, "0");
    const now = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
    const fname = `SPR-${code}_${(data.titre || "projet").replace(/[^\w\-]/g, "_").substring(0, 50)}.pdf`;
    const C = {
      blue: "#1D4ED8",
      blueMid: "#2563EB",
      blueLight: "#DBEAFE",
      gray900: "#111827",
      gray700: "#374151",
      gray500: "#6B7280",
      gray400: "#9CA3AF",
      gray200: "#E5E7EB",
      gray100: "#F3F4F6",
      gray50: "#F9FAFB",
      green: "#065F46",
      greenBg: "#D1FAE5",
      amber: "#92400E",
      amberBg: "#FEF3C7",
      red: "#991B1B",
      redBg: "#FEE2E2"
    };
    const statusColor = { "en cours": C.blue, "termin\xE9": C.green, "en attente": C.amber, "clos": C.gray500 };
    const riskColor = { "\xE9lev\xE9": C.red, "moyen": C.amber, "faible": C.green };
    const safe = (v) => v == null ? "\u2014" : Array.isArray(v) ? v.join(", ") || "\u2014" : String(v) || "\u2014";
    const secHdr = (label) => ({
      table: { widths: ["*"], body: [[
        { text: label, fontSize: 8, bold: true, color: "white", margin: [8, 5, 8, 5] }
      ]] },
      layout: { hLineWidth: () => 0, vLineWidth: () => 0, fillColor: () => C.blue },
      margin: [0, 14, 0, 8]
    });
    const subHdr = (label) => ({ text: label, fontSize: 8, bold: true, color: C.gray700, margin: [0, 4, 0, 4] });
    const field = (label, value) => {
      const v = Array.isArray(value) ? value.join(", ") : value;
      if (!v && v !== false)
        return null;
      return { stack: [
        { text: label, fontSize: 7, color: C.gray400, margin: [0, 0, 0, 1] },
        { text: String(v) || "\u2014", fontSize: 9, bold: true, color: C.gray900 }
      ], margin: [0, 0, 0, 8] };
    };
    const fieldGrid = (pairs) => {
      const valid = pairs.filter(Boolean);
      if (!valid.length)
        return null;
      const rows = [];
      for (let i = 0; i < valid.length; i += 2)
        rows.push([valid[i] || { text: "" }, valid[i + 1] || { text: "" }]);
      return { table: { widths: ["*", "*"], body: rows }, layout: "noBorders", margin: [0, 0, 0, 4] };
    };
    const body = (text) => ({ text: text || "", fontSize: 9, color: C.gray700, lineHeight: 1.5, margin: [0, 0, 0, 6] });
    const dataTable = (headers, rows, widths) => {
      if (!rows.length)
        return null;
      const tableLayout = {
        hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 0.5 : 0.3,
        hLineColor: () => C.gray200,
        vLineWidth: (i, node) => i === 0 || i === node.table.widths.length ? 0.5 : 0,
        vLineColor: () => C.gray200,
        fillColor: (ri) => ri === 0 ? C.gray100 : ri % 2 === 0 ? null : C.gray50,
        paddingLeft: () => 5,
        paddingRight: () => 5,
        paddingTop: () => 3,
        paddingBottom: () => 3
      };
      return {
        table: {
          widths: widths || headers.map(() => "*"),
          headerRows: 1,
          body: [
            headers.map((h) => ({ text: h, fontSize: 7, bold: true, color: C.gray500 })),
            ...rows.map((row) => row.map((cell) => ({ text: cell || "\u2014", fontSize: 8, color: C.gray700 })))
          ]
        },
        layout: tableLayout,
        margin: [0, 0, 0, 10]
      };
    };
    const content = [];
    const lois = Array.isArray(data.loi) ? data.loi : data.loi ? [data.loi] : [];
    const jurisds = Array.isArray(data.juridiction_principale) ? data.juridiction_principale : data.juridiction_principale ? [data.juridiction_principale] : [];
    const dirsResp = Array.isArray(data.direction_responsable) ? data.direction_responsable : [];
    content.push({
      columns: [
        {
          stack: [
            {
              columns: [
                {
                  table: { widths: [40], body: [[
                    { text: "SPR", bold: true, fontSize: 10, color: "white", alignment: "center", margin: [0, 6, 0, 6] }
                  ]] },
                  layout: { hLineWidth: () => 0, vLineWidth: () => 0, fillColor: () => C.blue },
                  width: 48,
                  margin: [0, 0, 32, 0]
                },
                {
                  stack: [
                    { text: `SPR-${code}`, fontSize: 13, bold: true, color: C.blue },
                    {
                      text: `${safe(data.type_projet)}  ·  ${safe(data.reglement)}  ·  Version ${data.version || 1}`,
                      fontSize: 8,
                      color: C.gray500,
                      margin: [0, 2, 0, 0]
                    }
                  ]
                }
              ],
              columnGap: 24,
              margin: [0, 0, 0, 8]
            },
            { text: data.titre || "", fontSize: 20, bold: true, color: C.gray900, margin: [0, 0, 0, 8] },
            {
              columns: [
                {
                  text: (data.statut || "").toUpperCase(),
                  fontSize: 8,
                  bold: true,
                  color: statusColor[data.statut] || C.gray700,
                  width: "auto",
                  margin: [0, 0, 10, 0]
                },
                {
                  text: `Priorit\xE9 : ${safe(data.priorite)}`,
                  fontSize: 8,
                  color: C.gray700,
                  width: "auto",
                  margin: [0, 0, 10, 0]
                },
                {
                  text: `Risque : ${safe(data.niveau_risque)}`,
                  fontSize: 8,
                  bold: true,
                  color: riskColor[data.niveau_risque] || C.gray700,
                  width: "auto"
                }
              ]
            }
          ],
          width: "*"
        },
        {
          stack: [
            { text: "G\xE9n\xE9r\xE9 le", fontSize: 7, color: C.gray400, alignment: "right" },
            { text: now, fontSize: 8, bold: true, color: C.gray700, alignment: "right" }
          ],
          width: 110,
          margin: [0, 4, 0, 0]
        }
      ]
    });

    content.push({ canvas: [{ type: "line", x1: 0, y1: 4, x2: 515, y2: 4, lineWidth: 2, lineColor: C.blue }], margin: [0, 4, 0, 0] });
    content.push(secHdr("INFORMATIONS G\xC9N\xC9RALES"));
    const grid = fieldGrid([
      field("R\xE8glement", data.reglement),
      field("Type de projet", data.type_projet),
      field("Statut", data.statut),
      field("Priorit\xE9", data.priorite),
      field("Niveau de risque", data.niveau_risque),
      lois.length ? field("Lois applicables", lois.join(", ")) : null,
      jurisds.length ? field("Juridiction(s) principale(s)", jurisds.join(", ")) : null,
      field("Direction principale", data.direction_principale)
    ]);
    if (grid)
      content.push(grid);
    if (dirsResp.length) {
      content.push({ text: "Directions responsables", fontSize: 7, color: C.gray400, margin: [0, 0, 0, 2] });
      content.push({ text: dirsResp.join("  \xB7  "), fontSize: 9, bold: true, color: C.gray900, margin: [0, 0, 0, 6] });
    }
    if (data.description || data.enjeux || data.discussion) {
      content.push(secHdr("CONTENU"));
      if (data.description) {
        content.push({ text: "Description", fontSize: 7, color: C.gray400, margin: [0, 0, 0, 2] });
        content.push(body(data.description));
      }
      if (data.enjeux) {
        content.push({ text: "Enjeux", fontSize: 7, color: C.gray400, margin: [0, 0, 0, 2] });
        content.push(body(data.enjeux));
      }
      if (data.discussion) {
        content.push({ text: "Discussion", fontSize: 7, color: C.gray400, margin: [0, 0, 0, 2] });
        content.push(body(data.discussion));
      }
    }
    content.push(secHdr("IMPACT SYST\xC8ME"));
    if (data.impact_systeme) {
      content.push({ text: "\u26A0  Impact identifi\xE9", fontSize: 9, bold: true, color: C.red, margin: [0, 0, 0, 4] });
      if (data.impact_description)
        content.push(body(data.impact_description));
    } else {
      content.push({ text: "\u2713  Aucun impact identifi\xE9", fontSize: 9, bold: true, color: C.green, margin: [0, 0, 0, 4] });
    }
    const res = data.Ressources_associees || [];
    const jur = data.soutien_juridique || [];
    const acvm = data.Comite_ACVM || [];
    const gt = data.groupe_de_travail || [];
    if (res.length || jur.length || acvm.length || gt.length) {
      content.push(secHdr("\xC9QUIPE"));
      if (res.length) {
        content.push(subHdr("Ressources associ\xE9es"));
        const t = dataTable(["Pr\xE9nom", "Nom", "R\xF4le", "Courriel"], res.map((p) => [p.prenom, p.nom, p.role || "\u2014", p.email]), ["auto", "auto", "*", "*"]);
        if (t)
          content.push(t);
      }
      if (jur.length) {
        content.push(subHdr("Soutien juridique"));
        const t = dataTable(["Pr\xE9nom", "Nom", "R\xF4le", "Courriel"], jur.map((p) => [p.prenom, p.nom, p.role || "\u2014", p.email]), ["auto", "auto", "*", "*"]);
        if (t)
          content.push(t);
      }
      if (acvm.length) {
        content.push(subHdr("Comit\xE9 ACVM"));
        const t = dataTable(["Pr\xE9nom", "Nom", "Courriel", "Institution"], acvm.map((m) => [m.prenom, m.nom, m.email, m.institution]), ["auto", "auto", "*", "*"]);
        if (t)
          content.push(t);
      }
      if (gt.length) {
        content.push(subHdr("Groupe de travail"));
        const t = dataTable(["Pr\xE9nom", "Nom", "Courriel", "Institution"], gt.map((m) => [m.prenom, m.nom, m.email, m.institution]), ["auto", "auto", "*", "*"]);
        if (t)
          content.push(t);
      }
    }
    const jalons = data.jalons || [];
    const rencontres = data.rencontres_approbations || [];
    const devs = data.developpements_significatifs || [];
    if (jalons.length || rencontres.length || devs.length) {
      content.push(secHdr("CHRONOLOGIE"));
      [["Jalons", jalons], ["Rencontres et approbations", rencontres], ["D\xE9veloppements significatifs", devs]].forEach(([title, items]) => {
        if (!items.length)
          return;
        content.push(subHdr(title));
        const t = dataTable(
          ["Description", "Date initiale", "Derni\xE8re date", "Statut"],
          items.map((item) => {
            var _a;
            const last = ((_a = item.date_changement) == null ? void 0 : _a.length) ? item.date_changement[item.date_changement.length - 1] : item.date_initiale;
            return [item.description, formatDate(item.date_initiale), formatDate(last), item.statut];
          }),
          ["*", "auto", "auto", "auto"]
        );
        if (t)
          content.push(t);
      });
    }
    const docs = data.documents || [];
    const media = data.media || [];
    if (docs.length || media.length) {
      content.push(secHdr("DOCUMENTS ET M\xC9DIAS"));
      if (docs.length) {
        content.push(subHdr("Documents"));
        const t = dataTable(
          ["Titre", "Type", "Description", "Date chargement"],
          docs.map((d) => [d.titre, d.type_document, d.description || "\u2014", formatDate(d.chargement_date)]),
          ["*", "auto", "*", "auto"]
        );
        if (t)
          content.push(t);
      }
      if (media.length) {
        content.push(subHdr("M\xE9dias"));
        const t = dataTable(
          ["Titre", "Auteur", "Date"],
          media.map((m) => [m.label, m.auteur || "\u2014", formatDate(m.chargement_date)]),
          ["*", "auto", "auto"]
        );
        if (t)
          content.push(t);
      }
    }
    const docDef = {
      pageSize: "A4",
      pageMargins: [40, 65, 40, 50],
      header: (pg) => pg === 1 ? {} : {
        columns: [
          { text: `SPR-${code}  \xB7  ${data.titre || ""}`, fontSize: 7, color: C.gray400, margin: [40, 18, 0, 0], width: "*" },
          { text: now, fontSize: 7, color: C.gray400, alignment: "right", margin: [0, 18, 40, 0], width: 100 }
        ]
      },
      footer: (pg, total) => ({
        columns: [
          { text: "Suivi des Projets R\xE9glementaires (SPR) \u2014 Confidentiel", fontSize: 7, color: C.gray400, margin: [40, 8, 0, 0], width: "*" },
          { text: `${pg} / ${total}`, fontSize: 7, color: C.gray400, alignment: "right", margin: [0, 8, 40, 0], width: 40 }
        ]
      }),
      content,
      defaultStyle: { font: "Roboto", fontSize: 9, color: C.gray700 }
    };
    pdfLib.createPdf(docDef).download(fname);
  }
  async function generateProjectDocx(data, project) {
    const docxLib = window.docx;
    if (!docxLib) {
      showToast("Biblioth\xE8que Word non disponible. V\xE9rifiez votre connexion.", "error");
      return;
    }
    showToast("G\xE9n\xE9ration du fichier Word\u2026", "info", 2e3);
    const {
      Document,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      BorderStyle,
      WidthType,
      AlignmentType,
      Header,
      Footer,
      PageNumber,
      Packer
    } = docxLib;
    const code = String(project.code).padStart(3, "0");
    const now = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
    const fname = `SPR-${code}_${(data.titre || "projet").replace(/[^\w\-]/g, "_").substring(0, 50)}.docx`;
    const safe = (v) => v == null ? "\u2014" : Array.isArray(v) ? v.join(", ") || "\u2014" : String(v) || "\u2014";
    const BLUE = "1D4ED8";
    const GRAY = "374151";
    const GLGHT = "F3F4F6";
    const WHITE = "FFFFFF";
    const GBDR = "E5E7EB";
    const noBorder = {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE }
    };
    const thinBorder = (color) => ({ style: BorderStyle.SINGLE, color, size: 4 });
    const secHeading = (text) => new Paragraph({
      children: [new TextRun({ text, bold: true, size: 22, color: BLUE, font: "Calibri" })],
      spacing: { before: 320, after: 80 },
      border: { bottom: thinBorder(BLUE) }
    });
    const fieldRow = (label, value) => new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 18, color: GRAY, font: "Calibri" })] })],
          width: { size: 30, type: WidthType.PERCENTAGE },
          shading: { fill: GLGHT },
          margins: { top: 60, bottom: 60, left: 100, right: 80 },
          borders: __spreadProps(__spreadValues({}, noBorder), { bottom: thinBorder(GBDR) })
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: safe(value), size: 18, color: GRAY, font: "Calibri" })] })],
          width: { size: 70, type: WidthType.PERCENTAGE },
          margins: { top: 60, bottom: 60, left: 100, right: 80 },
          borders: __spreadProps(__spreadValues({}, noBorder), { bottom: thinBorder(GBDR) })
        })
      ]
    });
    const infoTable = (rows) => new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows,
      borders: {
        top: thinBorder(GBDR),
        bottom: thinBorder(GBDR),
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideH: thinBorder(GBDR),
        insideV: { style: BorderStyle.NONE }
      }
    });
    const dataTable = (headers, rows) => {
      const headerCells = headers.map((h) => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: "Calibri" })] })],
        shading: { fill: BLUE },
        margins: { top: 60, bottom: 60, left: 100, right: 80 }
      }));
      const dataRows = rows.map((row, i) => new TableRow({
        children: row.map((cell) => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: safe(cell), size: 18, color: GRAY, font: "Calibri" })] })],
          shading: { fill: i % 2 === 0 ? WHITE : GLGHT },
          margins: { top: 60, bottom: 60, left: 100, right: 80 }
        }))
      }));
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [new TableRow({ tableHeader: true, children: headerCells }), ...dataRows]
      });
    };
    const subLabel = (text) => new Paragraph({
      children: [new TextRun({ text, bold: true, size: 18, color: GRAY, font: "Calibri" })],
      spacing: { before: 120, after: 60 }
    });
    const bodyP = (text) => new Paragraph({
      children: [new TextRun({ text: safe(text), size: 18, color: GRAY, font: "Calibri" })],
      spacing: { after: 100 }
    });
    const spacer = () => new Paragraph({ text: "", spacing: { after: 160 } });
    const children = [];
    children.push(new Paragraph({
      children: [new TextRun({ text: `SPR-${code}`, bold: true, size: 40, color: BLUE, font: "Calibri" })],
      spacing: { after: 60 }
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: safe(data.titre), bold: true, size: 28, color: "111827", font: "Calibri" })],
      spacing: { after: 120 }
    }));
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `Statut: ${safe(data.statut)}   `, size: 18, color: GRAY, font: "Calibri" }),
        new TextRun({ text: `Priorit\xE9: ${safe(data.priorite)}   `, size: 18, color: GRAY, font: "Calibri" }),
        new TextRun({ text: `Risque: ${safe(data.niveau_risque)}`, size: 18, color: GRAY, font: "Calibri" })
      ],
      spacing: { after: 60 }
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: `Export\xE9 le ${now}`, size: 16, color: "9CA3AF", font: "Calibri" })],
      spacing: { after: 400 }
    }));
    children.push(secHeading("Informations g\xE9n\xE9rales"));
    children.push(infoTable([
      fieldRow("Code", `SPR-${code}`),
      fieldRow("Titre", data.titre),
      fieldRow("Statut", data.statut),
      fieldRow("Priorit\xE9", data.priorite),
      fieldRow("Niveau de risque", data.niveau_risque),
      fieldRow("Type de projet", data.type_projet || data.type),
      fieldRow("R\xE8glement / Initiative", data.reglement || data.reglement_initiative),
      fieldRow("Direction principale", data.direction_principale),
      fieldRow("Directions responsables", Array.isArray(data.direction_responsable) ? data.direction_responsable.join(", ") : data.direction_responsable),
      fieldRow("Juridiction principale", Array.isArray(data.juridiction_principale) ? data.juridiction_principale.join(", ") : data.juridiction_principale),
      fieldRow("Lois applicables", Array.isArray(data.loi) ? data.loi.join(", ") : data.loi),
      fieldRow("Version", data.version),
      fieldRow("Phase actuelle", data.phase_actuelle),
      fieldRow("Date de d\xE9but", data.date_debut),
      fieldRow("Date de fin pr\xE9vue", data.date_fin_prevue),
      fieldRow("Date de fin r\xE9elle", data.date_fin_reelle)
    ]));
    children.push(spacer());
    children.push(secHeading("Contenu"));
    children.push(subLabel("Description"));
    children.push(bodyP(data.description));
    if (data.objectifs) {
      children.push(subLabel("Objectifs"));
      children.push(bodyP(data.objectifs));
    }
    if (data.portee) {
      children.push(subLabel("Port\xE9e"));
      children.push(bodyP(data.portee));
    }
    if (data.enjeux) {
      children.push(subLabel("Enjeux"));
      children.push(bodyP(data.enjeux));
    }
    if (data.discussion) {
      children.push(subLabel("Discussion"));
      children.push(bodyP(data.discussion));
    }
    if (data.impact_systeme || data.impact_description) {
      children.push(secHeading("Impact syst\xE8me"));
      children.push(bodyP(data.impact_systeme ? "Impact identifié" : "Aucun impact identifié"));
      if (data.impact_description) {
        children.push(bodyP(data.impact_description));
      }
      children.push(spacer());
    }
    const systemes = Array.isArray(data.systemes_touches) ? data.systemes_touches : data.systemes_touches ? [data.systemes_touches] : [];
    if (systemes.length) {
      children.push(secHeading("Syst\xE8mes touch\xE9s"));
      children.push(dataTable(["Syst\xE8me touch\xE9"], systemes.map((s) => [s])));
      children.push(spacer());
    }
    const equipe = Array.isArray(data.equipe) ? data.equipe : [];
    if (equipe.length) {
      children.push(secHeading("\xC9quipe"));
      children.push(dataTable(
        ["Nom", "Pr\xE9nom", "R\xF4le", "Courriel"],
        equipe.map((p) => [p.nom, p.prenom, p.role, p.courriel])
      ));
      children.push(spacer());
    }

    const ressources = Array.isArray(data.Ressources_associees) ? data.Ressources_associees : [];
    if (ressources.length) {
      children.push(secHeading("Ressources associ\xE9es"));
      children.push(dataTable(
        ["Nom", "Pr\xE9nom", "R\xF4le", "Courriel"],
        ressources.map((p) => [p.nom, p.prenom, p.role, p.email])
      ));
      children.push(spacer());
    }

    const soutien = Array.isArray(data.soutien_juridique) ? data.soutien_juridique : [];
    if (soutien.length) {
      children.push(secHeading("Soutien juridique"));
      children.push(dataTable(
        ["Nom", "Pr\xE9nom", "R\xF4le", "Courriel"],
        soutien.map((p) => [p.nom, p.prenom, p.role, p.email])
      ));
      children.push(spacer());
    }

    const comite = Array.isArray(data.Comite_ACVM) ? data.Comite_ACVM : [];
    if (comite.length) {
      children.push(secHeading("Comit\xE9 ACVM"));
      children.push(dataTable(
        ["Pr\xE9nom", "Nom", "Courriel", "Institution"],
        comite.map((m) => [m.prenom, m.nom, m.email, m.institution])
      ));
      children.push(spacer());
    }

    const groupe = Array.isArray(data.groupe_de_travail) ? data.groupe_de_travail : [];
    if (groupe.length) {
      children.push(secHeading("Groupe de travail"));
      children.push(dataTable(
        ["Pr\xE9nom", "Nom", "Courriel", "Institution"],
        groupe.map((m) => [m.prenom, m.nom, m.email, m.institution])
      ));
      children.push(spacer());
    }

    const etapes = Array.isArray(data.etapes) ? data.etapes : [];
    if (etapes.length) {
      children.push(secHeading("Chronologie"));
      children.push(dataTable(
        ["\xC9tape", "Statut", "Date d\xE9but", "Date fin", "Responsable"],
        etapes.map((e) => [e.nom, e.statut, e.date_debut, e.date_fin, e.responsable])
      ));
      children.push(spacer());
    }

    const jalons = Array.isArray(data.jalons) ? data.jalons : [];
    if (jalons.length) {
      children.push(secHeading("Jalons"));
      children.push(dataTable(
        ["Description", "Date initiale", "Date de changement", "Statut"],
        jalons.map((j) => [j.description, j.date_initiale, (j.date_changement && j.date_changement.length) ? j.date_changement[j.date_changement.length - 1] : "", j.statut])
      ));
      children.push(spacer());
    }

    const rencontres = Array.isArray(data.rencontres_approbations) ? data.rencontres_approbations : [];
    if (rencontres.length) {
      children.push(secHeading("Rencontres / Approbations"));
      children.push(dataTable(
        ["Description", "Date initiale", "Date de changement", "Statut"],
        rencontres.map((r) => [r.description, r.date_initiale, (r.date_changement && r.date_changement.length) ? r.date_changement[r.date_changement.length - 1] : "", r.statut])
      ));
      children.push(spacer());
    }

    const devs = Array.isArray(data.developpements_significatifs) ? data.developpements_significatifs : [];
    if (devs.length) {
      children.push(secHeading("D\xE9veloppements significatifs"));
      children.push(dataTable(
        ["Description", "Date initiale", "Date de changement", "Statut"],
        devs.map((d) => [d.description, d.date_initiale, (d.date_changement && d.date_changement.length) ? d.date_changement[d.date_changement.length - 1] : "", d.statut])
      ));
      children.push(spacer());
    }

    const documents = Array.isArray(data.documents) ? data.documents : [];
    if (documents.length) {
      children.push(secHeading("Documents"));
      children.push(dataTable(
        ["Titre", "Type", "Description", "Date chargement", "Chargé par", "Lien"],
        documents.map((d) => [d.titre || d.nom, d.type_document || d.type, d.description || "—", d.chargement_date || "", d.chargement_par || "", d.lien || d.url])
      ));
      children.push(spacer());
    }

    const media = Array.isArray(data.media) ? data.media : [];
    if (media.length) {
      children.push(secHeading("M\xE9dias"));
      children.push(dataTable(
        ["Label", "Auteur", "Date chargement", "Chargé par", "Lien"],
        media.map((m) => [m.label, m.auteur || "—", m.chargement_date || "", m.chargement_par || "", m.lien])
      ));
      children.push(spacer());
    }

    const doc = new Document({
      creator: "SPR \u2014 Suivi des Projets R\xE9glementaires",
      title: `SPR-${code} \u2014 ${data.titre || ""}`,
      description: "Fiche de projet r\xE9glementaire",
      sections: [{
        properties: { page: { margin: { top: 900, bottom: 900, left: 1080, right: 1080 } } },
        headers: {
          default: new Header({
            children: [new Paragraph({
              children: [new TextRun({ text: `SPR-${code}  \xB7  ${data.titre || ""}`, size: 14, color: "9CA3AF", font: "Calibri" })],
              border: { bottom: { color: GBDR, size: 4, space: 4, style: BorderStyle.SINGLE } }
            })]
          })
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              children: [
                new TextRun({ text: "Suivi des Projets R\xE9glementaires (SPR) \u2014 Confidentiel  \xB7  ", size: 14, color: "9CA3AF", font: "Calibri" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 14, color: "9CA3AF", font: "Calibri" }),
                new TextRun({ text: " / ", size: 14, color: "9CA3AF", font: "Calibri" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: "9CA3AF", font: "Calibri" })
              ],
              alignment: AlignmentType.RIGHT
            })]
          })
        },
        children
      }]
    });
    try {
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fname;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("DOCX export error:", err);
      showToast("Erreur lors de la g\xE9n\xE9ration Word.", "error");
    }
  }
  function generateProjectXlsx(data, project) {
    const XLSX = window.XLSX;
    if (!XLSX) {
      showToast("Biblioth\xE8que Excel non disponible. V\xE9rifiez votre connexion.", "error");
      return;
    }
    showToast("G\xE9n\xE9ration du fichier Excel\u2026", "info", 2e3);
    const code = String(project.code).padStart(3, "0");
    const fname = `SPR-${code}_${(data.titre || "projet").replace(/[^\w\-]/g, "_").substring(0, 50)}.xlsx`;
    const safe = (v) => v == null ? "" : Array.isArray(v) ? v.join(", ") : String(v);
    const wb = XLSX.utils.book_new();
    const resumeRows = [
      [`FICHE PROJET \u2014 SPR-${code}`],
      [],
      ["Code", `SPR-${code}`],
      ["Titre", safe(data.titre)],
      ["Statut", safe(data.statut)],
      ["Priorit\xE9", safe(data.priorite)],
      ["Niveau de risque", safe(data.niveau_risque)],
      ["Type de projet", safe(data.type_projet || data.type)],
      ["R\xE8glement / Initiative", safe(data.reglement || data.reglement_initiative)],
      ["Direction principale", safe(data.direction_principale)],
      ["Direction responsable", Array.isArray(data.direction_responsable) ? data.direction_responsable.join(", ") : safe(data.direction_responsable)],
      ["Juridiction principale", Array.isArray(data.juridiction_principale) ? data.juridiction_principale.join(", ") : safe(data.juridiction_principale)],
      ["Lois applicables", Array.isArray(data.loi) ? data.loi.join(", ") : safe(data.loi)],
      ["Version", safe(data.version)],
      ["Phase actuelle", safe(data.phase_actuelle)],
      ["Date de d\xE9but", safe(data.date_debut)],
      ["Date de fin pr\xE9vue", safe(data.date_fin_prevue)],
      ["Date de fin r\xE9elle", safe(data.date_fin_reelle)],
      [],
      ["Description", safe(data.description)],
      ["Enjeux", safe(data.enjeux)],
      ["Discussion", safe(data.discussion)],
      ["Objectifs", safe(data.objectifs)],
      ["Port\xE9e", safe(data.portee)],
      ["Impact système", data.impact_systeme ? "Impact identifié" : "Aucun impact"],
      ["Description impact", safe(data.impact_description)],
      ["Commentaires", safe(data.commentaires)]
    ];
    const wsResume = XLSX.utils.aoa_to_sheet(resumeRows);
    wsResume["!cols"] = [{ wch: 28 }, { wch: 60 }];
    wsResume["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    XLSX.utils.book_append_sheet(wb, wsResume, "R\xE9sum\xE9");
    const equipe = Array.isArray(data.equipe) ? data.equipe : [];
    const equipeRows = [
      [`\xC9QUIPE \u2014 SPR-${code}`],
      [],
      ["Nom", "Pr\xE9nom", "R\xF4le", "Courriel", "T\xE9l\xE9phone"],
      ...equipe.map((p) => [safe(p.nom), safe(p.prenom), safe(p.role), safe(p.courriel), safe(p.telephone)])
    ];
    const wsEquipe = XLSX.utils.aoa_to_sheet(equipeRows);
    wsEquipe["!cols"] = [{ wch: 18 }, { wch: 18 }, { wch: 24 }, { wch: 32 }, { wch: 16 }];
    wsEquipe["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
    XLSX.utils.book_append_sheet(wb, wsEquipe, "\xC9quipe");
    const etapes = Array.isArray(data.etapes) ? data.etapes : [];
    const chronoRows = [
      [`CHRONOLOGIE \u2014 SPR-${code}`],
      [],
      ["\xC9tape", "Statut", "Date d\xE9but", "Date fin", "Responsable", "Commentaire"],
      ...etapes.map((e) => [safe(e.nom), safe(e.statut), safe(e.date_debut), safe(e.date_fin), safe(e.responsable), safe(e.commentaire)])
    ];
    const wschrono = XLSX.utils.aoa_to_sheet(chronoRows);
    wschrono["!cols"] = [{ wch: 28 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 32 }];
    wschrono["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    XLSX.utils.book_append_sheet(wb, wschrono, "Chronologie");
    const documents = Array.isArray(data.documents) ? data.documents : [];
    const docsRows = [
      [`DOCUMENTS \u2014 SPR-${code}`],
      [],
      ["Titre", "Type", "Description", "Date chargement", "Chargé par", "Lien"],
      ...documents.map((d) => [
        safe(d.titre || d.nom),
        safe(d.type_document || d.type),
        safe(d.description),
        safe(d.chargement_date || d.date),
        safe(d.chargement_par),
        safe(d.lien || d.url)
      ])
    ];
    const wsDocs = XLSX.utils.aoa_to_sheet(docsRows);
    wsDocs["!cols"] = [{ wch: 32 }, { wch: 16 }, { wch: 36 }, { wch: 16 }, { wch: 20 }, { wch: 48 }];
    wsDocs["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    XLSX.utils.book_append_sheet(wb, wsDocs, "Documents");

    const media = Array.isArray(data.media) ? data.media : [];
    if (media.length) {
      const mediaRows = [
        [`MÉDIAS — SPR-${code}`],
        [],
        ["Label", "Auteur", "Date chargement", "Chargé par", "Lien"],
        ...media.map((m) => [safe(m.label), safe(m.auteur), safe(m.chargement_date), safe(m.chargement_par), safe(m.lien)])
      ];
      const wsMedia = XLSX.utils.aoa_to_sheet(mediaRows);
      wsMedia["!cols"] = [{ wch: 24 }, { wch: 20 }, { wch: 16 }, { wch: 20 }, { wch: 48 }];
      wsMedia["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
      XLSX.utils.book_append_sheet(wb, wsMedia, "Médias");
    }

    const jalons = Array.isArray(data.jalons) ? data.jalons : [];
    if (jalons.length) {
      const jalonsRows = [
        [`JALONS — SPR-${code}`],
        [],
        ["Description", "Date initiale", "Date de changement", "Statut"],
        ...jalons.map((j) => [safe(j.description), safe(j.date_initiale), safe(j.date_changement && j.date_changement.length ? j.date_changement[j.date_changement.length - 1] : ""), safe(j.statut)])
      ];
      const wsJalons = XLSX.utils.aoa_to_sheet(jalonsRows);
      wsJalons["!cols"] = [{ wch: 32 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
      wsJalons["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsJalons, "Jalons");
    }

    const rencontres = Array.isArray(data.rencontres_approbations) ? data.rencontres_approbations : [];
    if (rencontres.length) {
      const rencontresRows = [
        [`RENCONTRES — SPR-${code}`],
        [],
        ["Description", "Date initiale", "Date de changement", "Statut"],
        ...rencontres.map((r) => [safe(r.description), safe(r.date_initiale), safe(r.date_changement && r.date_changement.length ? r.date_changement[r.date_changement.length - 1] : ""), safe(r.statut)])
      ];
      const wsRencontres = XLSX.utils.aoa_to_sheet(rencontresRows);
      wsRencontres["!cols"] = [{ wch: 32 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
      wsRencontres["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsRencontres, "Rencontres");
    }

    const devs = Array.isArray(data.developpements_significatifs) ? data.developpements_significatifs : [];
    if (devs.length) {
      const devsRows = [
        [`DÉVELOPPEMENTS — SPR-${code}`],
        [],
        ["Description", "Date initiale", "Date de changement", "Statut"],
        ...devs.map((d) => [safe(d.description), safe(d.date_initiale), safe(d.date_changement && d.date_changement.length ? d.date_changement[d.date_changement.length - 1] : ""), safe(d.statut)])
      ];
      const wsDevs = XLSX.utils.aoa_to_sheet(devsRows);
      wsDevs["!cols"] = [{ wch: 32 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
      wsDevs["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsDevs, "Développements");
    }

    const ressources = Array.isArray(data.Ressources_associees) ? data.Ressources_associees : [];
    if (ressources.length) {
      const ressourcesRows = [
        [`RESSOURCES ASSOCIEES — SPR-${code}`],
        [],
        ["Nom", "Prénom", "Rôle", "Courriel"],
        ...ressources.map((p) => [safe(p.nom), safe(p.prenom), safe(p.role), safe(p.email)])
      ];
      const wsRessources = XLSX.utils.aoa_to_sheet(ressourcesRows);
      wsRessources["!cols"] = [{ wch: 20 }, { wch: 18 }, { wch: 26 }, { wch: 32 }];
      wsRessources["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsRessources, "Ressources");
    }

    const soutien = Array.isArray(data.soutien_juridique) ? data.soutien_juridique : [];
    if (soutien.length) {
      const soutienRows = [
        [`SOUTIEN JURIDIQUE — SPR-${code}`],
        [],
        ["Nom", "Prénom", "Rôle", "Courriel"],
        ...soutien.map((p) => [safe(p.nom), safe(p.prenom), safe(p.role), safe(p.email)])
      ];
      const wsSoutien = XLSX.utils.aoa_to_sheet(soutienRows);
      wsSoutien["!cols"] = [{ wch: 20 }, { wch: 18 }, { wch: 26 }, { wch: 32 }];
      wsSoutien["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsSoutien, "Soutien juridique");
    }

    const comite = Array.isArray(data.Comite_ACVM) ? data.Comite_ACVM : [];
    if (comite.length) {
      const comiteRows = [
        [`COMITE ACVM — SPR-${code}`],
        [],
        ["Prénom", "Nom", "Courriel", "Institution"],
        ...comite.map((m) => [safe(m.prenom), safe(m.nom), safe(m.email), safe(m.institution)])
      ];
      const wsComite = XLSX.utils.aoa_to_sheet(comiteRows);
      wsComite["!cols"] = [{ wch: 18 }, { wch: 18 }, { wch: 32 }, { wch: 28 }];
      wsComite["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsComite, "Comité ACVM");
    }

    const groupe = Array.isArray(data.groupe_de_travail) ? data.groupe_de_travail : [];
    if (groupe.length) {
      const groupeRows = [
        [`GROUPE DE TRAVAIL — SPR-${code}`],
        [],
        ["Prénom", "Nom", "Courriel", "Institution"],
        ...groupe.map((m) => [safe(m.prenom), safe(m.nom), safe(m.email), safe(m.institution)])
      ];
      const wsGroupe = XLSX.utils.aoa_to_sheet(groupeRows);
      wsGroupe["!cols"] = [{ wch: 18 }, { wch: 18 }, { wch: 32 }, { wch: 28 }];
      wsGroupe["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(wb, wsGroupe, "Groupe de travail");
    }

    try {
      XLSX.writeFile(wb, fname);
    } catch (err) {
      console.error("XLSX export error:", err);
      showToast("Erreur lors de la génération Excel.", "error");
    }
  }

  // js/views/help.js
  var SECTIONS = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "navigation", label: "Navigation" },
    { id: "dashboard", label: "Tableau de bord" },
    { id: "projects-list", label: "Liste des projets" },
    { id: "project-detail", label: "Fiche projet" },
    { id: "edit-mode", label: "Mode \xE9dition" },
    { id: "drafts", label: "Brouillons" },
    { id: "history", label: "Historique des versions" },
    { id: "customization", label: "Personnalisation" }
  ];
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
    </li>`).join("")}</ol>`;
  }
  function bullets(items) {
    return `<ul class="space-y-1.5 pl-1">${items.map((s) => `
    <li class="flex gap-2">
      <span class="text-blue-400 shrink-0 mt-1">\u25B8</span>
      <span>${s}</span>
    </li>`).join("")}</ul>`;
  }
  function sub(title, body) {
    return `<div class="mt-2">
    <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">${title}</h3>
    ${body}
  </div>`;
  }
  function bodyOverview() {
    return `
    <p>
      <strong>SPR (Suivi des Projets R\xE9glementaires)</strong> est une application de gestion et de suivi
      des projets r\xE9glementaires. Elle permet de consulter, analyser, modifier et publier les informations
      relatives aux projets en cours, en attente ou termin\xE9s.
    </p>

    ${sub("Fonctionnalit\xE9s principales", bullets([
      "Tableau de bord avec indicateurs cl\xE9s (KPIs) et graphiques analytiques",
      "Liste filtr\xE9e et triable de tous les projets r\xE9glementaires",
      "Fiches projets d\xE9taill\xE9es avec onglets (g\xE9n\xE9ral, \xE9quipe, chronologie, documents, historique)",
      "Mode \xE9dition avec enregistrement de brouillons et publication versionn\xE9e",
      "Historique complet des modifications avec possibilit\xE9 de restauration",
      "Fonctionnement hors connexion gr\xE2ce au cache local (IndexedDB)"
    ]))}

    ${sub("Niveaux d'acc\xE8s", `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p class="font-semibold text-gray-800 mb-1">Tous les utilisateurs</p>
          ${bullets(["Consulter le tableau de bord", "Parcourir et filtrer les projets", "Lire les fiches projets et l'historique"])}
        </div>
        <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p class="font-semibold text-blue-800 mb-1">Contributeurs</p>
          ${bullets(["Modifier les projets (brouillon)", "Publier une nouvelle version", "Restaurer une version ant\xE9rieure"])}
          <p class="text-xs text-blue-600 mt-1.5">Un contributeur est une personne list\xE9e dans les <em>Ressources associ\xE9es</em> ou le <em>Soutien juridique</em> d'un projet.</p>
        </div>
      </div>
    `)}

    ${tip('En mode d\xE9veloppement (<span class="font-mono text-xs bg-blue-100 px-1 rounded">DEV_MODE: true</span>), des donn\xE9es fictives sont utilis\xE9es et toutes les modifications sont locales \u2014 aucune \xE9criture dans SharePoint.')}
  `;
  }
  function bodyNavigation() {
    return `
    ${sub("Barre lat\xE9rale (Sidebar)", `
      <p class="mb-2">La sidebar est le point d'entr\xE9e principal de la navigation. Elle est fixe sur bureau et s'ouvre en glissant sur mobile (bouton \u2630 en haut \xE0 gauche).</p>
      <div class="space-y-2">
        ${kv("Tableau de bord", "Affiche les KPIs, graphiques et tables de synth\xE8se.")}
        ${kv("Projets", "Affiche la liste compl\xE8te des projets r\xE9glementaires.")}
      </div>
    `)}

    ${sub("Filtres rapides", `
      <p class="mb-2">Quatre raccourcis de filtre sont disponibles directement dans la sidebar :</p>
      <div class="space-y-1.5">
        ${kv(badge("En cours", "bg-blue-100 text-blue-700"), "Projets avec statut <em>en cours</em>")}
        ${kv(badge("En attente", "bg-amber-100 text-amber-700"), "Projets avec statut <em>en attente</em>")}
        ${kv(badge("Priorit\xE9 \xE9lev\xE9e", "bg-red-100 text-red-700"), "Projets avec priorit\xE9 <em>\xE9lev\xE9</em>")}
        ${kv(badge("Risque \xE9lev\xE9", "bg-orange-100 text-orange-700"), "Projets avec niveau de risque <em>\xE9lev\xE9</em>")}
      </div>
      <p class="mt-2 text-xs text-gray-500">Un clic am\xE8ne directement sur la liste des projets avec le filtre pr\xE9-appliqu\xE9.</p>
    `)}

    ${sub("En-t\xEAte (Header)", `
      <div class="space-y-2">
        ${kv("Fil d'Ariane", "Indique la position dans l'application. Les \xE9l\xE9ments cliquables permettent de remonter dans la hi\xE9rarchie.")}
        ${kv("Barre de recherche", "Recherche textuelle globale : saisir du texte redirige vers la liste des projets avec le filtre de recherche actif. Visible \xE0 partir de md (\u2265 768 px).")}
        ${kv("Brouillons \u270F", "Badge orange affichant le nombre de brouillons en cours. Visible uniquement s'il y en a au moins un.")}
        ${kv("Actualiser \u21BA", "Recharge les donn\xE9es depuis le serveur (hors DEV_MODE) ou affiche un message de confirmation en mode d\xE9veloppement.")}
        ${kv("Mode sombre \u2600/\u{1F319}", "Bascule entre le th\xE8me clair et sombre. La pr\xE9f\xE9rence est m\xE9moris\xE9e.")}
      </div>
    `)}

    ${tip("Sur mobile, fermer la sidebar en tapant sur le fond gris\xE9 ou sur le bouton \u2715 en haut de la sidebar.")}
  `;
  }
  function bodyDashboard() {
    return `
    <p>Le tableau de bord offre une vue d'ensemble analytique de tous les projets r\xE9glementaires.</p>

    ${sub("Indicateurs cl\xE9s (KPIs \u2014 rang\xE9e principale)", `
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${kv(badge("Total", "bg-blue-100 text-blue-700"), "Nombre total de projets charg\xE9s.")}
        ${kv(badge("En cours", "bg-blue-100 text-blue-700"), "Projets avec statut <em>en cours</em>.")}
        ${kv(badge("Priorit\xE9 \xE9lev\xE9e", "bg-red-100 text-red-700"), "Projets avec priorit\xE9 <em>\xE9lev\xE9</em>.")}
        ${kv(badge("Risque \xE9lev\xE9", "bg-orange-100 text-orange-700"), "Projets avec niveau de risque <em>\xE9lev\xE9</em>.")}
        ${kv(badge("Jalons \xE0 venir", "bg-teal-100 text-teal-700"), "Jalons non compl\xE9t\xE9s dans les 30 prochains jours.")}
        ${kv(badge("Impact syst\xE8me", "bg-purple-100 text-purple-700"), "Projets n\xE9cessitant des modifications aux syst\xE8mes.")}
      </div>
    `)}

    ${sub("KPIs secondaires", `
      <div class="space-y-1">
        ${kv("Termin\xE9s", "Projets avec statut <em>termin\xE9</em>.")}
        ${kv("En attente", "Projets avec statut <em>en attente</em>.")}
        ${kv("Clos", "Projets avec statut <em>clos</em>.")}
        ${kv("Jalons en retard", "Jalons dont la date est d\xE9pass\xE9e et le statut n'est pas <em>compl\xE9t\xE9</em> ou <em>annul\xE9</em>.")}
      </div>
    `)}

    ${sub("Graphiques", `
      <div class="space-y-2">
        ${kv("R\xE9partition par statut", "Graphique donut \u2014 En cours, Termin\xE9, En attente, Clos.")}
        ${kv("R\xE9partition par priorit\xE9", "Graphique donut \u2014 \xC9lev\xE9, Moyen, Faible.")}
        ${kv("R\xE9partition par risque", "Graphique donut \u2014 \xC9lev\xE9, Moyen, Faible.")}
        ${kv("Projets par direction", "Graphique en barres horizontales \u2014 top 8 directions.")}
        ${kv("Jalons \xE0 venir", "Graphique en barres \u2014 distribution des jalons sur les 6 prochains mois.")}
      </div>
    `)}

    ${sub("Tables analytiques", `
      <div class="space-y-2">
        ${kv("Jalons en retard", "Projets class\xE9s par nombre de jalons en retard. Lien direct vers la fiche projet.")}
        ${kv("Modifi\xE9s r\xE9cemment", "Projets modifi\xE9s dans les 7 derniers jours, tri\xE9s du plus r\xE9cent au plus ancien.")}
        ${kv("Par type", "Distribution des projets par type avec barres de progression.")}
        ${kv("Top 5 juridictions", "Cinq juridictions principales avec leur nombre de projets.")}
        ${kv("Taux de compl\xE9tion", "Pourcentage de projets termin\xE9s par direction, tri\xE9 par taux d\xE9croissant.")}
      </div>
    `)}

    ${tip("Le tableau de bord se met \xE0 jour automatiquement \xE0 chaque navigation. Utilisez le bouton \u21BA pour forcer un rechargement depuis le serveur.")}
  `;
  }
  function bodyProjectsList() {
    return `
    <p>La liste des projets permet de parcourir, rechercher, filtrer et trier l'ensemble des projets r\xE9glementaires.</p>

    ${sub("Barre d'outils", `
      <div class="space-y-2">
        ${kv("Cartes / Tableau", "Deux vues disponibles \u2014 cartes visuelles ou tableau de donn\xE9es. Le choix est m\xE9moris\xE9 entre les sessions.")}
        ${kv("\u2191 / \u2193", "Inverse l'ordre de tri (ascendant / descendant). M\xE9moris\xE9 entre les sessions.")}
      </div>
    `)}

    ${sub("Recherche et filtres", `
      <div class="space-y-2">
        ${kv("Recherche textuelle", "Filtre simultan\xE9ment sur le titre, le code (ex: SPR-042), le type de projet, la direction principale et le r\xE8glement.")}
        ${kv("Statut", "En cours \xB7 Termin\xE9 \xB7 En attente \xB7 Clos")}
        ${kv("Priorit\xE9", "\xC9lev\xE9 \xB7 Moyen \xB7 Faible")}
        ${kv("Risque", "\xC9lev\xE9 \xB7 Moyen \xB7 Faible")}
        ${kv("Direction", "Direction principale du projet.")}
        ${kv("Type", "Type de projet (liste fixe).")}
        ${kv("Trier par", "Code \xB7 Titre \xB7 Statut \xB7 Priorit\xE9 \xB7 Date de modification")}
      </div>
      ${tip("Les filtres sont cumulatifs. Un badge de filtre actif appara\xEEt pour chaque filtre. Cliquer sur <strong>\xD7</strong> dans un badge supprime ce filtre.")}
    `)}

    ${sub("Graphique de distribution", `
      <p>Un graphique donut \xAB Distribution par statut \xBB est affich\xE9 dans la zone de filtres. Il est recalcul\xE9 \xE0 chaque changement de filtre et refl\xE8te uniquement les projets actuellement affich\xE9s.</p>
    `)}

    ${sub("Vue Cartes", `
      <p class="mb-2">Chaque carte affiche :</p>
      ${bullets([
      'Code <span class="font-mono text-xs bg-blue-100 text-blue-700 px-1 rounded">SPR-XXX</span>, statut, indicateur de brouillon',
      "Titre du projet (2 lignes max) et type de projet",
      "Direction principale",
      "Badges priorit\xE9 et risque",
      "Avatars des ressources associ\xE9es (max 3 + compteur)",
      "Indicateurs de jalons (points color\xE9s : vert = compl\xE9t\xE9, bleu = en cours, orange = report\xE9)",
      "Version et date de derni\xE8re modification",
      "Bouton <strong>Voir \u2192</strong> pour acc\xE9der \xE0 la fiche projet"
    ])}
    `)}

    ${sub("Vue Tableau", `
      <p class="mb-2">Colonnes disponibles (certaines masqu\xE9es sur petit \xE9cran) :</p>
      ${bullets([
      "<strong>Code</strong> \u2014 avec indicateur de brouillon (point orange)",
      "<strong>Titre</strong> \u2014 lien cliquable vers la fiche + type sous le titre",
      "<strong>Statut</strong> \xB7 <strong>Priorit\xE9</strong> \xB7 <strong>Risque</strong> \u2014 badges color\xE9s",
      "<strong>Direction</strong> \u2014 masqu\xE9e sous lg",
      "<strong>\xC9quipe</strong> \u2014 avatars empil\xE9s, masqu\xE9e sous xl",
      "<strong>Version</strong> \u2014 masqu\xE9e sous md",
      "<strong>Actions</strong> \u2014 bouton Voir \u2192"
    ])}
    `)}
  `;
  }
  function bodyProjectDetail() {
    return `
    <p>La fiche projet regroupe toutes les informations d'un projet r\xE9glementaire en cinq onglets.</p>

    ${sub("En-t\xEAte", `
      <div class="space-y-1.5">
        ${kv("Code SPR-XXX", "Identifiant unique du projet (format num\xE9rique sur 3 chiffres).")}
        ${kv("Statut / Priorit\xE9 / Risque", "Badges color\xE9s refl\xE9tant l'\xE9tat actuel (ou brouillon si en mode brouillon).")}
        ${kv("Titre", "Nom complet du projet, type de projet, r\xE8glement et num\xE9ro de version.")}
        ${kv("Voir brouillon", "Visible si un brouillon existe et si vous \xEAtes contributeur. Bascule l'affichage entre la version publi\xE9e et le brouillon en cours.")}
        ${kv("Modifier", "Visible si vous \xEAtes contributeur et non en mode \xE9dition. Active le mode \xE9dition.")}
        ${kv("Publier vN", "Visible si un brouillon existe et si vous \xEAtes contributeur. Ouvre la confirmation de publication.")}
      </div>
    `)}

    ${sub("Onglet G\xE9n\xE9ral", `
      <div class="space-y-1.5">
        ${kv("Description", "Pr\xE9sentation g\xE9n\xE9rale du projet et de ses objectifs.")}
        ${kv("Enjeux", "Probl\xE9matiques et consid\xE9rations \xE0 prendre en compte.")}
        ${kv("Discussion", "Avancement des consultations et notes de travail.")}
        ${kv("Informations", "R\xE8glement applicable, type de projet, juridiction et direction principale.")}
        ${kv("Lois applicables", "Liste des lois vis\xE9es par ce projet.")}
        ${kv("Directions responsables", "Directions charg\xE9es du projet (peut en lister plusieurs).")}
        ${kv("Impact syst\xE8me", "Indique si le projet n\xE9cessite des adaptations techniques ou informatiques.")}
      </div>
    `)}

    ${sub("Onglet \xC9quipe", `
      <div class="space-y-1.5">
        ${kv("Ressources associ\xE9es", "Membres de l'\xE9quipe principale avec photo, r\xF4le et courriel cliquable.")}
        ${kv("Soutien juridique", "Conseillers juridiques associ\xE9s.")}
        ${kv("Comit\xE9 ACVM", "Membres du comit\xE9 inter-provincial (tableau avec institution).")}
        ${kv("Groupe de travail", "Membres du groupe de travail (tableau avec institution).")}
      </div>
    `)}

    ${sub("Onglet Chronologie", `
      <p class="mb-2">Trois sections pr\xE9sent\xE9es en ligne du temps avec indicateurs color\xE9s :</p>
      <div class="space-y-1.5">
        ${kv("Jalons", "\xC9tapes cl\xE9s du projet avec date initiale et dates de r\xE9vision.")}
        ${kv("Rencontres et approbations", "R\xE9unions planifi\xE9es ou tenues.")}
        ${kv("D\xE9veloppements significatifs", "\xC9v\xE9nements importants affectant le projet.")}
      </div>
      <p class="mt-2 text-xs text-gray-500">Couleurs des indicateurs : <span class="text-green-600">\u25CF</span> compl\xE9t\xE9/tenu \xB7 <span class="text-blue-500">\u25CF</span> en cours/\xE0 venir/planifi\xE9 \xB7 <span class="text-amber-500">\u25CF</span> report\xE9 \xB7 <span class="text-gray-400">\u25CF</span> annul\xE9</p>
      ${tip("Quand une date a \xE9t\xE9 r\xE9vis\xE9e, la date initiale est affich\xE9e en gris et la date r\xE9vis\xE9e en orange avec un <strong>\u2192 R\xE9vis\xE9 :</strong>.")}
    `)}

    ${sub("Onglet Documents", `
      <div class="space-y-1.5">
        ${kv("Documents", "Tableau avec titre, type, description, date de chargement, auteur et lien d'ouverture.")}
        ${kv("M\xE9dias", "Liens vers des ressources media (communiqu\xE9s, vid\xE9os, balados) avec auteur et date.")}
      </div>
    `)}

    ${sub("Onglet Historique", `
      <p>Affiche la lign\xE9e des versions directement dans la fiche projet (m\xEAme contenu que la page d'historique compl\xE8te accessible via <span class="font-mono text-xs bg-gray-100 px-1 rounded">#history-N</span>).</p>
    `)}
  `;
  }
  function bodyEditMode() {
    return `
    ${warn("Le mode \xE9dition est r\xE9serv\xE9 aux <strong>contributeurs</strong> d'un projet : personnes list\xE9es dans <em>Ressources associ\xE9es</em> ou <em>Soutien juridique</em>.")}

    ${sub("Activation", steps([
      "Ouvrir la fiche du projet souhait\xE9.",
      "V\xE9rifier que le bouton <strong>Modifier</strong> est pr\xE9sent en haut \xE0 droite de l'en-t\xEAte.",
      "Cliquer sur <strong>Modifier</strong> \u2014 la zone de contenu se transforme en formulaire."
    ]))}

    ${sub("Formulaire \u2014 Onglet G\xE9n\xE9ral", `
      <div class="space-y-1.5">
        ${kv("Titre du projet", "Champ texte libre.")}
        ${kv("Type de projet", "Liste de s\xE9lection fixe.")}
        ${kv("R\xE8glement", "Champ texte libre.")}
        ${kv("Statut / Priorit\xE9 / Risque", "Listes de s\xE9lection.")}
        ${kv("Juridiction principale", "Champ texte libre.")}
        ${kv("Direction principale", "Champ texte libre.")}
        ${kv("Description / Enjeux / Discussion", "Zones de texte multi-lignes redimensionnables.")}
        ${kv("Lois applicables", "Saisir une loi dans le champ, cliquer <strong>+</strong> pour l'ajouter. Cliquer <strong>\xD7</strong> sur un badge pour la retirer.")}
        ${kv("Impact syst\xE8me", "Case \xE0 cocher + zone de description si coch\xE9.")}
      </div>
    `)}

    ${sub("Formulaire \u2014 Onglet \xC9quipe", `
      <p class="mb-2">Pour chaque liste (Ressources, Soutien, Comit\xE9, Groupe de travail) :</p>
      ${bullets([
      "Cliquer <strong>\xD7</strong> (bouton rouge) sur une entr\xE9e pour la supprimer.",
      "D\xE9plier la section <strong>+ Ajouter une personne / un membre</strong> en bas du bloc.",
      "Remplir pr\xE9nom, nom, courriel (et r\xF4le pour les ressources).",
      "Cliquer <strong>Ajouter</strong>."
    ])}
    `)}

    ${sub("Formulaire \u2014 Onglet Chronologie", `
      <p class="mb-2">Pour chaque section (Jalons, Rencontres, D\xE9veloppements) :</p>
      ${bullets([
      "Cliquer <strong>\u2715</strong> sur une entr\xE9e pour la supprimer.",
      "Pour ajouter une date de r\xE9vision \xE0 un jalons existant : saisir la date dans le champ de date de l'entr\xE9e et cliquer <strong>+ Date r\xE9vision</strong>.",
      "D\xE9plier <strong>+ Ajouter une entr\xE9e</strong> pour cr\xE9er une nouvelle entr\xE9e (description, date initiale, statut)."
    ])}
    `)}

    ${sub("Enregistrer le brouillon", steps([
      "Remplir ou modifier les champs souhait\xE9s dans n'importe quel onglet.",
      "Cliquer <strong>Enregistrer le brouillon</strong> en bas du formulaire.",
      "Une notification verte confirme l'enregistrement. La fiche revient en mode lecture.",
      `Un badge <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Brouillon</span> appara\xEEt dans l'en-t\xEAte.`
    ]))}

    ${sub("Publier une version", steps([
      "S'assurer qu'un brouillon existe (badge visible dans l'en-t\xEAte).",
      "Cliquer <strong>Publier vN</strong> (N = num\xE9ro de la prochaine version).",
      "Confirmer dans la bo\xEEte de dialogue.",
      "La version est publi\xE9e, le brouillon est supprim\xE9 et le num\xE9ro de version est incr\xE9ment\xE9."
    ]))}

    ${tip("En mode d\xE9veloppement, le brouillon est sauvegard\xE9 uniquement en m\xE9moire locale (non persist\xE9 dans SharePoint). Il sera perdu \xE0 la fermeture ou au rechargement de la page.")}
  `;
  }
  function bodyDrafts() {
    return `
    <p>Un <strong>brouillon</strong> repr\xE9sente une version modifi\xE9e d'un projet non encore publi\xE9e. Il coexiste avec la version publi\xE9e jusqu'\xE0 sa publication ou sa suppression.</p>

    ${sub("Indicateurs de brouillon", `
      <div class="space-y-2">
        ${kv("Liste des projets \u2014 carte", badge("Brouillon", "bg-amber-100 text-amber-700") + " \u2014 badge visible sur la carte ou dans la colonne Code (vue tableau).")}
        ${kv("Fiche projet \u2014 en-t\xEAte", 'Badge <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Brouillon</span> dans les badges de statut, si un brouillon existe.')}
        ${kv("Fiche projet \u2014 banni\xE8re", "Bandeau orange sous l'en-t\xEAte indiquant : qui a modifi\xE9 le brouillon et quand.")}
        ${kv("En-t\xEAte global", "Badge num\xE9rique orange sur l'ic\xF4ne \u270F dans l'en-t\xEAte principal, affichant le nombre total de brouillons en cours.")}
      </div>
    `)}

    ${sub("Visualisation brouillon vs publi\xE9", `
      <p class="mb-2">Sur la fiche d'un projet ayant un brouillon (et si vous \xEAtes contributeur) :</p>
      ${steps([
      "Cliquer sur <strong>Voir brouillon</strong> dans l'en-t\xEAte pour basculer l'affichage vers les donn\xE9es du brouillon.",
      "Tous les onglets refl\xE8tent alors le contenu du brouillon (non publi\xE9).",
      "Cliquer <strong>Voir version publi\xE9e</strong> pour revenir \xE0 la version officielle."
    ])}
      ${tip("Cette bascule est uniquement visuelle \u2014 elle ne modifie pas les donn\xE9es.")}
    `)}

    ${sub("Suppression d'un brouillon", `
      <p>Un brouillon est automatiquement supprim\xE9 lors de sa publication. Il n'existe pas d'action de suppression manuelle dans l'interface actuelle \u2014 contacter l'administrateur si n\xE9cessaire.</p>
    `)}
  `;
  }
  function bodyHistory() {
    return `
    <p>Chaque publication ou sauvegarde de brouillon cr\xE9e une entr\xE9e dans l'historique. Cela permet de suivre l'\xE9volution d'un projet et de restaurer une version ant\xE9rieure.</p>

    ${sub("Acc\xE8s", `
      ${bullets([
      "Via l'<strong>onglet Historique</strong> dans la fiche projet (chargement \xE0 la demande).",
      `Via l'URL directe <span class="font-mono text-xs bg-gray-100 px-1 rounded">#history-N</span> (N = code du projet).`
    ])}
    `)}

    ${sub("Lecture de la timeline", `
      <div class="space-y-2">
        ${kv(badge("v3", "bg-blue-100 text-blue-700 font-mono"), "Num\xE9ro de version.")}
        ${kv(badge("Publi\xE9", "bg-green-100 text-green-700"), "Version officiellement publi\xE9e.")}
        ${kv(badge("Brouillon", "bg-amber-100 text-amber-700"), "Sauvegarde interm\xE9diaire non publi\xE9e.")}
        ${kv("Champs modifi\xE9s", `Affiche les champs qui ont chang\xE9 avec l'ancienne valeur <span class="line-through text-red-400">barr\xE9e</span> et la nouvelle valeur <span class="text-green-600">color\xE9e en vert</span>.`)}
        ${kv("Voir les d\xE9tails", "D\xE9ploie l'instantan\xE9 complet de la version (titre, statut, priorit\xE9, risque, etc.).")}
      </div>
    `)}

    ${sub("Filtres", `
      <p>Trois boutons permettent de filtrer les entr\xE9es :</p>
      ${bullets([
      "<strong>Tout</strong> \u2014 affiche toutes les entr\xE9es.",
      "<strong>Publi\xE9es</strong> \u2014 affiche uniquement les versions publi\xE9es.",
      "<strong>Brouillons</strong> \u2014 affiche uniquement les sauvegardes de brouillons."
    ])}
    `)}

    ${sub("Restaurer une version", steps([
      "Rep\xE9rer l'entr\xE9e de version souhait\xE9e dans la timeline.",
      "Cliquer sur l'ic\xF4ne de restauration (fl\xE8che) \xE0 droite de l'entr\xE9e.",
      "Confirmer dans la bo\xEEte de dialogue.",
      "L'instantan\xE9 de cette version est charg\xE9 comme nouveau brouillon.",
      "R\xE9viser si n\xE9cessaire, puis publier pour rendre les modifications officielles."
    ]))}

    ${warn("La restauration cr\xE9e un <strong>brouillon</strong> \u2014 elle ne publie pas automatiquement. Vous devrez publier explicitement pour que la version restaur\xE9e devienne officielle.")}
  `;
  }
  function bodyCustomization() {
    return `
    ${sub("Mode sombre / clair", steps([
      "Cliquer sur l'ic\xF4ne \u2600 / \u{1F319} dans l'en-t\xEAte principal (coin sup\xE9rieur droit).",
      "Le th\xE8me bascule imm\xE9diatement.",
      'La pr\xE9f\xE9rence est m\xE9moris\xE9e dans <span class="font-mono text-xs bg-gray-100 px-1 rounded">localStorage</span> et restaur\xE9e \xE0 la prochaine ouverture.'
    ]))}

    ${sub("Vue de la liste des projets", `
      <div class="space-y-1.5">
        ${kv("Vue Cartes", "Activ\xE9e via le bouton <strong>Cartes</strong> dans la barre d'outils de la liste.")}
        ${kv("Vue Tableau", "Activ\xE9e via le bouton <strong>Tableau</strong>.")}
        ${kv("Persistance", `Le choix de vue, le crit\xE8re de tri et l'ordre (ascendant/descendant) sont m\xE9moris\xE9s dans <span class="font-mono text-xs bg-gray-100 px-1 rounded">localStorage</span>.`)}
      </div>
    `)}

    ${sub("Cache hors connexion", `
      <p>Les projets charg\xE9s depuis le serveur sont automatiquement mis en cache dans une base de donn\xE9es locale <strong>IndexedDB</strong>. En cas de perte de connexion, l'application charge les donn\xE9es depuis ce cache avec un message d'information.</p>
      ${tip("En mode d\xE9veloppement, le cache est aliment\xE9 par les donn\xE9es fictives g\xE9n\xE9r\xE9es automatiquement au d\xE9marrage.")}
    `)}

    ${sub("Langue", `
      <p>L'application est enti\xE8rement en <strong>fran\xE7ais canadien</strong> (fr-CA). Les dates et heures sont format\xE9es selon cette locale. Il n'existe pas d'option de changement de langue dans l'interface actuelle.</p>
    `)}
  `;
  }
  var ICONS = {
    overview: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    navigation: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>`,
    dashboard: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
    "projects-list": `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    "project-detail": `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    "edit-mode": `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    drafts: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`,
    history: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    customization: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
  };
  var BODIES = {
    overview: bodyOverview,
    navigation: bodyNavigation,
    dashboard: bodyDashboard,
    "projects-list": bodyProjectsList,
    "project-detail": bodyProjectDetail,
    "edit-mode": bodyEditMode,
    drafts: bodyDrafts,
    history: bodyHistory,
    customization: bodyCustomization
  };
  function renderHelp() {
    const tocLinks = SECTIONS.map((s) => `
    <a href="#help-${s.id}" class="help-toc-link flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-600
       hover:text-blue-600 hover:bg-blue-50 transition-colors" data-section="${s.id}">
      <span class="w-4 h-4 shrink-0 text-gray-400">${ICONS[s.id]}</span>
      ${s.label}
    </a>`).join("");
    const sections = SECTIONS.map(
      (s) => section(s.id, s.label, ICONS[s.id], BODIES[s.id]())
    ).join("");
    return `
    <div class="animate-fadeIn" id="help-root">

      <!-- Page title -->
      <div class="mb-5">
        <h1 class="text-2xl font-bold text-gray-900">Manuel d'utilisation</h1>
        <p class="text-sm text-gray-500 mt-1">Guide complet de l'application SPR \u2014 Suivi des Projets R\xE9glementaires</p>
      </div>

      <!-- Search -->
      <div class="relative mb-5">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input id="help-search" type="search" placeholder="Rechercher dans le manuel\u2026"
          class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white shadow-sm" />
        <div id="help-search-results"
          class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto">
        </div>
      </div>
      <!-- No-results banner (hidden by default) -->
      <div id="help-no-results" class="hidden mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 text-center">
        Aucune section ne correspond \xE0 votre recherche.
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
                Table des mati\xE8res
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
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Table des mati\xE8res</p>
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
  function attachHelpListeners() {
    const tocToggle = document.getElementById("help-toc-toggle");
    const tocMobile = document.getElementById("help-toc-mobile");
    const tocChevron = document.getElementById("help-toc-chevron");
    tocToggle == null ? void 0 : tocToggle.addEventListener("click", () => {
      const open = !tocMobile.classList.contains("hidden");
      tocMobile.classList.toggle("hidden", open);
      tocChevron == null ? void 0 : tocChevron.classList.toggle("rotate-180", !open);
    });
    tocMobile == null ? void 0 : tocMobile.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        tocMobile.classList.add("hidden");
        tocChevron == null ? void 0 : tocChevron.classList.remove("rotate-180");
      }
    });
    document.querySelectorAll(".help-toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: "smooth" });
          const main = document.getElementById("main-content");
          if (main) {
            const yMain = target.getBoundingClientRect().top + main.scrollTop - 72;
            main.scrollTo({ top: yMain, behavior: "smooth" });
          }
        }
      });
    });
    const allSectionEls = document.querySelectorAll("[data-help-section]");
    if ("IntersectionObserver" in window && allSectionEls.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.helpSection;
            document.querySelectorAll(".help-toc-link").forEach((l) => {
              const active = l.dataset.section === id;
              l.classList.toggle("bg-blue-50", active);
              l.classList.toggle("text-blue-600", active);
              l.classList.toggle("font-medium", active);
              l.classList.toggle("text-gray-600", !active);
            });
          }
        });
      }, { rootMargin: "-10% 0px -60% 0px", threshold: 0 });
      allSectionEls.forEach((el) => observer.observe(el));
    }
    const searchInput = document.getElementById("help-search");
    const searchResults = document.getElementById("help-search-results");
    const noResults = document.getElementById("help-no-results");
    const helpContent = document.getElementById("help-content");
    const index = {};
    allSectionEls.forEach((el) => {
      index[el.dataset.helpSection] = el.textContent.toLowerCase();
    });
    const sectionLabel = {};
    SECTIONS.forEach((s) => {
      sectionLabel[s.id] = s.label;
    });
    searchInput == null ? void 0 : searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.classList.add("hidden");
        searchResults.innerHTML = "";
        noResults.classList.add("hidden");
        allSectionEls.forEach((el) => el.classList.remove("hidden"));
        return;
      }
      const matches = SECTIONS.filter((s) => {
        var _a;
        return (_a = index[s.id]) == null ? void 0 : _a.includes(q);
      });
      allSectionEls.forEach((el) => {
        const match = matches.some((s) => s.id === el.dataset.helpSection);
        el.classList.toggle("hidden", !match);
      });
      noResults.classList.toggle("hidden", matches.length > 0);
      if (matches.length) {
        searchResults.innerHTML = matches.map((s) => `
        <button class="help-search-jump w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-100 last:border-0"
          data-section="${s.id}">
          <span class="w-5 h-5 shrink-0 text-blue-500">${ICONS[s.id]}</span>
          <span class="text-sm text-gray-800">${s.label}</span>
          <svg class="w-3.5 h-3.5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>`).join("");
        searchResults.classList.remove("hidden");
        searchResults.querySelectorAll(".help-search-jump").forEach((btn) => {
          btn.addEventListener("click", () => {
            const target = document.getElementById(`help-${btn.dataset.section}`);
            if (target) {
              const main = document.getElementById("main-content");
              if (main) {
                const yMain = target.getBoundingClientRect().top + main.scrollTop - 72;
                main.scrollTo({ top: yMain, behavior: "smooth" });
              }
            }
            searchResults.classList.add("hidden");
            searchInput.value = "";
            allSectionEls.forEach((el) => el.classList.remove("hidden"));
            noResults.classList.add("hidden");
          });
        });
      } else {
        searchResults.classList.add("hidden");
      }
    });
    document.addEventListener("click", (e) => {
      if (!(searchInput == null ? void 0 : searchInput.contains(e.target)) && !(searchResults == null ? void 0 : searchResults.contains(e.target))) {
        searchResults == null ? void 0 : searchResults.classList.add("hidden");
      }
    }, { capture: true });
  }

  // js/app.js
  var state = {
    currentUser: null,
    projects: [],
    drafts: {},
    // { code: draftData }
    histories: {},
    // { code: [entries] }
    loading: false,
    CONFIG
    // expose for views
  };
  async function initApp() {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      state.currentUser = await initAuth();
      updateSidebarUser(state.currentUser);
      setLoading(true);
      const cached = await getCachedProjects();
      if (cached.length > 0) {
        state.projects = cached;
        updateProjectCountBadge(state.projects.length);
        showToast("Chargement local des projets (hors connexion ou cache).", "info", 3e3);
      }
      if (CONFIG.DEV_MODE) {
        const projects = generateMockProjects();
        state.projects = projects;
        [1, 2, 3].forEach((code) => {
          const proj = projects.find((p) => p.code === code);
          if (proj)
            state.drafts[code] = generateMockDraft(proj);
        });
        await saveProjectsCache(projects);
        showToast("Mode d\xE9veloppement: donn\xE9es fictives charg\xE9es.", "success", 3e3);
      } else {
        try {
          const projects = await getProjects();
          if (projects && projects.length > 0) {
            state.projects = projects;
            await saveProjectsCache(projects);
            showToast("Projets charg\xE9s depuis le serveur et mis en cache.", "success", 2500);
          }
        } catch (err) {
          if (!state.projects || state.projects.length === 0) {
            showToast("Erreur r\xE9seau : utilisation du cache local", "warning", 4500);
            state.projects = cached || [];
          } else {
            showToast("Erreur r\xE9seau lors de la mise \xE0 jour (cache local conserv\xE9).", "warning", 4e3);
          }
        }
      }
      setLoading(false);
      updateProjectCountBadge(state.projects.length);
      updateDraftBadge(Object.keys(state.drafts).length);
      window.addEventListener("hashchange", () => navigate2(window.location.hash));
      navigate2(window.location.hash || "#dashboard");
      (_a = document.getElementById("btn-refresh")) == null ? void 0 : _a.addEventListener("click", async () => {
        await refreshProjects();
      });
      (_b = document.getElementById("btn-mobile-menu")) == null ? void 0 : _b.addEventListener("click", toggleMobileSidebar);
      (_c = document.getElementById("sidebar-overlay")) == null ? void 0 : _c.addEventListener("click", closeMobileSidebar);
      (_d = document.getElementById("sidebar-nav")) == null ? void 0 : _d.addEventListener("click", (e) => {
        const link = e.target.closest("a[href], button[data-hash]");
        if (!link)
          return;
        const href = link.getAttribute("href") || link.dataset.hash;
        if (href && href.startsWith("#")) {
          e.preventDefault();
          closeMobileSidebar();
          goTo(href);
        }
      });
      (_e = document.getElementById("mobile-sidebar-nav")) == null ? void 0 : _e.addEventListener("click", (e) => {
        const link = e.target.closest("a[href], button[data-hash]");
        if (!link)
          return;
        const href = link.getAttribute("href") || link.dataset.hash;
        if (href && href.startsWith("#")) {
          e.preventDefault();
          closeMobileSidebar();
          goTo(href);
        }
      });
      initGlobalTheme();
      (_f = document.getElementById("btn-theme-toggle")) == null ? void 0 : _f.addEventListener("click", toggleTheme);
      initResponsiveBehavior();
      syncTopSearchWithHash();
      (_g = document.getElementById("top-search")) == null ? void 0 : _g.addEventListener("input", debounce((e) => {
        const value = (e.target.value || "").trim();
        const currentRoute = parseHash(window.location.hash).route || "dashboard";
        const searchHash = value ? `#projects?search=${encodeURIComponent(value)}` : "#projects";
        if (currentRoute !== "projects") {
          goTo(searchHash);
        } else {
          goTo(searchHash);
        }
      }, 350));
    } catch (err) {
      console.error("initApp error:", err);
      showToast("Erreur lors du chargement de l'application.", "error");
      setLoading(false);
    }
  }
  async function navigate2(hash) {
    const { route, params } = parseHash(hash);
    const prevRoot = document.getElementById("project-root");
    const prevCode = prevRoot ? parseInt(prevRoot.dataset.code) : null;
    const incomingCode = route.startsWith("project-") ? parseInt(route.replace("project-", "")) : null;
    const editMode = prevCode !== null && prevCode === incomingCode ? getProjectEditMode() : false;
    if (prevRoot && typeof prevRoot._cleanup === "function") {
      prevRoot._cleanup();
    }
    setLoading(true);
    scrollMainToTop();
    try {
      if (!route || route === "dashboard") {
        updateBreadcrumb([{ label: "Tableau de bord" }]);
        updateActiveSidebarLink("dashboard");
        const html = renderDashboard(state.projects, state.currentUser);
        setMainContent(html);
        requestAnimationFrame(() => {
          setTimeout(() => {
            initDashboardCharts(state.projects);
            updateActiveQuickFilter(null);
          }, 100);
        });
      } else if (route === "projects") {
        updateBreadcrumb([{ label: "Projets" }]);
        updateActiveSidebarLink("projects");
        const renderProjectsWithFilters = (filters) => {
          const html = renderProjectsList(state.projects, state.drafts, filters);
          setMainContent(html);
          attachProjectsListeners(state.projects, state.drafts, filters, (newFilters) => {
            const query = Object.entries(newFilters).filter(([, v]) => v && v !== "").map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
            const newHash = query ? `#projects?${query}` : "#projects";
            if (window.location.protocol !== "file:") {
              history.replaceState(null, "", newHash);
            }
            renderProjectsWithFilters(newFilters);
          });
        };
        renderProjectsWithFilters(params);
      } else if (route.startsWith("project-")) {
        const code = parseInt(route.replace("project-", ""));
        const project = state.projects.find((p) => p.code === code);
        if (!project) {
          setMainContent(`<div class="text-center py-16 text-gray-500">
          <p class="text-lg font-medium">Projet introuvable (code: ${code})</p>
          <a href="#projects" class="text-blue-600 hover:underline mt-2 inline-block">\u2190 Retour aux projets</a>
        </div>`);
          setLoading(false);
          return;
        }
        let draft = state.drafts[code] || null;
        if (!draft && !CONFIG.DEV_MODE) {
          try {
            draft = await getProjectDraft(code);
            if (draft)
              state.drafts[code] = draft;
          } catch (e) {
            draft = null;
          }
        }
        const contributor = isContributor(project);
        updateBreadcrumb([
          { label: "Projets", href: "#projects" },
          { label: `SPR-${String(code).padStart(3, "0")} \u2014 ${project.titre}` }
        ]);
        updateActiveSidebarLink("projects");
        const html = renderProject(project, draft, contributor, editMode);
        setMainContent(html);
        attachProjectListeners(project, draft, contributor, state, (h) => goTo(h), api_exports, { getCurrentUser: getCurrentUser2, isContributor });
      } else if (route.startsWith("history-")) {
        const code = parseInt(route.replace("history-", ""));
        const project = state.projects.find((p) => p.code === code);
        let entries;
        if (state.histories[code]) {
          entries = state.histories[code];
        } else {
          if (CONFIG.DEV_MODE) {
            entries = project ? generateMockHistory(project) : [];
          } else {
            entries = await getProjectHistory(code);
          }
          state.histories[code] = entries;
        }
        updateBreadcrumb([
          { label: "Projets", href: "#projects" },
          { label: `SPR-${String(code).padStart(3, "0")}`, href: `#project-${code}` },
          { label: "Historique" }
        ]);
        updateActiveSidebarLink("projects");
        const html = renderHistory(code, entries);
        setMainContent(html);
      } else if (route === "help") {
        updateBreadcrumb([{ label: "Manuel d'utilisation" }]);
        updateActiveSidebarLink("help");
        const html = renderHelp();
        setMainContent(html);
        requestAnimationFrame(() => attachHelpListeners());
      } else {
        goTo("#dashboard");
        return;
      }
    } catch (err) {
      console.error("navigate error:", err);
      showToast("Erreur lors du chargement de la vue.", "error");
    } finally {
      setLoading(false);
    }
  }
  function setMainContent(html) {
    const main = document.getElementById("main-content");
    if (main)
      main.innerHTML = html;
  }
  function scrollMainToTop() {
    const main = document.getElementById("main-content");
    if (main)
      main.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  function setLoading(loading) {
    state.loading = loading;
    const indicator = document.getElementById("loading-indicator");
    if (indicator)
      indicator.classList.toggle("hidden", !loading);
    const main = document.getElementById("main-content");
    if (main) {
      if (loading) {
        main.innerHTML = renderSkeletonView();
      } else {
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
          </article>`).join("")}
      </div>
    </div>
  `;
  }
  function updateBreadcrumb(parts) {
    const bc = document.getElementById("breadcrumb");
    if (!bc)
      return;
    bc.innerHTML = parts.map((p, i) => {
      const isLast = i === parts.length - 1;
      if (isLast || !p.href) {
        return `<span class="text-sm ${isLast ? "text-gray-800 font-medium" : "text-gray-500"} truncate max-w-xs">${escapeHtml(p.label)}</span>`;
      }
      return `
      <a href="${escapeHtml(p.href)}" class="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate max-w-xs">${escapeHtml(p.label)}</a>
      <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    `;
    }).join("");
  }
  function updateActiveSidebarLink(routeKey) {
    document.querySelectorAll(".sidebar-link").forEach((el) => {
      const key = el.dataset.route;
      el.classList.toggle("active", key === routeKey);
    });
  }
  function updateSidebarUser(user) {
    const nameEl = document.getElementById("sidebar-user-name");
    const emailEl = document.getElementById("sidebar-user-email");
    const avatarEl = document.getElementById("sidebar-user-avatar");
    const mobileNameEl = document.getElementById("mobile-sidebar-user-name");
    const mobileEmailEl = document.getElementById("mobile-sidebar-user-email");
    const mobileAvatarEl = document.getElementById("mobile-sidebar-user-avatar");
    const initials = (user == null ? void 0 : user.name) ? user.name.split(" ").map((s) => s[0]).join("").substring(0, 2).toUpperCase() : "?";
    if (nameEl)
      nameEl.textContent = (user == null ? void 0 : user.name) || "Utilisateur";
    if (emailEl)
      emailEl.textContent = (user == null ? void 0 : user.email) || "";
    if (avatarEl)
      avatarEl.textContent = initials;
    if (mobileNameEl)
      mobileNameEl.textContent = (user == null ? void 0 : user.name) || "Utilisateur";
    if (mobileEmailEl)
      mobileEmailEl.textContent = (user == null ? void 0 : user.email) || "";
    if (mobileAvatarEl)
      mobileAvatarEl.textContent = initials;
  }
  function updateProjectCountBadge(count) {
    const el = document.getElementById("projects-count-badge");
    if (el)
      el.textContent = count;
    const elMobile = document.getElementById("projects-count-badge-mobile");
    if (elMobile)
      elMobile.textContent = count;
  }
  function updateDraftBadge(count) {
    const el = document.getElementById("draft-count-badge");
    if (el) {
      el.textContent = count;
      el.classList.toggle("hidden", count === 0);
    }
  }
  function toggleMobileSidebar() {
    const sidebar = document.getElementById("mobile-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    sidebar == null ? void 0 : sidebar.classList.toggle("-translate-x-full");
    overlay == null ? void 0 : overlay.classList.toggle("hidden");
  }
  function closeMobileSidebar() {
    const sidebar = document.getElementById("mobile-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    sidebar == null ? void 0 : sidebar.classList.add("-translate-x-full");
    overlay == null ? void 0 : overlay.classList.add("hidden");
  }
  function initGlobalTheme() {
    const saved = localStorage.getItem("spr.theme") || "light";
    const root = document.documentElement;
    const icon = document.getElementById("theme-icon");
    const apply = (mode) => {
      if (mode === "dark") {
        root.classList.add("dark");
        icon.classList.add("text-yellow-400");
      } else {
        root.classList.remove("dark");
        icon.classList.remove("text-yellow-400");
      }
    };
    apply(saved);
  }
  function toggleTheme() {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("spr.theme", next);
    initGlobalTheme();
  }
  function syncTopSearchWithHash() {
    const searchInput = document.getElementById("top-search");
    if (!searchInput)
      return;
    const { route, params } = parseHash(window.location.hash);
    if (route !== "projects")
      return;
    searchInput.value = params.search || "";
  }
  function initResponsiveBehavior() {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024)
        closeMobileSidebar();
    });
    window.addEventListener("hashchange", syncTopSearchWithHash);
  }
  async function refreshProjects() {
    setLoading(true);
    try {
      if (CONFIG.DEV_MODE) {
        showToast("Mode d\xE9veloppement \u2014 donn\xE9es fictives actualis\xE9es.", "info");
      } else {
        state.projects = await getProjects();
        showToast("Projets mis \xE0 jour.", "success");
      }
      updateProjectCountBadge(state.projects.length);
      navigate2(window.location.hash || "#dashboard");
    } catch (err) {
      showToast("Erreur lors de la mise \xE0 jour des projets.", "error");
    } finally {
      setLoading(false);
    }
  }
  document.addEventListener("click", (e) => {
    const quickFilter = e.target.closest("[data-quick-filter]");
    if (!quickFilter)
      return;
    e.preventDefault();
    const filter = quickFilter.dataset.quickFilter;
    closeMobileSidebar();

    const currentRoute = parseHash(window.location.hash).route || "dashboard";
    if (currentRoute === "projects") {
      // Already on projects view — apply filter in place
      applyQuickFilter(filter);
    } else {
      // Navigate to projects view with the filter as URL params
      const filterMap = {
        "all": "#projects",
        "en-cours": "#projects?statut=en%20cours",
        "en-attente": "#projects?statut=en%20attente",
        "priorite-elevee": `#projects?priorite=${encodeURIComponent("\xE9lev\xE9")}`,
        "risque-eleve": `#projects?risque=${encodeURIComponent("\xE9lev\xE9")}`
      };
      navigate2(filterMap[filter] || "#projects");
    }
  });

  function applyQuickFilter(filter) {
    let filteredProjects = state.projects;

    switch (filter) {
      case "all":
        filteredProjects = state.projects;
        break;
      case "en-cours":
        filteredProjects = state.projects.filter(p => p.statut === "en cours");
        break;
      case "en-attente":
        filteredProjects = state.projects.filter(p => p.statut === "en attente");
        break;
      case "priorite-elevee":
        filteredProjects = state.projects.filter(p => p.priorite === "\xE9lev\xE9");
        break;
      case "risque-eleve":
        filteredProjects = state.projects.filter(p => p.niveau_risque === "\xE9lev\xE9");
        break;
    }

    // Mettre à jour le graphique si le canvas est présent (vue projets)
    const chartContainer = document.getElementById("projects-stats-chart");
    if (chartContainer) {
      renderProjectsChart(filteredProjects);
    }

    // Mettre à jour l'interface pour montrer le filtre actif
    updateActiveQuickFilter(filter);
  }

  function updateActiveQuickFilter(activeFilter) {
    // Retirer la classe active de tous les boutons de filtre
    document.querySelectorAll("[data-quick-filter]").forEach(btn => {
      btn.classList.remove("bg-blue-50", "text-blue-700", "font-medium");
      btn.classList.add("text-gray-600");
    });

    // Ajouter la classe active au bouton sélectionné
    const activeBtn = document.querySelector(`[data-quick-filter="${activeFilter}"]`);
    if (activeBtn) {
      activeBtn.classList.remove("text-gray-600");
      activeBtn.classList.add("bg-blue-50", "text-blue-700", "font-medium");
    }
  }
  function goTo(hash) {
    if (window.location.protocol === "file:") {
      navigate2(hash);
    } else {
      window.location.hash = hash;
    }
  }
  document.addEventListener("DOMContentLoaded", initApp);
})();
