package com.miAula.miAula.dtos.reserva;

import com.miAula.miAula.entities.enums.DiaSemana;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
public class ReservaModificableDTO {

    private Long id;
    private DiaSemana diaSemana;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private Long espacioId;
    private String nombreEspacio;
    private Long comisionId;
    private String nombreComision;
    private List<RecursoDTO> recursos;

    @Data
    @Builder
    public static class RecursoDTO {
        private Long recursoId;
        private Integer cantidad;
    }
}
