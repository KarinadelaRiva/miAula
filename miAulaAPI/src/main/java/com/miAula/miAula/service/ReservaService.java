package com.miAula.miAula.service;

import com.miAula.miAula.dtos.reserva.ReservaCalendarioDTO;
import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.tablas_intermedias.RecursoReserva;
import com.miAula.miAula.entities.tablas_intermedias.RecursoReservaId;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import com.miAula.miAula.exceptions.ReservaSolapadaException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional(readOnly = true)
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public Reserva obtenerReserva(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con ID: " + id));
    }

    public List<ReservaCalendarioDTO> obtenerReservasDeUsuario(String email) {
        return reservaRepository.findBySolicitante_EmailAndActivoTrue(email).stream()
                .map(this::reservaAReservaCalendarioDTO)
                .toList();
    }

    public List<ReservaCalendarioDTO> obtenerReservasParaCalendario() {
        return reservaRepository.findByActivoTrue().stream()
                .map(this::reservaAReservaCalendarioDTO)
                .toList();
    }

    private ReservaCalendarioDTO reservaAReservaCalendarioDTO(Reserva reserva) {
        return ReservaCalendarioDTO.builder()
                .id(reserva.getId())
                .dia(reserva.getDiaDeLaSemana().name())
                .fechaInicio(reserva.getDiaDeInicio())
                .fechaFin(reserva.getDiaDeFin())
                .horaInicio(reserva.getHoraDeInicio())
                .horaFin(reserva.getHoraDeFin())
                .comisionId(reserva.getComision().getId())
                .aulaId(reserva.getEspacio().getId())
                .comisionNombre(reserva.getComision().getNombre())
                .materiaNombre(reserva.getComision().getMateria().getNombre())
                .carreraId(reserva.getComision().getCarrera().getId())
                .carreraNombre(reserva.getComision().getCarrera().getNombre())
                .profesorId(reserva.getComision().getProfesor().getId())
                .profesorNombre(reserva.getComision().getProfesor().getNombre()
                        + " " + reserva.getComision().getProfesor().getApellido())
                .espacioNombre(reserva.getEspacio().getNombre())
                .capacidad(reserva.getEspacio().getCapacidad())
                .build();
    }

    public List<Reserva> obtenerReservasActivas() {
        LocalDateTime ahora = LocalDateTime.now();
        return reservaRepository.findActivasDesde(ahora.toLocalDate(), ahora.toLocalTime());
    }

    public List<Reserva> obtenerReservasTerminadas() {
        LocalDateTime ahora = LocalDateTime.now();
        return reservaRepository.findTerminadasAntesDe(ahora.toLocalDate(), ahora.toLocalTime());
    }

    @Transactional
    public void desactivarReserva(Long id, String emailSolicitante, boolean esAdministrador) {
        Reserva reserva = obtenerReserva(id);
        if (!esAdministrador && !Objects.equals(reserva.getSolicitante().getEmail(), emailSolicitante)) {
            throw new ResourceNotFoundException("Reserva no encontrada con ID: " + id);
        }

        reserva.setActivo(false);
        reservaRepository.save(reserva);
    }

    @Transactional
    public Reserva generarDesdeSolicitud(Solicitud solicitud) {
        validarDisponibilidad(solicitud, null);

        Reserva reserva = Reserva.builder()
                .diaDeLaSemana(solicitud.getDiaDeLaSemana())
                .diaDeInicio(solicitud.getDiaDeInicio())
                .diaDeFin(solicitud.getDiaDeFin())
                .horaDeInicio(solicitud.getHoraDeInicio())
                .horaDeFin(solicitud.getHoraDeFin())
                .solicitud(solicitud)
                .solicitante(solicitud.getSolicitante())
                .espacio(solicitud.getEspacio())
                .comision(solicitud.getComision())
                .evento(solicitud.getEvento())
                .build();

        agregarRecursos(reserva, solicitud);
        return reservaRepository.save(reserva);
    }

    @Transactional
    public Reserva modificarDesdeSolicitud(Solicitud solicitud) {
        Reserva reservaOriginal = solicitud.getReservaOriginal();
        if (reservaOriginal == null) {
            throw new IllegalArgumentException("La solicitud no tiene una reserva original.");
        }
        if (Boolean.FALSE.equals(reservaOriginal.getActivo())) {
            throw new ResourceNotFoundException("La reserva original está inactiva.");
        }

        validarDisponibilidad(solicitud, reservaOriginal.getId());
        reservaOriginal.setDiaDeLaSemana(solicitud.getDiaDeLaSemana());
        reservaOriginal.setDiaDeInicio(solicitud.getDiaDeInicio());
        reservaOriginal.setDiaDeFin(solicitud.getDiaDeFin());
        reservaOriginal.setHoraDeInicio(solicitud.getHoraDeInicio());
        reservaOriginal.setHoraDeFin(solicitud.getHoraDeFin());
        reservaOriginal.setEspacio(solicitud.getEspacio());
        reservaOriginal.setComision(solicitud.getComision());
        reservaOriginal.setEvento(solicitud.getEvento());
        reservaOriginal.getRecursos().clear();
        agregarRecursos(reservaOriginal, solicitud);

        return reservaRepository.save(reservaOriginal);
    }

    private void agregarRecursos(Reserva reserva, Solicitud solicitud) {
        for (RecursoSolicitud recursoSolicitud : solicitud.getRecursos()) {
            reserva.getRecursos().add(RecursoReserva.builder()
                    .id(new RecursoReservaId(recursoSolicitud.getRecurso().getId(), null))
                    .recurso(recursoSolicitud.getRecurso())
                    .reserva(reserva)
                    .cantidadReservada(recursoSolicitud.getCantidadSolicitada())
                    .build());
        }
    }

    private void validarDisponibilidad(Solicitud solicitud, Long reservaExcluidaId) {
        DiaSemana dia = solicitud.getDiaDeLaSemana();
        LocalDate inicio = solicitud.getDiaDeInicio();
        LocalDate fin = solicitud.getDiaDeFin();

        boolean solapada = reservaRepository
                .findByEspacio_IdAndDiaDeLaSemanaAndActivoTrue(solicitud.getEspacio().getId(), dia)
                .stream()
                .filter(reserva -> !Objects.equals(reserva.getId(), reservaExcluidaId))
                .anyMatch(reserva ->
                        !inicio.isAfter(reserva.getDiaDeFin())
                                && !fin.isBefore(reserva.getDiaDeInicio())
                                && solicitud.getHoraDeInicio().isBefore(reserva.getHoraDeFin())
                                && solicitud.getHoraDeFin().isAfter(reserva.getHoraDeInicio()));

        if (solapada) {
            throw new ReservaSolapadaException("El espacio ya está reservado en el día y horario solicitado.");
        }
    }
}
