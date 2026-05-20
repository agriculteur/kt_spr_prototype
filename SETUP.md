# SPR — Suivi des Projets Réglementaires
## Guide de configuration SharePoint

---

## 1. Prérequis

- Accès administrateur à un site SharePoint Online
- Droits de création de listes sur le site cible
- Accès à une bibliothèque de documents pour héberger les fichiers

---

## 2. Création des listes SharePoint

### 2.1 Liste principale — `SPR_Projets`

Accédez à **Contenu du site → Nouvelle → Liste** et créez les colonnes suivantes :

| Nom de colonne         | Type SharePoint           | Obligatoire | Notes                              |
|------------------------|---------------------------|-------------|-------------------------------------|
| `ProjetCode`           | Nombre                    | Oui         | Code unique du projet (1–999)      |
| `ProjetData`           | Plusieurs lignes de texte | Oui         | JSON complet du projet             |
| `Version`              | Nombre                    | Oui         | Commence à 1                       |
| `DerniereModification` | Date et heure             | Non         | ISO 8601                           |
| `ModifiePar`           | Ligne de texte unique     | Non         | Email de l'auteur                  |

**Paramètres importants :**
- Activer la gestion des versions : Non (géré manuellement)
- Accès : Lecture pour tous les utilisateurs authentifiés, Écriture pour les contributeurs

### 2.2 Liste des brouillons — `SPR_Projets_Brouillons`

| Nom de colonne   | Type SharePoint           | Obligatoire | Notes                              |
|------------------|---------------------------|-------------|-------------------------------------|
| `ProjetCode`     | Nombre                    | Oui         | Référence au projet parent         |
| `BrouillonData`  | Plusieurs lignes de texte | Oui         | JSON du brouillon                  |
| `ModifiePar`     | Ligne de texte unique     | Non         | Email de l'auteur                  |
| `ModifieLe`      | Date et heure             | Non         | Date de dernière modification      |
| `VersionBase`    | Nombre                    | Non         | Version publiée de base            |

**Paramètres importants :**
- Accès : Un utilisateur ne peut lire/modifier que ses propres brouillons
- Configurer les permissions au niveau des éléments si nécessaire

### 2.3 Liste de l'historique — `SPR_Projets_Historique`

| Nom de colonne | Type SharePoint           | Obligatoire | Notes                              |
|----------------|---------------------------|-------------|-------------------------------------|
| `ProjetCode`   | Nombre                    | Oui         | Référence au projet parent         |
| `Action`       | Ligne de texte unique     | Oui         | `published` ou `draft`             |
| `Snapshot`     | Plusieurs lignes de texte | Oui         | JSON de l'état complet du projet   |
| `ChangeSummary`| Plusieurs lignes de texte | Non         | JSON du tableau de changements     |
| `ChangedBy`    | Ligne de texte unique     | Oui         | Email de l'auteur de l'action      |
| `ActionDate`   | Date et heure             | Oui         | Horodatage de l'action             |
| `Version`      | Nombre                    | Oui         | Numéro de version                  |

**Paramètres importants :**
- Accès : Lecture seule pour les contributeurs, aucun droit de modification
- Seul l'application (via REST API) peut créer des entrées

---

## 3. Configuration des permissions

### Groupes SharePoint recommandés

| Groupe                  | Droits sur SPR_Projets | Droits sur SPR_Brouillons | Droits sur SPR_Historique |
|-------------------------|------------------------|---------------------------|---------------------------|
| `SPR_Administrateurs`   | Contrôle total         | Contrôle total            | Contrôle total            |
| `SPR_Contributeurs`     | Lecture + Modification | Lecture + Modification    | Lecture seule             |
| `SPR_Lecteurs`          | Lecture seule          | Aucun                     | Lecture seule             |

### Étapes de configuration

1. Aller dans **Paramètres de la liste → Autorisations pour cette liste**
2. Cliquer sur **Arrêter d'hériter des autorisations**
3. Créer les groupes SharePoint dans la section **Personnes et groupes**
4. Attribuer les droits selon le tableau ci-dessus

---

## 4. Déploiement des fichiers de l'application

### 4.1 Créer une bibliothèque de documents

1. Accéder à **Contenu du site → Nouvelle → Bibliothèque de documents**
2. Nommer la bibliothèque : `SPR_App`
3. Désactiver la gestion des versions (non nécessaire pour les fichiers statiques)

### 4.2 Télécharger les fichiers

Télécharger l'ensemble de la structure de fichiers dans la bibliothèque `SPR_App` :

```
SPR_App/
  index.html
  js/
    config.js
    utils.js
    mock-data.js
    api.js
    auth.js
    app.js
    components/
      toast.js
      modal.js
    views/
      dashboard.js
      projects.js
      project.js
      history.js
```

**Options de téléchargement :**
- Utiliser l'Explorateur de fichiers Windows (mappé sur le site SharePoint)
- Utiliser SharePoint Designer
- Glisser-déposer depuis le navigateur (bibliothèque par bibliothèque)

### 4.3 Configurer `config.js`

Modifier le fichier `js/config.js` **après** le déploiement :

```js
export const CONFIG = {
  DEV_MODE: false,  // ← Changer à false pour la production
  SITE_URL: '/sites/votre-site',  // ← URL relative de votre site SharePoint
  LISTS: {
    PROJETS: 'SPR_Projets',
    BROUILLONS: 'SPR_Projets_Brouillons',
    HISTORIQUE: 'SPR_Projets_Historique',
  },
};
```

**Note :** `SITE_URL` doit être l'URL relative du site SharePoint où les listes ont été créées. Exemple : `/sites/amf-projets-reglementaires`.

---

## 5. Accès à l'application

L'URL d'accès à l'application sera de la forme :

```
https://votre-tenant.sharepoint.com/sites/votre-site/SPR_App/index.html
```

Pour créer un lien dans la navigation SharePoint :
1. Aller dans **Paramètres du site → Navigation**
2. Ajouter un lien vers `./SPR_App/index.html`
3. Titre : `SPR — Projets réglementaires`

---

## 6. Migration des données initiales

Pour peupler la liste `SPR_Projets` avec les données existantes :

1. Activer temporairement `DEV_MODE: true`
2. Ouvrir la console du navigateur sur la page SPR
3. Exporter les données mock via la console :
   ```js
   import('./js/mock-data.js').then(m => {
     const projects = m.generateMockProjects();
     console.log(JSON.stringify(projects));
   });
   ```
4. Utiliser un script PowerShell ou PnP PowerShell pour importer les données via REST API
5. Désactiver `DEV_MODE: false` une fois les données importées

---

## 7. Liste de vérification (checklist de tests)

### Tests fonctionnels de base

- [ ] L'application se charge sans erreur dans la console
- [ ] Le tableau de bord affiche les KPIs correctement
- [ ] Les graphiques Chart.js se chargent sans erreur
- [ ] La liste des projets affiche les 100 projets
- [ ] La recherche filtre correctement par titre et code
- [ ] Les filtres par statut, priorité, risque fonctionnent
- [ ] La vue cartes et la vue tableau fonctionnent
- [ ] Le détail d'un projet s'affiche correctement
- [ ] Tous les onglets (Général, Équipe, Chronologie, Documents, Historique) fonctionnent

### Tests des permissions

- [ ] Un utilisateur non-contributeur ne voit pas le bouton "Modifier"
- [ ] Un contributeur (dans Ressources_associees) peut modifier un projet
- [ ] Le brouillon est créé dans `SPR_Projets_Brouillons` lors de l'enregistrement
- [ ] La publication met à jour `SPR_Projets` et supprime le brouillon
- [ ] L'historique est créé dans `SPR_Projets_Historique` à chaque action

### Tests de l'API SharePoint

- [ ] `GET /_api/web/currentuser` retourne l'utilisateur connecté
- [ ] `GET` sur `SPR_Projets` retourne les items
- [ ] `POST` sur `SPR_Projets_Brouillons` crée un brouillon
- [ ] `PATCH` (MERGE) sur `SPR_Projets` met à jour un item
- [ ] `DELETE` sur `SPR_Projets_Brouillons` supprime un brouillon
- [ ] Le form digest (`/_api/contextinfo`) est correctement mis en cache

### Tests mobiles

- [ ] La sidebar mobile s'ouvre/ferme correctement
- [ ] La liste des projets est lisible sur mobile
- [ ] Les cartes de projets sont bien proportionnées sur mobile
- [ ] Le formulaire d'édition est utilisable sur mobile

### Tests de performance

- [ ] Le tableau de bord se charge en moins de 2 secondes
- [ ] La liste de 100 projets s'affiche sans délai perceptible
- [ ] Les graphiques s'initialisent correctement après le rendu HTML

---

## 8. Résolution des problèmes courants

### Erreur 403 sur les appels API

- Vérifier que l'utilisateur est membre du groupe `SPR_Contributeurs`
- Vérifier que le form digest n'est pas expiré (le cache se renouvelle automatiquement)
- S'assurer que les permissions CORS sont correctes sur le site SharePoint

### Les modules ES6 ne se chargent pas

- Vérifier que les fichiers sont servis avec le type MIME `application/javascript`
- S'assurer que SharePoint ne bloque pas les fichiers `.js`
- Tester avec un serveur HTTP local pour le développement (ex: `npx serve .`)

### Les graphiques Chart.js ne s'affichent pas

- Vérifier que le CDN Chart.js est accessible (pas de blocage réseau)
- Vérifier que les `canvas` ont un conteneur avec une hauteur définie
- Consulter la console du navigateur pour les erreurs JavaScript

### Les données mock ne se chargent pas

- Vérifier que `DEV_MODE: true` est bien défini dans `config.js`
- Vérifier que le navigateur supporte les modules ES6 (Edge 79+, Chrome 61+, Firefox 60+)
- Ouvrir la console du navigateur pour voir les erreurs d'importation

---

## 9. Notes de sécurité

- Ne jamais exposer de données sensibles dans le code JavaScript côté client
- Les tokens SharePoint sont gérés automatiquement via les cookies de session
- Le form digest protège contre les attaques CSRF
- Toutes les entrées utilisateur sont échappées via `escapeHtml()` avant insertion dans le DOM
- Les liens externes utilisent `rel="noopener noreferrer"` pour la sécurité

---

## 10. Support et maintenance

Pour toute question ou problème, contacter :
- Direction des technologies de l'information — AMF
- Responsable technique : Direction des projets réglementaires

*Application SPR v1.0 — Développée pour l'Autorité des marchés financiers*
