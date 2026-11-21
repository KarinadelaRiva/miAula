package com.miAula.miAula.dtos.carrera;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.miAula.miAula.util.CodigoUtils;
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
    @Pattern(regexp = CodigoUtils.PATRON_ENTRADA, message = "El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios")
    private String codigo;

    @NotBlank(message = "El nombre de la carrera es obligatorio")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String nombre;
}