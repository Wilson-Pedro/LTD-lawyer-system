import { Tempestividade } from '@/constants/tempestividade';
import { EtapaDemanda } from './constants';
import { Role } from '@/constants/roles';

export interface Demanda {
  id: number;
  descricao: string;
  prazoFinal: string;
  prazoDocumentacao: string;
  etapaAtual: EtapaDemanda;
  tempestividade: Tempestividade;
  dataAbertura: string;
  ultimaAtualizacao: string;
}

export interface Tramitacao {
  id: number;
  criadoEm: string;
  nomeResponsavel: string;
  tipoTramitacao: string;
  observacoes: string;
  linkAnexo: string | null;
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

export interface Tramitacao {
  id: number;
  nomeResponsavel: string;
  tipoTramitacao: string;
  observacoes: string;
  linkAnexo: string | null;
  criadoEm: string;
}
