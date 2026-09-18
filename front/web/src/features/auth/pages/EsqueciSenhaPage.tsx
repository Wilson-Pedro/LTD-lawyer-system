import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Title, Text, Anchor } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useZodForm } from '@/hooks/useZodForm';
import { authService } from '../services/authService';
import { esqueciSenhaSchema, EsqueciSenhaRequest } from '../schema';
import { paths } from '@/routes/paths';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function EsqueciSenhaPage() {
  const methods = useZodForm(esqueciSenhaSchema);
  const [enviado, setEnviado] = useState(false);

  async function handleSalvar(dados: EsqueciSenhaRequest) {
    await authService.esqueciSenha(dados);
    setEnviado(true);
  }

  return (
    <AuthLayout>
      <Title order={3} ta="center" mb="xs">
        Esqueci minha senha
      </Title>

      {enviado ? (
        <Text size="sm" c="dimmed" ta="center">
          Se o e-mail informado estiver cadastrado, você receberá um link para
          redefinir sua senha em instantes.
        </Text>
      ) : (
        <>
          <Text size="sm" c="dimmed" ta="center" mb="md">
            Informe seu e-mail de login para receber o link de redefinição.
          </Text>
          <Form methods={methods} onSubmit={handleSalvar}>
            <Input name="login" label="E-mail" />
            <Button type="submit" fullWidth mt="sm">
              Enviar link
            </Button>
          </Form>
        </>
      )}

      <Anchor
        component={Link}
        to={paths.login}
        size="sm"
        ta="center"
        display="block"
        mt="md"
      >
        Voltar ao login
      </Anchor>
    </AuthLayout>
  );
}
