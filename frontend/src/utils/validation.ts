import { z } from 'zod';

const entierNonNegatif = z
  .string()
  .min(1, 'Champ obligatoire')
  .refine(
    (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
    'Entier positif requis',
  );

export const produitSchema = z.object({
  nom: z.string().min(1, 'Le nom est obligatoire'),
  reference: z.string().min(1, 'La référence est obligatoire'),
  description: z.string().optional(),
  categorie: z.string().min(1, 'La catégorie est obligatoire'),
  quantite: entierNonNegatif,
  seuilAlerte: entierNonNegatif,
});

export type ProduitFormData = z.infer<typeof produitSchema>;
