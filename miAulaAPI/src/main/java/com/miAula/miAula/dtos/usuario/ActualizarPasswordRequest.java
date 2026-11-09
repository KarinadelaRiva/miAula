package com.miAula.miAula.dtos.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActualizarPasswordRequest {

    @NotBlank
    @Size(min = 6, max = 255)
    private String password;
}
