import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <MantineButton {...rest}>{children}</MantineButton>;
}
