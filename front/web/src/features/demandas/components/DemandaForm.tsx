import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/form/Input';
import { Button } from '@/components/ui/Button';
import { Grid, Stack, Text } from '@mantine/core';
import { useZodForm } from '@/hooks/useZodForm';
import { FormSection } from '@/components/ui/form/FormSection';
import {
  AtualizarDemandaRequest,
  CriarDemandaRequest,
  MigrarDemandaRequest,
  atualizarDemandaSchema,
  criarDemandaSchema,
  migrarDemandaSchema,
} from '../schema';
import { AsyncSelect } from '@/components/ui/form/AsyncSelect';
import { estagiariosService } from '@/features/estagiarios/services/estagiariosService';
import { advogadosService } from '@/features/advogados/services/advogadosService';
import { professoresService } from '@/features/professores/services/professoresService';
import { Select } from '@/components/ui/form/Select';

interface DemandaFormProps {
  valoresIniciais?: Partial<
    CriarDemandaRequest & MigrarDemandaRequest & AtualizarDemandaRequest
  >;
  onSubmit: (dados: any) => Promise<void>;
  modo: 'criar' | 'migrar' | 'editar';
  opcoesEtapas?: Array<{ value: string; label: string }>;
}

export function DemandaForm({
  valoresIniciais,
  onSubmit,
  modo,
  opcoesEtapas = [],
}: DemandaFormProps) {
  const schema =
    modo === 'criar'
      ? criarDemandaSchema
      : modo === 'migrar'
        ? migrarDemandaSchema
        : atualizarDemandaSchema;

  const methods = useZodForm(schema, {
    defaultValues: valoresIniciais,
  });

  const { isSubmitting } = methods.formState;
  const prazoDocumentos = methods.watch('prazoDocumentos');
  const diasAdicionais = methods.watch('diasAdicionais');

  let prazoFinal = '';

  if (prazoDocumentos) {
    // O 'T12:00:00' evita bugs de fuso horário que fazem a data voltar 1 dia
    const data = new Date(`${prazoDocumentos}T12:00:00`);

    if (!isNaN(data.getTime())) {
      const dias = Number(diasAdicionais) || 0;
      data.setDate(data.getDate() + dias);
      prazoFinal = new Intl.DateTimeFormat('pt-BR').format(data);
    }
  }

  const textoBotao =
    modo === 'criar' || 'migrar' ? 'Adicionar Demanda' : 'Salvar Alterações';

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack gap="lg">
        <FormSection legend="Dados da Demanda">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <AsyncSelect
                name="advogadoId"
                label="Advogado Responsável"
                fetchData={advogadosService.listarOpcoes}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <AsyncSelect
                name="estagiarioId"
                label="Estagiário Responsável"
                fetchData={estagiariosService.listarOpcoes}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <AsyncSelect
                name="professorId"
                label="Professor Orientador"
                fetchData={professoresService.listarOpcoes}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Input name="descricao" label="Descrição da Demanda" />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Input
                name="diasAdicionais"
                label="Dias Adicionais"
                type="number"
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Input
                name="prazoDocumentos"
                label="Prazo para Documentos"
                type="date"
              />
            </Grid.Col>

            {prazoFinal && (
              <Grid.Col span={12}>
                <Text size="sm" c="dimmed" mt="-sm">
                  Prazo final (com dias adicionais):{' '}
                  <Text span fw={600} c="blue">
                    {prazoFinal}
                  </Text>
                </Text>
              </Grid.Col>
            )}

            {modo === 'migrar' && (
              <Grid.Col span={12}>
                <Select
                  name="etapaAtual"
                  label="Etapa Atual"
                  options={opcoesEtapas}
                />
              </Grid.Col>
            )}
          </Grid>
        </FormSection>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : textoBotao}
        </Button>
      </Stack>
    </Form>
  );
}
