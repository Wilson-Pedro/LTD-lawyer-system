package com.advocacia.estacio.modules.auth;

import com.advocacia.estacio.modules.usuarios.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authService;

	@PostMapping("/login")
	public ResponseEntity<AuthDTO.LoginResponse> login(@RequestBody @Valid AuthDTO.LoginRequest dto) {
		return ResponseEntity.ok(authService.login(dto));
	}

	// TODO: esqueci senha
}
