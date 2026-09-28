package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Rol;
import com.miAula.miAula.entities.Usuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios_roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioRol {

    @EmbeddedId
    private UsuarioRolId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("usuarioId")
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("rolId")
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;
}
