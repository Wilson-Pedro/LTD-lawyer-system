export const USUARIO_STATUS = {
  ATIVO: 'ATIVO',
  INATIVO: 'INATIVO',
  BLOQUEADO: 'BLOQUEADO',
} as const;

export type UsuarioStatus = (typeof USUARIO_STATUS)[keyof typeof USUARIO_STATUS];

export const usuarioStatusLabel: Record<UsuarioStatus, string> = {
  [USUARIO_STATUS.ATIVO]: 'Ativo',
  [USUARIO_STATUS.INATIVO]: 'Inativo',
  [USUARIO_STATUS.BLOQUEADO]: 'Bloqueado',
};