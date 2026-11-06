package com.miAula.miAula.dtos.comision;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ComisionUpdateDTO {
    @Schema(description = "ID único de la comisión", example = "1")
    @NotNull(message = "El ID de la comisión no puede ser nulo")
    private Long id;

    @Schema(description = "Código de la comisión", example = "COM001")
    @NotBlank(message = "El código de la comisión no puede estar vacío")
    @Size(min = 6, max = 6, message = "El código de la comisión debe tener 6 caracteres")
    private String codigo;

    @Schema(description = "Nombre de la comisión", example = "Comisión A")
    @NotBlank(message = "El nombre de la comisión no puede estar vacío")
    @Size(max = 50, message = "El nombre de la comisión no puede tener más de 50 caracteres")
    private String nombre;

    @Schema(description = "ID de la carrera asociada", example = "5", required = true)
    @NotNull(message = "El ID de la carrera no puede ser nulo")
    private Long carreraId;

    @Schema(description = "ID del profesor responsable", example = "3", required = true)
    @NotNull(message = "El ID del profesor no puede ser nulo")
    private Long profesorId;

    @Schema(description = "Cantidad de alumnos en la comisión", example = "30")
    @NotNull(message = "La cantidad de alumnos no puede ser nula")
    @Min(value = 1, message = "La cantidad de alumnos debe ser al menos 1")
    @Max(value = 100, message = "La cantidad de alumnos no puede ser mayor a 100")
    private Integer cantidadEstudiantes;
}