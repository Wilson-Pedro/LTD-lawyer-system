import { CriarEstagiarioRequest } from '../types';

import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

import { useForm, UseFormSetError } from 'react-hook-form';
import { Fieldset, Stack } from '@mantine/core';

interface EstagiarioFormProps {
  valoresIniciais?: Partial<CriarEstagiarioRequest>;
  onSubmit: (
    dados: CriarEstagiarioRequest,
    setError: UseFormSetError<CriarEstagiarioRequest>,
  ) => Promise<void>;
  modo: 'criar' | 'editar';
  periodos: Array<{ value: string; label: string }>;
}

export function EstagiarioForm({
  valoresIniciais,
  onSubmit,
  modo,
  periodos,
}: EstagiarioFormProps) {
  const methods = useForm<CriarEstagiarioRequest>({
    defaultValues: valoresIniciais,
    // resolver: zodResolver(estagiarioSchema)
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
