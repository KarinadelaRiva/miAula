package com.miAula.miAula.dto.carrera;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarreraCreateDTO {

    @NotBlank(message = "El código de la carrera es obligatorio")
    @Size(max = 6, message = "El código no puede tener más de 6 caracteres")
    private String codigo;

    @NotBlank(message = "El nombre de la carrera es obligatorio")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String nombre;
}