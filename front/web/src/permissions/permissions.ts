import { ROLE, Role } from '@/constants/roles';

const permissions = {
  'processos:criar': [ROLE.ADVOGADO, ROLE.COORDENADOR_DO_CURSO, ROLE.ADMIN],
  'processos:editar': [ROLE.ADVOGADO, ROLE.COORDENADOR_DO_CURSO, ROLE.ADMIN],
  'demandas:atribuir': [ROLE.COORDENADOR_DO_CURSO, ROLE.PROFESSOR, ROLE.ADMIN],
  'usuarios:gerenciar': [ROLE.COORDENADOR_DO_CURSO, ROLE.SECRETARIO, ROLE.ADMIN],
} as const satisfies Record<string, readonly Role[]>;

export type PermissionAction = keyof typeof permissions;

export function can(role: Role, action: PermissionAction): boolean {
  return (permissions[action] as readonly Role[]).includes(role);
}