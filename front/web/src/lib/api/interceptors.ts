import { clearToken } from '../storage/tokenStorage';
import { api } from './axios';

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      // usuário autenticado mas sem permissão
      // redirecionar pra tela de "acesso negado"
    }

    return Promise.reject(error);
  },
);