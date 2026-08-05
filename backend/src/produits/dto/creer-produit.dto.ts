import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreerProduitDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  categorie: string;

  @IsInt()
  @Min(0)
  quantite: number;

  @IsInt()
  @Min(0)
  seuilAlerte: number;
}