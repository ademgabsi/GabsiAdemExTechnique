import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { spacing } from '../../theme';

export type CategoryFilterProps = {
  categories: string[];
  value?: string;
  onChange: (categorie?: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.conteneur}
    >
      <Chip selected={!value} onPress={() => onChange(undefined)} style={styles.chip}>
        Tous
      </Chip>
      {categories.map((categorie) => (
        <Chip
          key={categorie}
          selected={value === categorie}
          onPress={() => onChange(categorie)}
          style={styles.chip}
        >
          {categorie}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {},
});
