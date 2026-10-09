package com.advocacia.estacio.modules.processos;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

//	@GetMapping("/{id}")
//	public ResponseEntity<ProcessoDto> buscarPorId(@PathVariable Long id) {
//		Processo processo = processoService.buscarPorId(id);
//		return ResponseEntity.ok(new ProcessoDto(processo));
//	}

//	@GetMapping("/areasDoDireito")
//	public ResponseEntity<List<String>> buscarAreasDoDireito() {
//		List<String> areasDoDireito = processoService.getAreasDoDireito().stream().map(AreaDoDireito::getDescricao).toList();
//		return ResponseEntity.ok(areasDoDireito);
//	}
//
//	@GetMapping("/tribunais")
//	public ResponseEntity<List<String>> buscarTribunais() {
//		List<String> tribunais = processoService.getTribunais().stream().map(Tribunal::getDescricao).toList();
//		return ResponseEntity.ok(tribunais);
//	}
//
//	@GetMapping("/processoStatus")
//	public ResponseEntity<List<String>> buscarProcessoStatus() {
//		List<String> processoStatus = processoService.getProcessoStatus().stream()
//				.filter(p -> !p.equals(ProcessoStatus.TODOS))
//				.map(ProcessoStatus::getStatus)
//				.toList();
//		return ResponseEntity.ok(processoStatus);
//	}
//
//	@GetMapping("/statusDoProcesso/{processoStatus}")
//	public ResponseEntity<PageResponseDto<ProcessoDto>> buscarProcessosPorStatusDoProcesso(
//			@PathVariable String processoStatus,
//			@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "20") int size) {
//		if(processoStatus.equalsIgnoreCase("todos")) {
//			Page<ProcessoDto> todosProcessos = processoService.findAll(page, size).map(ProcessoDto::new);
//			return ResponseEntity.ok((new PageResponseDto<>(todosProcessos)));
//		}
//		Page<ProcessoDto> processos = processoService.buscarProcessosPorStatusDoProcesso(processoStatus, page, size);
//		return ResponseEntity.ok(new PageResponseDto<>(processos));
//	}
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
