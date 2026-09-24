import { getTableHelpers } from '@/components/ui/dataTable/columnHelpers';
import { AdvogadoListItem } from '../types';

interface ColunasCallbacks {
  onEditar: (id: string | number) => void;
  onVerDetalhe: (id: string | number) => void;
  podeEditar: boolean;
}

export function getAdvogadosColumns({
  onEditar,
  onVerDetalhe,
  podeEditar,
}: ColunasCallbacks) {
  const helpers = getTableHelpers<AdvogadoListItem>();

  return [
    helpers.link('nome', 'Nome', (row) => onVerDetalhe(row.id)),

    { accessorKey: 'telefone', header: 'Telefone' },
    { accessorKey: 'email', header: 'Email' },

    helpers.status('usuarioStatus'),
    ...helpers.edit(onEditar, podeEditar),
  ];
}
