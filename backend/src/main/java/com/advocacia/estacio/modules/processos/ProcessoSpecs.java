package com.advocacia.estacio.modules.processos;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProcessoSpecs {
    public static Specification<Processo> envolvePessoa(Long pessoaId) {
        return (root, query, cb) -> {
            Predicate isAdvogado = cb.equal(root.get("advogado").get("id"), pessoaId);
            Predicate isEstagiario = cb.equal(root.get("estagiario").get("id"), pessoaId);

            return cb.or(isAdvogado, isEstagiario);
        };
    }

    public static Specification<Processo> comFiltros(ProcessoDTO.SearchFilter filtro) {
        return (root, query, cb) -> {
            if (Long.class != query.getResultType() && long.class != query.getResultType()) {
                root.fetch("advogado", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
                root.fetch("assistido", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
                root.fetch("estagiario", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
            }

            List<Predicate> predicates = new ArrayList<>();

            if (filtro.status() != null) {
                predicates.add(cb.equal(root.get("status"), filtro.status()));
            }
            if (filtro.areaDireito() != null) {
                predicates.add(cb.equal(root.get("areaDireito"), filtro.areaDireito()));
            }
            if (filtro.tribunal() != null) {
                predicates.add(cb.equal(root.get("tribunal"), filtro.tribunal()));
            }

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
