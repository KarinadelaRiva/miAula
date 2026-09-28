package com.miAula.miAula.entities;

import com.miAula.miAula.entities.tablas_intermedias.AtributoEspacio;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "espacios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Espacio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 6)
    @Column(nullable = false, length = 6)
    private String codigo;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String nombre;

    @Min(0)
    @Column(nullable = false)
    private Integer capacidad;

    @Min(0)
    @Column(nullable = false)
    private Integer nroPiso;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @OneToMany(mappedBy = "espacio", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AtributoEspacio> atributos = new ArrayList<>();

    @OneToMany(mappedBy = "espacio", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Solicitud> solicitudes = new ArrayList<>();

    @OneToMany(mappedBy = "espacio", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Reserva> reservas = new ArrayList<>();
}
