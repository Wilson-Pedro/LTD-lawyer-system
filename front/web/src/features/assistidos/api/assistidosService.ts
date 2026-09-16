import { api } from '@/lib/api/axios';
import { Assistido, AssistidoRequest } from '../types';

export const assistidosService = {
  criar: async (dados: AssistidoRequest): Promise<void> => {
    await api.post('/api/v1/assistidos/', dados);
  },
  listar: async (): Promise<Assistido[]> => {
    const { data } = await api.get('/api/v1/assistidos');
    return data;
  },
  buscarPorId: async (id: number): Promise<Assistido> => {
    const { data } = await api.get(`/api/v1/assistidos/${id}`);
    return data;
  },
};
