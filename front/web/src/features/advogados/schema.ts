import { enderecoSchema } from '@/schemas/endereco.schema';
import { z } from 'zod';

export const criarAdvogadoSchema = z.object({
  nome: z.string().trim().min(3, 'O nome é obrigatório'),
  email: z.string().email('Informe um e-mail válido'),
  senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  telefone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{8,11}$/, 'Telefone inválido')),
  dataNascimento: z
    .string()
    .min(1, 'A data de nascimento é obrigatória')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido'),
  endereco: z.preprocess(
    (val: any) => {
      // Se não enviou nada ou não é objeto, retorna undefined
      if (!val || typeof val !== 'object') return undefined;
      // Verifica se o usuário digitou PELO MENOS UM campo do endereço
      const temAlgumValor = Object.values(val).some(
        (v) => v !== '' && v !== null && v !== undefined,
      );
      // Se estiver tudo vazio, retorna undefined (ativando o optional)
      // Se tiver algo digitado, retorna o objeto para ser validado
      return temAlgumValor ? val : undefined;
    },

    enderecoSchema.optional(),
  ),
});

export type CriarAdvogadoRequest = z.infer<typeof criarAdvogadoSchema>;
