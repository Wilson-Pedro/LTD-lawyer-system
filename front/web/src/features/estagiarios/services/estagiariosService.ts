import { api } from '@/lib/api/axios';
import { Estagiario, EstagiarioListItem } from '../types';
import { PageResponse } from '@/types/pageResponse';
import { AtualizarEstagiarioRequest, CriarEstagiarioRequest } from '../schema';

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
    const { data } = await api.get('/estagiarios', {
      params: { page: pageIndex, size: pageSize, termo: termo || undefined },
    });
    return data;
  },

  buscarPorId: async (id: number): Promise<Estagiario> => {
    const { data } = await api.get(`/estagiarios/${id}`);
    return data;
  },

  criar: async (dados: CriarEstagiarioRequest): Promise<Estagiario> => {
    const { data } = await api.post('/estagiarios', dados);
    return data;
  },

  atualizar: async (
    id: number,
    dados: AtualizarEstagiarioRequest,
  ): Promise<Estagiario> => {
    const { data } = await api.put(`/estagiarios/${id}`, dados);
    return data;
  },
};
