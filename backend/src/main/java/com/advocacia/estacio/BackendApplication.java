package com.advocacia.estacio;

import com.advocacia.estacio.modules.advogados.AdvogadoDTO;
import com.advocacia.estacio.modules.advogados.AdvogadoService;
import com.advocacia.estacio.modules.estagiarios.EstagiarioDTO;
import com.advocacia.estacio.modules.estagiarios.EstagiarioService;
import com.advocacia.estacio.modules.estagiarios.PeriodoEstagio;
import com.advocacia.estacio.modules.pessoas.Pessoa;
import com.advocacia.estacio.modules.pessoas.PessoaRepository;
import com.advocacia.estacio.modules.pessoas.enderecos.EnderecoDTO;
import com.advocacia.estacio.modules.professores.ProfessorDTO;
import com.advocacia.estacio.modules.professores.ProfessorService;
import com.advocacia.estacio.modules.usuarios.Usuario;
import com.advocacia.estacio.modules.usuarios.UsuarioRole;
import com.advocacia.estacio.modules.usuarios.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;


@SpringBootApplication
@EnableScheduling
@RequiredArgsConstructor
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class BackendApplication implements CommandLineRunner {

	private final UsuarioService usuarioService;
	private final AdvogadoService advogadoService;
	private final EstagiarioService estagiarioService;
	private final ProfessorService professorService;
	private final PessoaRepository pessoaRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Usuario adminUser = usuarioService.cadastrar("admin@gmail.com", "1234", UsuarioRole.ADMIN);

//		Pessoa adminPessoa = Pessoa.builder()
//				.nome("Administrador do Sistema")
//				.email("admin@gmail.com")
//				.build();
//		adminPessoa.vincularUsuario(adminUser);
//		pessoaRepository.save(adminPessoa);


		 EnderecoDTO.Request enderecoAdvogado = new EnderecoDTO.Request(
				"65000000", "Rua da Paz", "10", "Centro", "São Luís", "MA"
		);

		AdvogadoDTO.CreateRequest advogadoRequest = new AdvogadoDTO.CreateRequest(
				"Carlos Mendes (Advogado)",
				"advogado@gmail.com",
				"1234",
				"98999999999",
				LocalDate.of(1985, 8, 15),
				enderecoAdvogado
		);
		advogadoService.cadastrar(advogadoRequest);

		// 3. Criação do Professor
		ProfessorDTO.CreateRequest professorRequest = new ProfessorDTO.CreateRequest(
				"Mariana Silva (Professora)",
				"professor@gmail.com",
				"1234",
				"98988888888"
		);
		professorService.cadastrar(professorRequest);

		// 4. Criação do Estagiário
		EstagiarioDTO.CreateRequest estagiarioRequest = new EstagiarioDTO.CreateRequest(
				"João Pedro (Estagiário)",
				"estagiario@gmail.com",
				"98977777777",
				"1234",
				"2024010123",
				PeriodoEstagio.ESTAGIO_II// Substitua pelo Enum real que você utiliza
		);
		estagiarioService.cadastrar(estagiarioRequest);

	}
}
