package com.miAula.miAula.dtos.espacio;

import com.miAula.miAula.entities.tablas_intermedias.AtributoEspacio;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class EspacioResponseDTO {
    @Schema(description = "ID único del espacio", example = "1")
    private Long id;

    @Schema(description = "Código del espacio", example = "AULA01")
    private String codigo;

    @Schema(description = "Nombre del espacio físico (aula, laboratorio, etc.)", example = "Aula 101")
    private String nombre;

    @Schema(description = "Capacidad máxima de personas en el espacio", example = "40")
    private Integer capacidad;

    @Schema(description = "Número del piso donde se encuentra el espacio", example = "1")
    private Integer nroPiso;

    private List<AtributoEspacio> atributos;

    private Boolean activo;
}
