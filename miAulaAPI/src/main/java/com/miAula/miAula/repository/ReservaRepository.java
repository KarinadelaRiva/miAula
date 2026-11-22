package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.enums.DiaSemana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByActivoTrue();

    List<Reserva> findByActivoFalse();

    List<Reserva> findBySolicitante_EmailAndActivoTrue(String email);

    List<Reserva> findBySolicitante_EmailAndActivoFalse(String email);

    @Query("SELECT r FROM Reserva r WHERE r.activo = true AND (r.diaDeFin > :fecha "
            + "OR (r.diaDeFin = :fecha AND r.horaDeFin >= :hora))")
    List<Reserva> findActivasDesde(
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora);

    @Query("SELECT r FROM Reserva r WHERE r.activo = true AND r.solicitante.email = :email "
            + "AND (r.diaDeFin > :fecha OR (r.diaDeFin = :fecha AND r.horaDeFin >= :hora))")
    List<Reserva> findActivasDesdeDeUsuario(
            @Param("email") String email,
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora);

    @Query("SELECT r FROM Reserva r WHERE r.activo = true AND (r.diaDeFin < :fecha "
            + "OR (r.diaDeFin = :fecha AND r.horaDeFin < :hora))")
    List<Reserva> findTerminadasAntesDe(
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora);

    @Query("SELECT r FROM Reserva r WHERE r.solicitante.email = :email "
            + "AND (r.activo = false OR r.diaDeFin < :fecha "
            + "OR (r.diaDeFin = :fecha AND r.horaDeFin < :hora))")
    List<Reserva> findTerminadasAntesDeDeUsuario(
            @Param("email") String email,
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora);

    List<Reserva> findByEspacio_IdAndDiaDeLaSemanaAndActivoTrue(Long espacioId, DiaSemana diaDeLaSemana);

    List<Reserva> findBySolicitante_IdAndActivoTrueAndDiaDeFinGreaterThanEqualOrderByDiaDeInicioAsc(
            Long solicitanteId, LocalDate fecha);

    List<Reserva> findByDiaDeLaSemanaAndActivoTrueAndDiaDeInicioLessThanEqualAndDiaDeFinGreaterThanEqual(
            DiaSemana dia, LocalDate fechaFin, LocalDate fechaInicio);
}
