import { Timeline, Text, Group, Badge, Paper } from '@mantine/core';
import { IconArrowRight, IconMessage } from '@tabler/icons-react';
import { Tramitacao } from '../types';
import { etapaDemandaLabel } from '../constants';
import { EmptyState } from '@/components/ui/EmptyState';

interface TramitacaoTimelineProps {
  tramitacoes: Tramitacao[];
}

export function TramitacaoTimeline({ tramitacoes }: TramitacaoTimelineProps) {
  if (tramitacoes.length === 0) {
    return <EmptyState />;
  }

  const ordenadas = [...tramitacoes].sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );

  return (
    <Timeline
      active={ordenadas.length}
      bulletSize={24}
      lineWidth={2}
      color="institucional"
    >
      {ordenadas.map((t) => (
        <Timeline.Item
          key={t.id}
          bullet={<IconArrowRight size={12} />}
          title={
            <Group gap={6} wrap="nowrap">
              <Text fw={500} size="sm">
                {t.nomeResponsavel}
              </Text>
              <Badge size="xs" variant="light" color="institucional">
                {t.nomeResponsavel}
              </Badge>
            </Group>
          }
        >
          {/* <Group gap={6} mb={4}>
            {t.etapaAnterior && (
              <>
                <Badge size="sm" variant="outline" color="gray">
                  {etapaDemandaLabel[t.etapaAnterior]}
                </Badge>
                <IconArrowRight size={12} color="var(--mantine-color-gray-5)" />
              </>
            )}
            <Badge size="sm" color="institucional">
              {etapaDemandaLabel[t.etapaNova]}
            </Badge>
          </Group> */}

          {t.observacoes && (
            <Paper withBorder p="xs" radius="sm" mt={4} bg="gray.0">
              <Group gap={6} align="flex-start" wrap="nowrap">
                <IconMessage
                  size={14}
                  color="var(--mantine-color-gray-5)"
                  style={{ marginTop: 2 }}
                />
                <Text size="sm" c="dimmed">
                  {t.observacoes}
                </Text>
              </Group>
            </Paper>
          )}

          <Text size="xs" c="dimmed" mt={4}>
            {new Date(t.criadoEm).toLocaleString('pt-BR')}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
