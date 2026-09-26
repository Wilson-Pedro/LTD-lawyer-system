import { Tempestividade } from '@/constants/tempestividade';
import { EtapaDemanda } from './constants';

export interface Demanda {
  idi: number;
  descricaoDemanda: string;
  prazo: string;
  dataAbertura: string;
}

export interface DemandaResponse {
  id: number;
  demanda: string;
  estagiarioNome: string;
  professorNome: string;
  advogadoNome: string;
  estagiarioId: number;
  professorId: number;
  advogadoId: number;
  demandaStatusAluno: string;
  demandaStatusProfessor: string;
  demandaStatusAdvogado: string;
  prazoDocumentos: string;
  prazo: string;
  diasPrazo: number;
  tempestividade: string;
}

export interface DemandaListItem {
  id: number;
  descricao: string;
  prazoFinal: string;
  prazoDocumentacao: string;
  nomeAdvogado: string;
  nomeEstagiario: string;
  nomeProfessor: string;
  etapaAtual: EtapaDemanda;
  tempestividade: Tempestividade;
}
