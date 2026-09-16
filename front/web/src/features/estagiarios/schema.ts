import { z } from 'zod';

export const criarEstagiarioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  telefone: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  periodoEstagio: z.string().min(1, 'Período é obrigatório'),
});

export type CriarEstagiarioRequest = z.infer<typeof criarEstagiarioSchema>;
