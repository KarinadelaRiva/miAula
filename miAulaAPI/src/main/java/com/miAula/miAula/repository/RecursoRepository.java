package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.persistence.LockModeType;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    Optional<Recurso> findByCodigo(String codigo);
    Optional<Recurso> findByNombre(String nombre);
    boolean existsByCodigo(String codigo);
    boolean existsByNombre(String nombre);
    List<Recurso> findByCantidadGreaterThanEqual(Integer cantidad);
    List<Recurso> findByActivoTrue();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select recurso from Recurso recurso where recurso.id in :ids order by recurso.id")
    List<Recurso> findAllByIdInForUpdate(@Param("ids") Collection<Long> ids);
}
