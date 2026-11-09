package com.miAula.miAula.dtos.usuario;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidarPasswordRequest {

    @NotBlank
    private String password;
}
