import { api } from '@/lib/api/axios';
import { LoginResponse, Usuario } from '../types';
import {
  EsqueciSenhaRequest,
  LoginRequest,
  RedefinirSenhaRequest,
} from '../schema';

export const authService = {
  login: async (dados: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post('api/v1/auth/login', dados);
    return data;
  },

  me: async (): Promise<Usuario> => {
    const { data } = await api.get('api/v1/usuarios/me');
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('api/v1/auth/logout');
  },

  esqueciSenha: async (dados: EsqueciSenhaRequest): Promise<void> => {
    await api.post('api/v1/auth/esqueci-senha', dados);
  },

  redefinirSenha: async (
    token: string,
    dados: RedefinirSenhaRequest,
  ): Promise<void> => {
    await api.post('api/v1/auth/redefinir-senha', {
      token,
      novaSenha: dados.novaSenha,
    });
  },
};
