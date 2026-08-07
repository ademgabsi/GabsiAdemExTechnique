import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Liste: undefined;
  Detail: { id: number };
  Formulaire: { id?: number } | undefined;
  Dashboard: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
