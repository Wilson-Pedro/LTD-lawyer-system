package com.advocacia.estacio.modules.processos;

import com.advocacia.estacio.infra.exceptions.ConflitoDeDadosException;
import com.advocacia.estacio.infra.security.AuthorizationUtils;
import com.advocacia.estacio.infra.security.SecurityUtils;
import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.advogados.AdvogadoService;
import com.advocacia.estacio.modules.assistidos.Assistido;
import com.advocacia.estacio.modules.assistidos.AssistidoService;
import com.advocacia.estacio.modules.estagiarios.Estagiario;
import com.advocacia.estacio.modules.estagiarios.EstagiarioService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProcessoService {

	private final ProcessoRepository processoRepository;
	private final AssistidoService assistidoService;
	private final AdvogadoService advogadoService;
	private final EstagiarioService estagiarioService;
	private final SecurityUtils securityUtils;
	private final AuthorizationUtils authz;

	@Transactional
	public ProcessoDTO.Response cadastrar(ProcessoDTO.CreateRequest req) {
		validarNumeroPjeUnico(req.numeroProcessoPje());
		Long sequencial = processoRepository.obterProximoSequencial();

		Assistido assistido = assistidoService.obterReferencia(req.assistidoId());
		Advogado advogado = advogadoService.obterReferencia(req.advogadoId());
		Estagiario estagiario = estagiarioService.obterReferecia(req.estagiarioId());

		Processo processo = req.toEntity(assistido, advogado, estagiario);
		processo.atribuirNumeroDeProcesso(sequencial);
		processo = processoRepository.save(processo);
		return new ProcessoDTO.Response(processo);
	}

	@Transactional(readOnly = true)
	public Page<ProcessoDTO.ListResponse> listar(ProcessoDTO.SearchFilter filtro, Pageable pageable) {
		boolean isAdmin = authz.isAdmin();
		Specification<Processo> spec = ProcessoSpecs.comFiltros(filtro);

		if(!isAdmin) {
			Long pessoaId = securityUtils.getIdPessoaLogada();
			spec = spec.and(ProcessoSpecs.envolvePessoa(pessoaId));
		}

		return processoRepository.findAll(spec, pageable).map(ProcessoDTO.ListResponse::new);
	}

	@Transactional(readOnly = true)
	public ProcessoDTO.Response buscarDetalhesPorId(Long id) {
		var processo = processoRepository.buscarDetalhesPorId(id)
				.orElseThrow(() -> new EntityNotFoundException("Processo não encontrado"));
		return new ProcessoDTO.Response(processo);
	}

//	public List<Processo> findAll() {
//		return processoRepository.findAll();
//	}
//
//	public Page<Processo> findAll(int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//		return processoRepository.findAll(pageable);
//	}
//
//
//	public Page<ProcessoDto> buscarProcessosPorStatusDoProcesso(String processoStatus, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//        return processoRepository.buscarProcessosPorStatusDoProcesso(ProcessoStatus.toEnum(processoStatus), pageable);
//	}
//
//	public Page<Processo> buscarProcesso(String numeroDoProcesso, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("assunto").ascending());
//		return processoRepository.findByNumeroDoProcessoContainingIgnoreCase(numeroDoProcesso, pageable);
//	}
//
//
//	public Processo buscarPorId(Long id) {
//		return processoRepository.findById(id).orElseThrow(EntidadeNaoEncontradaException::new);
//	}
//
//
//	public Processo buscarPorNumeroDoProcesso(String numeroDoProcesso) {
//		return processoRepository.findByNumeroDoProcesso(numeroDoProcesso)
//				.orElseThrow(EntidadeNaoEncontradaException::new);
//	}
//
//
//	public Processo atualizarProcesso(Long id, ProcessoUpdate processoUpdate) {
//		Processo processo = buscarPorId(id);
//		processo.setId(id);
//		processo = dtoParaEntidade(processo, processoUpdate);
//
//		Estagiario estagiario = estagiarioService.buscarPorId(processoUpdate.getEstagiarioId());
//		Advogado advogado = advogadoService.buscarPorId(processoUpdate.getAdvogadoId());
//		processo.setAdvogado(advogado);
//		processo.setEstagiario(estagiario);
//
//		return processoRepository.save(processo);
//	}
//
//	private Processo dtoParaEntidade(Processo processo, ProcessoUpdate dto) {
//		processo.setNumeroDoProcesso(dto.getNumeroDoProcesso());
//		processo.setNumeroDoProcessoPje(dto.getNumeroDoProcessoPje());
//		processo.setAssunto(dto.getAssunto());
//		processo.setVara(dto.getVara());
//		processo.setPrazoFinal(Utils.localDateToString(dto.getPrazoFinal()));
//		processo.setResponsavel(dto.getResponsavel());
//		processo.setAreaDoDireito(AreaDoDireito.toEnum(dto.getAreaDoDireito()));
//		processo.setTribunal(Tribunal.toEnum(dto.getTribunal()));
//		processo.setStatusDoProcesso(ProcessoStatus.toEnum(dto.getStatusDoProcesso()));
//		processo.setPartesEnvolvidas(dto.getPartesEnvolvidas());
//		return processo;
//	}
//
	// ----------- MÉTODOS PRIVADOS AUXILIARES ----------------

	private void validarNumeroPjeUnico(String numeroPje) {
	if (numeroPje == null || numeroPje.isBlank()) {
		return;
	}

	if (processoRepository.existsByNumeroProcessoPje(numeroPje)) {
		throw new ConflitoDeDadosException("Já existe um processo cadastrado com este número de PJe.");
	}
}
//
//
//	public List<AreaDoDireito> getAreasDoDireito() {
//		return Arrays.stream(AreaDoDireito.values()).toList();
//	}
//
//
//	public List<Tribunal> getTribunais() {
//		return Arrays.stream(Tribunal.values()).toList();
//	}
//
//
//	public List<ProcessoStatus> getProcessoStatus() {
//		return Arrays.stream(ProcessoStatus.values()).toList();
//	}
}
