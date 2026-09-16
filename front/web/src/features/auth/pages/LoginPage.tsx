import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, UseFormSetError } from 'react-hook-form';
import { notifications } from '@mantine/notifications';
import { Paper, Title, Stack, Image } from '@mantine/core';

import { Form } from '@/components/ui/Form';
import { tratarErrosBackend } from '@/utils/errorHelper';
import { paths } from '@/routes/paths';
import balancaLogo from '@/assets/images/Balanca-da-justica.png';

import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<LoginRequest>({
    // resolver: zodResolver(estagiarioSchema)
  });

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
      <Paper shadow="sm" p="xl" w={360} radius="md">
        <Image
          src={balancaLogo}
          alt="Balança da Justiça"
          w={80}
          mx="auto"
          mb="md"
          radius="md"
        />
        <Title order={3} ta="center" mb="lg">
          Núcleo Jurídico
        </Title>

        <Form methods={methods} onSubmit={handleSalvar}>
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
