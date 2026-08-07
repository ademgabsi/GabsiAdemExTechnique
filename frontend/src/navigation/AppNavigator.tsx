import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import {
  DashboardScreen,
  DetailProduitScreen,
  FormulaireProduitScreen,
  ListeProduitsScreen,
} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Liste">
      <Stack.Screen name="Liste" component={ListeProduitsScreen} options={{ title: 'Produits' }} />
      <Stack.Screen name="Detail" component={DetailProduitScreen} options={{ title: 'Détail' }} />
      <Stack.Screen
        name="Formulaire"
        component={FormulaireProduitScreen}
        options={{ title: 'Produit' }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Tableau de bord' }}
      />
    </Stack.Navigator>
  );
}
