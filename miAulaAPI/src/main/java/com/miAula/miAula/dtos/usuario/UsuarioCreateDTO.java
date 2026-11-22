package com.miAula.miAula.dtos.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioCreateDTO {

    @NotBlank
    @Size(max = 30)
    private String nombre;

    @NotBlank
    @Size(max = 30)
    private String apellido;

    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres.")
    @Pattern(
            regexp = "^(?=.*\\p{Ll})(?=.*\\p{Lu})(?=.*\\p{N})(?=.*[^\\p{L}\\p{N}\\s]).+$",
            message = "La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial."
    )
    private String password;

    @NotBlank
    @Pattern(regexp = "administrador|profesor")
    private String rol;

}
