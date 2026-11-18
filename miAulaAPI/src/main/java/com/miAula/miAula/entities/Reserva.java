package com.miAula.miAula.entities;

import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.tablas_intermedias.RecursoReserva;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "solicitud_id", nullable = true)
    private Solicitud solicitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitante_id", nullable = false)
    private Usuario solicitante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "espacio_id", nullable = false)
    private Espacio espacio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comision_id", nullable = false)
    private Comision comision;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @Column(length = 1000)
    private String comentario;

    @OneToMany(mappedBy = "reserva", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecursoReserva> recursos = new ArrayList<>();

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}
