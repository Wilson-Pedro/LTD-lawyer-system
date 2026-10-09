import { RouteObject } from 'react-router-dom';
import { paths } from '@/routes/paths';

import { RoleGuard } from '@/routes/RoleGuard';
import CriarProcessoPage from './pages/CriarProcessoPage';

export const processosRoutes: RouteObject[] = [
  {
    path: paths.processos.novo,
    element: (
      <RoleGuard action="processos:criar">
        <CriarProcessoPage />
      </RoleGuard>
    ),
  },
];
