import { api } from '@/lib/api/axios';
import { CriarProcessoRequest } from '../schema';
import { ListarProcessosParams, Processo, ProcessoListItem } from '../types';
import { PageResponse } from '@/types/pageResponse';

export const processosService = {
  listar: async ({
    pageIndex,
    pageSize,
    areaDireito,
    tribunal,
    status,
  }: ListarProcessosParams): Promise<PageResponse<ProcessoListItem>> => {
    const { data } = await api.get('/processos', {
      params: {
        page: pageIndex,
        size: pageSize,
        areaDireito: areaDireito || undefined,
        tribunal: tribunal || undefined,
        status: status || undefined,
      },
    });
    return data;
  },

  buscarPorId: async (id: number): Promise<Processo> => {
    const { data } = await api.get(`/processos/${id}`);
    return data;
  },

  criar: async (dados: CriarProcessoRequest): Promise<Processo> => {
    const { data } = await api.post('/processos', dados);
    return data;
  },
};
