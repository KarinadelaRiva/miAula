package com.miAula.miAula.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miAula.miAula.entities.Espacio;

@Repository 
public interface EspacioRepository extends JpaRepository<Espacio, Long> {
    Optional<Espacio> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
