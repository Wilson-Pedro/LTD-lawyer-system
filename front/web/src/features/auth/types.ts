import { Role } from "@/constants/roles";
import { UsuarioStatus } from "@/constants/usuarioStatus";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  expiraEm: string;
}

export interface Usuario {
  id: number;
  login: string;
  role: Role;
  usuarioStatus: UsuarioStatus;
  criadoEm: string;
  desativadoEm: string;
}

export interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}