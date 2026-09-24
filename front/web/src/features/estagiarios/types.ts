import { Pessoa } from '@/types/pessoa';
import { Usuario } from '../auth/types';

export interface Estagiario {
  id: number;
  matricula: string;
  periodoEstagio: string;
  pessoa: Pessoa;
  usuario: Usuario;
}

export interface EstagiarioListItem {
  id: number;
  nome: string;
  matricula: string;
  periodoEstagio: string;
  usuarioStatus: string;
}
