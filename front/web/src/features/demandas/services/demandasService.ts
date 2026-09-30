import { api } from '@/lib/api/axios';
import { CriarDemandaRequest, CriarTramitacaoRequest } from '../schema';
import {
  Demanda,
  DemandaListItem,
  Tramitacao,
  TramitacaoDisponivel,
} from '../types';
import { PageResponse } from '@/types/pageResponse';
import { EtapaDemanda } from '../constants';

interface ListarDemandasParams {
  pageIndex: number;
  pageSize: number;
  etapaAtual?: EtapaDemanda;
  tempestividade?: string;
}

export const demandasService = {
  listar: async ({
    pageIndex,
    pageSize,
    etapaAtual,
    tempestividade,
  }: ListarDemandasParams): Promise<PageResponse<DemandaListItem>> => {
    const { data } = await api.get('/demandas', {
      params: {
        page: pageIndex,
        size: pageSize,
        etapaAtual: etapaAtual || undefined,
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

  listarTramitacoes: async (
    demandaId: number,
  ): Promise<PageResponse<Tramitacao>> => {
    const { data } = await api.get(`/demandas/${demandaId}/tramitacoes`);
    return data;
  },

  listarAcoesDisponiveis: async (
    demandaId: number,
  ): Promise<TramitacaoDisponivel[]> => {
    const { data } = await api.get(
      `/demandas/${demandaId}/tramitacoes/disponiveis`,
    );
    return data;
  },

  tramitar: async (
    demandaId: number,
    dados: CriarTramitacaoRequest,
  ): Promise<void> => {
    await api.post(`/demandas/${demandaId}/tramitacoes`, dados);
  },

  // atualizar: async (
  //   id: number,
  //   dados: AtualizarEstagiarioRequest,
  // ): Promise<Estagiario> => {
  //   const { data } = await api.put(`/estagiarios/${id}`, dados);
  //   return data;
  // },
};
