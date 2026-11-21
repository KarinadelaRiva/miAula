package com.miAula.miAula.dtos.comision;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.miAula.miAula.util.CodigoUtils;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ComisionCreateDTO {

    @Schema(description = "Código de la comisión", example = "COM001", required = true)
    @NotBlank(message = "El código de la comisión no puede estar vacío")
    @Pattern(regexp = CodigoUtils.PATRON_ENTRADA, message = "El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios")
    private String codigo;

    @Schema(description = "Nombre de la comisión", example = "Comisión A", required = true)
    @NotBlank(message = "El nombre de la comisión no puede estar vacío")
    @Size(max = 50, message = "El nombre de la comisión no puede tener más de 50 caracteres")
    private String nombre;

    @Schema(description = "ID de la materia asociada", example = "10", required = true)
    @NotNull(message = "El ID de la materia no puede ser nulo")
    private Long materiaId;

    @Schema(description = "ID de la carrera asociada", example = "5", required = true)
    @NotNull(message = "El ID de la carrera no puede ser nulo")
    private Long carreraId;

    @Schema(description = "ID del profesor responsable", example = "3", required = true)
    @NotNull(message = "El ID del profesor no puede ser nulo")
    private Long profesorId;

    @Schema(description = "Cantidad de alumnos en la comisión", example = "30", required = true, minimum = "1", maximum = "100")
    @NotNull(message = "La cantidad de alumnos no puede ser nula")
    @Min(value = 1, message = "La cantidad de alumnos debe ser al menos 1")
    @Max(value = 100, message = "La cantidad de alumnos no puede ser mayor a 100")
    private Integer cantidadEstudiantes;

}
