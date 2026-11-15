package com.miAula.miAula.dtos.evento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoResponseDTO {

    private Long id;

    private String codigo;

    private String nombre;

    private String descripcion;

    private Integer participantesMaximos;

    private Long organizadorId;

    private String organizadorNombre;

    private String organizadorApellido;

    private String organizadorEmail;

    private Boolean activo;
}