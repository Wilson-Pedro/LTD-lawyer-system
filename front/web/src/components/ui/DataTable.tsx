import { useState } from 'react';
import {
  useTable,
  stockFeatures,
  type ColumnDef,
  type StockFeatures,
  type SortingState,
  type PaginationState,
  Updater,
} from '@tanstack/react-table';
import {
  Table,
  Group,
  Text,
  Pagination,
  Center,
  Loader,
  Stack,
} from '@mantine/core';
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconDatabaseOff,
} from '@tabler/icons-react';
import classes from './DataTable.module.css';

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnDef<StockFeatures, T, any>[];
  isLoading?: boolean;
  emptyMessage?: string;
  totalElements?: number;

  pagination: PaginationState;
  onPaginationChange: (updater: Updater<PaginationState>) => void;
  pageCount: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading,
  emptyMessage = 'Nenhum registro encontrado.',
  totalElements,
  pagination,
  onPaginationChange,
  pageCount,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useTable({
    data,
    columns,
    features: stockFeatures,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange,
    manualPagination: true,
    pageCount,
  });

  if (isLoading) {
    return (
      <Center py={64}>
        <Stack align="center" gap="xs">
          <Loader color="institucional" size="sm" />
          <Text c="dimmed" size="sm">
            Carregando...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (data.length === 0) {
    return (
      <Center className={classes.emptyState}>
        <Stack align="center" gap={4}>
          <IconDatabaseOff size={32} color="var(--mantine-color-gray-4)" />
          <Text c="dimmed" size="sm">
            {emptyMessage}
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <div>
      <div className={classes.wrapper}>
        <Table.ScrollContainer minWidth={600}>
          <Table striped highlightOnHover verticalSpacing="sm">
            <Table.Thead className={classes.header}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={classes.headerCell}
                      style={{
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                      }}
                    >
                      <Group gap={4} wrap="nowrap">
                        <table.FlexRender header={header} />
                        {header.column.getCanSort() && (
                          <IconSort direction={header.column.getIsSorted()} />
                        )}
                      </Group>
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>

            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id} className={classes.row}>
                  {row.getAllCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          {totalElements !== undefined
            ? `${totalElements} registro(s) — página ${table.state.pagination.pageIndex + 1} de ${table.getPageCount()}`
            : `Página ${table.state.pagination.pageIndex + 1} de ${table.getPageCount()}`}
        </Text>
        <Pagination
          total={table.getPageCount()}
          value={table.state.pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
          size="sm"
          color="institucional"
        />
      </Group>
    </div>
  );
}

function IconSort({ direction }: { direction: false | 'asc' | 'desc' }) {
  if (direction === 'asc')
    return (
      <IconChevronUp size={14} color="var(--mantine-color-institucional-6)" />
    );
  if (direction === 'desc')
    return (
      <IconChevronDown size={14} color="var(--mantine-color-institucional-6)" />
    );
  return <IconSelector size={14} opacity={0.4} />;
}
