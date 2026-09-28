// hooks/useAlterarStatus.ts
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { Text } from '@mantine/core';

interface UseAlterarStatusOptions {
  alterarFn: (novoStatus: string) => Promise<void>;
  onSuccess: () => void;
}

export function useAlterarStatus({
  alterarFn,
  onSuccess,
}: UseAlterarStatusOptions) {
  function confirmar({
    ativo,
    novoStatus,
    tituloAtivar = 'Ativar',
    tituloBloquear = 'Bloquear',
    mensagemAtivar = 'O acesso será restaurado. Deseja continuar?',
    mensagemBloquear = 'O acesso será removido imediatamente. Deseja continuar?',
  }: {
    ativo: boolean;
    novoStatus: string;
    tituloAtivar?: string;
    tituloBloquear?: string;
    mensagemAtivar?: string;
    mensagemBloquear?: string;
  }) {
    modals.openConfirmModal({
      title: ativo ? tituloBloquear : tituloAtivar,
      children: (
        <Text size="sm">{ativo ? mensagemBloquear : mensagemAtivar}</Text>
      ),
      labels: {
        confirm: ativo ? tituloBloquear : tituloAtivar,
        cancel: 'Cancelar',
      },
      confirmProps: { color: ativo ? 'red' : 'green' },
      onConfirm: async () => {
        await alterarFn(novoStatus);
        notifications.show({
          message: 'Status atualizado com sucesso',
          color: 'green',
        });
        onSuccess();
      },
    });
  }

  return { confirmar };
}
