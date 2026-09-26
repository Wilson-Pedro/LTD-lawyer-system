import { useNavigate } from 'react-router-dom';

import { notifications } from '@mantine/notifications';
import { Container } from '@mantine/core';

import { paths } from '@/routes/paths';
import { PageHeader } from '@/components/ui/PageHeader';

import { DemandaForm } from '../components/DemandaForm';
import { demandasService } from '../services/demandasService';
import { MigrarDemandaRequest } from '../schema';
import { etapaDemandaLabel } from '../constants';

export default function MigrarDemandaPage() {
  const navigate = useNavigate();

  const opcoesEtapas = Object.entries(etapaDemandaLabel).map(
    ([value, label]) => ({ value, label }),
  );

  async function handleSalvar(dados: MigrarDemandaRequest) {
    await demandasService.migrar(dados);
    notifications.show({
      message: 'Demanda registrada com sucesso',
      color: 'green',
    });
    navigate(paths.demandas.lista);
  }

  return (
    <Container pos="relative">
      <PageHeader title="Adicionar Demanda Existente" />

      <DemandaForm
        modo="migrar"
        onSubmit={handleSalvar}
        opcoesEtapas={opcoesEtapas}
      />
    </Container>
  );
}
