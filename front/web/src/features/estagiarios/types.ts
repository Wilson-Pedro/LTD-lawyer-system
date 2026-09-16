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
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  periodo: string;
  usuarioStatus: string;
  senha: string;
  criacao: string;
}

export interface CriarEstagiarioRequest {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  matricula: string;
  periodoEstagio: PeriodoEstagio;
  usuarioStatus: string;
  senha: string;
}

export interface EstagiarioListItem {
  id: number;
  nome: string;
  matricula: string;
  periodoEstagio: string;
  usuarioStatus: string;
}
