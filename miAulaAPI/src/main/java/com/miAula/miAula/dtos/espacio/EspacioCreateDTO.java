package com.miAula.miAula.dtos.espacio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder 
@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class EspacioCreateDTO {
    
    private String codigo;

    private String nombre;

    private Integer capacidad;

    private Integer nroPiso;

}
