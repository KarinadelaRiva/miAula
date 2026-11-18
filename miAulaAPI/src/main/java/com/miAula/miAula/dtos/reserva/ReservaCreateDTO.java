package com.miAula.miAula.dtos.reserva;

import com.miAula.miAula.dtos.solicitud.RecursoSolicitadoDTO;
import com.miAula.miAula.entities.enums.DiaSemana;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservaCreateDTO {
    @NotNull(message = "Debe seleccionar un profesor.")
    private Long profesorId;

    @NotNull(message = "Debe especificar el espacio.")
    private Long espacioId;

    @NotNull(message = "La fecha de inicio es obligatoria.")
    @FutureOrPresent(message = "La fecha de inicio debe ser hoy o en el futuro.")
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria.")
    @Future(message = "La fecha de fin debe ser en el futuro.")
    private LocalDate fechaFin;

    @NotNull(message = "La hora de inicio es obligatoria.")
    private LocalTime horaInicio;

    @NotNull(message = "La hora de fin es obligatoria.")
    private LocalTime horaFin;

    @Size(max = 1000, message = "El comentario no puede superar los 1000 caracteres.")
    private String comentario;

    @NotNull(message = "Debe seleccionar una comisión.")
    private Long comisionId;

    @NotNull(message = "Debe seleccionar un día de la semana.")
    private DiaSemana diaSemana;

    @Builder.Default
    private List<@Valid RecursoSolicitadoDTO> recursos = new ArrayList<>();
}
