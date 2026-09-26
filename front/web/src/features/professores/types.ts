import { Pessoa } from '@/types/pessoa';
import { Usuario } from '../auth/types';

export interface Professor {
  pessoa: Pessoa;
  usuario: Usuario;
}

export interface ProfessorOption {
  id: number;
  nome: string;
}

export interface ProfessorListItem {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  usuarioStatus: string;
}
