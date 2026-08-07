import { colors } from '../theme/colors';

export const STOCK_STATES = {
  normal: {
    key: 'normal',
    label: 'Normal',
    color: colors.success,
    backgroundColor: colors.successLight,
  },
  faible: {
    key: 'faible',
    label: 'Faible',
    color: colors.warning,
    backgroundColor: colors.warningLight,
  },
  rupture: {
    key: 'rupture',
    label: 'Rupture',
    color: colors.danger,
    backgroundColor: colors.dangerLight,
  },
} as const;

export type StockStateKey = keyof typeof STOCK_STATES;
export type StockState = (typeof STOCK_STATES)[StockStateKey];

export function getStockState(quantite: number, seuilAlerte: number): StockState {
  if (quantite <= 0) return STOCK_STATES.rupture;
  if (quantite <= seuilAlerte) return STOCK_STATES.faible;
  return STOCK_STATES.normal;
}
