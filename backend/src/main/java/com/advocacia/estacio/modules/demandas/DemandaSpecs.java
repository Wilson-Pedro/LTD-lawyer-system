package com.advocacia.estacio.modules.demandas;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class DemandaSpecs {
    public static Specification<Demanda> envolvePessoa(Long pessoaId) {
        return (root, query, cb) -> {
            Predicate isAdvogado = cb.equal(root.get("advogado").get("id"), pessoaId);
            Predicate isEstagiario = cb.equal(root.get("estagiario").get("id"), pessoaId);
            Predicate isProfessor = cb.equal(root.get("professor").get("id"), pessoaId);

            return cb.or(isAdvogado, isEstagiario, isProfessor);
        };
    }

    public static Specification<Demanda> comFiltros(DemandaDTO.SearchFilter filtro) {
        return (root, query, cb) -> {
            if(Long.class != query.getResultType() && long.class != query.getResultType()) {
                root.fetch("advogado", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
                root.fetch("professor", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
                root.fetch("estagiario", JoinType.LEFT).fetch("pessoa", JoinType.LEFT);
            }

            List<Predicate> predicates = new ArrayList<>();

            if (filtro.etapaAtual() != null) {
                predicates.add(cb.equal(root.get("etapaAtual"), filtro.etapaAtual()));
            }
            if(filtro.tempestividade() != null) {
                predicates.add(cb.equal(root.get("tempestividade"), filtro.tempestividade()));
            }

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
