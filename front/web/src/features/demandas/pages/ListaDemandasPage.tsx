import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/layouts/ListLayout';
import { DataTable } from '@/components/ui/dataTable/DataTable';
import { usePermission } from '@/features/auth/hooks/usePermission';
import { useListaPaginada } from '@/hooks/useListaPaginada';
import { paths } from '@/routes/paths';
import { useMemo } from 'react';
import { demandasService } from '../services/demandasService';
import { getDemandasColumns } from '../components/demandasColumns';
import { Button } from '@/components/ui/Button';
import { Select } from '@mantine/core';
import { EtapaDemanda, etapaDemandaLabel } from '../constants';
import { DemandaListItem } from '../types';

interface FiltroDemandas {
  termo: string;
  etapaAtual?: EtapaDemanda;
}

export default function ListaDemandasPage() {
  const navigate = useNavigate();
  const podeCriar = usePermission('demandas:criar');
  const podeEditar = usePermission('demandas:editar');

  const {
    dados,
    isLoading,
    totalPages,
    totalElements,
    pagination,
    setPagination,
    filtro,
    setFiltro,
  } = useListaPaginada<DemandaListItem, FiltroDemandas>({
    fetchFn: demandasService.listar,
    filtroInicial: { termo: '' },
  });

  const columns = useMemo(
    () =>
      getDemandasColumns({
        onEditar: (id) => navigate(paths.demandas.editar(id)),
        onVerDetalhe: (id) => navigate(paths.demandas.detalhe(id)),
        podeEditar,
      }),
    [navigate, podeEditar],
  );

  return (
    <ListLayout
      title="Demandas"
      canCreate={podeCriar}
      onCreate={() => navigate(paths.demandas.novo)}
      createButtonText="Nova Demanda"
      actions={
        <Button
          variant="outline"
          onClick={() => navigate(paths.demandas.migrar)}
        >
          Demanda Existente
        </Button>
      }
      searchProps={{
        value: filtro.termo,
        onChange: (termo) => setFiltro({ ...filtro, termo }),
        placeholder: 'Buscar por nome...',
      }}
      filters={
        <Select
          placeholder="Filtrar por Etapa"
          data={Object.values(EtapaDemanda).map((e) => ({
            value: e,
            label: etapaDemandaLabel[e as EtapaDemanda],
          }))}
          value={filtro.etapaAtual ?? null}
          onChange={(valor) =>
            setFiltro({
              ...filtro,
              etapaAtual: (valor as EtapaDemanda) ?? undefined,
            })
          }
          clearable
          w={200}
        />
      }
    >
      <DataTable
        data={dados}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={totalPages}
        totalElements={totalElements}
      />
    </ListLayout>
  );
}
