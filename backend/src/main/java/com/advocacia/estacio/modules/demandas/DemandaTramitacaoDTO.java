package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.usuarios.UsuarioRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public interface DemandaTramitacaoDTO {

    @Schema(name = "DemandaTramitacaoCreateRequest")
    record CreateRequest(
            @NotNull  TipoTramitacao tipoTramitacao,
            String observacoes,
            String linkAnexo
    ) {
        public DemandaTramitacao toEntity(Pessoa responsavel) {
            return DemandaTramitacao.builder()
                    .responsavel(responsavel)
                    .tipoTramitacao(this.tipoTramitacao)
                    .observacoes(this.observacoes)
                    .linkAnexo(this.linkAnexo)
                    .build();
        }
    }

    @Schema(name = "DemandaTramitacaoResponse")
    record Response(
            Long id,
            Long demandaId,
            String responsavelNome,
            String responsavelRole,
            TipoTramitacao tipoTramitacao,
            String observacoes,
            LocalDateTime criadaEm,
            EtapaDemanda etapaAtualDaDemanda
    ) {
        public Response(DemandaTramitacao tramitacao) {
            this(
                    tramitacao.getId(),
                    tramitacao.getDemanda().getId(),
                    tramitacao.getResponsavel().getNome(),
                    UsuarioRole.obterDescricao(tramitacao.getResponsavel().getUsuario().getRole()),
                    tramitacao.getTipoTramitacao(),
                    tramitacao.getObservacoes(),
                    tramitacao.getCriadoEm(),
                    tramitacao.getDemanda().getEtapaAtual()
            );
        }
    }
}
