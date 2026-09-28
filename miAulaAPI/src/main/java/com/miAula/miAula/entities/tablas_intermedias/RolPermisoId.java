package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.enums.Permiso;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RolPermisoId implements Serializable {

    private Long rolId;

    @Enumerated(EnumType.STRING)
    private Permiso permiso;
}
