import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "./paths";

export function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <div>Carregando...</div>;

    if (!isAuthenticated) {
    return <Navigate to={paths.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}


