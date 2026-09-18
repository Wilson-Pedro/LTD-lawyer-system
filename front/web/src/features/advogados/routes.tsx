import { RouteObject } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { RoleGuard } from '@/routes/RoleGuard';
import CriarAdvogadoPage from './pages/CriarAdvogadoPage';

export const advogadosRoutes: RouteObject[] = [
  {
    path: paths.advogados.novo,
    element: (
      <RoleGuard action="advogados:criar">
        <CriarAdvogadoPage />
      </RoleGuard>
    ),
  },
];
