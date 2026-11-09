package com.miAula.miAula.dtos.recurso;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecursoResponseDTO {

    @Schema(description = "ID único del recurso", example = "1")
    private Long id;

    @Schema(description = "Código único del recurso", example = "PROY01")
    private String codigo;

    @Schema(description = "Nombre del recurso", example = "Proyector")
    private String nombre;

    @Schema(description = "Descripción del recurso", example = "Proyector HDMI")
    private String descripcion;

    @Schema(description = "Cantidad disponible del recurso", example = "5")
    private Integer cantidad;

    @Schema(description = "Indica si el recurso está activo", example = "true")
    private Boolean activo;
}
