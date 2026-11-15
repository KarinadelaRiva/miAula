package com.miAula.miAula.service;

import com.miAula.miAula.dtos.solicitud.SolicitudCreateDTO;
import com.miAula.miAula.dtos.solicitud.RecursoSolicitudResponseDTO;
import com.miAula.miAula.dtos.solicitud.SolicitudResponseDTO;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.SolicitudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional(readOnly = true)
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final ReservaService reservaService;
    private final UsuarioService usuarioService;
    private final EspacioService espacioService;
    private final ComisionService comisionService;
    private final RecursoService recursoService;

    public SolicitudService(
            SolicitudRepository solicitudRepository,
            ReservaService reservaService,
            UsuarioService usuarioService,
            EspacioService espacioService,
            ComisionService comisionService,
            RecursoService recursoService) {
        this.solicitudRepository = solicitudRepository;
        this.reservaService = reservaService;
        this.usuarioService = usuarioService;
        this.espacioService = espacioService;
        this.comisionService = comisionService;
        this.recursoService = recursoService;
    }

    public Solicitud solicitudDTOtoSolicitud(SolicitudCreateDTO dto) {
        validarDatos(dto);
        if (dto.getSolicitanteId() == null) {
            throw new EntityValidationException("Debe especificar quién realiza la solicitud.");
        }

        Usuario solicitante = usuarioService.obtenerPorId(dto.getSolicitanteId());
        Espacio espacio = espacioService.obtenerPorId(dto.getNuevoEspacioId());
        Comision comision = comisionService.obtenerComisionPorId(dto.getComisionId());
        validarEspacioYComision(espacio, comision);

        return Solicitud.builder()
                .solicitante(solicitante)
                .espacio(espacio)
                .comision(comision)
                .reservaOriginal(dto.getReservaOriginalId() == null
                        ? null
                        : reservaService.obtenerReserva(dto.getReservaOriginalId()))
                .diaDeLaSemana(dto.getDiaSemana() == null
                        ? convertirDiaSemana(dto.getFechaInicio().getDayOfWeek())
                        : dto.getDiaSemana())
                .diaDeInicio(dto.getFechaInicio())
                .diaDeFin(dto.getFechaFin())
                .horaDeInicio(dto.getHoraInicio())
                .horaDeFin(dto.getHoraFin())
                .fechaHoraSolicitud(LocalDateTime.now())
                .estado(EstadoSolicitud.PENDIENTE)
                .comentarioSolicitante(dto.getComentarioSolicitante())
                .build();
    }

    public SolicitudResponseDTO solicitudToSolicitudResponseDTO(Solicitud solicitud) {
        Usuario solicitante = solicitud.getSolicitante();
        Comision comision = solicitud.getComision();

        return SolicitudResponseDTO.builder()
                .id(solicitud.getId())
                .nombreSolicitante(solicitante == null
                        ? null
                        : solicitante.getNombre() + " " + solicitante.getApellido())
                .reservaOriginalId(solicitud.getReservaOriginal() == null
                        ? null
                        : solicitud.getReservaOriginal().getId())
                .nombreNuevoEspacio(solicitud.getEspacio() == null ? null : solicitud.getEspacio().getNombre())
                .estado(solicitud.getEstado())
                .fechaInicio(solicitud.getDiaDeInicio())
                .fechaFin(solicitud.getDiaDeFin())
                .diaSemana(solicitud.getDiaDeLaSemana())
                .horaInicio(solicitud.getHoraDeInicio())
                .horaFin(solicitud.getHoraDeFin())
                .comentarioEstado(solicitud.getComentarioAdmin())
                .comentarioSolicitante(solicitud.getComentarioSolicitante())
                .fechaHoraSolicitud(solicitud.getFechaHoraSolicitud())
                .nombreComision(comision == null ? null : comision.getNombre())
                .nombreMateria(comision == null || comision.getMateria() == null
                        ? null
                        : comision.getMateria().getNombre())
                .recursos(solicitud.getRecursos().stream()
                        .map(this::recursoSolicitudToResponseDTO)
                        .toList())
                .build();
    }

    private RecursoSolicitudResponseDTO recursoSolicitudToResponseDTO(RecursoSolicitud recursoSolicitud) {
        return RecursoSolicitudResponseDTO.builder()
                .recursoId(recursoSolicitud.getRecurso().getId())
                .nombre(recursoSolicitud.getRecurso().getNombre())
                .cantidad(recursoSolicitud.getCantidadSolicitada())
                .build();
    }

    public List<SolicitudResponseDTO> listarSolicitudesDTO() {
        return listaSolicitudesASolicitudesResponseDTO(solicitudRepository.findAll());
    }

    public List<SolicitudResponseDTO> listaSolicitudesASolicitudesResponseDTO(List<Solicitud> solicitudes) {
        return solicitudes.stream().map(this::solicitudToSolicitudResponseDTO).toList();
    }

    @Transactional
    public Solicitud guardarDTO(SolicitudCreateDTO dto) {
        validarDatos(dto);
        if (dto.getReservaOriginalId() == null) {
            return solicitarNuevaReservaDTO(dto.getSolicitanteId(), dto);
        }
        return solicitarModificacionPorIdReservaDTO(dto.getSolicitanteId(), dto);
    }

    @Transactional
    public Solicitud solicitarNuevaReservaDTO(Long idSolicitante, SolicitudCreateDTO dto) {
        if (dto.getReservaOriginalId() != null) {
            throw new EntityValidationException("Una nueva reserva no puede incluir una reserva original.");
        }
        dto.setSolicitanteId(idSolicitante);
        Solicitud solicitud = solicitudDTOtoSolicitud(dto);
        validarSolicitanteDeComision(solicitud.getSolicitante(), solicitud.getComision());
        recursoService.agregarRecursosASolicitud(solicitud, dto.getRecursos());
        return solicitudRepository.save(solicitud);
    }

    @Transactional
    public Solicitud solicitarModificacionPorIdReservaDTO(Long idSolicitante, SolicitudCreateDTO dto) {
        if (dto.getReservaOriginalId() == null) {
            throw new EntityValidationException("Debe especificar la reserva que desea modificar.");
        }

        dto.setSolicitanteId(idSolicitante);
        Solicitud solicitud = solicitudDTOtoSolicitud(dto);
        Reserva reservaOriginal = solicitud.getReservaOriginal();
        if (!Objects.equals(reservaOriginal.getSolicitante().getId(), idSolicitante)) {
            throw new EntityValidationException("No tiene permiso para modificar esta reserva.");
        }
        if (!Boolean.TRUE.equals(reservaOriginal.getActivo())
                || reservaOriginal.getDiaDeFin().isBefore(LocalDate.now())) {
            throw new EntityValidationException("Solo se pueden modificar reservas actuales o futuras.");
        }
        if (solicitudRepository.existsByReservaOriginal_IdAndEstadoAndActivoTrue(
                reservaOriginal.getId(), EstadoSolicitud.PENDIENTE)) {
            throw new EntityValidationException(
                    "Ya existe una solicitud pendiente para modificar esta reserva.");
        }
        validarSolicitanteDeComision(solicitud.getSolicitante(), solicitud.getComision());
        recursoService.agregarRecursosASolicitud(solicitud, dto.getRecursos());
        return solicitudRepository.save(solicitud);
    }

    @Transactional
    public void eliminar(Long id) {
        Solicitud solicitud = obtenerPorId(id);
        if (solicitud.getEstado() != EstadoSolicitud.PENDIENTE) {
            throw new EntityValidationException("Solo se pueden eliminar solicitudes pendientes.");
        }
        solicitudRepository.delete(solicitud);
    }

    @Transactional
    public Solicitud aprobar(Long id) {
        Solicitud solicitud = obtenerPorId(id);
        if (solicitud.getEstado() != EstadoSolicitud.PENDIENTE) {
            throw new EntityValidationException("Solo se pueden aprobar solicitudes pendientes.");
        }

        recursoService.validarDisponibilidadDeSolicitud(solicitud);
        if (solicitud.getReservaOriginal() == null) {
            reservaService.generarDesdeSolicitud(solicitud);
        } else {
            reservaService.modificarDesdeSolicitud(solicitud);
        }

        solicitud.setEstado(EstadoSolicitud.ACEPTADA);
        solicitud.setComentarioAdmin(null);
        return solicitudRepository.save(solicitud);
    }

    @Transactional
    public Solicitud aprobar(Long id, String comentario) {
        Solicitud solicitud = aprobar(id);
        solicitud.setComentarioAdmin(comentario);
        return solicitudRepository.save(solicitud);
    }

    @Transactional
    public Solicitud rechazar(Long id, String comentario) {
        Solicitud solicitud = obtenerPorId(id);
        if (solicitud.getEstado() != EstadoSolicitud.PENDIENTE) {
            throw new EntityValidationException("Solo se pueden rechazar solicitudes pendientes.");
        }
        solicitud.setEstado(EstadoSolicitud.RECHAZADA);
        solicitud.setComentarioAdmin(comentario);
        return solicitudRepository.save(solicitud);
    }

    @Transactional
    public Solicitud actualizarComentarioAdmin(Long id, String comentario) {
        Solicitud solicitud = obtenerPorId(id);
        solicitud.setComentarioAdmin(comentario);
        return solicitudRepository.save(solicitud);
    }

    public Page<SolicitudResponseDTO> obtenerTodasPaginadasDTO(Pageable pageable) {
        return solicitudRepository.findAll(pageable).map(this::solicitudToSolicitudResponseDTO);
    }

    public Solicitud obtenerPorId(Long id) {
        return solicitudRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitud no encontrada con ID: " + id));
    }

    public SolicitudResponseDTO obtenerPorIdDTO(Long id) {
        return solicitudToSolicitudResponseDTO(obtenerPorId(id));
    }

    public SolicitudResponseDTO obtenerPorIdDTO(Long id, Long solicitanteId) {
        Solicitud solicitud = obtenerPorId(id);
        if (!Objects.equals(solicitud.getSolicitante().getId(), solicitanteId)) {
            throw new ResourceNotFoundException("Solicitud no encontrada con ID: " + id);
        }
        return solicitudToSolicitudResponseDTO(solicitud);
    }

    public List<SolicitudResponseDTO> obtenerPorUsuarioDTO(Long usuarioId) {
        return listaSolicitudesASolicitudesResponseDTO(solicitudRepository.findBySolicitante_Id(usuarioId));
    }

    public Page<SolicitudResponseDTO> obtenerHistorialPorUsuarioDTO(Long usuarioId, Pageable pageable) {
        return solicitudRepository.findBySolicitante_Id(usuarioId, pageable)
                .map(this::solicitudToSolicitudResponseDTO);
    }

    public List<SolicitudResponseDTO> obtenerPorEstadoDTO(EstadoSolicitud estado) {
        return listaSolicitudesASolicitudesResponseDTO(solicitudRepository.findByEstado(estado));
    }

    public Page<SolicitudResponseDTO> obtenerSolicitudesPendientesDTO(Pageable pageable) {
        return solicitudRepository.findByEstado(EstadoSolicitud.PENDIENTE, pageable)
                .map(this::solicitudToSolicitudResponseDTO);
    }

    public List<SolicitudResponseDTO> obtenerPorEstadoYUsuarioDTO(EstadoSolicitud estado, Long usuarioId) {
        return listaSolicitudesASolicitudesResponseDTO(
                solicitudRepository.findByEstadoAndSolicitante_Id(estado, usuarioId));
    }

    public List<SolicitudResponseDTO> obtenerTodasOrdenadasPorFechaHoraSolicitudDescDTO() {
        return listaSolicitudesASolicitudesResponseDTO(
                solicitudRepository.findAllByOrderByFechaHoraSolicitudDesc());
    }

    @Transactional
    public SolicitudResponseDTO cancelarSolicitud(Long idSolicitud, Long idUsuarioSolicitante) {
        Solicitud solicitud = obtenerPorId(idSolicitud);
        if (!Objects.equals(solicitud.getSolicitante().getId(), idUsuarioSolicitante)) {
            throw new EntityValidationException("No tiene permiso para cancelar esta solicitud.");
        }
        if (solicitud.getEstado() != EstadoSolicitud.PENDIENTE) {
            throw new EntityValidationException("Solo se pueden cancelar solicitudes pendientes.");
        }

        solicitud.setEstado(EstadoSolicitud.CANCELADA);
        solicitud.setComentarioAdmin("Cancelada por el solicitante.");
        return solicitudToSolicitudResponseDTO(solicitudRepository.save(solicitud));
    }

    private void validarDatos(SolicitudCreateDTO dto) {
        if (dto == null
                || dto.getFechaInicio() == null
                || dto.getFechaFin() == null
                || dto.getHoraInicio() == null
                || dto.getHoraFin() == null
                || dto.getNuevoEspacioId() == null
                || dto.getComisionId() == null) {
            throw new EntityValidationException("Faltan datos obligatorios para crear la solicitud.");
        }
        if (dto.getFechaInicio().isBefore(LocalDate.now())) {
            throw new EntityValidationException("La fecha de inicio no puede ser anterior a hoy.");
        }
        if (dto.getFechaFin().isBefore(dto.getFechaInicio())) {
            throw new EntityValidationException("La fecha de fin no puede ser anterior a la de inicio.");
        }
        if (!dto.getHoraFin().isAfter(dto.getHoraInicio())) {
            throw new EntityValidationException("La hora de fin debe ser posterior a la de inicio.");
        }
    }

    private void validarEspacioYComision(Espacio espacio, Comision comision) {
        if (Boolean.FALSE.equals(espacio.getActivo())) {
            throw new EntityValidationException("No se puede solicitar un espacio inactivo.");
        }
        if (Boolean.FALSE.equals(comision.getActivo())) {
            throw new EntityValidationException("No se puede solicitar una comisión inactiva.");
        }
        if (espacio.getCapacidad() < comision.getCantidadEstudiantes()) {
            throw new EntityValidationException(
                    "La cantidad de estudiantes no puede ser mayor a la capacidad del espacio solicitado.");
        }
    }

    private void validarSolicitanteDeComision(Usuario solicitante, Comision comision) {
        if (comision.getProfesor() == null
                || !Objects.equals(comision.getProfesor().getId(), solicitante.getId())) {
            throw new EntityValidationException("Solo el profesor asignado a la comisión puede solicitar una reserva.");
        }
    }

    private DiaSemana convertirDiaSemana(DayOfWeek dia) {
        return switch (dia) {
            case MONDAY -> DiaSemana.LUNES;
            case TUESDAY -> DiaSemana.MARTES;
            case WEDNESDAY -> DiaSemana.MIERCOLES;
            case THURSDAY -> DiaSemana.JUEVES;
            case FRIDAY -> DiaSemana.VIERNES;
            case SATURDAY -> DiaSemana.SABADO;
            case SUNDAY -> DiaSemana.DOMINGO;
        };
    }
}
