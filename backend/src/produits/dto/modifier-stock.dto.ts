import { IsInt, IsIn, Min } from 'class-validator';

export class ModifierStockDto {
  @IsInt()
  @Min(0)
  quantite: number;

  @IsIn(['entree', 'sortie'])
  type: 'entree' | 'sortie';
}