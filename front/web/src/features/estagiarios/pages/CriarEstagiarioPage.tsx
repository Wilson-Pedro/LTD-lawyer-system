import { useNavigate } from 'react-router-dom';

import { notifications } from '@mantine/notifications';
import { Container, Title } from '@mantine/core';

import { paths } from '@/routes/paths';

import { EstagiarioForm } from '../components/EstagiarioForm';
import { estagiariosService } from '../services/estagiariosService';
import { PeriodoEstagio, periodoEstagioLabel } from '../types';
import { CriarEstagiarioRequest } from '../schema';

export default function CriarEstagiarioPage() {
  const navigate = useNavigate();

  const periodosOptions = Object.values(PeriodoEstagio).map((valorEnum) => ({
    value: valorEnum,
    label: periodoEstagioLabel[valorEnum as PeriodoEstagio],
  }));

  async function handleSalvar(dados: CriarEstagiarioRequest) {
    await estagiariosService.criar(dados);
    notifications.show({
      message: 'Estagiário cadastrado com sucesso',
      color: 'green',
    });
    navigate(paths.estagiarios.lista);
  }

  return (
    <Container>
      <Title order={3} mb="lg">
        Novo Estagiário
      </Title>
      <EstagiarioForm
        modo="criar"
        onSubmit={handleSalvar}
        periodos={periodosOptions}
      />
    </Container>
  );
}
