import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Paper, Title, Stack, Image, Anchor } from '@mantine/core';

import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { paths } from '@/routes/paths';
import balancaLogo from '@/assets/images/Balanca-da-justica.png';

import { useAuth } from '../hooks/useAuth';

import { LoginRequest, loginSchema } from '../schema';
import { useZodForm } from '@/hooks/useZodForm';

export default function LoginPage() {
  const methods = useZodForm(loginSchema);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from?.pathname || paths.home;

  const handleSalvar = async (dados: LoginRequest) => {
    await login(dados);
    navigate(from, { replace: true });
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

          <Anchor
            component={Link}
            to={paths.esqueciSenha}
            size="sm"
            ta="center"
            display="block"
            mt="md"
          >
            Esqueci minha senha
          </Anchor>
        </Form>
      </Paper>
    </Stack>
  );
}
