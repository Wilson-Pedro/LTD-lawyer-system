import { ROLE, Role } from '@/constants/roles';

const permissions = {
  'processos:criar': [ROLE.COORDENADOR_DO_CURSO, ROLE.ADMIN],
  'processos:editar': [ROLE.COORDENADOR_DO_CURSO, ROLE.ADMIN],
  'demandas:atribuir': [ROLE.COORDENADOR_DO_CURSO, ROLE.PROFESSOR, ROLE.ADMIN],
  'usuarios:gerenciar': [
    ROLE.COORDENADOR_DO_CURSO,
    ROLE.SECRETARIO,
    ROLE.ADMIN,
  ],

  // Professores
  'professores:visualizar': [ROLE.ADMIN],

  // Assistidos
  'assistidos:criar': [ROLE.ADMIN],
  'assistidos:visualizar': [ROLE.ADMIN],

  // Estagiarios
  'estagiarios:criar': [ROLE.ADMIN],
  'estagiarios:visualizar': [ROLE.ADMIN],
  'estagiarios:editar': [ROLE.ADMIN],

  // Advogados
  'advogados:criar': [ROLE.ADMIN],
  'advogados:visualizar': [ROLE.ADMIN],
  'advogados:editar': [ROLE.ADMIN],

  // Configurações
  'configuracoes:acessar': [ROLE.ADMIN],
} as const satisfies Record<string, readonly Role[]>;

export type PermissionAction = keyof typeof permissions;

export function can(role: Role, action: PermissionAction): boolean {
  return (permissions[action] as readonly Role[]).includes(role);
}
