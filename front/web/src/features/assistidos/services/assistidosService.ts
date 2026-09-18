import { api } from '@/lib/api/axios';
import { Assistido } from '../types';
import { AtualizarAssistidoRequest, CriarAssistidoRequest } from '../schema';

export const assistidosService = {
  listar: async (): Promise<Assistido[]> => {
    const { data } = await api.get('/api/v1/assistidos');
    return data;
  },

  buscarPorId: async (id: number): Promise<Assistido> => {
    const { data } = await api.get(`/api/v1/assistidos/${id}`);
    return data;
  },

  criar: async (dados: CriarAssistidoRequest): Promise<void> => {
    await api.post('/api/v1/assistidos', dados);
  },

  atualizar: async (
    id: number,
    dados: AtualizarAssistidoRequest,
  ): Promise<Assistido> => {
    const { data } = await api.put(`/api/v1/assistidos/${id}`, dados);
    return data;
  },
};
