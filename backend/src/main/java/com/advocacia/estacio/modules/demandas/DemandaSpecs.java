package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.infra.security.CustomUserDetails;
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
            List<Predicate> predicates = new ArrayList<>();

            if (filtro.status() != null) {
                predicates.add(cb.equal(root.get("status"), filtro.status()));
            }
            if(filtro.tempestividade() != null) {
                predicates.add(cb.equal(root.get("tempestividade"), filtro.tempestividade()));
            }

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
