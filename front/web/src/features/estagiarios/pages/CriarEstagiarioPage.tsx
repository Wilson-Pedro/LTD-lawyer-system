import { useNavigate } from 'react-router-dom';
import { UseFormSetError } from 'react-hook-form';

import { notifications } from '@mantine/notifications';
import { Container, Title } from '@mantine/core';

import { paths } from '@/routes/paths';
import { tratarErrosBackend } from '@/utils/errorHelper';

import { EstagiarioForm } from '../components/EstagiarioForm';
import { estagiariosService } from '../services/estagiariosService';
import {
  CriarEstagiarioRequest,
  PeriodoEstagio,
  periodoEstagioLabel,
} from '../types';

export default function CriarEstagiarioPage() {
  const navigate = useNavigate();

  const periodosOptions = Object.values(PeriodoEstagio).map((valorEnum) => ({
    value: valorEnum,
    label: periodoEstagioLabel[valorEnum as PeriodoEstagio],
  }));

  async function handleSalvar(
    dados: CriarEstagiarioRequest,
    setError: UseFormSetError<CriarEstagiarioRequest>,
  ) {
    try {
      await estagiariosService.criar(dados);
      notifications.show({
        message: 'Estagiário cadastrado com sucesso',
        color: 'green',
      });
      navigate(paths.estagiarios.lista);
    } catch (error: any) {
      tratarErrosBackend(error, setError);

      notifications.show({
        message: 'Erro ao cadastrar estagiário',
        color: 'red',
      });
    }
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
