package com.advocacia.estacio.modules.assistidos;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/assistidos")
@PreAuthorize("hasRole('ADMIN')")
public class AssistidoController {
	
	@Autowired
	AssistidoService assistidoService;

	@PostMapping
	public ResponseEntity<AssistidoDTO.Response> cadastrar(
			@RequestBody @Valid AssistidoDTO.CreateRequest request, UriComponentsBuilder uriBuilder) {
		AssistidoDTO.Response response = assistidoService.cadastrar(request);
		var uri = uriBuilder.path("/api/v1/assistidos/{id}").buildAndExpand(response.id()).toUri();
		return ResponseEntity.created(uri).body(response);
	}

	@GetMapping
	public ResponseEntity<Page<AssistidoDTO.ListResponse>> listar(
			@RequestParam(required = false) AssistidoDTO.SearchFilter filtro,
			@PageableDefault(size = 15, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
	) {
		var filtroSeguro = (filtro != null && filtro.termo() != null) ? filtro : new AssistidoDTO.SearchFilter(null);
		var page = assistidoService.listar(filtroSeguro, pageable);
		return ResponseEntity.ok(page);
	}

	// TODO: Criar método GET "/opcoes" para dropdowns
	
	@GetMapping("/{id}")
	public ResponseEntity<AssistidoDTO.Response> buscarPorId(@PathVariable Long id) {
		AssistidoDTO.Response response = assistidoService.buscarPorId(id);
		return ResponseEntity.ok(response);
	}

//	@PutMapping("/{id}")
//	public ResponseEntity<AssistidoDTO.Response> atualizar(
//			@PathVariable Long id, @RequestBody @Valid AssistidoDTO.UpdateRequest request
//	) {
//		AssistidoDTO.Response response = assistidoService.atualizar(id, request);
//		return ResponseEntity.ok(response);
//	}

	// TODO: ENTENDER ONDE ISSO É USADO NO FRONT
//	@GetMapping("/estadosCivis")
//	public ResponseEntity<List<String>> buscarEstadosCivis() {
//		List<String> estadoCivis = assistidoService.getEstadosCivis().stream().map(EstadoCivil::getEstado).toList();
//		return ResponseEntity.ok(estadoCivis);
//	}

}
