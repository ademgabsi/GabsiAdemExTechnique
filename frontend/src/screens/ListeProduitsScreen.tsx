import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Produit } from '../types';
import { useProduitsStore } from '../store';
import { estBackendIndisponible } from '../services';
import { colors, spacing } from '../theme';
import { CategoryFilter, ProductCard, SearchBar } from '../components/product';
import { EmptyState, ErrorState, Loading } from '../components/common';
import type { ScreenProps } from '../navigation/types';

export function ListeProduitsScreen({ navigation }: ScreenProps<'Liste'>) {
  const insets = useSafeAreaInsets();

  const produits = useProduitsStore((s) => s.produits);
  const chargement = useProduitsStore((s) => s.chargement);
  const erreur = useProduitsStore((s) => s.erreur);
  const chargerProduits = useProduitsStore((s) => s.chargerProduits);

  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState<string | undefined>(undefined);

  useEffect(() => {
    chargerProduits();
  }, [chargerProduits]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="chart-bar"
          onPress={() => navigation.navigate('Dashboard')}
          accessibilityLabel="Tableau de bord"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        />
      ),
    });
  }, [navigation]);

  const categories = useMemo(
    () => Array.from(new Set(produits.map((p) => p.categorie))).sort(),
    [produits],
  );

  const produitsFiltres = useMemo(() => {
    const terme = recherche.trim().toLowerCase();
    return produits.filter((p) => {
      const correspondCategorie = !categorie || p.categorie === categorie;
      const correspondRecherche =
        !terme ||
        p.nom.toLowerCase().includes(terme) ||
        p.reference.toLowerCase().includes(terme);
      return correspondCategorie && correspondRecherche;
    });
  }, [produits, recherche, categorie]);

  const rafraichir = useCallback(() => {
    chargerProduits();
  }, [chargerProduits]);

  const ouvrirDetail = useCallback(
    (produit: Produit) => {
      navigation.navigate('Detail', { id: produit.id });
    },
    [navigation],
  );

  const ouvrirFormulaire = useCallback(() => {
    navigation.navigate('Formulaire');
  }, [navigation]);

  function rendreContenu() {
    if (chargement && produits.length === 0) {
      return <Loading label="Chargement des produits…" />;
    }
    if (erreur && produits.length === 0) {
      const indisponible = estBackendIndisponible(erreur);
      return (
        <ErrorState
          icon={indisponible ? 'server-network-off' : 'alert-circle-outline'}
          title={indisponible ? 'Serveur indisponible' : 'Une erreur est survenue'}
          message={
            indisponible
              ? 'Impossible de contacter le backend. Vérifiez qu’il est démarré (http://localhost:3000).'
              : erreur.message
          }
          onRetry={rafraichir}
        />
      );
    }
    if (produits.length === 0) {
      return (
        <EmptyState
          icon="package-variant"
          title="Aucun produit"
          message="Commencez par ajouter votre premier produit."
          actionLabel="Ajouter un produit"
          onAction={ouvrirFormulaire}
        />
      );
    }
    return (
      <FlatList
        data={produitsFiltres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard produit={item} onPress={ouvrirDetail} />
        )}
        refreshing={chargement}
        onRefresh={rafraichir}
        contentContainerStyle={[
          styles.liste,
          produitsFiltres.length === 0 && styles.vide,
        ]}
        ListEmptyComponent={
          <EmptyState
            icon="magnify"
            title="Aucun résultat"
            message="Modifiez votre recherche ou vos filtres."
          />
        }
      />
    );
  }

  return (
    <View style={styles.conteneur}>
      <View style={styles.filtres}>
        <SearchBar value={recherche} onChangeText={setRecherche} />
        {categories.length > 0 ? (
          <CategoryFilter
            categories={categories}
            value={categorie}
            onChange={setCategorie}
          />
        ) : null}
      </View>

      <View style={styles.contenu}>{rendreContenu()}</View>

      <FAB
        icon="plus"
        onPress={ouvrirFormulaire}
        style={[styles.fab, { bottom: spacing.md + insets.bottom }]}
        accessibilityLabel="Ajouter un produit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtres: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contenu: {
    flex: 1,
  },
  liste: {
    padding: spacing.md,
    paddingBottom: 96,
  },
  vide: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
  },
});
