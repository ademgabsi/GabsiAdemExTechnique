import type { ComponentProps } from 'react';
import { HelperText, TextInput as PaperInput } from 'react-native-paper';

export type InputProps = ComponentProps<typeof PaperInput> & {
  errorMessage?: string;
};

export function Input({ mode = 'outlined', errorMessage, error, ...rest }: InputProps) {
  const hasError = error ?? Boolean(errorMessage);
  return (
    <>
      <PaperInput mode={mode} error={hasError} {...rest} />
      <HelperText type="error" visible={Boolean(errorMessage)}>
        {errorMessage ?? ''}
      </HelperText>
    </>
  );
}
