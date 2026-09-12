package com.advocacia.estacio.modules.demandas;

import com.advocacia.estacio.modules.advogados.Advogado;
import com.advocacia.estacio.modules.estagiarios.Estagiario;
import com.advocacia.estacio.modules.professores.Professor;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_demanda")
@Getter
public class Demanda implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advogado_id")
    private Advogado advogado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estagiario_id")
    private Estagiario estagiario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @Column(name = "descricao", nullable = false, columnDefinition = "TEXT")
    private String descricao;

    private LocalDate prazo;

    @Column(name = "prazo_documentos")
    private LocalDate prazoDocumentos;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = "etapa_atual")
    private EtapaDemanda etapaAtual = EtapaDemanda.ELABORACAO;

    @OneToMany(mappedBy = "demanda", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DemandaTramitacao> tramitacoes = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Tempestividade tempestividade = Tempestividade.DENTRO_DO_PRAZO;

    @Column(name = "data_abertura", updatable = false)
    @CreationTimestamp
    private LocalDateTime dataAbertura;

    @Column(name = "ultima_atualizacao")
    private LocalDateTime ultimaAtualizacao;

    protected Demanda() {
    }

    // TODO: hashCode() e equals()

    @Builder
    public Demanda(Advogado advogado, Estagiario estagiario, Professor professor,
                   String descricao, LocalDate prazo, LocalDate prazoDocumentos,
                   EtapaDemanda etapaAtual, List<DemandaTramitacao> tramitacoes,
                   Tempestividade tempestividade, LocalDateTime dataAbertura,
                   LocalDateTime ultimaAtualizacao) {

        this.advogado = advogado;
        this.estagiario = estagiario;
        this.professor = professor;
        this.descricao = descricao;
        this.prazo = prazo;
        this.prazoDocumentos = prazoDocumentos;
        this.dataAbertura = dataAbertura;
        this.ultimaAtualizacao = ultimaAtualizacao;

        this.etapaAtual = etapaAtual != null ? etapaAtual : EtapaDemanda.ELABORACAO;
        this.tempestividade = tempestividade != null ? tempestividade : Tempestividade.DENTRO_DO_PRAZO;
        this.tramitacoes = tramitacoes != null ? tramitacoes : new ArrayList<>();
    }

    // ===============================================
    // MÉTODOS AUXILIARES
    // ===============================================

    /**
     * Adiciona uma tramitação à Demanda e sincroniza o estado de ambos.
     */
    public void adicionarTramitacao(DemandaTramitacao tramitacao) {
        this.tramitacoes.add(tramitacao);
        tramitacao.setDemanda(this);
        if (tramitacao.getTipoTramitacao().getEtapaDestino() != null) {
            this.etapaAtual = tramitacao.getTipoTramitacao().getEtapaDestino();
        }
        this.ultimaAtualizacao = LocalDateTime.now();
    }


}
