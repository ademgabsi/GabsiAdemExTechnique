import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from '../produits/entities/produit.entity';
import { StatistiquesDto } from './dto/statistiques.dto';

@Injectable()
export class TableauDeBordService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitsRepository: Repository<Produit>,
  ) {}

  async obtenirStatistiques(): Promise<StatistiquesDto> {
    const produits = await this.produitsRepository.find();

    const totalProduits = produits.length;
    const produitsRupture = produits.filter((p) => p.quantite === 0).length;
    const produitsStockFaible = produits.filter(
      (p) => p.quantite > 0 && p.quantite <= p.seuilAlerte,
    ).length;

    const repartitionParCategorie: Record<string, number> = {};
    for (const produit of produits) {
      repartitionParCategorie[produit.categorie] =
        (repartitionParCategorie[produit.categorie] ?? 0) + 1;
    }

    return {
      totalProduits,
      produitsRupture,
      produitsStockFaible,
      repartitionParCategorie,
    };
  }
}