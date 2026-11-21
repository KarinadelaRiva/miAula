package com.miAula.miAula.dtos.carrera;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarreraResponseDTO {

    private Long id;
    private String codigo;
    private String nombre;

    private Boolean activo;
}