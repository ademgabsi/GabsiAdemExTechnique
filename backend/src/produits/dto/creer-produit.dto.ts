import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreerProduitDto {
  @ApiProperty({ example: 'Café Arabica' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 'CAFE-001' })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiPropertyOptional({ example: 'Sac de 1kg de café Arabica' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Boissons' })
  @IsString()
  @IsNotEmpty()
  categorie: string;

  @ApiProperty({ example: 50, minimum: 0 })
  @IsInt()
  @Min(0)
  quantite: number;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsInt()
  @Min(0)
  seuilAlerte: number;
}