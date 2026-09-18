import { Pessoa } from '@/types/pessoa';
import { Usuario } from '../auth/types';

export enum PeriodoEstagio {
  ESTAGIO_I = 'ESTAGIO_I',
  ESTAGIO_II = 'ESTAGIO_II',
  ESTAGIO_III = 'ESTAGIO_III',
  ESTAGIO_IV = 'ESTAGIO_IV',
}

//  objeto de mapeamento para as Labels (o que o usuário vai ver no Select)
export const periodoEstagioLabel: Record<PeriodoEstagio, string> = {
  [PeriodoEstagio.ESTAGIO_I]: 'Estágio I',
  [PeriodoEstagio.ESTAGIO_II]: 'Estágio II',
  [PeriodoEstagio.ESTAGIO_III]: 'Estágio III',
  [PeriodoEstagio.ESTAGIO_IV]: 'Estágio IV',
};

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
