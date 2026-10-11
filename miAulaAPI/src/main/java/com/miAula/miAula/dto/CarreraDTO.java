package com.miAula.miAula.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarreraDTO {

    private Long id;

    @NotBlank
    @Size(max = 6)
    private String codigo;

    @NotBlank
    @Size(max = 50)
    private String nombre;
}