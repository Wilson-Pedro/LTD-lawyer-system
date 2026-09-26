import { api } from '@/lib/api/axios';
import { ProcessoRequest } from '../types/Processos';

export const processosService = {
  cadastrar: async (dados: ProcessoRequest): Promise<void> => {
    await api.post('/processos/', dados);
  },
};
