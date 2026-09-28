package com.miAula.miAula.entities.tablas_intermedias;

import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Materia;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "carreras_materias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarreraMateria {

    @EmbeddedId
    private CarreraMateriaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("carreraId")
    @JoinColumn(name = "carrera_id", nullable = false)
    private Carrera carrera;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("materiaId")
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;
}
