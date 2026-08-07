export const colors = {
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1d4ed8',

  background: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',

  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',

  border: '#e2e8f0',
  divider: '#cbd5e1',

  success: '#16a34a',
  successLight: '#dcfce7',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  danger: '#dc2626',
  dangerLight: '#fee2e2',
} as const;

export type ColorToken = keyof typeof colors;
