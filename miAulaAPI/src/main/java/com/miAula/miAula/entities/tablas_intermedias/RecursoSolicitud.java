package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.entities.Solicitud;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recursos_solicitudes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursoSolicitud {

    @EmbeddedId
    private RecursoSolicitudId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recursoId")
    @JoinColumn(name = "recurso_id", nullable = false)
    private Recurso recurso;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("solicitudId")
    @JoinColumn(name = "solicitud_id", nullable = false)
    private Solicitud solicitud;

    @Column(nullable = false)
    private Integer cantidadSolicitada;
}
