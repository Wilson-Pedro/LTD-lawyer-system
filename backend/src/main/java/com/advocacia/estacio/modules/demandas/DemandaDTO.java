package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.estagiarios.Estagiario;
import com.advocacia.estacio.modules.professores.Professor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface DemandaDTO {
    @Schema(name = "DemandaCreateRequest")
    record Request(
            @NotNull Long advogadoId,
            @NotNull Long estagiarioId,
            @NotNull Long professorId,
            @Schema(example = "Cliente sofreu acidente de trânsito e a seguradora se recusa a pagar.")
            @NotBlank String descricao,
            @NotNull Integer diasAdicionais,
            @NotNull LocalDate prazoDocumentos,
            @NotNull EtapaDemanda etapaAtual
    ) {
        public Demanda toEntity(Advogado advogado, Estagiario estagiario, Professor professor) {
            LocalDate prazoFinal = this.prazoDocumentos.plusDays(this.diasAdicionais);

            return Demanda.builder()
                    .advogado(advogado)
                    .estagiario(estagiario)
                    .professor(professor)
                    .descricao(this.descricao)
                    .prazoFinal(prazoFinal)
                    .prazoDocumentos(this.prazoDocumentos)
                    .etapaAtual(this.etapaAtual)
                    .build();
        }
    }

    @Schema(name = "DemandaResponse")
    record Response(
            Long id,
            String descricao,
            LocalDate prazoFinal,
            LocalDate prazoDocumentacao,
            EtapaDemanda etapaAtual,
            Tempestividade tempestividade,
            LocalDateTime dataAbertura,
            LocalDateTime ultimaAtualizacao
    ) {
        public Response(Demanda demanda) {
            this(
                    demanda.getId(),
                    demanda.getDescricao(),
                    demanda.getPrazoFinal(),
                    demanda.getPrazoDocumentos(),
                    demanda.getEtapaAtual(),
                    demanda.getTempestividade(),
                    demanda.getDataAbertura(),
                    demanda.getUltimaAtualizacao()
            );
        }
    }

    @Schema(name = "DemandaListResponse")
    record ListResponse(
            Long id,
            String descricao,
            LocalDate prazoFinal,
            LocalDate prazoDocumentacao,
            String nomeAdvogado,
            String nomeEstagiario,
            String nomeProfessor,
            EtapaDemanda etapaAtual,
            Tempestividade tempestividade
    ) {
        public ListResponse(Demanda demanda) {
            this( demanda.getId(),
                    demanda.getDescricao(),
                    demanda.getPrazoFinal(),
                    demanda.getPrazoDocumentos(),
                    demanda.getAdvogado().getPessoa().getNome(),
                    demanda.getEstagiario().getPessoa().getNome(),
                    demanda.getProfessor().getPessoa().getNome(),
                    demanda.getEtapaAtual(),
                    demanda.getTempestividade()
            );
        }
    }

    @Schema(name = "DemandaSearchFilter")
    record SearchFilter(
            EtapaDemanda etapaAtual,
            Tempestividade tempestividade
    ) {}
}
