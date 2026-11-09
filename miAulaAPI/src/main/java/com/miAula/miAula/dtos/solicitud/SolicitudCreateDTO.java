package com.miAula.miAula.dtos.solicitud;

import com.miAula.miAula.entities.enums.DiaSemana;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SolicitudCreateDTO {
    @Schema(description = "ID del usuario que realiza la solicitud", example = "5")
    private Long solicitanteId;

    @Schema(description = "ID de la reserva original asociada (si aplica)", example = "1001")
    private Long reservaOriginalId; // puede ser null

    @Schema(description = "ID del nuevo espacio solicitado", example = "15")
    @NotNull(message = "Debe especificar el ID del nuevo espacio")
    private Long nuevoEspacioId;

    @Schema(description = "Fecha de inicio solicitada", example = "2025-06-15")
    @NotNull(message = "La fecha de inicio es obligatoria")
    @FutureOrPresent(message = "La fecha de inicio debe ser hoy o en el futuro")
    private LocalDate fechaInicio;

    @Schema(description = "Fecha de fin solicitada", example = "2025-06-20")
    @NotNull(message = "La fecha de fin es obligatoria")
    @Future(message = "La fecha de fin debe ser en el futuro")
    private LocalDate fechaFin;

    @Schema(description = "Hora de inicio solicitada", example = "08:00")
    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime horaInicio;

    @Schema(description = "Hora de fin solicitada", example = "10:00")
    @NotNull(message = "La hora de fin es obligatoria")
    private LocalTime horaFin;

    @Schema(description = "Comentario del profesor solicitante")
    private String comentarioSolicitante;

    @Schema(description = "ID de la comisión asociada", example = "5")
    @NotNull(message = "Debe especificar la comisión")
    private Long comisionId;

    @Schema(description = "Día de la semana solicitado", example = "LUNES")
    private DiaSemana diaSemana;

    @Schema(description = "Recursos y cantidades solicitadas")
    @Builder.Default
    private List<@Valid RecursoSolicitadoDTO> recursos = new ArrayList<>();
}
