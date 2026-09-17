import { useNavigate } from 'react-router-dom';

import { notifications } from '@mantine/notifications';
import { Container, Title } from '@mantine/core';

import { paths } from '@/routes/paths';

import { AdvogadoForm } from '../components/AdvogadoForm';
import { advogadosService } from '../services/advogadosService';
import { CriarAdvogadoRequest } from '../schema';

export default function CriarAdvogadoPage() {
  const navigate = useNavigate();

  async function handleSalvar(dados: CriarAdvogadoRequest) {
    await advogadosService.criar(dados);
    notifications.show({
      message: 'Advogado cadastrado com sucesso',
      color: 'green',
    });
    navigate(paths.advogados.lista);
  }

  return (
    <Container>
      <Title order={3} mb="lg">
        Novo Advogado
      </Title>
      <AdvogadoForm modo="criar" onSubmit={handleSalvar} />
    </Container>
  );
}
