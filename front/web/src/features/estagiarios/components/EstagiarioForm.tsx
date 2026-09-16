import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

import { Fieldset, Stack } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { CriarEstagiarioRequest, criarEstagiarioSchema } from '../schema';

interface EstagiarioFormProps {
  valoresIniciais?: Partial<CriarEstagiarioRequest>;
  onSubmit: (dados: CriarEstagiarioRequest) => Promise<void>;
  modo: 'criar' | 'editar';
  periodos: Array<{ value: string; label: string }>;
}

export function EstagiarioForm({
  valoresIniciais,
  onSubmit,
  modo,
  periodos,
}: EstagiarioFormProps) {
  const methods = useZodForm(criarEstagiarioSchema, {
    defaultValues: valoresIniciais,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack gap="lg">
        <Fieldset legend="Dados Pessoais">
          <Input name="nome" label="Nome Completo" />
          <Input name="email" label="Email" type="email" />
        </Fieldset>

        <Fieldset legend="Dados Acadêmicos">
          <Input name="matricula" label="Matricula" />
          <Select
            name="periodoEstagio"
            label="Período do Estágio"
            options={periodos}
          />
        </Fieldset>

        <Input name="senha" label="Senha" type="password" />

        <Button type="submit">
          {modo === 'criar' ? 'Cadastrar Estagiário' : 'Salvar Alterações'}
        </Button>
      </Stack>
    </Form>
  );
}
