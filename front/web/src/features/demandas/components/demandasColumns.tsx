import { getTableHelpers } from '@/components/ui/dataTable/columnHelpers';
import { DemandaListItem } from '../types';
import { etapaDemandaLabel } from '../constants';
import { TEMPESTIVIDADE } from '@/constants/tempestividade';

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
    helpers.link('descricao', 'Descrição', (row) => onVerDetalhe(row.id)),

    helpers.date('prazoDocumentacao', 'Prazo Documentação'),

    helpers.dateWithAlert('prazoFinal', 'Prazo Final', (row) => {
      return row.tempestividade === TEMPESTIVIDADE.FORA_DO_PRAZO;
    }),

    { accessorKey: 'nomeAdvogado', header: 'Advogado', enableSorting: false },

    {
      accessorKey: 'nomeEstagiario',
      header: 'Estagiário',
      enableSorting: false,
    },

    { accessorKey: 'nomeProfessor', header: 'Professor', enableSorting: false },

    helpers.enumMap('etapaAtual', 'Etapa Atual', etapaDemandaLabel),
    ...helpers.edit(onEditar, podeEditar),
  ];
}
