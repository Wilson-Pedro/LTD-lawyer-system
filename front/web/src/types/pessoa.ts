import { Endereco } from './endereco';

export interface Pessoa {
  id: number;
  nome: string;
  telefone?: string;
  email: string;
  dataNascimento?: string;
  endereco?: Endereco;
}
