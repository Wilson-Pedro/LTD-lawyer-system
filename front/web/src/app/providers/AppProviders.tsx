import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from '@/features/auth/contexts/AuthContext';

interface AppProvidersProps {
  children: ReactNode;
}

const theme = {
  primaryColor: 'dark',
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif', fontWeight: '600' },
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}
