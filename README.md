![Plume Collective Logo]( "Plume Collective")

<div align="center">
  <a href="https://plume-collective-tau.vercel.app" target="_blank" rel="noopener noreferrer">
    <img src="./public/logo/plume-collective-logo.svg" alt="Plume Collective Logo"  height="150">
  </a>
</div>

# Documentation technique

## Sommaire

- [Présentation](#présentation)
- [Structure du projet](#structure-du-projet)
- [Installation et configuration](#installation-et-configuration)
- [Connexion Supabase](#connexion-supabase)
- [Tests](#tests)
- [CI/CD](#cicd)
- [Conventions de développement](#conventions-de-développement)

---

## Présentation

Ce dépôt contient l'application web **Plume Collective**, une plateforme de lecture et d'édition collaborative construite avec **Nuxt 3** et **Supabase**, et déployée sur **Vercel**.
Voici les liens du projet sur [Supabase](https://supabase.com/dashboard/project/mlwkbqzbxusbocvyvhdw) et sur [Vercel](https://vercel.com/plumecollectives-projects/plume-collective).

Et voici le lien vers l'application déployée [Plume Collective](https://plume-collective-tau.vercel.app).

Vous trouverez dans ce README les éléments nécessaires à pouvoir collaborer sur ce projet.

---

## Structure du projet

Voici la structure principale du projet :

```
.
├── assets/css/app.css     # Configuration le fichier de configuration CSS
├── components/            # Composants Vue réutilisables
├── composables/           # Fonctions logiques (upload, signup, annotation...)
├── layouts/               # Layouts Nuxt (auth, default...)
├── pages/                 # Pages correspondant aux routes
├── public/                # Fichiers accessibles en public (logo, images...)
├── tests/                 # Tests unitaires (Vitest)
├── .github/workflows/     # Fichiers GitHub Actions
├── nuxt.config.ts         # Configuration Nuxt
└── database.types.ts      # Typage des tables Supabase
```

Pour plus de détail sur la structure d'un projet Nuxt, vous pouvez vous appuyer sur la [documentation](https://nuxt.com/docs/guide/directory-structure/nuxt) officielle de Nuxt.

---

## Installation et configuration

### Prérequis

- Node.js (v22+)
- NPM (v10+)

### Installation

1. Cloner le dépôt

```bash
git clone https://github.com/PlumeCollective/plume-collective.git
cd plume-collective
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec les clés Supabase :

```
SUPABASE_URL=...         # à récupérer dans Supabase > Settings > Data API
SUPABASE_KEY=...    # idem
```

4. Lancer le projet en développement

```bash
npm run dev
```

---

## Connexion Supabase

L'application utilise le module `@nuxt/supabase`. La configuration est automatique à partir des variables `.env`.

La communication avec Supabase est centralisée via les utilitaire `useSupabaseUser` pour récupérer l'utilisateur authentifié et `useSupabaseClient` pour communiquer avec la base de données.

Pour plus de détails sur comment se servir de Supabase, vous pouvez vous référer à la [documentation](https://supabase.com/docs) officielle de Supabase.

---

## Tests

Les tests unitaires sont écrits avec **Vitest** et sont localisés dans le dossier `tests/`.

L’environnement de test est géré par `@nuxt/test-utils`.

### Lancer les tests

```bash
npx vitest
```

Les appels à Supabase sont mockés. Aucun test n’écrit réellement en base.

---

## CI/CD

Une GitHub Action est configurée pour exécuter automatiquement les tests à chaque push sur la branche `main`.

Fichier de configuration : `.github/workflows/test.yml`

Étapes couvertes :

- Installation des dépendances
- Lancement des tests unitaires

Concernant le déploiement continu de l'application, il est effectué automatiquement par Vercel, avec un redéploiement automatisé au moindre commit sur la branche main du projet.

---

## Conventions de développement

### Nom des branches

Les branches sont nommées selon la convention suivante :

```
US?P?-courte-description
```

- `US` : identifiant de la User Story
- `P` : niveau de priorité
- `courte-description` : indication de la tâche

Exemple :

```
US3P1-annotation-lecture
```

---

### Autres conventions

- Les composants sont en PascalCase
- Pour les fonctions conséquentes, la logique métier est séparée dans le dossier `composables/`
- Le projet utilise le module `@nuxt/eslint` pour assurer une cohérence du code et détecter les erreurs potentielles pendant le développement, configuré dans le fichier `eslint.config.mjs`.
