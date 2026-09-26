import { api } from '@/lib/api/axios';
import { CriarDemandaRequest, MigrarDemandaRequest } from '../schema';
import { Demanda, DemandaListItem } from '../types';
import { PageResponse } from '@/types/pageResponse';
import { EtapaDemanda } from '../constants';

interface ListarDemandasParams {
  pageIndex: number;
  pageSize: number;
  status?: EtapaDemanda;
  tempestividade?: string;
}

export const demandasService = {
  listar: async ({
    pageIndex,
    pageSize,
    status,
    tempestividade,
  }: ListarDemandasParams): Promise<PageResponse<DemandaListItem>> => {
    const { data } = await api.get('/demandas', {
      params: {
        page: pageIndex,
        size: pageSize,
        status: status || undefined,
        tempestividade: tempestividade || undefined,
      },
    });
    return data;
  },

  buscarPorId: async (id: number): Promise<Demanda> => {
    const { data } = await api.get(`/demandas/${id}`);
    return data;
  },

  criar: async (dados: CriarDemandaRequest): Promise<Demanda> => {
    const { data } = await api.post('/demandas', dados);
    return data;
  },

  migrar: async (dados: MigrarDemandaRequest): Promise<Demanda> => {
    const { data } = await api.post('/demandas', dados);
    return data;
  },

  // atualizar: async (
  //   id: number,
  //   dados: AtualizarEstagiarioRequest,
  // ): Promise<Estagiario> => {
  //   const { data } = await api.put(`/estagiarios/${id}`, dados);
  //   return data;
  // },
};
