# PompeurPro Admin

Interface d'administration web pour l'application mobile PompeurPro.

## Description

PompeurPro Admin est un site Next.js qui comprend :
- **Landing page** : Présentation de l'application PompeurPro avec toutes ses fonctionnalités
- **Espace Admin** : Interface de connexion et dashboard pour gérer l'application mobile

## Technologies

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Backend** : API PumpPro (Go)

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_API_URL=https://pumppro-backend.onrender.com
```

## Lancement

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Lancement production
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
pompeurpro-admin/
├── app/
│   ├── page.tsx              # Landing page
│   ├── admin/
│   │   ├── page.tsx          # Page de connexion admin
│   │   └── dashboard/
│   │       └── page.tsx      # Dashboard admin
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── api.ts                # Service API
├── types/
│   └── api.ts                # Types TypeScript
└── .env.local                # Configuration
```

## Fonctionnalités

### Landing Page
- Présentation de PompeurPro
- Fonctionnalités principales (détection IA, statistiques, défis)
- Thème sombre avec les couleurs de la marque
- Lien vers l'espace admin

### Espace Admin
- Connexion sécurisée avec l'API backend
- Dashboard avec statistiques
- Gestion des utilisateurs (à venir)
- Gestion des défis (à venir)
- Statistiques détaillées (à venir)

## API Backend

Le projet utilise l'API PumpPro-backend :
- **URL** : https://pumppro-backend.onrender.com
- **Auth** : JWT (Access Token + Refresh Token)
- **Endpoints utilisés** :
  - `POST /auth/login` : Connexion
  - `POST /auth/logout` : Déconnexion
  - `POST /auth/refresh` : Renouvellement du token

## Thème et Design

Le projet reprend le thème de l'application mobile :
- **Primary** : #00BFFF (Cyan)
- **Accent** : #8E2DE2 (Purple)
- **Background** : #1B1F3B / #2C2F38
- **Text** : #F4F4F4 / #B0B3B8

## Projets liés

- **Mobile App** : `~/Documents/repositories/personnel/pompeurpro`
- **Backend** : `~/Documents/repositories/personnel/PumpPro-backend`

## Développement futur

- [ ] Gestion complète des utilisateurs
- [ ] Création et gestion des défis
- [ ] Statistiques détaillées avec graphiques
- [ ] Gestion des programmes d'entraînement
- [ ] Système de notifications
- [ ] Modération du contenu
