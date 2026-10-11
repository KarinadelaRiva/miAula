package com.miAula.miAula.dtos.comision;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ComisionResponseDTO {
    @Schema(description = "ID único de la comisión", example = "1")
    private Long id;

    @Schema(description = "Código de la comisión", example = "COM001")
    private String codigo;

    @Schema(description = "Nombre de la comisión", example = "Comisión A")
    private String nombre;

    @Schema(description = "Nombre de la asignatura asociada", example = "Matemática I")
    private String asignaturaNombre;

    @Schema(description = "Nombre de la carrera asociada", example = "Ingeniería en Sistemas")
    private String carreraNombre;

    @Schema(description = "Nombre del profesor responsable", example = "Juan Pérez")
    private String profesorNombre;

    @Schema(description = "Cantidad de alumnos en la comisión", example = "30")
    private Integer cantidadEstudiantes;
}