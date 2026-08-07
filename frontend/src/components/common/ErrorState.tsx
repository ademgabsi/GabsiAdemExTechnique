import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import { Button } from './Button';

export type ErrorStateProps = {
  icon?: string;
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  icon = 'alert-circle-outline',
  title = 'Oups…',
  message = 'Une erreur est survenue.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.conteneur}>
      <Icon source={icon} size={48} color={colors.danger} />
      <Text variant="titleMedium">{title}</Text>
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
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  action: {
    marginTop: spacing.md,
  },
});
