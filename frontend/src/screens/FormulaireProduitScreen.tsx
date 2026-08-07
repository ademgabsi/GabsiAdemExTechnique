import { StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';

export function FormulaireProduitScreen({ route }: ScreenProps<'Formulaire'>) {
  const id = route.params.id;
  return (
    <View style={styles.conteneur}>
      <Text>{id ? `Modifier le produit #${id}` : 'Nouveau produit'}</Text>
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
