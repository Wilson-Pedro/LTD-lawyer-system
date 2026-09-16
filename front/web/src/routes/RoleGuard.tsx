import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { can, PermissionAction } from '@/permissions/permissions';
import { paths } from './paths';

interface RoleGuardProps {
  action: PermissionAction;
}

export function RoleGuard({ action }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to={paths.login} replace />;

  return can(user.role, action) ? (
    <Outlet />
  ) : (
    <Navigate to={paths.acessoNegado} replace />
  );
}
