package com.advocacia.estacio.modules.estagiarios;

import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.usuarios.Usuario;
import com.advocacia.estacio.modules.usuarios.UsuarioStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public interface EstagiarioDTO {
    @Schema(name = "EstagiarioCreateRequest")
    record CreateRequest(
            @NotBlank(message = "O nome é obrigatório") String nome,
            @Email String email,
            @Pattern(regexp = "^\\d{9,11}$") String telefone,
            String senha,
            @NotBlank String matricula,
            @NotNull(message = "O período do estágio é obrigatório") PeriodoEstagio periodoEstagio
    ) {
        public Estagiario toEntity(Usuario usuario) {
            Pessoa pessoa = Pessoa.builder()
                    .nome(this.nome)
                    .email(this.email)
                    .telefone(this.telefone)
                    .build();

            return Estagiario.builder()
                    .pessoa(pessoa)
                    .matricula(this.matricula)
                    .periodo(this.periodoEstagio)
                    .build();
        }
    }

    @Schema(name = "EstagiarioResponse")
    record Response(
            Long id,
            String matricula,
            String nome,
            String email,
            String telefone,
            String periodoEstagio,
            LocalDateTime criacao
    ) {
        public Response(Estagiario estagiario) {
            this(
                    estagiario.getId(),
                    estagiario.getMatricula(),
                    estagiario.getPessoa().getNome(),
                    estagiario.getPessoa().getEmail(),
                    estagiario.getPessoa().getTelefone(),
                    PeriodoEstagio.obterDescricao(estagiario.getPeriodo()),
                    estagiario.getPessoa().getCriadoEm()
            );
        }
    }

    @Schema(name = "EstagiarioListResponse")
    record ListResponse(
            Long id,
            String matricula,
            String nome,
            String periodoEstagio,
            String usuarioStatus
    ) {
        public ListResponse(Estagiario estagiario) {
            this(
                    estagiario.getId(),
                    estagiario.getMatricula(),
                    estagiario.getPessoa().getNome(),
                    PeriodoEstagio.obterDescricao(estagiario.getPeriodo()),
                    UsuarioStatus.obterDescricao(estagiario.getPessoa().getUsuario().getStatus())
            );
        }
    }

    @Schema(name = "EstagiarioOptionResponse")
    record OptionResponse(
            Long id,
            String nome
    ) {}

    @Schema(name = "EstagiarioSearchFilter")
    record SearchFilter(
            String nome,
            String matricula,
            String periodoEstagio,
            String usuarioStatus
    ) {}

    @Schema(name = "EstagiarioUpdateRequest")
    record UpdateRequest(
            String nome,
            @Pattern(regexp = "^\\d{9,11}$") String telefone,
            @NotBlank String matricula,
            PeriodoEstagio periodoEstagio
    ) {}
}
