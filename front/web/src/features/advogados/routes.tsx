import { RouteObject } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { RoleGuard } from '@/routes/RoleGuard';
import CriarAdvogadoPage from './pages/CriarAdvogadoPage';
import EditarAdvogadoPage from './pages/EditarAdvogadoPage';

export const advogadosRoutes: RouteObject[] = [
  {
    path: paths.advogados.novo,
    element: (
      <RoleGuard action="advogados:criar">
        <CriarAdvogadoPage />
      </RoleGuard>
    ),
  },
  {
    path: paths.advogados.editar(':id'),
    element: (
      <RoleGuard action="advogados:editar">
        <EditarAdvogadoPage />
      </RoleGuard>
    ),
  },
];
