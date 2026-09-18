import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { Title, Center, Loader } from '@mantine/core';
import { EstagiarioForm } from '../components/EstagiarioForm';
import { estagiariosService } from '../services/estagiariosService';
import { Estagiario, periodoEstagioLabel } from '../types';
import { paths } from '@/routes/paths';
import { AtualizarEstagiarioRequest } from '../schema';

function paraValoresDoForm(estagiario: Estagiario) {
  return {
    nome: estagiario.pessoa.nome,
    telefone: estagiario.pessoa.telefone,
    matricula: estagiario.matricula,
    periodoEstagio: estagiario.periodoEstagio,
  };
}

export default function EditarEstagiarioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [estagiario, setEstagiario] = useState<Estagiario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const periodosOptions = Object.entries(periodoEstagioLabel).map(
    ([value, label]) => ({ value, label }),
  );

  useEffect(() => {
    if (!id) return;

    estagiariosService
      .buscarPorId(Number(id))
      .then(setEstagiario)
      .finally(() => setIsLoading(false));
  }, [id]);

  async function handleSalvar(dados: AtualizarEstagiarioRequest) {
    await estagiariosService.atualizar(Number(id), dados);
    notifications.show({
      message: 'Estagiário atualizado com sucesso',
      color: 'green',
    });
    navigate(paths.estagiarios.lista);
  }

  if (isLoading) {
    return (
      <Center py={64}>
        <Loader color="institucional" />
      </Center>
    );
  }

  if (!estagiario) {
    return <Center py={64}>Estagiário não encontrado.</Center>;
  }

  return (
    <div>
      <Title order={3} mb="lg">
        Editar Estagiário
      </Title>
      <EstagiarioForm
        modo="editar"
        valoresIniciais={paraValoresDoForm(estagiario)}
        onSubmit={handleSalvar}
        periodos={periodosOptions}
      />
    </div>
  );
}
