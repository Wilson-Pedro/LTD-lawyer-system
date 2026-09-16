import {
  IconLayoutDashboard,
  IconUsers,
  IconFileText,
  IconClipboardList,
  IconSettings,
  IconSchool,
  IconGavel,
  IconBriefcase,
} from '@tabler/icons-react';
import { Role } from '@/constants/roles';
import { paths } from '@/routes/paths';
import { can, PermissionAction } from '@/permissions/permissions';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  requiredAction?: PermissionAction; // se omitido, qualquer um pode acessar
}

const size = 20
const allNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <IconLayoutDashboard size={size} />,
    to: paths.home,
  },
  {
    label: 'Processos',
    icon: <IconFileText size={size} />,
    to: paths.processos.lista,
  },
  {
    label: 'Demandas',
    icon: <IconClipboardList size={size} />,
    to: paths.demandas.lista,
  },
  {
    label: 'Estagiários',
    icon: <IconSchool size={size} />,
    to: paths.estagiarios.lista,
    requiredAction: 'estagiarios:visualizar',
  },
  {
    label: 'Professores',
    icon: <IconUsers size={size} />,
    to: paths.professores.lista,
    requiredAction: 'professores:visualizar',
  },
  {
    label: 'Assistidos',
    icon: <IconUsers size={size} />,
    to: paths.assistidos.lista,
    requiredAction: 'assistidos:visualizar',
  },
  {
    label: 'Advogados',
    icon: <IconGavel size={size} />,
    to: paths.advogados.lista,
    requiredAction: 'advogados:visualizar',
  },
  {
    label: 'Funcionários',
    icon: <IconBriefcase size={size} />,
    to: paths.funcionarios.lista,
    requiredAction: 'usuarios:gerenciar',
  },
  {
    label: 'Configurações',
    icon: <IconSettings size={size} />,
    to: paths.configuracoes,
    requiredAction: 'configuracoes:acessar',
  },
];

export function getNavItemsForRole(role: Role): NavItem[] {
  return allNavItems.filter(
    (item) => !item.requiredAction || can(role, item.requiredAction)
  );
}
