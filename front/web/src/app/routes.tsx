import { createBrowserRouter } from 'react-router-dom';
import { PublicRoute } from '@/routes/PublicRoute';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { RoleGuard } from '@/routes/RoleGuard';
import { paths } from '@/routes/paths';

import { MainLayout } from '@/components/layouts/MainLayout';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';

import LoginPage from '@/features/auth/pages/LoginPage';
import EsqueciSenhaPage from '@/features/auth/pages/EsqueciSenhaPage';
import RedefinirSenhaPage from '@/features/auth/pages/RedefinirSenhaPage';
import AcessoNegadoPage from '@/features/auth/pages/AcessoNegadoPage';

import CriarEstagiarioPage from '@/features/estagiarios/pages/CriarEstagiarioPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import ListaEstagiariosPage from '@/features/estagiarios/pages/ListaEstagiarioPage';

// import { ListaProcessosPage } from '@/features/processos/pages/ListaProcessosPage';
// import { DetalheProcessoPage } from '@/features/processos/pages/DetalheProcessoPage';
// import { GestaoUsuariosPage } from '@/features/usuarios/pages/GestaoUsuariosPage';

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: paths.login, element: <LoginPage /> },
      { path: paths.esqueciSenha, element: <EsqueciSenhaPage /> },
      { path: paths.redefinirSenha, element: <RedefinirSenhaPage /> },
    ],
  },

  { path: paths.acessoNegado, element: <AcessoNegadoPage /> },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: paths.home, element: <DashboardPage /> },
          { path: paths.estagiarios.novo, element: <CriarEstagiarioPage /> },

          {
            element: <RoleGuard action="estagiarios:visualizar" />,
            children: [
              {
                path: paths.estagiarios.lista,
                element: <ListaEstagiariosPage />,
              },
            ],
          },

          {
            element: <RoleGuard action="estagiarios:criar" />,
            children: [
              {
                path: paths.estagiarios.novo,
                element: <CriarEstagiarioPage />,
              },
            ],
          },

          //   { path: paths.processos.lista, element: <ListaProcessosPage /> },
          //   { path: '/processos/:id', element: <DetalheProcessoPage /> },

          // {
          //   element: (
          //     <RoleGuard
          //       allowedRoles={[ROLE.COORDENADOR_DO_CURSO, ROLE.SECRETARIO, ROLE.ADMIN]}
          //     />
          //   ),
          //   children: [
          //     // { path: paths.usuarios, element: <GestaoUsuariosPage /> },
          //   ],
          // },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
