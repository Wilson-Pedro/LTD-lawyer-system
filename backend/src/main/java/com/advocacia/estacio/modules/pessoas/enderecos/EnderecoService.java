package com.advocacia.estacio.modules.pessoas.enderecos;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnderecoService {

	private final EnderecoRepository enderecoRepository;

	public Endereco cadastrar(EnderecoDTO.Request req) {
		if (req == null) return null;
		// TODO: adicionar validação de Cep no futuro, talvez.
		Endereco endereco = req.toEntity();
		return enderecoRepository.save(endereco);
	}

	public void atualizar(Endereco enderecoAtual, EnderecoDTO.Request req) {
		if (req == null || enderecoAtual == null) return;

		enderecoAtual.atualizarDados(
				req.cep(),
				req.logradouro(),
				req.numero(),
				req.complemento(),
				req.bairro(),
				req.cidade()
		);
	}

	public Endereco cadastrarOuAtualizar(Endereco enderecoAtual, EnderecoDTO.Request req) {
		if (enderecoAtual != null) {
			this.atualizar(enderecoAtual, req);
			return enderecoAtual;
		}
		return this.cadastrar(req);
	}

	public EnderecoDTO.Response buscarPorId(Long id) {
		var endereco = enderecoRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Endereço não encontrado"));
		return EnderecoDTO.Response.from(endereco);
	}

}
