import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import { Button } from './Button';

export type EmptyStateProps = {
  emoji?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  emoji = '📦',
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text variant="titleMedium">{title}</Text>
      {message ? (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button mode="outlined" onPress={onAction} style={styles.action}>
          {actionLabel}
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
