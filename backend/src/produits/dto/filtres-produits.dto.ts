import { IsOptional, IsString } from 'class-validator';

export class FiltresProduitsDto {
  @IsString()
  @IsOptional()
  categorie?: string;

  @IsString()
  @IsOptional()
  recherche?: string;
}