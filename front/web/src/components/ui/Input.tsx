import { useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from '@mantine/core';

interface InputProps extends Omit<TextInputProps, 'error'> {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const erro = errors[name]?.message as string | undefined;

  return (
    <TextInput
      label={label}
      error={erro}
      {...register(name)}
      {...rest}
      mb="md"
    />
  );
}
