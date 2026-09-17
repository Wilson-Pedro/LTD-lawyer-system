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

export interface AdvogadoListResponse {
  id: number;
  nome: string;
  email: string;
  usuarioStatus: string;
  registro: string;
}
