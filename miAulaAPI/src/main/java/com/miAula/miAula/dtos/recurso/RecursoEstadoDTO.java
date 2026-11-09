package com.miAula.miAula.dtos.recurso;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecursoEstadoDTO {

    @NotNull(message = "El estado activo no puede ser nulo")
    private Boolean activo;
}
