package com.miAula.miAula.dtos.materia;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MateriaEstadoDTO {

    @NotNull(message = "El estado activo no puede ser nulo")
    private Boolean activo;
}
