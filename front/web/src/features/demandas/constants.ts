export enum EtapaDemanda {
  ELABORACAO = 'ELABORACAO',
  REVISAO_PROFESSOR = 'REVISAO_PROFESSOR',
  VALIDACAO_ADVOGADO = 'VALIDACAO_ADVOGADO',
  PROTOCOLADA = 'PROTOCOLADA',
  ARQUIVADA = 'ARQUIVADA',
}

export const etapaDemandaLabel: Record<EtapaDemanda, string> = {
  [EtapaDemanda.ELABORACAO]: 'Em Elaboração pelo Estagiário',
  [EtapaDemanda.REVISAO_PROFESSOR]: 'Em Revisão pelo Professor',
  [EtapaDemanda.VALIDACAO_ADVOGADO]: 'Aguardando Validação do Advogado',
  [EtapaDemanda.PROTOCOLADA]: 'Protocolada',
  [EtapaDemanda.ARQUIVADA]: 'Arquivada',
};
