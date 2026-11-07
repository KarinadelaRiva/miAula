package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {

    List<Solicitud> findBySolicitante_Id(Long solicitanteId);
    Page<Solicitud> findBySolicitante_Id(Long solicitanteId, Pageable pageable);


    List<Solicitud> findByEstado(EstadoSolicitud estado);
    Page<Solicitud> findByEstado(EstadoSolicitud estado, Pageable pageable);

    List<Solicitud> findByEstadoAndSolicitante_Id(EstadoSolicitud estado, Long solicitanteId);

    List<Solicitud> findAllByOrderByFechaHoraSolicitudDesc();
}
