import { StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';

export function DetailProduitScreen({ route }: ScreenProps<'Detail'>) {
  return (
    <View style={styles.conteneur}>
      <Text>Détail du produit #{route.params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
