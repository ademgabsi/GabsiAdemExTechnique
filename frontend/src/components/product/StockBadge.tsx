import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getStockState } from '../../constants';

export type StockBadgeProps = {
  quantite: number;
  seuilAlerte: number;
};

export function StockBadge({ quantite, seuilAlerte }: StockBadgeProps) {
  const etat = getStockState(quantite, seuilAlerte);
  return (
    <View style={[styles.badge, { backgroundColor: etat.backgroundColor }]}>
      <Text style={[styles.label, { color: etat.color }]}>{etat.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
