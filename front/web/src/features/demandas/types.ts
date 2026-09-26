export interface Demanda {
  idi: number;
  descricaoDemanda: string;
  prazo: string;
  dataAbertura: string;
}

export interface DemandaResponse {
  id: number;
  demanda: string;
  estagiarioNome: string;
  professorNome: string;
  advogadoNome: string;
  estagiarioId: number;
  professorId: number;
  advogadoId: number;
  demandaStatusAluno: string;
  demandaStatusProfessor: string;
  demandaStatusAdvogado: string;
  prazoDocumentos: string;
  prazo: string;
  diasPrazo: number;
  tempestividade: string;
}

export interface DemandaListItem {
  id: number;
  descricaoDemanda: string;
  prazo: string;
  nomeEstagiario: string;
  nomeProfessor: string;
}
