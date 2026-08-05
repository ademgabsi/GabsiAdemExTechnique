import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { CreerProduitDto } from './dto/creer-produit.dto';
import { ModifierProduitDto } from './dto/modifier-produit.dto';
import { ModifierStockDto } from './dto/modifier-stock.dto';
import { FiltresProduitsDto } from './dto/filtres-produits.dto';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitsRepository: Repository<Produit>,
  ) {}

  async trouverTous(filtres?: FiltresProduitsDto): Promise<Produit[]> {
    const where: FindOptionsWhere<Produit> = {};

    if (filtres?.categorie) {
      where.categorie = filtres.categorie;
    }

    if (filtres?.recherche) {
      where.nom = Like(`%${filtres.recherche}%`);
    }

    return this.produitsRepository.find({ where });
  }

  async trouverUn(id: number): Promise<Produit> {
    const produit = await this.produitsRepository.findOneBy({ id });
    if (!produit) {
      throw new NotFoundException(`Produit #${id} introuvable`);
    }
    return produit;
  }

  async creer(dto: CreerProduitDto): Promise<Produit> {
    const produit = this.produitsRepository.create(dto);
    return this.produitsRepository.save(produit);
  }

  async modifier(id: number, dto: ModifierProduitDto): Promise<Produit> {
    const produit = await this.trouverUn(id);
    Object.assign(produit, dto);
    return this.produitsRepository.save(produit);
  }

  async supprimer(id: number): Promise<void> {
    const produit = await this.trouverUn(id);
    await this.produitsRepository.remove(produit);
  }

  async modifierStock(id: number, dto: ModifierStockDto): Promise<Produit> {
    const produit = await this.trouverUn(id);
    const prochaineQuantite =
      dto.type === 'entree'
        ? produit.quantite + dto.quantite
        : produit.quantite - dto.quantite;

    if (prochaineQuantite < 0) {
      throw new BadRequestException(
        `Stock insuffisant pour le produit #${id} (disponible: ${produit.quantite}, demande: ${dto.quantite})`,
      );
    }

    produit.quantite = prochaineQuantite;
    return this.produitsRepository.save(produit);
  }
}