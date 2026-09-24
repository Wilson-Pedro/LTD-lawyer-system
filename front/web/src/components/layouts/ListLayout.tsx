import { Group, Title, TextInput, Box } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

interface ListLayoutProps {
  title: string;
  onCreate?: () => void;
  canCreate?: boolean;
  createButtonText?: string;
  searchProps?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  children: React.ReactNode;
}

export function ListLayout({
  title,
  onCreate,
  canCreate,
  createButtonText = 'Novo',
  searchProps,
  children,
}: ListLayoutProps) {
  return (
    <Box>
      <Group justify="space-between" mb="lg">
        <Title order={3}>{title}</Title>
        {canCreate && onCreate && (
          <Button onClick={onCreate}>{createButtonText}</Button>
        )}
      </Group>

      {searchProps && (
        <TextInput
          placeholder={searchProps.placeholder ?? 'Buscar...'}
          leftSection={<IconSearch size={16} />}
          value={searchProps.value}
          onChange={(e) => searchProps.onChange(e.target.value)}
          mb="md"
          maw={360}
        />
      )}

      {children}
    </Box>
  );
}
