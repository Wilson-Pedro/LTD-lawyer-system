import { api } from '@/lib/api/axios';
import { Assistido } from '../types';
import { AtualizarAssistidoRequest, CriarAssistidoRequest } from '../schema';

export const assistidosService = {
  listar: async (): Promise<Assistido[]> => {
    const { data } = await api.get('/assistidos');
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
