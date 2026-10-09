package com.advocacia.estacio.modules.processos;

import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.assistidos.Assistido;
import com.advocacia.estacio.modules.estagiarios.Estagiario;
import com.advocacia.estacio.modules.estagiarios.EstagiarioDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public interface ProcessoDTO {
    @Schema(name = "ParteEnvolvidaRequest")
    record ParteEnvolvidaRequest(
            @NotBlank String nome,
            @NotNull PapelNoProcesso papel,
            String especificacaoPapel
    ) {
        public ParteEnvolvida toEntity() {
            return ParteEnvolvida.builder()
                    .nome(this.nome)
                    .papel(this.papel)
                    .especificacaoPapel(this.especificacaoPapel)
                    .build();
        }
    }

    @Schema(name = "ProcessoCreateRequest")
    record CreateRequest(
            @NotNull Long advogadoId,
            @NotNull Long estagiarioId,
            @NotNull Long assistidoId,
            String numeroProcessoPje,
            AreaDireito areaDireito,
            String assunto,
            String vara,
            Tribunal tribunal,
            LocalDate prazoFinal,
            List<ParteEnvolvidaRequest> partesEnvolvidas
    ) {
        public Processo toEntity(Assistido assistido, Advogado advogado, Estagiario estagiario) {
            Processo processo = Processo.builder()
                    .prazoFinal(prazoFinal)
                    .status(ProcessoStatus.TRAMITANDO)
                    .assistido(assistido)
                    .estagiario(estagiario)
                    .advogado(advogado)
                    .vara(vara)
                    .assunto(assunto)
                    .tribunal(tribunal)
                    .areaDireito(areaDireito)
                    .numeroProcessoPje(numeroProcessoPje)
                    .build();

            if(this.partesEnvolvidas != null) {
                this.partesEnvolvidas.forEach(reqParte -> {
                    processo.adicionarParteEnvolvida(reqParte.toEntity());
                });
            }
            return processo;
        }
    }

    @Schema(name = "ProcessoResponse")
    record Response(
            Long id,
            String numeroProcesso,
            String numeroProcessoPje,
            AreaDireito areaDireito,
            String assunto,
            ProcessoStatus processoStatus,
            LocalDate prazoFinal,
            Long advogadoId,
            String advogadoNome,
            Long assistidoId,
            String assistidoNome,
            Long estagiarioId,
            String estagiarioNome,
            List<ParteEnvolvida> partesEnvolvidas
    ){
        public Response(Processo processo) {
            this(
                    processo.getId(),
                    processo.getNumeroProcesso(),
                    processo.getNumeroProcessoPje(),
                    processo.getAreaDireito(),
                    processo.getAssunto(),
                    processo.getStatus(),
                    processo.getPrazoFinal(),
                    processo.getAdvogado().getId(),
                    processo.getAdvogado().getPessoa().getNome(),
                    processo.getAssistido().getId(),
                    processo.getAssistido().getPessoa().getNome(),
                    processo.getEstagiario().getId(),
                    processo.getEstagiario().getPessoa().getNome(),
                    processo.getPartesEnvolvidas()
            );
        }
    }

    @Schema(name = "ProcessoListResponse")
    record ListResponse(
            Long id,
            String numeroProcesso,
            String statusDoProcesso,
            String nomeAssistido,
            LocalDate prazoFinal
    ) {}
}
