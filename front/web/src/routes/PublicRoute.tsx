import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { paths } from './paths';

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  return isAuthenticated ? <Navigate to={paths.home} replace /> : <Outlet />;
}
