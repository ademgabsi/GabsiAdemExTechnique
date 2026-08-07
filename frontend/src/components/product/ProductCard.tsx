import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { Produit } from '../../types';
import { colors, spacing } from '../../theme';
import { StockBadge } from './StockBadge';

export type ProductCardProps = {
  produit: Produit;
  onPress?: (produit: Produit) => void;
};

export function ProductCard({ produit, onPress }: ProductCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(produit)}
      style={({ pressed }) => [styles.card, pressed && styles.presse]}
    >
      <View style={styles.entete}>
        <View style={styles.infos}>
          <Text variant="titleMedium" numberOfLines={1}>
            {produit.nom}
          </Text>
          <Text variant="bodySmall" style={styles.categorie}>
            {produit.categorie}
          </Text>
        </View>
        <StockBadge quantite={produit.quantite} seuilAlerte={produit.seuilAlerte} />
      </View>

      <View style={styles.pied}>
        <Text variant="labelLarge" style={styles.quantite}>
          {produit.quantite} en stock
        </Text>
        <Text variant="bodySmall" style={styles.seuil}>
          Seuil {produit.seuilAlerte}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presse: {
    opacity: 0.7,
  },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  infos: {
    flex: 1,
  },
  categorie: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  pied: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  quantite: {
    color: colors.text,
  },
  seuil: {
    color: colors.textMuted,
  },
});
