import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { Fieldset, Grid, Stack } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { CriarAdvogadoRequest, criarAdvogadoSchema } from '../schema';
import { EnderecoFields } from '@/components/ui/EnderecoFields';

interface AdvogadoFormProps {
  valoresIniciais?: Partial<CriarAdvogadoRequest>;
  onSubmit: (dados: CriarAdvogadoRequest) => Promise<void>;
  modo: 'criar' | 'editar';
}

export function AdvogadoForm({
  valoresIniciais,
  onSubmit,
  modo,
}: AdvogadoFormProps) {
  const methods = useZodForm(criarAdvogadoSchema, {
    defaultValues: {
      endereco: {},
      ...valoresIniciais,
    },
  });

  const { isSubmitting, errors } = methods.formState;
  console.log('Erros de Validação:', errors);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack gap="lg">
        <Fieldset legend="Dados Pessoais">
          <Grid>
            <Grid.Col>
              <Input name="nome" label="Nome Completo" />
            </Grid.Col>

            <Grid.Col span={8}>
              <Input name="email" label="Email" type="email" />
            </Grid.Col>

            <Grid.Col span={4}>
              <Input name="telefone" label="Telefone" />
            </Grid.Col>

            <Grid.Col span={4}>
              <Input
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <EnderecoFields />

        <Input name="senha" label="Senha" type="password" />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Salvando...'
            : modo === 'criar'
              ? 'Cadastrar Advogado'
              : 'Salvar Alterações'}
        </Button>
      </Stack>
    </Form>
  );
}
