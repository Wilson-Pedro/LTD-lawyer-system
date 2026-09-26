import { api } from '@/lib/api/axios';
import { Assistido, AssistidoListItem } from '../types';
import { AtualizarAssistidoRequest, CriarAssistidoRequest } from '../schema';
import { PageResponse } from '@/types/pageResponse';

interface ListarAssistidosParams {
  pageIndex: number;
  pageSize: number;
  termo?: string;
}

export const assistidosService = {
  listar: async ({
    pageIndex,
    pageSize,
    termo,
  }: ListarAssistidosParams): Promise<PageResponse<AssistidoListItem>> => {
    const { data } = await api.get('/assistidos', {
      params: { page: pageIndex, size: pageSize, termo: termo || undefined },
    });
    return data;
  },

  buscarPorId: async (id: number): Promise<Assistido> => {
    const { data } = await api.get(`/assistidos/${id}`);
    return data;
  },

  criar: async (dados: CriarAssistidoRequest): Promise<void> => {
    await api.post('/assistidos', dados);
  },

  atualizar: async (
    id: number,
    dados: AtualizarAssistidoRequest,
  ): Promise<Assistido> => {
    const { data } = await api.put(`/assistidos/${id}`, dados);
    return data;
  },
};
