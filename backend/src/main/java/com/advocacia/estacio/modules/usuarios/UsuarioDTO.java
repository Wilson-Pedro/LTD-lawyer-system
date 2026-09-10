package com.advocacia.estacio.modules.usuarios;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public interface UsuarioDTO {

    @Schema(name = "UsuarioCreateRequest")
    record CreateRequest(
            @NotBlank String login,
            @NotBlank String password
    ) {}

    @Schema(name = "UsuarioResponse")
    record Response(
            Long id,
            String login,
            String role,
            String usuarioStatus,
            LocalDateTime criadoEm,
            LocalDateTime desativadoEm
    ) {
        public Response(Usuario usuario) {
            this(
                    usuario.getId(),
                    usuario.getLogin(),
                    UsuarioRole.obterDescricao(usuario.getRole()),
                    UsuarioStatus.obterDescricao(usuario.getStatus()),
                    usuario.getCriadoEm(),
                    usuario.getDesativadoEm()
            );
        }
    }

    record UpdateRequest(
            String login,
            UsuarioRole role,
            UsuarioStatus status
    ) {}

    record ResetPasswordRequest(
            @NotBlank String login,
            @NotBlank String novaSenha
    ) {}
}
