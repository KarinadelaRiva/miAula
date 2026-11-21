package com.miAula.miAula.dtos.espacio;

import io.swagger.v3.oas.annotations.media.Schema;
import com.miAula.miAula.entities.tablas_intermedias.AtributoEspacio;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.miAula.miAula.util.CodigoUtils;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EspacioCreateDTO {

    @NotNull(message = "El código del espacio no puede ser nulo")
    @Pattern(regexp = CodigoUtils.PATRON_ENTRADA, message = "El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios")
    private String codigo;

    @Schema(description = "Nombre del espacio físico (aula, laboratorio, etc.)", example = "Aula 101")
    @NotNull(message = "El nombre del espacio no puede ser nulo")
    private String nombre;

    @Schema(description = "Capacidad máxima de personas en el espacio", example = "40")
    @NotNull(message = "La capacidad del espacio no puede ser nula")
    @Min(value = 1, message = "La capacidad debe ser como mínimo 1")
    private Integer capacidad;

    private Integer nroPiso;

    private List<AtributoEspacio> atributos;
}
