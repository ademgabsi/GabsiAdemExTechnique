export interface Produit {
  id: number;
  nom: string;
  reference: string;
  description: string | null;
  categorie: string;
  quantite: number;
  seuilAlerte: number;
  derniereMiseAJour: string;
}

export type MouvementStock = 'entree' | 'sortie';
