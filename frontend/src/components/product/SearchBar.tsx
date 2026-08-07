import { Searchbar } from 'react-native-paper';

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Rechercher un produit…',
}: SearchBarProps) {
  return <Searchbar value={value} onChangeText={onChangeText} placeholder={placeholder} />;
}
