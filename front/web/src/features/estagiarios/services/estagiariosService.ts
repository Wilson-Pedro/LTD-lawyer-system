import { api } from '@/lib/api/axios';
import { Estagiario, EstagiarioListItem } from '../types';
import { PageResponse } from '@/types/pageResponse';
import { CriarEstagiarioRequest } from '../schema';

interface ListarEstagiariosParams {
  pageIndex: number;
  pageSize: number;
  termo?: string;
}

export const estagiariosService = {
  listar: async ({
    pageIndex,
    pageSize,
    termo,
  }: ListarEstagiariosParams): Promise<PageResponse<EstagiarioListItem>> => {
    const { data } = await api.get('/api/v1/estagiarios', {
      params: { page: pageIndex, size: pageSize, termo: termo || undefined },
    });
    return data;
  },

  buscarPorId: async (id: number): Promise<Estagiario> => {
    const { data } = await api.get(`/api/v1/estagiarios/${id}`);
    return data;
  },

  criar: async (dados: CriarEstagiarioRequest): Promise<Estagiario> => {
    const { data } = await api.post('/api/v1/estagiarios', dados);
    return data;
  },

  atualizar: async (
    id: number,
    dados: Partial<CriarEstagiarioRequest>,
  ): Promise<Estagiario> => {
    const { data } = await api.put(`/api/v1/estagiarios/${id}`, dados);
    return data;
  },
};
