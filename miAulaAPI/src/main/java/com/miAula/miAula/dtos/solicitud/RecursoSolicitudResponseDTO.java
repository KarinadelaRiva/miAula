package com.miAula.miAula.dtos.solicitud;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecursoSolicitudResponseDTO {

    private Long recursoId;
    private String nombre;
    private Integer cantidad;
}
