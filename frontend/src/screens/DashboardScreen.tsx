import { StyleSheet, Text, View } from 'react-native';

export function DashboardScreen() {
  return (
    <View style={styles.conteneur}>
      <Text>Tableau de bord</Text>
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
