package com.advocacia.estacio.modules.assistidos;

import com.advocacia.estacio.modules.pessoas.EstadoCivil;
import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.pessoas.enderecos.Endereco;
import com.advocacia.estacio.modules.pessoas.enderecos.EnderecoDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface AssistidoDTO {
    @Schema(name = "AssistidoCreateRequest")
    record CreateRequest(
            @NotBlank(message = "O nome é obrigatório") String nome,
            @Email(message = "Informe um email válido") String email,
            @Pattern(regexp = "^\\d{8,11}$", message = "Informe um número de telefone válido")
            String telefone,
            String matricula,
            String profissao,
            String nacionalidade,
            String naturalidade,
            EstadoCivil estadoCivil,
            @Valid EnderecoDTO.Request endereco
    ) {
        public Assistido toEntity(Endereco endereco) {
            Pessoa pessoa = Pessoa.builder()
                    .nome(this.nome())
                    .email(this.email())
                    .telefone(this.telefone())
                    .endereco(endereco)
                    .build();

            return Assistido.builder()
                    .pessoa(pessoa)
                    .matricula(this.matricula())
                    .estadoCivil(this.estadoCivil())
                    .nacionalidade(this.nacionalidade())
                    .naturalidade(this.naturalidade())
                    .profissao(this.profissao())
                    .build();
        }
    }

    @Schema(name = "AssistidoResponse")
    record Response(
            Long id,
            String matricula,
            String nome,
            String email,
            String telefone,
            String profissao,
            String nacionalidade,
            String naturalidade,
            String estadoCivil,
            EnderecoDTO.Response endereco,
            LocalDateTime criacao
    ) {
        public Response(Assistido assistido) {
            this(
                    assistido.getId(),
                    assistido.getMatricula(),
                    assistido.getPessoa().getNome(),
                    assistido.getPessoa().getEmail(),
                    assistido.getPessoa().getTelefone(),
                    assistido.getProfissao(),
                    assistido.getNacionalidade(),
                    EstadoCivil.obterDescricao(assistido.getEstadoCivil()),
                    assistido.getNaturalidade(),
                    EnderecoDTO.Response.from(assistido.getPessoa().getEndereco()),
                    assistido.getPessoa().getCriadoEm()
            );
        }
    }

    @Schema(name = "AssistidoListResponse")
    record ListResponse(
            Long id,
            String matricula,
            String nome,
            String telefone
    ) {
        public ListResponse (Assistido assistido){
            this(
                    assistido.getId(),
                    assistido.getMatricula(),
                    assistido.getPessoa().getNome(),
                    assistido.getPessoa().getTelefone()
            );
        }
    }

    @Schema(name = "AssistidoSearchFilter")
    record SearchFilter(
            String termo
    ){}

    @Schema(name = "AssistidoUpdateRequest")
    record UpdateRequest(
            String nome,
//            @Email String email,
            @Pattern(regexp = "^\\d{9,11}$") String telefone,
            LocalDate dataNascimento,
            String profissao,
            String nacionalidade,
            String naturalidade,
            EstadoCivil estadoCivil,
            @Valid EnderecoDTO.Request endereco
    ) {}
}
