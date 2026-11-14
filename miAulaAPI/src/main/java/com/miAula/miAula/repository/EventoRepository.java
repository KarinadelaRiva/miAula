package com.miAula.miAula.repository;

import com.miAula.miAula.entities.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Buscar un evento por código
    Optional<Evento> findByCodigo(String codigo);

    // Validar que no se repita el código
    boolean existsByCodigo(String codigo);

    // Listado completo para ADMIN,
    // incluyendo activos e inactivos
    List<Evento> findAllByOrderByNombreAsc();

    // Eventos activos
    List<Evento> findByActivoTrueOrderByNombreAsc();

    // Eventos activos asociados a un organizador
    List<Evento> findByOrganizador_IdAndActivoTrueOrderByNombreAsc(Long organizadorId);
}