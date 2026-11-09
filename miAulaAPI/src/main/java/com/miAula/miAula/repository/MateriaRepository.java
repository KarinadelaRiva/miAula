package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {

    List<Materia> findByActivoTrue();

    Optional<Materia> findByIdAndActivoTrue(Long id);

    Optional<Materia> findByCodigoIgnoreCase(String codigo);
}