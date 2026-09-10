package com.advocacia.estacio.modules.estagiarios;

import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.advogados.AdvogadoDTO;
import com.advocacia.estacio.modules.pessoas.enderecos.Endereco;
import com.advocacia.estacio.modules.usuarios.Usuario;
import com.advocacia.estacio.modules.usuarios.UsuarioRole;
import com.advocacia.estacio.modules.usuarios.UsuarioService;
import com.advocacia.estacio.modules.usuarios.UsuarioStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstagiarioService {

	private final EstagiarioRepository estagiarioRepository;
	private final UsuarioService usuarioService;

	@Transactional
	public EstagiarioDTO.Response cadastrar(EstagiarioDTO.CreateRequest req) {
		Usuario user = usuarioService.cadastrar(req.email(), req.senha(), UsuarioRole.ESTAGIARIO);
		Estagiario estagiario = req.toEntity(user);
		estagiario = estagiarioRepository.save(estagiario);
		return new EstagiarioDTO.Response(estagiario);
	}

	@Transactional(readOnly = true)
	public Page<EstagiarioDTO.ListResponse> listar(EstagiarioDTO.SearchFilter filtro, Pageable pageable) {
		Specification<Estagiario> spec = EstagiarioSpecs.usandoFiltro(filtro);
		return estagiarioRepository.findAll(spec, pageable).map(EstagiarioDTO.ListResponse::new);
	}

	@Transactional(readOnly = true)
	public List<EstagiarioDTO.OptionResponse> listarOpcoes(String nome) {
		Pageable limite = PageRequest.of(0, 20);
		return  estagiarioRepository.buscarAtivosPorNome(nome, UsuarioStatus.ATIVO, limite);
	}

	public EstagiarioDTO.Response buscarPorId(Long id) {
		Estagiario estagiario = estagiarioRepository.buscarDetalhesPorId(id)
				.orElseThrow(() -> new EntityNotFoundException("Estagiário não encontrado"));
		return new EstagiarioDTO.Response(estagiario);
	}

	@Transactional
	public EstagiarioDTO.Response atualizar(Long id, EstagiarioDTO.UpdateRequest req) {
		Estagiario estagiario = estagiarioRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Estagiário não encontrado"));
		estagiario.atualizarDados(req.nome(), req.telefone(), req.matricula(), req.periodoEstagio());
		return new EstagiarioDTO.Response(estagiario);
	}


	/**
	 * Retorna apenas a referência (Proxy) da entidade Estagiario para uso em chaves estrangeiras.
	 * NÃO executa um SELECT no banco de dados.
	 */
	public Estagiario obterReferecia(Long id) {
		return estagiarioRepository.getReferenceById(id);
	}


//	public EntidadeMinDto buscarIdPorEmail(String email) {
//		return estagiarioRepository.buscarEstagiarioMinPorEmail(email)
//				.orElseThrow(EntityNotFoundException::new);
//	}



	



//	public List<UsuarioAuth> buscarUsuariosAuthPorId(List<Long> ids) {
//		return ids.stream()
//				.map(id -> this.buscarPorId(id).getUsuarioAuth())
//				.toList();
//	}


//	public List<UsuarioAuth> buscarUsuariosAuthPorUsuarioStatus(UsuarioStatus usuarioStatus) {
//		return estagiarioRepository.findAll().stream()
//				.map(Estagiario::getUsuarioAuth)
//				.filter(u -> u.getUsuarioStatus() == usuarioStatus)
//				.toList();
//	}

//    @Override
//    public List<PeriodoEstagio> getPeriodos() {
//        return Arrays.stream(PeriodoEstagio.values()).toList();
//    }



//	public void desativarEstagiarios(RequestIds requestIds) {
//		List<UsuarioAuth> usuariosAuth = buscarUsuariosAuthPorId(requestIds.getIds());
//		this.usuarioAuthService.desativarAtivarUsuarios(usuariosAuth, UsuarioStatus.INATIVO);
//	}

//	@Override
//	public void desativarEstagiariosPorData(DesativarAtivarUsuarioPorDataDto dto, String usuarioStatus) {
//		List<UsuarioAuth> usuariosAuth = this.usuarioAuthService.buscarUsuariosAuthPorRole(UserRole.ESTAGIARIO);
//		LocalDate dataDesativacao = Utils.localDateToString(dto.getDataDeDesativacao());
//		UsuarioStatus status = UsuarioStatus.toEnum(usuarioStatus);
//		this.usuarioAuthService.desativarAtivarUsuariosPorData(dataDesativacao, usuariosAuth, status);
//	}

//	@Override
//	public void definirDataDeDesativacao(Long id, String data) {
//		this.usuarioAuthService.definirDataParaAtivarDesativar(id, data);
//	}
}
