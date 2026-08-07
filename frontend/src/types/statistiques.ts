export interface Statistiques {
  totalProduits: number;
  produitsRupture: number;
  produitsStockFaible: number;
  repartitionParCategorie: Record<string, number>;
}
