import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Role } from '@/constants/roles';
import { paths } from './paths';

interface RoleGuardProps {
  allowedRoles: Role[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to={paths.login} replace />;

  const temPermissao = allowedRoles.includes(user.role);

  return temPermissao ? <Outlet /> : <Navigate to={paths.acessoNegado} replace />;
}