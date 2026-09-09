package com.advocacia.estacio.modules.assistidos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

interface AssistidoRepository extends JpaRepository<Assistido, Long> {
    @EntityGraph(attributePaths = {"pessoa", "pessoa.endereco"})
    @Query("SELECT a FROM Assistido a WHERE a.id = :id")
    Optional<Assistido> buscarDetalhesPorId(@Param("id") Long id);

    @EntityGraph(attributePaths = {"pessoa"})
    @Query("""
        SELECT a FROM Assistido a
        JOIN a.pessoa p
        WHERE :termo IS NULL
        OR (
            LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%'))
            OR LOWER(a.matricula) LIKE LOWER(CONCAT('%', :termo, '%'))
        )
    """)
    Page<Assistido> buscarPorTermoGlobal(
            @Param("termo") String termo,
            Pageable pageable
    );

//	Page<Assistido> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

//	@Query("""
//			SELECT new com.advocacia.estacio.domain.dto.ResponseMinDto(
//				ass.id,
//				ass.nome,
//				ass.email,
//				ass.registro
//			)
//			FROM Assistido ass
//			""")
//	Page<Assistido> buscarTodos(Pageable pageable);

}
