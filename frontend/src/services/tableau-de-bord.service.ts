import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Statistiques } from '../types';

export async function getStatistiques(): Promise<Statistiques> {
  const { data } = await api.get<Statistiques>(API_ENDPOINTS.statistiques);
  return data;
}
