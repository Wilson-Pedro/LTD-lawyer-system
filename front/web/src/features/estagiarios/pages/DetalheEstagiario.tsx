import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { usePermission } from '@/features/auth/hooks/usePermission';
import { estagiariosService } from '../services/estagiariosService';
import { Estagiario } from '../types';
import { usuarioStatusLabel, USUARIO_STATUS } from '@/constants/usuarioStatus';

import { DetailHeader } from '@/components/ui/detail/DetailHeader';
import { DetailSection } from '@/components/ui/detail/DetailSection';
import { DetailField } from '@/components/ui/detail/DetailField';
import { periodoEstagioLabel } from '../constants';
import { DetailShell } from '@/components/ui/detail/DetailShell';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';

const statusColor: Record<string, string> = {
  [USUARIO_STATUS.ATIVO]: 'green',
  [USUARIO_STATUS.INATIVO]: 'yellow',
  [USUARIO_STATUS.BLOQUEADO]: 'red',
};

export default function DetalheEstagiarioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [estagiario, setEstagiario] = useState<Estagiario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const podeEditar = usePermission('estagiarios:editar');
  //   const podeAlterarStatus = usePermission('estagiarios:alterarStatus');

  function carregar() {
    if (!id) return;
    setIsLoading(true);
    estagiariosService
      .buscarPorId(Number(id))
      .then(setEstagiario)
      .finally(() => setIsLoading(false));
  }

  useEffect(carregar, [id]);

  // const { confirmar } = useAlterarStatus({
  //   alterarFn: (status) =>
  //     estagiariosService.alterarStatus(estagiario.id, status),
  //   onSuccess: carregar,
  // });

  // <Button
  //   onClick={() =>
  //     confirmar({
  //       ativo,
  //       novoStatus: ativo ? USUARIO_STATUS.BLOQUEADO : USUARIO_STATUS.ATIVO,
  //     })
  //   }
  // >
  //   {ativo ? 'Bloquear' : 'Ativar'}
  // </Button>;

  if (isLoading) return <LoadingState />;

  if (!estagiario) return <EmptyState />;

  const ativo = estagiario.usuario.status === USUARIO_STATUS.ATIVO;

  return (
    <DetailShell>
      <DetailHeader
        title={estagiario.pessoa.nome}
        badges={[
          {
            label: usuarioStatusLabel[estagiario.usuario.status],
            color: statusColor[estagiario.usuario.status],
          },
        ]}
      />
      <DetailSection title="Dados Pessoais">
        <DetailField label="Telefone" value={estagiario.pessoa.telefone} />
        <DetailField
          label="Email para contato"
          value={estagiario.pessoa.email}
        />
      </DetailSection>

      <DetailSection title="Dados Acadêmicos">
        <DetailField label="Matrícula" value={estagiario.matricula} />
        <DetailField
          label="Período"
          value={periodoEstagioLabel[estagiario.periodoEstagio]}
        />
      </DetailSection>

      <DetailSection title="Acesso ao Sistema">
        <DetailField label="Login" value={estagiario.usuario.login} />
        <DetailField
          label="Criado em"
          value={new Date(estagiario.usuario.criadoEm).toLocaleDateString(
            'pt-BR',
          )}
        />
      </DetailSection>
    </DetailShell>
  );
}
