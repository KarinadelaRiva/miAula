package com.miAula.miAula.dtos.rol;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder 
@Getter 
@Setter 
public class RolResponseDTO {
    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
}
