package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.infra.exceptions.RegraDeNegocioException;
import com.advocacia.estacio.infra.security.AuthorizationUtils;
import com.advocacia.estacio.infra.security.CustomUserDetails;
import com.advocacia.estacio.modules.advogados.Advogado;

import com.advocacia.estacio.modules.estagiarios.Estagiario;
import com.advocacia.estacio.modules.estagiarios.EstagiarioService;
import com.advocacia.estacio.modules.advogados.AdvogadoService;
import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.pessoas.PessoaService;
import com.advocacia.estacio.modules.professores.Professor;
import com.advocacia.estacio.modules.professores.ProfessorService;
import com.advocacia.estacio.infra.security.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DemandaService {

	private final DemandaRepository demandaRepository;
	private final EstagiarioService estagiarioService;
	private final ProfessorService professorService;
	private final AdvogadoService advogadoService;
	private final PessoaService pessoaService;
	private final SecurityUtils securityUtils;
	private final AuthorizationUtils authz;


	/**
	 * Ao criar uma demanda se add partes envolvidas na demanda
	 * Adicionar os dias para calcular o Prazo Final (Prazo dos Docs + dias adicionais)
	 *
	 */
	@Transactional
	public DemandaDTO.Response cadastrar(DemandaDTO.Request req, Long pessoaLogadaId) {
		Demanda demanda = req.toEntity(
				advogadoService.obterReferencia(req.advogadoId()),
				estagiarioService.obterReferecia(req.estagiarioId()),
				professorService.obterReferencia(req.professorId())
		);

		return finalizarCriacaoDemanda(
				demanda,
				pessoaLogadaId,
				TipoTramitacao.ABERTURA,
				"Demanda cadastrada e iniciada no sistema."
		);
	}

	@Transactional
	public DemandaDTO.Response importarRetroativo(DemandaDTO.ImportacaoRequest req, Long pessoaLogadaId) {
		Estagiario estagiario = estagiarioService.obterReferecia(req.estagiarioId());
		Professor professor = professorService.obterReferencia(req.professorId());
		Advogado advogado = advogadoService.obterReferencia(req.advogadoId());

		Demanda demanda = req.toEntity(advogado, estagiario, professor);

		return finalizarCriacaoDemanda(
				demanda,
				pessoaLogadaId,
				TipoTramitacao.CADASTRO_RETROATIVO,
				"Demanda importada para o sistema já na etapa: " + req.etapaAtual().getDescricao()
		);
	}

	private DemandaDTO.Response finalizarCriacaoDemanda(Demanda demanda, Long pessoaLogadaId, TipoTramitacao tipo, String observacao) {
		Pessoa responsavel = pessoaService.obterReferencia(pessoaLogadaId);

//		if (!tipo.podeSerExecutadaPor(roleLogada)) {
//			throw new AccessDeniedException("Você não tem permissão para iniciar essa demanda.");
//		}

		DemandaTramitacao tramitacaoInicial = DemandaTramitacao.builder()
				.responsavel(responsavel)
				.tipoTramitacao(tipo)
				.observacoes(observacao)
				.build();

		demanda.adicionarTramitacao(tramitacaoInicial);
		var demandaSalva = demandaRepository.save(demanda);
		return new DemandaDTO.Response(demandaSalva);
	}

	public DemandaDTO.Response buscarPorId(Long id) {
		var demanda = demandaRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Demanda não encontrada"));
		return new DemandaDTO.Response(demanda);
	}

	public Page<DemandaDTO.ListResponse> listar(DemandaDTO.SearchFilter filtro, Pageable pageable) {
		boolean isAdmin = authz.isAdmin();
		Specification<Demanda> spec = DemandaSpecs.comFiltros(filtro);

		if(!isAdmin) {
			Long pessoaId = securityUtils.getIdPessoaLogada();
			spec = spec.and(DemandaSpecs.envolvePessoa(pessoaId));
		}

		return demandaRepository.findAll(spec, pageable).map(DemandaDTO.ListResponse::new);
	}

//	public Page<DemandaDTO.ListResponse> buscarTodosPorPessoa(Long pessoaId, Pageable pageable) {
//		Page<Demanda> demandas = demandaRepository.buscarDemandasPorPessoa(pessoaId, pageable);
//		return demandas.map(DemandaDTO.ListResponse::new);
//	}

	@Transactional
	public DemandaTramitacaoDTO.Response tramitar(
			Long demandaId, DemandaTramitacaoDTO.CreateRequest req, CustomUserDetails usuarioLogado
	) {
		Demanda demanda = buscarDemandaPorId(demandaId);
		TipoTramitacao acao = req.tipoTramitacao();

		if (demanda.getEtapaAtual().isFinalizada()) {
			throw new RegraDeNegocioException("Não é possível tramitar uma demanda já concluída ou arquivada.");
		}
		if (!acao.podeSerExecutadaPor(usuarioLogado.getRole())) {
			throw new AccessDeniedException("Você não tem permissão para executar esta tramitação.");
		}
		if (!acao.podeSerExecutadaNa(demanda.getEtapaAtual())) {
			throw new RegraDeNegocioException(
					"A tramitação '" + acao.name() + "' não pode ser executada enquanto a demanda estiver na etapa '" + demanda.getEtapaAtual().name() + "'."
			);
		}

		Pessoa responsavel = pessoaService.obterReferencia(usuarioLogado.getPessoaId());
		DemandaTramitacao tramitacao = req.toEntity(responsavel);
		demanda.adicionarTramitacao(tramitacao);

		demandaRepository.saveAndFlush(demanda);
		return new DemandaTramitacaoDTO.Response(tramitacao);
	}

	// --- MÉTODOS PRIVADOS (Auxiliares internos) ---

	/**
	 * Centraliza a busca e a regra de "Não Encontrado",
	 * evitando duplicação de código.
	 */
	private Demanda buscarDemandaPorId(Long id) {
		return demandaRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Demanda não encontrada"));
	}
	
//	@Override
//	public Page<DemandaDto> buscarTodosPorUserId(Long userId, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//		return demandaRepository.buscarTodosPorUserId(userId, pageable);
//	}
//
//	@Override
//	public Page<DemandaDto> buscarTodosPorProfessorId(Long professorId, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//		return demandaRepository.buscarTodosPorProfessorId(professorId, pageable);
//	}
//
//	@Override
//	public Page<DemandaDto> buscarTodosPorAdvogadoId(Long advogadoId, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//		return demandaRepository.buscarTodosPorAdvogadoId(advogadoId, pageable);
//	}
//
//	@Override
//	public Page<DemandaDto> buscarTodosPorStatus(String demandaStatus, int page, int size) {
//		PageRequest pageable = PageRequest.of(page, size, Sort.by("id").descending());
//		return demandaRepository.buscarTodosPorStatus(DemandaStatus.toEnum(demandaStatus), pageable);
//	}

	/**
	 *	Estranho: Necessidade de Validacao de Role e definir exatamente que DemandaAvaliacao vai mudar.
	 * */
//	public void mudarDemandaStatus(Long id, DemandaStatusDto dto) {
//		Demanda demanda = buscarPorId(id);
//		demanda.setDemandaStatusAluno(EtapaDemanda.toEnum(dto.getDemandaStatusAluno()));
//		demanda.setDemandaStatusProfessor(EtapaDemanda.toEnum(dto.getDemandaStatusProfessor()));
//		demanda.setDemandaStatusAdvogado(EtapaDemanda.toEnum(dto.getDemandaStatusAdvogado()));
//		demandaRepository.save(demanda);
//	}

//	public List<EtapaDemanda> getDemandaStatus(UsuarioRole role) {
//		return switch (role) {
//			case ADMIN -> List.of(EtapaDemanda.values());
//
//			case PROFESSOR -> List.of(EtapaDemanda.EM_CORRECAO, EtapaDemanda.CORRIGIDO, EtapaDemanda.DEVOLVIDO,
//					EtapaDemanda.DENTRO_DO_PRAZO, EtapaDemanda.FORA_DO_PRAZO);
//
//			case ADVOGADO -> List.of(EtapaDemanda.EM_CORRECAO, EtapaDemanda.CORRIGIDO, EtapaDemanda.DEVOLVIDO);
//			default -> throw new EnumException("Essa Role não tem demandas");
//		};
//	}
}
