package com.miAula.miAula.repositories;

import com.miAula.miAula.entities.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {

    List<Carrera> findByActivoTrue();

    Optional<Carrera> findByIdAndActivoTrue(Long id);

    Optional<Carrera> findByCodigoIgnoreCase(String codigo);
}