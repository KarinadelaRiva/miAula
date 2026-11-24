package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Comision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComisionRepository extends JpaRepository<Comision, Long> {
    Optional<Comision> findByCantidadEstudiantes(Integer cantidad);
    List<Comision> findByCantidadEstudiantesBetween(Integer minimo, Integer maximo);
    Optional<Comision> findByCodigoContainingIgnoreCase(String codigo);
    List<Comision> findByMateriaId(Long materiaId);
    List<Comision> findByProfesorId(Long profesorId);
    List<Comision> findByProfesorIdAndActivoTrue(Long profesorId);
    boolean existsByCodigoIgnoreCase(String codigo);
    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);
    boolean existsByNombreIgnoreCaseAndMateriaId(String nombre, Long materiaId);
    boolean existsByNombreIgnoreCaseAndMateriaIdAndIdNot(String nombre, Long materiaId, Long id);
    boolean existsByCarrera_IdAndActivoTrue(Long carreraId);
    boolean existsByMateria_IdAndActivoTrue(Long materiaId);
    boolean existsByProfesor_IdAndActivoTrue(Long profesorId);

}