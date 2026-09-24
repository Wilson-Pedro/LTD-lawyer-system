import { RouteObject } from 'react-router-dom';
import { paths } from '@/routes/paths';

import { RoleGuard } from '@/routes/RoleGuard';
import AdministrativoListPage from './pages/ListaAdministrativoPage';
import AdministrativoCreatePage from './pages/CriarAdministrativoPage';

export const administrativoRoutes: RouteObject[] = [
  {
    path: paths.administrativo.lista,
    element: (
      <RoleGuard action="administrativo:visualizar">
        <AdministrativoListPage />
      </RoleGuard>
    ),
  },
  {
    path: paths.administrativo.novo,
    element: (
      <RoleGuard action="administrativo:criar">
        <AdministrativoCreatePage />
      </RoleGuard>
    ),
  },
];
