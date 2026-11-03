package com.miAula.miAula.repositories;

import com.miAula.miAula.entities.tablas_intermedias.CarreraMateria;
import com.miAula.miAula.entities.tablas_intermedias.CarreraMateriaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarreraMateriaRepository
        extends JpaRepository<CarreraMateria, CarreraMateriaId> {

    List<CarreraMateria> findByCarrera_Id(Long carreraId);

    List<CarreraMateria> findByMateria_Id(Long materiaId);

    boolean existsByCarrera_IdAndMateria_Id(
            Long carreraId,
            Long materiaId
    );

    void deleteByCarrera_IdAndMateria_Id(
            Long carreraId,
            Long materiaId
    );
}