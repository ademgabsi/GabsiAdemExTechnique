import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import { Button } from './Button';

export type EmptyStateProps = {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon = 'package-variant',
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.conteneur}>
      <Icon source={icon} size={48} color={colors.textMuted} />
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
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  action: {
    marginTop: spacing.md,
  },
});
