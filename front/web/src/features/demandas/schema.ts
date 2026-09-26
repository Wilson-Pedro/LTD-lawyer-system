import z from 'zod';

const demandaBaseSchema = z.object({
  advogadoId: z.coerce.number().int().positive('Advogado é obrigatório'),
  estagiarioId: z.coerce.number().int().positive('Estagiário é obrigatório'),
  professorId: z.coerce.number().int().positive('Professor é obrigatório'),
  descricao: z.string().min(1, 'A descrição é obrigatória'),
  diasAdicionais: z.coerce
    .number()
    .int('Deve ser um número inteiro')
    .min(0, 'Dias adicionais não podem ser negativos'),
  prazoDocumentos: z.string().min(1, 'O prazo de documentos é obrigatório'),
});

// p/ criar demandas novas
export const criarDemandaSchema = demandaBaseSchema;

// p/ demandas que já existem no mundo real e já está em processo
export const migrarDemandaSchema = demandaBaseSchema.extend({
  etapaAtual: z.string().min(1, 'A etapa atual é obrigatória'),
});

export const atualizarDemandaSchema = demandaBaseSchema.partial();

export type CriarDemandaRequest = z.infer<typeof criarDemandaSchema>;
export type MigrarDemandaRequest = z.infer<typeof migrarDemandaSchema>;
export type AtualizarDemandaRequest = z.infer<typeof atualizarDemandaSchema>;
