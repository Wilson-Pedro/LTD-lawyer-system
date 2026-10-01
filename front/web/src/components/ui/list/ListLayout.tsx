import { Group, TextInput, Box, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { PageHeader, PageHeaderProps } from '../PageHeader';

interface ListLayoutProps extends PageHeaderProps {
  onCreate?: () => void;
  canCreate?: boolean;
  createButtonText?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  searchProps?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  children: React.ReactNode;
}

export function ListLayout({
  onCreate,
  canCreate,
  createButtonText = 'Novo',
  actions,
  filters,
  searchProps,
  children,
  ...pageHeaderProps
}: ListLayoutProps) {
  return (
    <Box>
      <Group align="flex-start" justify="space-between">
        <PageHeader {...pageHeaderProps} />
        <Group gap="md">
          {canCreate && onCreate && (
            <Button onClick={onCreate} color="teal">
              {createButtonText}
            </Button>
          )}

          {actions}
        </Group>
      </Group>

      <Group gap="md" mb="md" align="center" justify="flex-start">
        {searchProps && (
          <TextInput
            placeholder={searchProps.placeholder ?? 'Buscar...'}
            leftSection={<IconSearch size={16} />}
            value={searchProps.value}
            onChange={(e) => searchProps.onChange(e.target.value)}
            maw={360}
          />
        )}

        {filters && <Group gap="xs">{filters}</Group>}
      </Group>
      {children}
    </Box>
  );
}
