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
            @NotNull LocalDate prazoDocumentos
    ) {
        public Demanda toEntity(Advogado advogado, Estagiario estagiario, Professor professor) {
            LocalDate prazoFinal = this.prazoDocumentos.plusDays(this.diasAdicionais);

            return Demanda.builder()
                    .advogado(advogado)
                    .estagiario(estagiario)
                    .professor(professor)
                    .descricao(this.descricao)
                    .prazo(prazoFinal)
                    .prazoDocumentos(this.prazoDocumentos)
                    .build();
        }
    }

    // Para demandas que já existem no mundo real.
    @Schema(name = "DemandaImportacaoRequest")
    record ImportacaoRequest(
            @NotNull Long advogadoId,
            @NotNull Long estagiarioId,
            @NotNull Long professorId,
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
                    .prazo(prazoFinal)
                    .prazoDocumentos(this.prazoDocumentos)
                    .etapaAtual(this.etapaAtual)
                    .build();
        }
    }

    @Schema(name = "DemandaResponse")
    record Response(
            Long id,
            String descricaoDemanda,
            LocalDate prazo,
            LocalDateTime dataAbertura
    ) {
        public Response(Demanda demanda) {
            this(
                    demanda.getId(),
                    demanda.getDescricao(),
                    demanda.getPrazo(),
                    demanda.getDataAbertura()
            );
        }
    }

    @Schema(name = "DemandaListResponse")
    record ListResponse(
            Long id,
            String descricaoDemanda,
            LocalDate prazo,
            String nomeEstagiario,
            String nomeProfessor
    ) {
        public ListResponse(Demanda demanda) {
            this( demanda.getId(),
                    demanda.getDescricao(),
                    demanda.getPrazo(),
                    demanda.getEstagiario().getPessoa().getNome(),
                    demanda.getProfessor().getPessoa().getNome()
            );
        }
    }

    @Schema(name = "DemandaSearchFilter")
    record SearchFilter(
            EtapaDemanda status,
            Tempestividade tempestividade
    ) {}
}
