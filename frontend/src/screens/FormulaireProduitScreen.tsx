import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CreerProduitDto } from '../types';
import { useProduitsStore } from '../store';
import { colors, spacing } from '../theme';
import { produitSchema, type ProduitFormData } from '../utils';
import { ErrorState, Input, Loading } from '../components/common';
import type { ScreenProps } from '../navigation/types';

export function FormulaireProduitScreen({ navigation, route }: ScreenProps<'Formulaire'>) {
  const id = route.params?.id;
  const insets = useSafeAreaInsets();

  const produit = useProduitsStore((s) => (id ? s.produits.find((p) => p.id === id) : undefined));
  const chargement = useProduitsStore((s) => s.chargement);
  const chargerProduits = useProduitsStore((s) => s.chargerProduits);
  const creerProduit = useProduitsStore((s) => s.creerProduit);
  const modifierProduit = useProduitsStore((s) => s.modifierProduit);

  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProduitFormData>({
    resolver: zodResolver(produitSchema),
    defaultValues: {
      nom: produit?.nom ?? '',
      reference: produit?.reference ?? '',
      description: produit?.description ?? '',
      categorie: produit?.categorie ?? '',
      quantite: produit ? String(produit.quantite) : '',
      seuilAlerte: produit ? String(produit.seuilAlerte) : '',
    },
  });

  useEffect(() => {
    navigation.setOptions({ title: id ? 'Modifier' : 'Nouveau produit' });
  }, [navigation, id]);

  useEffect(() => {
    if (id && !produit && !chargement) {
      chargerProduits();
    }
  }, [id, produit, chargement, chargerProduits]);

  useEffect(() => {
    if (id && produit) {
      reset({
        nom: produit.nom,
        reference: produit.reference,
        description: produit.description ?? '',
        categorie: produit.categorie,
        quantite: String(produit.quantite),
        seuilAlerte: String(produit.seuilAlerte),
      });
    }
  }, [id, produit, reset]);

  async function onSubmit(data: ProduitFormData) {
    setEnCours(true);
    try {
      const dto: CreerProduitDto = {
        nom: data.nom.trim(),
        reference: data.reference.trim(),
        description: data.description?.trim() || undefined,
        categorie: data.categorie.trim(),
        quantite: Number(data.quantite),
        seuilAlerte: Number(data.seuilAlerte),
      };
      if (id) {
        await modifierProduit(id, dto);
      } else {
        await creerProduit(dto);
      }
      navigation.goBack();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Une erreur est survenue.');
    } finally {
      setEnCours(false);
    }
  }

  if (id && !produit) {
    if (chargement) return <Loading label="Chargement du produit…" />;
    return <ErrorState message="Produit introuvable." onRetry={() => navigation.goBack()} />;
  }

  return (
    <View style={styles.racine}>
      <ScrollView
        contentContainerStyle={[styles.conteneur, { paddingBottom: insets.bottom + spacing.lg }]}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="nom"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <Input
              label="Nom"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="reference"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <Input
              label="Référence"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="characters"
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="categorie"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <Input
              label="Catégorie"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <Input
              label="Description (optionnelle)"
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={3}
              errorMessage={error?.message}
            />
          )}
        />

        <View style={styles.rangee}>
          <View style={styles.champ}>
            <Controller
              control={control}
              name="quantite"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <Input
                  label="Quantité"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  errorMessage={error?.message}
                />
              )}
            />
          </View>
          <View style={styles.champ}>
            <Controller
              control={control}
              name="seuilAlerte"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <Input
                  label="Seuil d'alerte"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  errorMessage={error?.message}
                />
              )}
            />
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={enCours}
          disabled={enCours}
          style={styles.soumettre}
        >
          {id ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </ScrollView>

      <Snackbar visible={message !== null} onDismiss={() => setMessage(null)} duration={3000}>
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  racine: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conteneur: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  rangee: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  champ: {
    flex: 1,
  },
  soumettre: {
    marginTop: spacing.md,
  },
});
