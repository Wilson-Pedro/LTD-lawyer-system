import { api } from '@/lib/api/axios';
import { CriarAdvogadoRequest } from '../schema';

export const advogadosService = {
  criar: async (dados: CriarAdvogadoRequest): Promise<void> => {
    await api.post('/api/v1/advogados', dados);
  },
};
