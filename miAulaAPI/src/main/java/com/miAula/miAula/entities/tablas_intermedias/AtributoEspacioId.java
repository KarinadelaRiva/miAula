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
public class AtributoEspacioId implements Serializable {

    private Long espacioId;
    private Long atributoId;
}
