import { StyleSheet, Text, View } from 'react-native';

export function ListeProduitsScreen() {
  return (
    <View style={styles.conteneur}>
      <Text>Liste des produits</Text>
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
