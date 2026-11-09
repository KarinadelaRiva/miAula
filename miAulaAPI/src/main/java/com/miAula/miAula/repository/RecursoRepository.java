package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    Optional<Recurso> findByCodigo(String codigo);
    Optional<Recurso> findByNombre(String nombre);
    boolean existsByCodigo(String codigo);
    boolean existsByNombre(String nombre);
    List<Recurso> findByCantidadGreaterThanEqual(Integer cantidad);
}
