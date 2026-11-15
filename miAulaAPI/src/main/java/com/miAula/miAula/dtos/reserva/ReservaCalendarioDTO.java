package com.miAula.miAula.dtos.reserva;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservaCalendarioDTO {
    private Long id;
    private String dia;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private Long comisionId;
    private Long aulaId;
    private String comisionNombre;
    private String materiaNombre;
    private Long carreraId;
    private String carreraNombre;
    private Long profesorId;
    private String profesorNombre;
    private String espacioNombre;
    private Integer capacidad;
}
