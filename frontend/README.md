# Frontend — Gestion de Stock (React Native / Expo)

Application mobile de gestion de stock développée avec **Expo**, **React Native** et **React Navigation**.

## Stack

- Expo + React Native (TypeScript)
- React Native Paper (UI Material Design)
- React Navigation (navigation native)
- Zustand (gestion d'état)
- React Hook Form + Zod (formulaires & validation)
- Axios (client HTTP)
- Expo Notifications (alertes de rupture)

## Prérequis

- Node.js >= 20
- npm
- Backend démarré sur `http://localhost:3000` (voir `../backend`)
- Expo CLI (fourni via les dépendances)

## Installation

```bash
npm install
```

## Configuration

Copier le fichier d'environnement d'exemple et adapter si besoin :

```bash
cp .env.example .env
```

### Variables d'environnement

| Variable                | Description                                  | Défaut                          |
| ----------------------- | -------------------------------------------- | ------------------------------- |
| `EXPO_PUBLIC_API_URL`   | URL de l'API backend                         | `http://localhost:3000`         |

> Sur émulateur Android, l'hôte par défaut bascule automatiquement vers `10.0.2.2`.

## Lancement

```bash
# démarrer le bundler Expo
npm run start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

Au démarrage, le terminal affiche un QR code et les liens de connexion :

```
 Expo Developer Tools : http://localhost:8081
```

## Connexion au backend

L'application consomme l'API REST du backend via Axios :

- Produits : `GET/POST/PATCH/DELETE /produits`
- Stock : `PATCH /produits/:id/stock`
- Statistiques : `GET /tableau-de-bord/statistiques`

> La configuration des endpoints se trouve dans `src/config/api.ts`.

## Fonctionnalités

### Écrans

| Écran           | Route        | Description                                                                |
| --------------- | ------------ | -------------------------------------------------------------------------- |
| Liste           | `Liste`      | Liste des produits avec recherche, filtre par catégorie et pull-to-refresh |
| Détail          | `Detail`     | Détail d'un produit, ajustement du stock (entrée/sortie), suppression      |
| Formulaire      | `Formulaire` | Création / modification d'un produit (validation Zod)                      |
| Tableau de bord | `Dashboard`  | Statistiques globales et répartition par catégorie                         |

### États du stock

- Normal → `quantite > seuilAlerte`
- Faible → `0 < quantite <= seuilAlerte`
- Rupture → `quantite === 0`

### Notifications

Une notification locale est envoyée automatiquement au premier chargement si des produits sont en rupture de stock (`src/hooks/useAlerteRuptures.ts`).

## Architecture

```
src/
├── components/   # Composants réutilisables (UI commune & spécifiques produit)
├── config/       # Configuration API (baseURL, endpoints)
├── constants/    # Constantes applicatives
├── hooks/        # Hooks personnalisés (statistiques, alertes)
├── navigation/   # Configuration React Navigation
├── screens/      # Écrans de l'application
├── services/     # Services API & notifications
├── store/        # État global (Zustand)
├── theme/        # Thème (couleurs, espacement, Paper)
├── types/        # Types & DTO TypeScript
└── utils/        # Utilitaires (dates, validation Zod)
```

## Qualité de code

```bash
# lint
npm run lint

# formatage
npm run format
```
