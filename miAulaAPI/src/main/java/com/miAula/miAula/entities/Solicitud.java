package com.miAula.miAula.entities;

import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solicitudes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime fechaHoraSolicitud;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaSemana diaDeLaSemana;

    @NotNull
    @Column(nullable = false)
    private LocalDate diaDeInicio;

    @NotNull
    @Column(nullable = false)
    private LocalDate diaDeFin;

    @NotNull
    @Column(nullable = false)
    private LocalTime horaDeInicio;

    @NotNull
    @Column(nullable = false)
    private LocalTime horaDeFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "espacio_id", nullable = false)
    private Espacio espacio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitante_id", nullable = false)
    private Usuario solicitante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comision_id")
    private Comision comision;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evento_id")
    private Evento evento;

    /** * Relación con la reserva original, por ejemplo, si es una solicitud de cambio de espacio.
     * Si es una solicitud de reserva nueva, este campo puede ser nulo.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserva_original_id")
    private Reserva reservaOriginal;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoSolicitud estado = EstadoSolicitud.PENDIENTE;

    @Column(length = 1000)
    private String comentarioAdmin;

    @Column(length = 1000)
    private String comentarioSolicitante;

    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Reserva> reservas = new ArrayList<>();

    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecursoSolicitud> recursos = new ArrayList<>();

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}
