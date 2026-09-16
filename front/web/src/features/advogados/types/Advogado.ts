import { Usuario } from '@/features/auth/types';
import { Endereco } from '@/types/endereco';
import { Pessoa } from '@/types/pessoa';

export interface AdvogadoRequest {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataDeNascimento: string;
  cidade: string;
  bairro: string;
  rua: string;
  numeroDaCasa: number;
  cep: string;
  usuarioStatus: string;
  senha: string;
}
export interface Advogado {
  id: number;
  dataDeNascimento: string;
  endereco: Endereco | null;
  pessoa: Pessoa;
  usuario: Usuario;
}

export interface AdvogadoListResponse {
  id: number;
  nome: string;
  email: string;
  usuarioStatus: string;
  registro: string;
}
