package com.miAula.miAula.dtos.materia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateriaResponseDTO {

    private Long id;

    private String codigo;

    private String nombre;
}