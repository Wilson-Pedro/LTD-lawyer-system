import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Demanda, Tramitacao } from '../types';
import { demandasService } from '../services/demandasService';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { DetailShell } from '@/components/ui/detail/DetailShell';
import { DetailHeader } from '@/components/ui/detail/DetailHeader';
import {
  tempestividadeColor,
  tempestividadeLabel,
} from '@/constants/tempestividade';
import {
  Box,
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
  Divider,
  Group,
  SimpleGrid,
  Spoiler,
  Tabs,
  Text,
} from '@mantine/core';
import { DetailSection } from '@/components/ui/detail/DetailSection';
import { DetailField } from '@/components/ui/detail/DetailField';
import { etapaDemandaColor, etapaDemandaLabel } from '../constants';
import { formatarData } from '@/utils/formatters';
import { TramitacaoTimeline } from '../components/TramitacaoTimeline';
import { Button } from '@/components/ui/Button';
import { useDisclosure } from '@mantine/hooks';
import { AdicionarTramitacaoModal } from '../components/AdicionarTramitacaoModal';

export default function DetalheDeamandaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [demanda, setDemanda] = useState<Demanda | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [tabAtiva, setTabAtiva] = useState('dados');
  const [tramitacoes, setTramitacoes] = useState<Tramitacao[] | null>(null);

  const [modalAberto, { open: abrirModal, close: fecharModal }] =
    useDisclosure(false);

  //   const podeEditar = usePermission('estagiarios:editar');
  //   const podeAlterarStatus = usePermission('estagiarios:alterarStatus');

  function carregar() {
    if (!id) return;
    setIsLoading(true);
    demandasService
      .buscarPorId(Number(id))
      .then(setDemanda)
      .finally(() => setIsLoading(false));
  }

  useEffect(carregar, [id]);

  useEffect(() => {
    if (tabAtiva === 'tramitacoes' && tramitacoes === null && demanda) {
      demandasService
        .listarTramitacoes(demanda.id)
        .then((resposta) => setTramitacoes(resposta.content));
    }
  }, [tabAtiva, tramitacoes, demanda]);

  if (isLoading) return <LoadingState />;

  if (!demanda) return <EmptyState />;

  return (
    <DetailShell>
      <DetailHeader
        title={`Demanda #${demanda.id}`}
        actions={<Button onClick={abrirModal}>Nova Tramitação</Button>}
        badges={[
          {
            label: tempestividadeLabel[demanda.tempestividade],
            color: tempestividadeColor[demanda.tempestividade],
            variant: 'light',
          },
          {
            label: etapaDemandaLabel[demanda.etapaAtual],
            color: etapaDemandaColor[demanda.etapaAtual],
            variant: 'outline',
          },
        ]}
      />
      <Tabs
        value={tabAtiva}
        variant="outline"
        orientation="vertical"
        placement="right"
        onChange={(value) => setTabAtiva(value as string)}
      >
        <Tabs.List mb={'md'} ml={'md'}>
          <Tabs.Tab value="dados">Dados</Tabs.Tab>
          <Tabs.Tab value="tramitacoes">Tramitações</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="dados">
          <DetailSection title="Informações Gerais">
            <DetailField label="Estagiário" value={demanda.estagiarioNome} />
            <DetailField label="Advogado" value={demanda.advogadoNome} />
            <DetailField label="Professor" value={demanda.professorNome} />

            <DetailField
              label="Prazo Final"
              value={formatarData(demanda.prazoFinal)}
            />
            <DetailField
              label="Prazo da Documentação"
              value={formatarData(demanda.prazoDocumentacao)}
            />

            <DetailField
              label="Data de Abertura"
              value={formatarData(demanda.dataAbertura)}
            />

            <Box>
              <Text size="sm" c="dimmed" mb={4}>
                Descrição
              </Text>
              <Spoiler
                maxHeight={42}
                hideLabel="Ocultar"
                showLabel="Mostrar mais"
              >
                <Text size="sm">{demanda.descricao}</Text>
              </Spoiler>
            </Box>
          </DetailSection>
        </Tabs.Panel>

        <Tabs.Panel value="tramitacoes" pt="md">
          {tramitacoes === null ? (
            <LoadingState message="Carregando ..." />
          ) : tramitacoes.length === 0 ? (
            <EmptyState message="Nenhuma tramitação registada para esta demanda." />
          ) : (
            <TramitacaoTimeline tramitacoes={tramitacoes} />
          )}
        </Tabs.Panel>
      </Tabs>
      <AdicionarTramitacaoModal
        opened={modalAberto}
        onClose={fecharModal}
        demandaId={demanda.id}
        onSuccess={() => {
          carregar();
        }}
      />
    </DetailShell>
  );
}
