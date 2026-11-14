package com.miAula.miAula.dtos.evento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
public class EventoUpdateDTO {

    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 6)
    private String codigo;

    @NotBlank
    @Size(max = 50)
    private String nombre;

    @Size(max = 500)
    private String descripcion;

    @NotNull
    @Positive
    private Integer participantesMaximos;

    @NotNull
    private Long organizadorId;
}