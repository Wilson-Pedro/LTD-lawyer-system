package com.advocacia.estacio.infra.seed;

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
import com.advocacia.estacio.modules.usuarios.UsuarioRepository;
import com.advocacia.estacio.modules.usuarios.UsuarioRole;
import com.advocacia.estacio.modules.usuarios.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PessoaRepository pessoaRepository;
    private final UsuarioService usuarioService;
    private final AdvogadoService advogadoService;
    private final EstagiarioService estagiarioService;
    private final ProfessorService professorService;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password:#{null}}")
    private String adminPassword;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (adminPassword == null) {
            throw new IllegalStateException("ADMIN_PASSWORD não configurada. Defina a variável de ambiente antes de iniciar em produção.");
        }

        if (usuarioRepository.findByLogin(adminEmail).isEmpty()) {
            Usuario usuarioAdmin = usuarioService.cadastrar(adminEmail, adminPassword, UsuarioRole.ADMIN);

            Pessoa pessoaAdmin = Pessoa.builder()
                    .nome("Administrador do Sistema")
                    .telefone("98999999999")
                    .email(adminEmail)
                    .build();

            pessoaAdmin.vincularUsuario(usuarioAdmin);

            pessoaRepository.save(pessoaAdmin);
            System.out.println("✅ Usuário ADMIN (com Pessoa) criado com sucesso! Login: " + adminEmail);
        }

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
                PeriodoEstagio.ESTAGIO_II
        );
        estagiarioService.cadastrar(estagiarioRequest);
    }
}
