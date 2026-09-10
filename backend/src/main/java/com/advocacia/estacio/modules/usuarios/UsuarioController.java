package com.advocacia.estacio.modules.usuarios;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @PatchMapping("{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, UsuarioStatus usuarioStatus) {
        usuarioService.alterarStatus(id, usuarioStatus);
        return ResponseEntity.noContent().build();
    }

    // TODO: redefinir senha
}
