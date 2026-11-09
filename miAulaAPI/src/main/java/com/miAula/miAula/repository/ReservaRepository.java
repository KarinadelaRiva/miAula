package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findBySolicitante_Email(String email);

    List<Reserva> findByDiaDeFinGreaterThanOrDiaDeFinEqualsAndHoraDeFinGreaterThan(
            LocalDate fechaActual,
            LocalDate fechaFin,
            LocalTime horaActual);

    List<Reserva> findByDiaDeFinLessThanOrDiaDeFinEqualsAndHoraDeFinLessThan(
            LocalDate fechaActual,
            LocalDate fechaFin,
            LocalTime horaActual);
}
