import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import { Button } from './Button';

export type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = 'Une erreur est survenue.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text variant="titleMedium">Oups…</Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {onRetry ? (
        <Button mode="contained" onPress={onRetry} style={styles.action}>
          Réessayer
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  action: {
    marginTop: spacing.md,
  },
});
