package com.miAula.miAula.entities.tablas_intermedias;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RecursoSolicitudId implements Serializable {

    private Long recursoId;
    private Long solicitudId;
}
