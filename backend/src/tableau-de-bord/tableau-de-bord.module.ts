import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from '../produits/entities/produit.entity';
import { TableauDeBordController } from './tableau-de-bord.controller';
import { TableauDeBordService } from './tableau-de-bord.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [TableauDeBordController],
  providers: [TableauDeBordService],
})
export class TableauDeBordModule {}