import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produits')
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  reference: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column()
  categorie: string;

  @Column({ type: 'integer', default: 0 })
  quantite: number;

  @Column({ type: 'integer', default: 0 })
  seuilAlerte: number;

  @UpdateDateColumn()
  derniereMiseAJour: Date;
}