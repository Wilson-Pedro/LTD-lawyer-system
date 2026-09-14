import { useLocation, useNavigate } from 'react-router-dom';
import { UseFormSetError } from 'react-hook-form';
import { notifications } from '@mantine/notifications';
import { Paper, Title, Stack } from '@mantine/core';

import { Input, Button, Form } from '@/components/ui/Form';
import { tratarErrosBackend } from '@/utils/errorHelper';
import { paths } from '@/routes/paths';

import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from?.pathname || paths.home;

  const handleSalvar = async (
    dados: LoginRequest,
    setError: UseFormSetError<LoginRequest>,
  ) => {
    try {
      await login(dados);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error(error);

      const mensagem = tratarErrosBackend(error, setError);
      if (mensagem) {
        notifications.show({ message: mensagem, color: 'red' });
      }
    }
  };

  return (
    <Stack align="center" justify="center" mih="100vh" bg="gray.0">
      <Paper withBorder shadow="sm" p="xl" w={360} radius="md">
        <Title order={3} ta="center" mb="lg">
          Núcleo Jurídico
        </Title>

        <Form<LoginRequest> onSubmit={handleSalvar}>
          <Input name="login" label="Email" />
          <Input name="password" label="Senha" type="password" />

          <Button type="submit" fullWidth mt="sm">
            Entrar
          </Button>
        </Form>
      </Paper>
    </Stack>
  );
}
