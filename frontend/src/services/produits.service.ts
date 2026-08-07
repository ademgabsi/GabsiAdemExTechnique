import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type {
  CreerProduitDto,
  FiltresProduitsDto,
  ModifierProduitDto,
  ModifierStockDto,
  Produit,
} from '../types';

export async function getProduits(filtres?: FiltresProduitsDto): Promise<Produit[]> {
  const { data } = await api.get<Produit[]>(API_ENDPOINTS.produits, { params: filtres });
  return data;
}

export async function getProduit(id: number): Promise<Produit> {
  const { data } = await api.get<Produit>(API_ENDPOINTS.produit(id));
  return data;
}

export async function creerProduit(dto: CreerProduitDto): Promise<Produit> {
  const { data } = await api.post<Produit>(API_ENDPOINTS.produits, dto);
  return data;
}

export async function modifierProduit(id: number, dto: ModifierProduitDto): Promise<Produit> {
  const { data } = await api.patch<Produit>(API_ENDPOINTS.produit(id), dto);
  return data;
}

export async function modifierStock(id: number, dto: ModifierStockDto): Promise<Produit> {
  const { data } = await api.patch<Produit>(API_ENDPOINTS.stock(id), dto);
  return data;
}

export async function supprimerProduit(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.produit(id));
}
