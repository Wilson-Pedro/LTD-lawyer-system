// features/dashboard/components/AdminDashboard.tsx
import { SimpleGrid } from '@mantine/core';
import {
  IconUsers,
  IconFileText,
  IconClipboardList,
  IconSettings,
} from '@tabler/icons-react';
import { DashboardCard } from './DashboardCard';
import { paths } from '@/routes/paths';

export function AdminDashboard() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      <DashboardCard
        title="Gestão de Usuários"
        description="Criar, editar e desativar contas"
        icon={<IconUsers size={20} />}
        to={paths.usuarios}
      />
      <DashboardCard
        title="Processos"
        description="Ver todos os processos ativos"
        icon={<IconFileText size={20} />}
        to={paths.processos.lista}
      />
      <DashboardCard
        title="Demandas"
        description="Ver todas as demandas do curso"
        icon={<IconClipboardList size={20} />}
        to={paths.demandas.lista}
      />
      <DashboardCard
        title="Configurações"
        description="Parâmetros gerais do sistema"
        icon={<IconSettings size={20} />}
        to={paths.configuracoes}
      />
    </SimpleGrid>
  );
}
