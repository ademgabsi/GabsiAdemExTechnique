import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, IconButton, Snackbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MouvementStock } from '../types';
import { useProduitsStore } from '../store';
import { colors, spacing } from '../theme';
import { formaterDate } from '../utils';
import { ErrorState, Input, Loading } from '../components/common';
import { StockBadge } from '../components/product';
import type { ScreenProps } from '../navigation/types';

export function DetailProduitScreen({ navigation, route }: ScreenProps<'Detail'>) {
  const id = route.params.id;
  const insets = useSafeAreaInsets();

  const produit = useProduitsStore((s) => s.produits.find((p) => p.id === id));
  const chargement = useProduitsStore((s) => s.chargement);
  const erreur = useProduitsStore((s) => s.erreur);
  const chargerProduits = useProduitsStore((s) => s.chargerProduits);
  const modifierStock = useProduitsStore((s) => s.modifierStock);
  const supprimerProduit = useProduitsStore((s) => s.supprimerProduit);

  const [quantiteSaisie, setQuantiteSaisie] = useState('');
  const [mutationEnCours, setMutationEnCours] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!produit && !chargement) {
      chargerProduits();
    }
  }, [produit, chargement, chargerProduits]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="pencil"
          onPress={() => navigation.navigate('Formulaire', { id })}
          accessibilityLabel="Modifier le produit"
        />
      ),
    });
  }, [navigation, id]);

  const ajusterStock = useCallback(
    async (type: MouvementStock) => {
      const quantite = parseInt(quantiteSaisie, 10);
      if (!quantite || quantite <= 0) {
        setMessage('Saisissez une quantité valide (entier positif).');
        return;
      }
      setMutationEnCours(true);
      try {
        await modifierStock(id, { quantite, type });
        setMessage(
          type === 'entree'
            ? `+${quantite} ajouté au stock.`
            : `−${quantite} retiré du stock.`,
        );
        setQuantiteSaisie('');
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Erreur lors de la mise à jour.');
      } finally {
        setMutationEnCours(false);
      }
    },
    [quantiteSaisie, modifierStock, id],
  );

  const supprimer = useCallback(async () => {
    setMutationEnCours(true);
    try {
      await supprimerProduit(id);
      navigation.goBack();
    } catch (e) {
      setMutationEnCours(false);
      setMessage(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }, [supprimerProduit, id, navigation]);

  const confirmerSuppression = useCallback(() => {
    Alert.alert(
      'Supprimer le produit',
      `Voulez-vous vraiment supprimer « ${produit?.nom} » ? Cette action est irréversible.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: supprimer },
      ],
      { cancelable: true },
    );
  }, [produit, supprimer]);

  if (!produit) {
    if (chargement) return <Loading label="Chargement du produit…" />;
    return (
      <ErrorState
        message={erreur?.message ?? 'Produit introuvable.'}
        onRetry={() => chargerProduits()}
      />
    );
  }

  return (
    <View style={styles.racine}>
      <ScrollView
        contentContainerStyle={[styles.conteneur, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <View style={styles.entete}>
          <View style={styles.infos}>
            <Text variant="headlineSmall" style={styles.nom}>
              {produit.nom}
            </Text>
            <Text variant="bodySmall" style={styles.reference}>
              {produit.reference}
            </Text>
          </View>
          <StockBadge quantite={produit.quantite} seuilAlerte={produit.seuilAlerte} />
        </View>

        <View style={styles.carte}>
          <LigneInfo label="Catégorie" valeur={produit.categorie} />
          <LigneInfo label="Description" valeur={produit.description ?? '—'} />
          <Divider style={styles.diviseur} />
          <LigneInfo label="Quantité en stock" valeur={String(produit.quantite)} />
          <LigneInfo label="Seuil d'alerte" valeur={String(produit.seuilAlerte)} />
          <LigneInfo label="Dernière mise à jour" valeur={formaterDate(produit.derniereMiseAJour)} />
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium">Ajuster le stock</Text>
          <Input
            label="Quantité"
            value={quantiteSaisie}
            onChangeText={setQuantiteSaisie}
            keyboardType="number-pad"
            returnKeyType="done"
          />
          <View style={styles.boutons}>
            <Button
              mode="contained"
              icon="plus"
              onPress={() => ajusterStock('entree')}
              loading={mutationEnCours}
              disabled={mutationEnCours}
              style={styles.bouton}
            >
              Entrée
            </Button>
            <Button
              mode="outlined"
              icon="minus"
              onPress={() => ajusterStock('sortie')}
              loading={mutationEnCours}
              disabled={mutationEnCours}
              style={styles.bouton}
            >
              Sortie
            </Button>
          </View>
        </View>

        <Button
          mode="text"
          icon="delete"
          textColor={colors.danger}
          onPress={confirmerSuppression}
          disabled={mutationEnCours}
          style={styles.supprimer}
        >
          Supprimer le produit
        </Button>
      </ScrollView>

      <Snackbar visible={message !== null} onDismiss={() => setMessage(null)} duration={3000}>
        {message}
      </Snackbar>
    </View>
  );
}

function LigneInfo({ label, valeur }: { label: string; valeur: string }) {
  return (
    <View style={styles.ligne}>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={styles.valeur}>
        {valeur}
      </Text>
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
  },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infos: {
    flex: 1,
  },
  nom: {
    flexShrink: 1,
  },
  reference: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  carte: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  diviseur: {
    marginVertical: spacing.xs,
  },
  ligne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  label: {
    color: colors.textSecondary,
  },
  valeur: {
    flexShrink: 1,
    textAlign: 'right',
  },
  section: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  boutons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  bouton: {
    flex: 1,
  },
  supprimer: {
    marginTop: spacing.lg,
  },
});
