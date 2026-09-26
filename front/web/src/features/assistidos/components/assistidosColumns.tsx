import { AssistidoListItem } from '../types';
import { getTableHelpers } from '@/components/ui/dataTable/columnHelpers';

interface ColunasCallbacks {
  onEditar: (id: string | number) => void;
  onVerDetalhe: (id: string | number) => void;
  podeEditar: boolean;
}

export function getAssistidosColumns({
  onEditar,
  onVerDetalhe,
  podeEditar,
}: ColunasCallbacks) {
  const helpers = getTableHelpers<AssistidoListItem>();

  return [
    helpers.link('nome', 'Nome', (row) => onVerDetalhe(row.id)),
    { accessorKey: 'matricula', header: 'Matrícula' },
    { accessorKey: 'telefone', header: 'Telefone' },
    ...helpers.edit(onEditar, podeEditar),
  ];
}
