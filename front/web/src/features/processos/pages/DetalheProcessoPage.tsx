import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Processo } from '../types';
import { processosService } from '../services/processosService';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  DetailField,
  DetailHeader,
  DetailSection,
  DetailShell,
} from '@/components/ui/detail';
import { paths } from '@/routes/paths';
import { Button } from '@mantine/core';
import { formatarData } from '@/utils/formatters';
import {
  areaDireitoLabel,
  processoStatusLabel,
  tribunalLabel,
} from '../constants';

export default function DetalheProcessoPage() {
  const { id } = useParams<{ id: string }>();

  const [processo, setProcesso] = useState<Processo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function carregar() {
    if (!id) return;
    setIsLoading(true);
    processosService
      .buscarPorId(Number(id))
      .then(setProcesso)
      .finally(() => setIsLoading(false));
  }

  useEffect(carregar, [id]);

  if (isLoading) return <LoadingState />;
  if (!processo) return <EmptyState />;

  return (
    <DetailShell>
      <DetailHeader
        title={`Processo ${processo.numeroProcesso}`}
        breadcrumbs={[
          { label: 'Início', link: paths.home },
          { label: 'Processos', link: paths.processos.lista },
          { label: `Processo ${processo.numeroProcesso}` },
        ]}
      />

      <DetailSection title="Informações Gerais">
        <DetailField
          label="Número do Processo"
          value={processo.numeroProcesso}
        />
        <DetailField
          label="Número Pje do Processo"
          value={processo.numeroProcessoPje}
        />

        <DetailField
          label="Prazo Final"
          value={formatarData(processo.prazoFinal)}
        />

        <DetailField label="Estagiário" value={processo.estagiarioNome} />
        <DetailField label="Advogado" value={processo.advogadoNome} />
        <DetailField label="Assistido" value={processo.assistidoNome} />

        <DetailField
          label="Área do Direito"
          value={areaDireitoLabel[processo.areaDireito]}
        />
        <DetailField
          label="Tribunal"
          value={tribunalLabel[processo.tribunal]}
        />
        <DetailField label="Vara" value={processo.vara} />
        <DetailField label="Assunto" value={processo.assunto} />

        <DetailField
          label="Status"
          value={processoStatusLabel[processo.status]}
        />

        <DetailField
          label="Criado em"
          value={formatarData(processo.criadoEm)}
        />

        <DetailField
          label="Última atualização"
          value={formatarData(processo.atualizadoEm)}
        />
      </DetailSection>
    </DetailShell>
  );
}
