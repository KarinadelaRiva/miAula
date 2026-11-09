package com.miAula.miAula.dtos.recurso;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecursoDisponibilidadDTO {

    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private Integer cantidad;
    private Integer disponible;
}
