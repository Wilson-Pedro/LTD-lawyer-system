package com.advocacia.estacio.modules.auth;

import com.advocacia.estacio.modules.usuarios.UsuarioRole;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public interface AuthDTO {
    record LoginRequest(
            @NotBlank  String login,
            @NotBlank String password
    ) {}

    record LoginResponse(
            String token,
            String tipo,
            Long id,
            String login,
            UsuarioRole role,
            Instant expiraEm
    ) {}
}
