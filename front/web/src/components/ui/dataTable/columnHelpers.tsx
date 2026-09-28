import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconAlertCircle, IconEdit } from '@tabler/icons-react';
import type { ColumnDef, RowData, StockFeatures } from '@tanstack/react-table';
import { UsuarioStatus } from '@/constants/usuarioStatus';
import { UsuarioStatusBadge } from '../UsuarioStatusBadge';
import { formatarData } from '@/utils/formatters';

function createLinkColumn<TData extends RowData>(
  accessorKey: keyof TData,
  headerLabel: string,
  onClick: (row: TData) => void,
): ColumnDef<StockFeatures, TData, unknown> {
  return {
    accessorKey: accessorKey as string,
    header: headerLabel,
    cell: ({ getValue, row }) => (
      <span
        onClick={() => onClick(row.original)}
        style={{
          cursor: 'pointer',
          fontWeight: 500,
          color: 'var(--mantine-color-institucional-7)',
        }}
      >
        {getValue() as string}
      </span>
    ),
  };
}

function createStatusColumn<TData extends RowData>(
  accessorKey: keyof TData,
): ColumnDef<StockFeatures, TData, any> {
  return {
    accessorKey: accessorKey as string,
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as UsuarioStatus;
      return <UsuarioStatusBadge status={status} />;
    },
  };
}

function createEnumColumn<TData extends RowData>(
  accessorKey: keyof TData,
  headerLabel: string,
  dicionario: Record<string, string>,
): ColumnDef<StockFeatures, TData, unknown> {
  return {
    accessorKey: accessorKey as string,
    header: headerLabel,
    cell: ({ getValue }) => {
      const valor = getValue() as string;
      return dicionario[valor] || 'Não definido';
    },
  };
}

function createEditColumn<T extends { id: string | number }>(
  onEdit: (id: string | number) => void,
  visivel: boolean,
): ColumnDef<StockFeatures, T, any>[] {
  if (!visivel) return [];
  return [
    {
      id: 'acoes',
      header: '',
      cell: ({ row }) => (
        <Tooltip label="Editar" openDelay={400}>
          <ActionIcon variant="subtle" onClick={() => onEdit(row.original.id)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
      ),
    },
  ];
}

function createDateAlertColumn<TData extends RowData>(
  accessorKey: keyof TData,
  headerLabel: string,
  checkIsOverdue: (row: TData) => boolean,
): ColumnDef<StockFeatures, TData, unknown> {
  return {
    accessorKey: accessorKey as string,
    header: headerLabel,
    cell: ({ getValue, row }) => {
      const dataBruta = getValue() as string;
      const dataFormatada = formatarData(dataBruta);

      if (dataFormatada === '-') return '-';
      const emAtraso = checkIsOverdue(row.original);

      return (
        <Group gap="xs" wrap="nowrap">
          <Text
            size="sm"
            c={emAtraso ? 'red.7' : 'inherit'}
            fw={emAtraso ? 600 : 400}
          >
            {dataFormatada}
          </Text>

          {emAtraso && (
            <Tooltip label="Fora do prazo" withArrow>
              <IconAlertCircle size={16} color="var(--mantine-color-red-7)" />
            </Tooltip>
          )}
        </Group>
      );
    },
  };
}

function createDateColumn<TData extends RowData>(
  accessorKey: keyof TData,
  headerLabel: string,
): ColumnDef<StockFeatures, TData, unknown> {
  return {
    accessorKey: accessorKey as string,
    header: headerLabel,
    cell: ({ getValue }) => {
      const valor = getValue() as string;
      return formatarData(valor);
    },
  };
}

export function getTableHelpers<
  TData extends RowData & { id: string | number },
>() {
  return {
    link: (
      accessorKey: keyof TData,
      headerLabel: string,
      onClick: (row: TData) => void,
    ) => createLinkColumn<TData>(accessorKey, headerLabel, onClick),

    status: (accessorKey: keyof TData) =>
      createStatusColumn<TData>(accessorKey),

    enumMap: (
      accessorKey: keyof TData,
      headerLabel: string,
      dicionario: Record<string, string>,
    ) => createEnumColumn<TData>(accessorKey, headerLabel, dicionario),

    edit: (onEdit: (id: string | number) => void, visivel: boolean) =>
      createEditColumn<TData>(onEdit, visivel),

    date: (accessorKey: keyof TData, headerLabel: string) =>
      createDateColumn<TData>(accessorKey, headerLabel),

    dateWithAlert: (
      accessorKey: keyof TData,
      headerLabel: string,
      checkIsOverdue: (row: TData) => boolean,
    ) => createDateAlertColumn<TData>(accessorKey, headerLabel, checkIsOverdue),
  };
}
