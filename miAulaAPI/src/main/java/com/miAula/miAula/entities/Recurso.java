package com.miAula.miAula.entities;

import com.miAula.miAula.entities.tablas_intermedias.RecursoReserva;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recurso {

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

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @OneToMany(mappedBy = "recurso", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecursoSolicitud> recursoSolicitudes = new ArrayList<>();

    @OneToMany(mappedBy = "recurso", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecursoReserva> recursoReservas = new ArrayList<>();
}
