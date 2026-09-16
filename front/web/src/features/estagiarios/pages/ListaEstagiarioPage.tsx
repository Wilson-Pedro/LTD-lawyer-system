import { useNavigate } from 'react-router-dom';
import { Title, Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { usePermission } from '@/features/auth/hooks/usePermission';
import { useListaPaginada } from '@/hooks/useListaPaginada';
import { estagiariosService } from '../services/estagiariosService';
import { getEstagiariosColumns } from '../components/estagiariosColumns';
import { paths } from '@/routes/paths';

export default function ListaEstagiariosPage() {
  const navigate = useNavigate();
  const podeCriar = usePermission('estagiarios:criar');
  const podeEditar = usePermission('estagiarios:editar');

  const {
    dados,
    isLoading,
    totalPages,
    totalElements,
    pagination,
    setPagination,
    filtro,
    setFiltro,
  } = useListaPaginada({
    fetchFn: estagiariosService.listar,
    filtroInicial: { termo: '' },
  });

  const columns = getEstagiariosColumns(
    (id) => navigate(paths.estagiarios.editar(id)),
    podeEditar,
  );

  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Estagiários</Title>
        {podeCriar && (
          <Button onClick={() => navigate(paths.estagiarios.novo)}>
            Novo Estagiário
          </Button>
        )}
      </Group>

      <TextInput
        placeholder="Buscar por nome ou matrícula..."
        leftSection={<IconSearch size={16} />}
        value={filtro.termo}
        onChange={(e) => setFiltro({ ...filtro, termo: e.target.value })}
        mb="md"
        maw={360}
      />

      <DataTable
        data={dados}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={totalPages}
        totalElements={totalElements}
      />
    </div>
  );
}
