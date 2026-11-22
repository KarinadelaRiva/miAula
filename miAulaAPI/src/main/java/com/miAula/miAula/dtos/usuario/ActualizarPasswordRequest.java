package com.miAula.miAula.dtos.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActualizarPasswordRequest {

    @NotBlank
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres.")
    @Pattern(
            regexp = "^(?=.*\\p{Ll})(?=.*\\p{Lu})(?=.*\\p{N})(?=.*[^\\p{L}\\p{N}\\s]).+$",
            message = "La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial."
    )
    private String password;
}
