import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, Min } from 'class-validator';

export class ModifierStockDto {
  @ApiProperty({ example: 5, minimum: 0, description: 'Quantité à ajouter (entree) ou retirer (sortie)' })
  @IsInt()
  @Min(0)
  quantite: number;

  @ApiProperty({ example: 'entree', enum: ['entree', 'sortie'] })
  @IsIn(['entree', 'sortie'])
  type: 'entree' | 'sortie';
}