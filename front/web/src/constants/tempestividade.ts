export enum Tempestividade {
  DENTRO_DO_PRAZO = 'DENTRO_DO_PRAZO',
  FORA_DO_PRAZO = 'FORA_DO_PRAZO',
}

export const tempestividadeLabel: Record<Tempestividade, string> = {
  [Tempestividade.DENTRO_DO_PRAZO]: 'Dentro do Prazo',
  [Tempestividade.FORA_DO_PRAZO]: 'Fora do Prazo',
};
