package com.miAula.miAula.dtos.solicitud;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecursoSolicitadoDTO {

    @NotNull(message = "Debe especificar el recurso solicitado")
    private Long recursoId;

    @NotNull(message = "Debe especificar la cantidad solicitada")
    @Min(value = 1, message = "La cantidad solicitada debe ser mayor a cero")
    private Integer cantidad;
}
