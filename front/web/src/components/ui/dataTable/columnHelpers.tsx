import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import type { ColumnDef, RowData, StockFeatures } from '@tanstack/react-table';
import { UsuarioStatus } from '@/constants/usuarioStatus';
import { UsuarioStatusBadge } from '../UsuarioStatusBadge';

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
  };
}
