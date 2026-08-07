export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  timeout: 10_000,
} as const;

export const API_ENDPOINTS = {
  produits: '/produits',
  produit: (id: number) => `/produits/${id}`,
  stock: (id: number) => `/produits/${id}/stock`,
  statistiques: '/tableau-de-bord/statistiques',
} as const;
