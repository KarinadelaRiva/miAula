package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.entities.Reserva;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recursos_reservas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursoReserva {

    @EmbeddedId
    private RecursoReservaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recursoId")
    @JoinColumn(name = "recurso_id", nullable = false)
    private Recurso recurso;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reservaId")
    @JoinColumn(name = "reserva_id", nullable = false)
    private Reserva reserva;

    @Column(nullable = false)
    private Integer cantidadReservada;
}
