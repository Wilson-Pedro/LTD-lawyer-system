import { RouteObject } from 'react-router-dom';
import { paths } from '@/routes/paths';

import { RoleGuard } from '@/routes/RoleGuard';
import CriarDemandaPage from './pages/CriarDemandaPage';
import MigrarDemandaPage from './pages/MigrarDemandaPage';
import ListaDemandasPage from './pages/ListaDemandasPage';

export const demandasRoutes: RouteObject[] = [
  {
    path: paths.demandas.lista,
    element: (
      <RoleGuard action="demandas:visualizar">
        <ListaDemandasPage />
      </RoleGuard>
    ),
  },
  {
    path: paths.demandas.novo,
    element: (
      <RoleGuard action="demandas:criar">
        <CriarDemandaPage />
      </RoleGuard>
    ),
  },
  {
    path: paths.demandas.migrar,
    element: (
      <RoleGuard action="demandas:criar">
        <MigrarDemandaPage />
      </RoleGuard>
    ),
  },
];
