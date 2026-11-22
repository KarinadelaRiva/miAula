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

    @Schema(description = "Nombre de la materia asociada", example = "Matemática I")
    private String materiaNombre;

    @Schema(description = "ID de la materia asociada", example = "10")
    private Long materiaId;

    @Schema(description = "Indica si la materia asociada está activa", example = "true")
    private Boolean materiaActiva;

    @Schema(description = "Nombre de la carrera asociada", example = "Ingeniería en Sistemas")
    private String carreraNombre;

    @Schema(description = "ID de la carrera asociada", example = "5")
    private Long carreraId;

    @Schema(description = "Indica si la carrera asociada está activa", example = "true")
    private Boolean carreraActiva;

    @Schema(description = "Nombre del profesor responsable", example = "Juan Pérez")
    private String profesorNombre;

    @Schema(description = "ID del profesor responsable", example = "3")
    private Long profesorId;

    @Schema(description = "Cantidad de alumnos en la comisión", example = "30")
    private Integer cantidadEstudiantes;

    @Schema(description = "Indica si la comisión está activa", example = "true")
    private Boolean activo;
}