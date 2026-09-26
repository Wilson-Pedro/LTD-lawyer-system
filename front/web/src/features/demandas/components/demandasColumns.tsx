import { getTableHelpers } from '@/components/ui/dataTable/columnHelpers';
import { DemandaListItem } from '../types';

interface ColunasCallbacks {
  onEditar: (id: string | number) => void;
  onVerDetalhe: (id: string | number) => void;
  podeEditar: boolean;
}

export function getDemandasColumns({
  onEditar,
  onVerDetalhe,
  podeEditar,
}: ColunasCallbacks) {
  const helpers = getTableHelpers<DemandaListItem>();

  return [
    helpers.link('descricaoDemanda', 'Descrição', (row) =>
      onVerDetalhe(row.id),
    ),

    { accessorKey: 'prazo', header: 'Prazo Final' },

    { accessorKey: 'nomeEstagiario', header: 'Estagiário' },
    { accessorKey: 'nomeProfessor', header: 'Professor' },

    // helpers.enumMap('periodoEstagio', 'Período', periodoEstagioLabel),
    ...helpers.edit(onEditar, podeEditar),
  ];
}
