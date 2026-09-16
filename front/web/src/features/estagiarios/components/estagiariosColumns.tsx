import { ColumnDef, StockFeatures } from '@tanstack/react-table';
import { Badge, ActionIcon, Group } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { EstagiarioListItem } from '../types';
import {
  usuarioStatusLabel,
  USUARIO_STATUS,
  UsuarioStatus,
} from '@/constants/usuarioStatus';

const statusColor: Record<UsuarioStatus, string> = {
  [USUARIO_STATUS.ATIVO]: 'green',
  [USUARIO_STATUS.INATIVO]: 'yellow',
  [USUARIO_STATUS.BLOQUEADO]: 'red',
};

export function getEstagiariosColumns(
  onEditar: (id: number) => void,
  podeEditar: boolean,
): ColumnDef<StockFeatures, EstagiarioListItem, any>[] {
  return [
    {
      accessorKey: 'nome',
      header: 'Nome',
    },
    {
      accessorKey: 'matricula',
      header: 'Matrícula',
    },
    {
      accessorKey: 'periodoEstagio',
      header: 'Período',
    },
    {
      accessorKey: 'usuarioStatus',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as UsuarioStatus;
        return (
          <Badge color={statusColor[status]}>
            {usuarioStatusLabel[status]}
          </Badge>
        );
      },
    },
    ...(podeEditar
      ? [
          {
            id: 'acoes',
            header: '',
            cell: ({ row }: any) => (
              <Group gap="xs" justify="flex-end">
                <ActionIcon
                  variant="subtle"
                  onClick={() => onEditar(row.original.id)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]
      : []),
  ];
}
