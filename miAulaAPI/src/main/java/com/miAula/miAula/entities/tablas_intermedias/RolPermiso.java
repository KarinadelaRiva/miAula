package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Rol;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles_permisos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolPermiso {

    @EmbeddedId
    private RolPermisoId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("rolId")
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;
}
