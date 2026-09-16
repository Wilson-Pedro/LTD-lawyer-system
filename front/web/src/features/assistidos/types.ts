import { EstadoCivil } from '@/constants/estadoCivil';
import { Endereco } from '@/types/endereco';
import { Pessoa } from '@/types/pessoa';

export interface Assistido {
  id: number;
  matricula: string;
  profissao: string;
  nacionalidade: string;
  naturalidade: string;
  estadoCivil: EstadoCivil;
  criadoEm: string;
  pessoa: Pessoa;
  endereco: Endereco | null;
}

export interface AssistidoRequest {
  id: number;
  nome: string;
  matricula: string;
  telefone: string;
  email: string;
  profissao: string;
  nacionalidade: string;
  naturalidade: string;
  estadoCivil: string;
  cidade: string;
  bairro: string;
  rua: string;
  numeroDaCasa: number;
  cep: string;
}

export interface AssistidoListResponse {
  id: number;
  nome: string;
  email: string;
  usuarioStatus: string;
  registro: string;
}
