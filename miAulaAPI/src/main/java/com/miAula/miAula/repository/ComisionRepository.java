package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Comision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComisionRepository extends JpaRepository<Comision, Long> {
    Optional<Comision> findByCantidadEstudiantes(Integer cantidad);
    List<Comision> findByCantidadEstudiantesBetween(Integer minimo, Integer maximo);
    List<Comision> findByMateriaId(Long materiaId);
    List<Comision> findByProfesorId(Long profesorId);
    boolean existsByNombreAndMateriaId(String nombre, Long materiaId);

}