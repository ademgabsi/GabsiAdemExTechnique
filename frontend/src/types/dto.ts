import type { MouvementStock } from './produit';

export interface CreerProduitDto {
  nom: string;
  reference: string;
  description?: string;
  categorie: string;
  quantite: number;
  seuilAlerte: number;
}

export type ModifierProduitDto = Partial<CreerProduitDto>;

export interface ModifierStockDto {
  quantite: number;
  type: MouvementStock;
}

export interface FiltresProduitsDto {
  categorie?: string;
  recherche?: string;
}
