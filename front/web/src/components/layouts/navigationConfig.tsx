// components/layout/navigationConfig.tsx
import {
  IconLayoutDashboard,
  IconUsers,
  IconFileText,
  IconClipboardList,
  IconSettings,
} from '@tabler/icons-react';
import { ROLE, Role } from '@/constants/roles';
import { paths } from '@/routes/paths';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  roles: readonly Role[];
}

const allNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <IconLayoutDashboard size={18} />,
    to: paths.home,
    roles: Object.values(ROLE),
  },
  {
    label: 'Processos',
    icon: <IconFileText size={18} />,
    to: paths.processos.lista,
    roles: Object.values(ROLE),
  },
  {
    label: 'Demandas',
    icon: <IconClipboardList size={18} />,
    to: paths.demandas.lista,
    roles: Object.values(ROLE),
  },
  {
    label: 'Usuários',
    icon: <IconUsers size={18} />,
    to: paths.usuarios,
    roles: [ROLE.ADMIN, ROLE.COORDENADOR_DO_CURSO, ROLE.SECRETARIO],
  },
  {
    label: 'Configurações',
    icon: <IconSettings size={18} />,
    to: paths.configuracoes,
    roles: [ROLE.ADMIN],
  },
];

export function getNavItemsForRole(role: Role): NavItem[] {
  return allNavItems.filter((item) => item.roles.includes(role));
}
