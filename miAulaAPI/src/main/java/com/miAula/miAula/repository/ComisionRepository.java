package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Comision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComisionRepository extends JpaRepository<Comision, Long> {
    Optional<Comision> findByCantidadAlumnos(Integer cantidad);
    List<Comision> findByCantidadAlumnosBetween(Integer minimo, Integer maximo);
    List<Comision> findByAsignaturaId(Long asignaturaId);
    List<Comision> findByProfesorId(Long profesorId);
    boolean existsByNombreAndAsignaturaId(String nombre, Long asignaturaId);

}