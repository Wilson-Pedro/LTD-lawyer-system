package com.advocacia.estacio.modules.processos;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping("api/v1/processos")
@RequiredArgsConstructor
public class ProcessoController {

	private final ProcessoService processoService;

	@PostMapping
	public ResponseEntity<ProcessoDTO.Response> cadastrar(
            @RequestBody @Valid ProcessoDTO.CreateRequest req, UriComponentsBuilder uriBuilder) {
        var response = processoService.cadastrar(req);
        var uri = uriBuilder.path("/api/v1/processos/{id}").buildAndExpand(response.id()).toUri();
		return ResponseEntity.created(uri).body(response);
	}

	@GetMapping
	public ResponseEntity<Page<ProcessoDTO.ListResponse>> listar(
			ProcessoDTO.SearchFilter filtro,
			@PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable
	) {
		var pages = processoService.listar(filtro, pageable);
		return ResponseEntity.ok(pages);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProcessoDTO.Response> buscarPorId(@PathVariable Long id) {
		var dto  = processoService.buscarDetalhesPorId(id);
		return ResponseEntity.ok(dto);
	}


//
//	@GetMapping("/buscar/{numeroDoProcesso}")
//	public ResponseEntity<PageResponseDto<ProcessoDto>> buscarProcesso(
//			@PathVariable String numeroDoProcesso,
//			@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "20") int size
//			) {
//		Page<Processo> pages = processoService.buscarProcesso(numeroDoProcesso, page, size);
//		Page<ProcessoDto> pagesDto = pages.map(ProcessoDto::new);
//		return ResponseEntity.ok(new PageResponseDto<>(pagesDto));
//	}
//
//	@GetMapping("/numeroDoProcesso/{numeroDoProcesso}")
//	public ResponseEntity<ProcessoDto> buscarPorNumeroDoProcesso(
//			@PathVariable String numeroDoProcesso) {
//		Processo processo = processoService.buscarPorNumeroDoProcesso(numeroDoProcesso);
//		return ResponseEntity.ok(new ProcessoDto(processo));
//	}
//
//	@PutMapping("/{id}")
//	public ResponseEntity<Void> atualizarProcesso(
//			@PathVariable Long id,
//			@RequestBody ProcessoUpdate processoUpdate) {
//		processoService.atualizarProcesso(id, processoUpdate);
//		return ResponseEntity.noContent().build();
//	}
}
