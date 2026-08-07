import { Platform } from 'react-native';

const PORT = 3000;

function hoteParDefaut(): string {
  if (Platform.OS === 'android') {
    return '10.0.2.2';
  }
  return 'localhost';
}

export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? `http://${hoteParDefaut()}:${PORT}`,
  timeout: 10_000,
} as const;

export const API_ENDPOINTS = {
  produits: '/produits',
  produit: (id: number) => `/produits/${id}`,
  stock: (id: number) => `/produits/${id}/stock`,
  statistiques: '/tableau-de-bord/statistiques',
} as const;
