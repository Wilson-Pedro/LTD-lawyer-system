export enum PeriodoEstagio {
  ESTAGIO_I = 'ESTAGIO_I',
  ESTAGIO_II = 'ESTAGIO_II',
  ESTAGIO_III = 'ESTAGIO_III',
  ESTAGIO_IV = 'ESTAGIO_IV',
}

export const periodoEstagioLabel: Record<PeriodoEstagio, string> = {
  [PeriodoEstagio.ESTAGIO_I]: 'Estágio I',
  [PeriodoEstagio.ESTAGIO_II]: 'Estágio II',
  [PeriodoEstagio.ESTAGIO_III]: 'Estágio III',
  [PeriodoEstagio.ESTAGIO_IV]: 'Estágio IV',
};
