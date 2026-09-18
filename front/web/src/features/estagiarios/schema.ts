import { z } from 'zod';

// export const criarEstagiarioSchema = z.object({
//   nome: z.string().min(1, 'Nome é obrigatório'),
//   telefone: z.string().optional(),
//   email: z.string().email('E-mail inválido'),
//   senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
//   matricula: z.string().min(1, 'Matrícula é obrigatória'),
//   periodoEstagio: z.string().min(1, 'Período é obrigatório'),
// });

const dadosBaseSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  telefone: z.string().optional(),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  periodoEstagio: z.string().min(1, 'Período é obrigatório'),
});

// criar = dados base + acesso ao sistema
export const criarEstagiarioSchema = dadosBaseSchema.extend({
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

export const atualizarEstagiarioSchema = dadosBaseSchema;

export type CriarEstagiarioRequest = z.infer<typeof criarEstagiarioSchema>;
export type AtualizarEstagiarioRequest = z.infer<
  typeof atualizarEstagiarioSchema
>;
