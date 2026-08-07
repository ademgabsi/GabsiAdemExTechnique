import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStatistiques } from '../hooks';
import { estBackendIndisponible } from '../services';
import { colors, spacing } from '../theme';
import { EmptyState, ErrorState, Loading } from '../components/common';

export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { statistiques, chargement, erreur, rafraichir } = useStatistiques();

  if (chargement && !statistiques) {
    return <Loading label="Chargement des statistiques…" />;
  }
  if (erreur && !statistiques) {
    const indisponible = estBackendIndisponible(erreur);
    return (
      <ErrorState
        icon={indisponible ? 'server-network-off' : 'alert-circle-outline'}
        title={indisponible ? 'Serveur indisponible' : 'Une erreur est survenue'}
        message={erreur.message}
        onRetry={rafraichir}
      />
    );
  }
  if (!statistiques) {
    return (
      <EmptyState
        icon="chart-box-outline"
        title="Aucune donnée"
        message="Les statistiques ne sont pas encore disponibles."
      />
    );
  }

  const repartition = Object.entries(statistiques.repartitionParCategorie).sort(
    (a, b) => b[1] - a[1],
  );
  const max = Math.max(1, ...repartition.map(([, nombre]) => nombre));

  return (
    <ScrollView
      style={styles.racine}
      contentContainerStyle={[styles.conteneur, { paddingBottom: insets.bottom + spacing.lg }]}
      refreshControl={
        <RefreshControl
          refreshing={chargement}
          onRefresh={rafraichir}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.cartes}>
        <StatCarte
          label="Produits"
          valeur={statistiques.totalProduits}
          couleur={colors.primary}
        />
        <StatCarte
          label="Ruptures"
          valeur={statistiques.produitsRupture}
          couleur={colors.danger}
        />
        <StatCarte
          label="Stock faible"
          valeur={statistiques.produitsStockFaible}
          couleur={colors.warning}
        />
      </View>

      <View style={styles.carte}>
        <View style={styles.titreCarte}>
          <Icon source="chart-bar" size={20} color={colors.textSecondary} />
          <Text variant="titleMedium">Répartition par catégorie</Text>
        </View>
        {repartition.length === 0 ? (
          <Text variant="bodyMedium" style={styles.vide}>
            Aucune catégorie à afficher.
          </Text>
        ) : (
          <View style={styles.barres}>
            {repartition.map(([categorie, nombre]) => (
              <View key={categorie} style={styles.barre}>
                <View style={styles.barreEntete}>
                  <Text variant="bodyMedium" numberOfLines={1} style={styles.categorieLabel}>
                    {categorie}
                  </Text>
                  <Text variant="labelLarge" style={styles.nombre}>
                    {nombre}
                  </Text>
                </View>
                <View style={styles.piste}>
                  <View
                    style={[
                      styles.remplissage,
                      { width: `${(nombre / max) * 100}%`, backgroundColor: colors.primary },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function StatCarte({
  label,
  valeur,
  couleur,
}: {
  label: string;
  valeur: number;
  couleur: string;
}) {
  return (
    <View style={[styles.statCarte, { borderTopColor: couleur }]}>
      <Text variant="headlineMedium" style={{ color: couleur }}>
        {valeur}
      </Text>
      <Text variant="bodySmall" style={styles.statLabel}>
        {label}
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
    gap: spacing.md,
  },
  cartes: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCarte: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    gap: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  carte: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  titreCarte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  vide: {
    color: colors.textSecondary,
  },
  barres: {
    gap: spacing.md,
  },
  barre: {
    gap: spacing.xs,
  },
  barreEntete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categorieLabel: {
    flexShrink: 1,
    color: colors.text,
  },
  nombre: {
    color: colors.textSecondary,
  },
  piste: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    overflow: 'hidden',
  },
  remplissage: {
    height: '100%',
    borderRadius: 999,
  },
});
