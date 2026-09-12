package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.modules.usuarios.Usuario;
import com.advocacia.estacio.infra.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

@RequestMapping("/api/v1/demandas")
@RestController
public class DemandaController {
	
	private final DemandaService demandaService;

	public DemandaController(DemandaService demandaService) {
		this.demandaService = demandaService;
	}

	@PostMapping
	public ResponseEntity<DemandaDTO.Response> cadastrar(
			@RequestBody @Valid DemandaDTO.Request dados, @AuthenticationPrincipal CustomUserDetails usuarioLogado,
			UriComponentsBuilder uriBuilder
	) {
		DemandaDTO.Response response = demandaService.cadastrar(dados, usuarioLogado.getPessoaId());
		var uri = uriBuilder.path("/api/v1/demandas/{id}").buildAndExpand(response.id()).toUri();
		return ResponseEntity.created(uri).body(response);
	}

	@PostMapping("/importar")
	public ResponseEntity<DemandaDTO.Response> importarRetroativo(
			@RequestBody @Valid DemandaDTO.ImportacaoRequest req,
			@AuthenticationPrincipal CustomUserDetails usuarioLogado) {

		var response = demandaService.importarRetroativo(req, usuarioLogado.getPessoaId());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping
	public ResponseEntity<Page<DemandaDTO.ListResponse>> listar(
			DemandaDTO.SearchFilter filtro,
			@PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable
	) {
		var pages = demandaService.listar(filtro, pageable);
		return ResponseEntity.ok(pages);
	}

    @GetMapping("/{id}")
    public ResponseEntity<DemandaDTO.Response> buscarPorId(@PathVariable Long demandaId) {
        var dto = demandaService.buscarPorId(demandaId);
        return ResponseEntity.ok(dto);
    }

	@PostMapping("/{demandaId}/tramitar")
	public ResponseEntity<DemandaTramitacaoDTO.Response> tramitar(
			@PathVariable Long demandaId,
			@RequestBody @Valid DemandaTramitacaoDTO.CreateRequest req,
			@AuthenticationPrincipal CustomUserDetails usuarioLogado
	) {
		var response = demandaService.tramitar(demandaId, req, usuarioLogado);
		return ResponseEntity.ok(response);
	}

//	@GetMapping("/me")
//	public ResponseEntity<Page<DemandaDTO.ListResponse>> buscarMinhasDemandas(
//			@PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable,
//			@AuthenticationPrincipal Usuario usuarioLogado
//			) {
//		Long meuId = usuarioLogado.getId();
//		var pages = demandaService.buscarTodosPorPessoa(meuId, pageable);
//		return ResponseEntity.ok(pages);
//	}

//	@GetMapping("/pessoa/{pessoaId}")
//	public ResponseEntity<Page<DemandaDTO.ListResponse>> buscarDemandasPorPessoa(
//			@PathVariable Long pessoaId,
//			@PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
//
//		var pages = demandaService.buscarTodosPorPessoa(pessoaId, pageable);
//		return ResponseEntity.ok(pages);
//	}

//	@GetMapping("/role/{role}")
//	public ResponseEntity<List<String>> buscarDemandaStatus(@PathVariable String role) {
//		List<String> demandaStatus = demandaService
//				.getDemandaStatus(UsuarioRole.toEnum(role))
//				.stream()
//				.map(EtapaDemanda::getStatus)
//				.toList();
//		return ResponseEntity.ok(demandaStatus);
	}

//    @PatchMapping("/{id}/change")
//    public ResponseEntity<Void> mudarDemandaStatus(@PathVariable Long id, @RequestParam(defaultValue = "Em Correção") String status) {
//        demandaService.mudarDemandaStatus(id, status);
//        return ResponseEntity.noContent().build();
//    }

//	@PutMapping("/{id}/update")
//	public ResponseEntity<Void> mudarDemandaStatus(
//			@PathVariable Long id,
//			@RequestBody DemandaStatusDto demandaStatusDto) {
//		demandaService.mudarDemandaStatus(id, demandaStatusDto);
//		return ResponseEntity.noContent().build();
//	}

//	@GetMapping("/status/{demandaStatus}")
//	public ResponseEntity<PageResponseDto<DemandaDto>> buscarTodosPorStatus(
//			@PathVariable String demandaStatus,
//			@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "20") int size) {
//		if(demandaStatus.equalsIgnoreCase("todos")) {
//			return ResponseEntity.ok(new PageResponseDto<>(demandaService.buscarTodos(page, size)));
//		}
//		Page<DemandaDto> pagesDto = demandaService.buscarTodosPorStatus(demandaStatus, page, size);
//		return ResponseEntity.ok(new PageResponseDto<>(pagesDto));
//	}

