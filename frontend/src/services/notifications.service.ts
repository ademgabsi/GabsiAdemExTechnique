import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import type { Produit } from '../types';

const CANAL_RUPTURES = 'ruptures';

Notifications.setNotificationHandler({
  handleNotification: () =>
    Promise.resolve({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
});

export async function initialiserNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CANAL_RUPTURES, {
      name: 'Ruptures de stock',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const { status: actuel } = await Notifications.getPermissionsAsync();
  let statut = actuel;
  if (statut !== 'granted') {
    const reponse = await Notifications.requestPermissionsAsync();
    statut = reponse.status;
  }
  return statut === 'granted';
}

export async function notifierRuptures(produits: Produit[]): Promise<void> {
  const ruptures = produits.filter((p) => p.quantite <= 0);
  if (ruptures.length === 0) return;

  const titre =
    ruptures.length === 1 ? 'Produit en rupture' : `${ruptures.length} produits en rupture`;
  const noms = ruptures
    .slice(0, 3)
    .map((p) => p.nom)
    .join(', ');
  const corps = ruptures.length > 3 ? `${noms}…` : noms;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: titre,
      body: corps,
      data: { type: 'rupture' },
    },
    trigger: null,
  });
}
