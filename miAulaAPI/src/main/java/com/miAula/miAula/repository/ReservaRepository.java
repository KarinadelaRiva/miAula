package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.enums.DiaSemana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByEspacio_IdAndDiaDeLaSemanaAndActivoTrue(Long espacioId, DiaSemana diaDeLaSemana);
}
