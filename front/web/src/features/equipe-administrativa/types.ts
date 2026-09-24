import { Role } from '@/constants/roles';
import { UsuarioStatus } from '@/constants/usuarioStatus';
import { Pessoa } from '@/types/pessoa';
import { Usuario } from '../auth/types';

export interface Administrativo {
  pessoa: Pessoa;
  usuario: Usuario;
}

export interface AdministrativoListItem {
  id: string | number;
  nome: string;
  login: string;
  role: Role;
  usuarioStatus: UsuarioStatus;
}
