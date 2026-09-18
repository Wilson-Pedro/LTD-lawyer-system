import { api } from '@/lib/api/axios';
import { AtualizarAdvogadoRequest, CriarAdvogadoRequest } from '../schema';
import { Advogado } from '../types';

export const advogadosService = {
  buscarPorId: async (id: number): Promise<Advogado> => {
    const { data } = await api.get(`/api/v1/advogados/${id}`);
    return data;
  },

  criar: async (dados: CriarAdvogadoRequest): Promise<void> => {
    await api.post('/api/v1/advogados', dados);
  },

  atualizar: async (
    id: number,
    dados: AtualizarAdvogadoRequest,
  ): Promise<Advogado> => {
    const { data } = await api.put(`/api/v1/advogados/${id}`, dados);
    return data;
  },
};
