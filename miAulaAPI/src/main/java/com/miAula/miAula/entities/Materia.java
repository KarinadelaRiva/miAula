package com.miAula.miAula.entities;

import com.miAula.miAula.entities.tablas_intermedias.CarreraMateria;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.miAula.miAula.util.CodigoUtils;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "materias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 6, max = 6)
    @Pattern(regexp = CodigoUtils.PATRON_CANONICO)
    @Column(nullable = false, length = 6)
    private String codigo;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @OneToMany(mappedBy = "materia", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Comision> comisiones = new ArrayList<>();

    @OneToMany(mappedBy = "materia", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CarreraMateria> carreraMaterias = new ArrayList<>();
}
