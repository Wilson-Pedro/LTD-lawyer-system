package com.advocacia.estacio.modules.demandas;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TramitacaoService {
    private final TramitacaoRepository tramitacaoRepository;

    public Page<DemandaTramitacaoDTO.ListResponse> listarPorDemanda(Long demandaId, Pageable pageable) {
        return tramitacaoRepository.findByDemandaId(demandaId, pageable).map(DemandaTramitacaoDTO.ListResponse::new);
    }
}
