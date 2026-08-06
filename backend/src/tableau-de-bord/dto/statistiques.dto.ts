import { ApiProperty } from '@nestjs/swagger';

export class StatistiquesDto {
  @ApiProperty({ example: 25, description: 'Nombre total de produits' })
  totalProduits: number;

  @ApiProperty({ example: 3, description: 'Nombre de produits en rupture (quantite === 0)' })
  produitsRupture: number;

  @ApiProperty({ example: 7, description: 'Nombre de produits en stock faible (quantite <= seuilAlerte)' })
  produitsStockFaible: number;

  @ApiProperty({
    description: 'Répartition par catégorie',
    example: { Boissons: 10, Alimentaire: 15 },
    type: 'object',
    additionalProperties: { type: 'number' },
  })
  repartitionParCategorie: Record<string, number>;
}