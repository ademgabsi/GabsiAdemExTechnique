import type { ComponentProps } from 'react';
import { Button as PaperButton } from 'react-native-paper';

export type ButtonProps = ComponentProps<typeof PaperButton>;

export function Button({ mode = 'contained', ...rest }: ButtonProps) {
  return <PaperButton mode={mode} {...rest} />;
}
