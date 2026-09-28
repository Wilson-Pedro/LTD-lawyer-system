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
import { Tabs } from '@mantine/core';
import { DetailSection } from '@/components/ui/detail/DetailSection';
import { DetailField } from '@/components/ui/detail/DetailField';
import { etapaDemandaColor, etapaDemandaLabel } from '../constants';
import { formatarData } from '@/utils/formatters';
import { TramitacaoTimeline } from '../components/TramitacaoTimeline';

export default function DetalheDeamandaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [demanda, setDemanda] = useState<Demanda | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [tabAtiva, setTabAtiva] = useState('dados');
  const [tramitacoes, setTramitacoes] = useState<Tramitacao[] | null>(null);

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
        badges={[
          {
            label: tempestividadeLabel[demanda.tempestividade],
            color: tempestividadeColor[demanda.tempestividade],
            variant: 'light',
          },
          {
            label: etapaDemandaLabel[demanda.etapaAtual],
            color: etapaDemandaColor[demanda.etapaAtual],
            variant: 'light',
          },
        ]}
      />
      <Tabs value={tabAtiva} onChange={(value) => setTabAtiva(value as string)}>
        <Tabs.List mb={'md'}>
          <Tabs.Tab value="dados">Dados</Tabs.Tab>
          <Tabs.Tab value="tramitacoes">Tramitações</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="dados">
          <DetailSection title="Informações Gerais">
            <DetailField label="Descrição" value={demanda.descricao} />

            <DetailField
              label="Etapa Atual"
              value={etapaDemandaLabel[demanda.etapaAtual]}
            />

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
    </DetailShell>
  );
}
