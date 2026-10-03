package com.miAula.miAula.dtos.usuario;

import java.util.List;

import com.miAula.miAula.dtos.rol.RolResponseDTO;

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
public class UsuarioResponseDTO {

    private Long id;

    private String nombre;

    private String apellido;

    private String email;

    //private List<RolResponseDTO> roles;

    private Boolean activo;
}
