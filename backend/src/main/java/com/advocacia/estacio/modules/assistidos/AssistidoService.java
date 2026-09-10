package com.advocacia.estacio.modules.assistidos;

import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.advogados.AdvogadoDTO;
import com.advocacia.estacio.modules.pessoas.enderecos.EnderecoService;
import com.advocacia.estacio.modules.pessoas.Pessoa;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.advocacia.estacio.modules.pessoas.enderecos.Endereco;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AssistidoService {

	private final AssistidoRepository assistidoRepository;
	private final EnderecoService enderecoService;

	@Transactional
	public AssistidoDTO.Response cadastrar(AssistidoDTO.CreateRequest req) {
		Endereco endereco = enderecoService.cadastrar(req.endereco());
		Assistido assistido = req.toEntity(endereco);
		assistido = assistidoRepository.save(assistido);
		return new AssistidoDTO.Response(assistido);
	}

	@Transactional(readOnly = true)
	public Page<AssistidoDTO.ListResponse> listar(AssistidoDTO.SearchFilter filtro, Pageable pageable) {
		return assistidoRepository.buscarPorTermoGlobal(filtro.termo(), pageable)
				.map(AssistidoDTO.ListResponse::new);
	}

	@Transactional(readOnly = true)
	public AssistidoDTO.Response buscarPorId(Long id) {
		var assistido = assistidoRepository.buscarDetalhesPorId(id)
				.orElseThrow(() -> new EntityNotFoundException("Assistido não encontrado!"));
		return new AssistidoDTO.Response(assistido);
	}

	@Transactional
	public AssistidoDTO.Response atualizar(Long id, AssistidoDTO.UpdateRequest req) {
		Assistido assistido = buscarAssistidoPorId(id);
		assistido.atualizarDados(
				req.nome(),
				req.telefone(),
				req.dataNascimento(),
				req.profissao(),
				req.nacionalidade(),
				req.naturalidade(),
				req.estadoCivil()
		);

		Endereco endereco = enderecoService.cadastrarOuAtualizar(assistido.getPessoa().getEndereco(), req.endereco());
		assistido.getPessoa().vincularEndereco(endereco);

		return new AssistidoDTO.Response(assistido);
	}

	// --- MÉTODOS PRIVADOS (Auxiliares internos) ---

	/**
	 * Centraliza a busca e a regra de "Não Encontrado",
	 * evitando duplicação de código.
	 */
	private Assistido buscarAssistidoPorId(Long id) {
		return assistidoRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Assistido não encontrado"));
	}

}
