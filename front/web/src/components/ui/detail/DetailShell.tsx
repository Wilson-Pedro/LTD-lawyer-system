import { Stack } from '@mantine/core';

interface DetailShellProps {
  children: React.ReactNode;
}

export function DetailShell({ children }: DetailShellProps) {
  return <Stack gap="lg">{children}</Stack>;
}
