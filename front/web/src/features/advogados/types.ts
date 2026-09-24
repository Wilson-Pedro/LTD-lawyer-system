import { Usuario } from '@/features/auth/types';
import { Endereco } from '@/types/endereco';
import { Pessoa } from '@/types/pessoa';

export interface Advogado {
  id: number;
  dataDeNascimento: string;
  endereco: Endereco | null;
  pessoa: Pessoa;
  usuario: Usuario;
}

export interface AdvogadoListItem {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  usuarioStatus: string;
}
