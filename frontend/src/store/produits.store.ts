import { create } from 'zustand';
import type {
  CreerProduitDto,
  FiltresProduitsDto,
  ModifierProduitDto,
  ModifierStockDto,
  Produit,
} from '../types';
import {
  ApiError,
  creerProduit as creerProduitApi,
  getProduits,
  modifierProduit as modifierProduitApi,
  modifierStock as modifierStockApi,
  supprimerProduit as supprimerProduitApi,
} from '../services';

interface ProduitsState {
  produits: Produit[];
  chargement: boolean;
  erreur: string | null;

  chargerProduits: (filtres?: FiltresProduitsDto) => Promise<void>;
  creerProduit: (dto: CreerProduitDto) => Promise<Produit>;
  modifierProduit: (id: number, dto: ModifierProduitDto) => Promise<Produit>;
  modifierStock: (id: number, dto: ModifierStockDto) => Promise<Produit>;
  supprimerProduit: (id: number) => Promise<void>;
}

export const useProduitsStore = create<ProduitsState>()((set) => ({
  produits: [],
  chargement: false,
  erreur: null,

  chargerProduits: async (filtres) => {
    set({ chargement: true, erreur: null });
    try {
      const produits = await getProduits(filtres);
      set({ produits, chargement: false });
    } catch (e) {
      set({ chargement: false, erreur: messageErreur(e) });
    }
  },

  creerProduit: async (dto) => {
    try {
      const produit = await creerProduitApi(dto);
      set((state) => ({ produits: [produit, ...state.produits], erreur: null }));
      return produit;
    } catch (e) {
      set({ erreur: messageErreur(e) });
      throw e;
    }
  },

  modifierProduit: async (id, dto) => {
    try {
      const produit = await modifierProduitApi(id, dto);
      set((state) => ({
        produits: state.produits.map((p) => (p.id === id ? produit : p)),
        erreur: null,
      }));
      return produit;
    } catch (e) {
      set({ erreur: messageErreur(e) });
      throw e;
    }
  },

  modifierStock: async (id, dto) => {
    try {
      const produit = await modifierStockApi(id, dto);
      set((state) => ({
        produits: state.produits.map((p) => (p.id === id ? produit : p)),
        erreur: null,
      }));
      return produit;
    } catch (e) {
      set({ erreur: messageErreur(e) });
      throw e;
    }
  },

  supprimerProduit: async (id) => {
    try {
      await supprimerProduitApi(id);
      set((state) => ({
        produits: state.produits.filter((p) => p.id !== id),
        erreur: null,
      }));
    } catch (e) {
      set({ erreur: messageErreur(e) });
      throw e;
    }
  },
}));

function messageErreur(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return 'Une erreur inattendue est survenue.';
}
