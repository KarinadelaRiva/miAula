package com.miAula.miAula.entities;

import com.miAula.miAula.entities.tablas_intermedias.RolPermiso;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRol;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 6)
    @Column(nullable = false, length = 6)
    private String codigo;

    @NotBlank
    @Size(max = 30)
    @Column(nullable = false, length = 30)
    private String nombre;

    @Size(max = 250)
    @Column(length = 250)
    private String descripcion;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RolPermiso> permisos = new ArrayList<>();

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UsuarioRol> usuarioRoles = new ArrayList<>();
}
