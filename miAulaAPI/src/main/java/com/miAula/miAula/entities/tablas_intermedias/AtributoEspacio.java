package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Atributo;
import com.miAula.miAula.entities.Espacio;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "atributos_espacios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AtributoEspacio {

    @EmbeddedId
    private AtributoEspacioId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("espacioId")
    @JoinColumn(name = "espacio_id", nullable = false)
    private Espacio espacio;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("atributoId")
    @JoinColumn(name = "atributo_id", nullable = false)
    private Atributo atributo;

    @Column(nullable = false)
    private Integer cantidad;
}
