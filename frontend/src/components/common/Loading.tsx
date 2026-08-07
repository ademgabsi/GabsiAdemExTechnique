import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';

export type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
};

export function Loading({ label, fullScreen }: LoadingProps) {
  return (
    <View style={[styles.conteneur, fullScreen && styles.pleinEcran]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {label ? (
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  pleinEcran: {
    backgroundColor: colors.background,
  },
  label: {
    color: colors.textSecondary,
  },
});
