import { api } from '@/lib/api/axios';
import { LoginRequest, LoginResponse, Usuario } from '../types';

export const authService = {
  login: async (dados: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post('api/v1/auth/login', dados);
    return data;
  },
  me: async (): Promise<Usuario> => {
    const { data } = await api.get('api/v1/usuarios/me');
    return data;
  },
  // logout: async (): Promise<void> => {
  //   await api.post('api/v1/auth/logout');
  // },
};
