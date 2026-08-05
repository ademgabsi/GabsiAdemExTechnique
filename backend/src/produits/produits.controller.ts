import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreerProduitDto } from './dto/creer-produit.dto';
import { ModifierProduitDto } from './dto/modifier-produit.dto';
import { ModifierStockDto } from './dto/modifier-stock.dto';
import { Produit } from './entities/produit.entity';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Get()
  trouverTous(): Promise<Produit[]> {
    return this.produitsService.trouverTous();
  }

  @Get(':id')
  trouverUn(@Param('id', ParseIntPipe) id: number): Promise<Produit> {
    return this.produitsService.trouverUn(id);
  }

  @Post()
  creer(@Body() dto: CreerProduitDto): Promise<Produit> {
    return this.produitsService.creer(dto);
  }

  @Patch(':id')
  modifier(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModifierProduitDto,
  ): Promise<Produit> {
    return this.produitsService.modifier(id, dto);
  }

  @Patch(':id/stock')
  modifierStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModifierStockDto,
  ): Promise<Produit> {
    return this.produitsService.modifierStock(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  supprimer(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produitsService.supprimer(id);
  }
}