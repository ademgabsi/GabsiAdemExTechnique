# Backend — Gestion de Stock (NestJS)

API REST de gestion de stock développée avec **NestJS**, **TypeORM** et **SQLite**.

## Stack

- NestJS (TypeScript)
- TypeORM + SQLite (persistance, zéro configuration)
- class-validator / class-transformer (validation des données)
- Swagger (documentation & tests API)

## Prérequis

- Node.js >= 20
- npm

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

| Variable      | Description                      | Défaut                  |
| ------------- | -------------------------------- | ----------------------- |
| `PORT`        | Port d'écoute de l'API           | `3000`                  |
| `SQLITE_PATH` | Chemin du fichier de base SQLite | `./gestion-stock.sqlite`|

## Lancement

```bash
# développement (watch mode)
npm run start:dev

# production
npm run start:prod
```

Au démarrage, la console affiche les liens :

```
 Application démarrée sur http://localhost:3000
 Documentation Swagger : http://localhost:3000/api
```

## Documentation API (Swagger)

Interface Swagger UI disponible sur **[http://localhost:3000/api](http://localhost:3000/api)**.

Le schéma OpenAPI brut est disponible sur `/api-json`.

> La base SQLite est créée automatiquement au premier lancement (`synchronize: true`).

## Endpoints REST

### Produits

| Méthode | Route                      | Description                                           |
| ------- | -------------------------- | ------------------------------------------------------|
| GET     | `/produits`                | Liste des produits (filtres `categorie`, `recherche`) |
| GET     | `/produits/:id`            | Détail d'un produit                                   |
| POST    | `/produits`                | Création d'un produit                                 |
| PATCH   | `/produits/:id`            | Modification d'un produit                             |
| PATCH   | `/produits/:id/stock`      | Entrée / sortie de stock (`type: entree\|sortie`)     |
| DELETE  | `/produits/:id`            | Suppression d'un produit                              |

**Exemple — création :**

```bash
curl -X POST http://localhost:3000/produits \
  -H "Content-Type: application/json" \
  -d '{"nom":"Café","reference":"CAFE-001","categorie":"Boissons","quantite":50,"seuilAlerte":10}'
```

**Exemple — entrée de stock (+5) :**

```bash
curl -X PATCH http://localhost:3000/produits/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantite":5,"type":"entree"}'
```

### Tableau de bord 

| Méthode | Route                                | Description           |
| ------- | ------------------------------------ | ----------------------|
| GET     | `/tableau-de-bord/statistiques`      | Statistiques globales |

Réponse :

```json
{
  "totalProduits": 25,
  "produitsRupture": 3,
  "produitsStockFaible": 7,
  "repartitionParCategorie": { "Boissons": 10, "Alimentaire": 15 }
}
```

-  Normal → `quantite > seuilAlerte`
-  Faible → `0 < quantite <= seuilAlerte`
-  Rupture → `quantite === 0`

## Gestion des erreurs

Toutes les erreurs sont renvoyées au format JSON standardisé :

```json
{
  "statusCode": 400,
  "message": "...",
  "timestamp": "...",
  "path": "/produits"
}
```

## Tests

```bash
# tests unitaires
npm run test

# tests e2e
npm run test:e2e

# couverture
npm run test:cov
```
