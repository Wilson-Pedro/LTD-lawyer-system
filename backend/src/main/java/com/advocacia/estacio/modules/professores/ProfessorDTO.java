package com.advocacia.estacio.modules.professores;

import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.usuarios.Usuario;
import com.advocacia.estacio.modules.usuarios.UsuarioStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public interface ProfessorDTO {
    @Schema(name = "ProfessorCreateRequest")
    record CreateRequest(
            @NotBlank(message = "O nome é obrigatório") String nome,
            @Email(message = "Informe um email válido") String email,
            String senha,
            @Pattern(regexp = "^\\d{8,11}$", message = "Informe um número de telefone válido")
            String telefone
    ) {
        public Professor toEntity(Usuario usuario) {
            Pessoa pessoa = Pessoa.builder()
                    .nome(nome)
                    .email(email)
                    .telefone(telefone)
                    .build();

            pessoa.vincularUsuario(usuario);

            return Professor.builder()
                    .pessoa(pessoa)
                    .build();
        }
    }

    @Schema(name = "ProfessorResponse")
    record Response(
            Long id,
            String nome,
            String email,
            String telefone,
            String usuarioStatus,
            LocalDateTime criadoEm,
            LocalDateTime desativadoEm
    ) {
        public Response (Professor professor) {
            this(
                    professor.getId(),
                    professor.getPessoa().getNome(),
                    professor.getPessoa().getEmail(),
                    professor.getPessoa().getTelefone(),
                    UsuarioStatus.obterDescricao(professor.getPessoa().getUsuario().getStatus()),
                    professor.getPessoa().getCriadoEm(),
                    professor.getPessoa().getUsuario().getDesativadoEm()
            );
        }
    }

    @Schema(name = "ProfessorListResponse")
    record ListResponse(
            Long id,
            String nome,
            String email,
            String telefone,
            String status
    ) {
        public ListResponse(Professor professor) {
            this(
                    professor.getId(),
                    professor.getPessoa().getNome(),
                    professor.getPessoa().getEmail(),
                    professor.getPessoa().getTelefone(),
                    UsuarioStatus.obterDescricao(professor.getPessoa().getUsuario().getStatus())
            );
        }
    }

    @Schema(name = "ProfessorSearchFilter")
    record SearchFilter(
            String nome,
            UsuarioStatus status){}

    @Schema(name = "ProfessorOptionResponse")
    record OptionResponse(
            Long id,
            String nome
    ) {}

    @Schema(name = "ProfessorUpdateRequest")
    record UpdateRequest(
            String nome,
            @Pattern(regexp = "^\\d{9,11}$") String telefone
    ) {}
}
