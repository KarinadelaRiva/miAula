package com.miAula.miAula.service;

import com.miAula.miAula.dtos.recurso.RecursoCreateDTO;
import com.miAula.miAula.dtos.recurso.RecursoDisponibilidadDTO;
import com.miAula.miAula.dtos.recurso.RecursoResponseDTO;
import com.miAula.miAula.dtos.recurso.RecursoUpdateDTO;
import com.miAula.miAula.util.CodigoUtils;
import com.miAula.miAula.dtos.solicitud.RecursoSolicitadoDTO;
import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import com.miAula.miAula.entities.tablas_intermedias.RecursoReserva;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitudId;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.RecursoRepository;
import com.miAula.miAula.repository.ReservaRepository;
import com.miAula.miAula.repository.SolicitudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Service
public class RecursoService {

    private final RecursoRepository recursoRepository;
    private final ReservaRepository reservaRepository;
    private final SolicitudRepository solicitudRepository;

    public RecursoService(
            RecursoRepository recursoRepository,
            ReservaRepository reservaRepository,
            SolicitudRepository solicitudRepository) {
        this.recursoRepository = recursoRepository;
        this.reservaRepository = reservaRepository;
        this.solicitudRepository = solicitudRepository;
    }

    private static RecursoResponseDTO recursoToRecursoResponseDTO(Recurso recurso) {
        return RecursoResponseDTO.builder()
                .id(recurso.getId())
                .codigo(recurso.getCodigo())
                .nombre(recurso.getNombre())
                .descripcion(recurso.getDescripcion())
                .cantidad(recurso.getCantidad())
                .activo(recurso.getActivo())
                .build();
    }

    private static Recurso recursoCreateDTOToRecurso(RecursoCreateDTO dto) {
        return Recurso.builder()
                .codigo(CodigoUtils.normalizar(dto.getCodigo()))
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .cantidad(dto.getCantidad())
                .build();
    }

    public List<RecursoResponseDTO> getAllRecursosDTO() {
        return recursoRepository.findAll().stream()
                .map(RecursoService::recursoToRecursoResponseDTO)
                .toList();
    }

    public Recurso obtenerPorId(Long id) {
        return recursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + id));
    }

    public RecursoResponseDTO obtenerDTOPorId(Long id) {
        return recursoRepository.findById(id)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + id));
    }

    public RecursoResponseDTO obtenerPorCodigo(String codigo) {
        return recursoRepository.findByCodigo(codigo)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con código: " + codigo));
    }

    public RecursoResponseDTO obtenerPorNombre(String nombre) {
        return recursoRepository.findByNombre(nombre)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con nombre: " + nombre));
    }

    public List<RecursoResponseDTO> obtenerPorCantidadMayorA(Integer cantidad) {
        return recursoRepository.findByCantidadGreaterThanEqual(cantidad).stream()
                .map(RecursoService::recursoToRecursoResponseDTO)
                .toList();
    }

    public Recurso guardar(RecursoCreateDTO recursoDTO) {
        String codigo = CodigoUtils.normalizar(recursoDTO.getCodigo());
        if (recursoRepository.existsByCodigo(codigo)) {
            throw new ResourceConflictException("Ya existe un recurso con ese código");
        }

        if (recursoRepository.existsByNombre(recursoDTO.getNombre())) {
            throw new ResourceConflictException("Ya existe un recurso con ese nombre");
        }

        return recursoRepository.save(recursoCreateDTOToRecurso(recursoDTO));
    }

    public Recurso actualizar(RecursoUpdateDTO nuevoRecurso) {
        Recurso existente = obtenerPorId(nuevoRecurso.getId());

        String codigo = CodigoUtils.normalizar(nuevoRecurso.getCodigo());
        if (!existente.getCodigo().equals(codigo)
                && recursoRepository.existsByCodigo(codigo)) {
            throw new ResourceConflictException("Ya existe otro recurso con ese código");
        }

        if (!existente.getNombre().equals(nuevoRecurso.getNombre())
                && recursoRepository.existsByNombre(nuevoRecurso.getNombre())) {
            throw new ResourceConflictException("Ya existe otro recurso con ese nombre");
        }

        existente.setCodigo(codigo);
        existente.setNombre(nuevoRecurso.getNombre());
        existente.setDescripcion(nuevoRecurso.getDescripcion());
        existente.setCantidad(nuevoRecurso.getCantidad());

        return recursoRepository.save(existente);
    }

    public void deshabilitar(Long id) {
        Recurso recurso = obtenerPorId(id);
        recurso.setActivo(false);
        recursoRepository.save(recurso);
    }

    public Recurso actualizarEstado(Long id, Boolean activo) {
        Recurso recurso = obtenerPorId(id);
        recurso.setActivo(activo);
        return recursoRepository.save(recurso);
    }

    @Transactional(readOnly = true)
    public List<RecursoDisponibilidadDTO> obtenerDisponibles(
            LocalDate fechaInicio,
            LocalDate fechaFin,
            DiaSemana diaSemana,
            LocalTime horaInicio,
            LocalTime horaFin,
            Long reservaOriginalId) {
        validarRango(fechaInicio, fechaFin, diaSemana, horaInicio, horaFin);
        List<Recurso> recursos = recursoRepository.findByActivoTrue();
        Map<Long, Integer> ocupados = calcularOcupacion(
                fechaInicio, fechaFin, diaSemana, horaInicio, horaFin, null, reservaOriginalId);

        return recursos.stream()
                .map(recurso -> RecursoDisponibilidadDTO.builder()
                        .id(recurso.getId())
                        .codigo(recurso.getCodigo())
                        .nombre(recurso.getNombre())
                        .descripcion(recurso.getDescripcion())
                        .cantidad(recurso.getCantidad())
                        .disponible(Math.max(0, recurso.getCantidad() - ocupados.getOrDefault(recurso.getId(), 0)))
                        .build())
                .toList();
    }

    @Transactional
    public void agregarRecursosASolicitud(Solicitud solicitud, List<RecursoSolicitadoDTO> recursosSolicitados) {
        if ((recursosSolicitados == null || recursosSolicitados.isEmpty())
                && solicitud.getReservaOriginal() != null) {
            recursosSolicitados = solicitud.getReservaOriginal().getRecursos().stream()
                    .map(recurso -> new RecursoSolicitadoDTO(
                            recurso.getRecurso().getId(), recurso.getCantidadReservada()))
                    .toList();
        }
        if (recursosSolicitados == null || recursosSolicitados.isEmpty()) {
            return;
        }

        Map<Long, Integer> cantidadesSolicitadas = validarCantidadesSolicitadas(recursosSolicitados);
        List<Recurso> recursos = bloquearRecursos(cantidadesSolicitadas.keySet());
        Map<Long, Recurso> recursosPorId = new HashMap<>();
        for (Recurso recurso : recursos) {
            if (Boolean.FALSE.equals(recurso.getActivo())) {
                throw new EntityValidationException("No se puede solicitar un recurso inactivo: " + recurso.getNombre());
            }
            recursosPorId.put(recurso.getId(), recurso);
        }

        Map<Long, Integer> ocupados = calcularOcupacion(
                solicitud.getDiaDeInicio(),
                solicitud.getDiaDeFin(),
                solicitud.getDiaDeLaSemana(),
                solicitud.getHoraDeInicio(),
                solicitud.getHoraDeFin(),
                null,
                solicitud.getReservaOriginal() == null ? null : solicitud.getReservaOriginal().getId());

        for (Map.Entry<Long, Integer> solicitado : cantidadesSolicitadas.entrySet()) {
            Recurso recurso = recursosPorId.get(solicitado.getKey());
            int disponible = recurso.getCantidad() - ocupados.getOrDefault(recurso.getId(), 0);
            if (solicitado.getValue() > disponible) {
                throw new EntityValidationException(
                        "No hay suficiente cantidad disponible de " + recurso.getNombre()
                                + " para el rango y horario solicitado. Disponible: " + Math.max(disponible, 0) + ".");
            }

            RecursoSolicitud recursoSolicitud = RecursoSolicitud.builder()
                    .id(new RecursoSolicitudId(recurso.getId(), null))
                    .recurso(recurso)
                    .solicitud(solicitud)
                    .cantidadSolicitada(solicitado.getValue())
                    .build();
            solicitud.getRecursos().add(recursoSolicitud);
        }
    }

    @Transactional
    public void validarDisponibilidadDeSolicitud(Solicitud solicitud) {
        if (solicitud.getRecursos().isEmpty()) {
            return;
        }

        Set<Long> recursoIds = new HashSet<>();
        solicitud.getRecursos().forEach(recurso -> recursoIds.add(recurso.getRecurso().getId()));
        List<Recurso> recursos = bloquearRecursos(recursoIds);
        Map<Long, Recurso> recursosPorId = new HashMap<>();
        recursos.forEach(recurso -> recursosPorId.put(recurso.getId(), recurso));

        Map<Long, Integer> ocupados = calcularOcupacion(
                solicitud.getDiaDeInicio(),
                solicitud.getDiaDeFin(),
                solicitud.getDiaDeLaSemana(),
                solicitud.getHoraDeInicio(),
                solicitud.getHoraDeFin(),
                solicitud.getId(),
                solicitud.getReservaOriginal() == null ? null : solicitud.getReservaOriginal().getId());

        for (RecursoSolicitud recursoSolicitud : solicitud.getRecursos()) {
            Recurso recurso = recursosPorId.get(recursoSolicitud.getRecurso().getId());
            if (recurso == null || Boolean.FALSE.equals(recurso.getActivo())) {
                throw new EntityValidationException("Uno de los recursos solicitados ya no está disponible.");
            }
            int disponible = recurso.getCantidad() - ocupados.getOrDefault(recurso.getId(), 0);
            if (recursoSolicitud.getCantidadSolicitada() > disponible) {
                throw new EntityValidationException(
                        "No hay suficiente cantidad disponible de " + recurso.getNombre()
                                + " para aprobar la solicitud. Disponible: " + Math.max(disponible, 0) + ".");
            }
        }
    }

    private List<Recurso> bloquearRecursos(Set<Long> ids) {
        List<Recurso> recursos = recursoRepository.findAllByIdInForUpdate(ids);
        if (recursos.size() != ids.size()) {
            throw new ResourceNotFoundException("Uno o más recursos solicitados no existen.");
        }
        return recursos;
    }

    private Map<Long, Integer> validarCantidadesSolicitadas(List<RecursoSolicitadoDTO> solicitudes) {
        Map<Long, Integer> cantidades = new HashMap<>();
        for (RecursoSolicitadoDTO solicitud : solicitudes) {
            if (solicitud.getRecursoId() == null || solicitud.getCantidad() == null || solicitud.getCantidad() < 1) {
                throw new EntityValidationException("Cada recurso debe tener un identificador y una cantidad mayor a cero.");
            }
            if (cantidades.putIfAbsent(solicitud.getRecursoId(), solicitud.getCantidad()) != null) {
                throw new EntityValidationException("No se puede repetir un recurso en la misma solicitud.");
            }
        }
        return cantidades;
    }

    private Map<Long, Integer> calcularOcupacion(
            LocalDate fechaInicio,
            LocalDate fechaFin,
            DiaSemana diaSemana,
            LocalTime horaInicio,
            LocalTime horaFin,
            Long solicitudExcluidaId,
            Long reservaExcluidaId) {
        Map<Long, Integer> ocupados = new HashMap<>();

        List<Reserva> reservas = reservaRepository
                .findByDiaDeLaSemanaAndActivoTrueAndDiaDeInicioLessThanEqualAndDiaDeFinGreaterThanEqual(
                        diaSemana, fechaFin, fechaInicio);
        for (Reserva reserva : reservas) {
            if (Objects.equals(reserva.getId(), reservaExcluidaId)) {
                continue;
            }
            if (seSolapan(reserva.getDiaDeInicio(), reserva.getDiaDeFin(),
                    reserva.getHoraDeInicio(), reserva.getHoraDeFin(),
                    fechaInicio, fechaFin, horaInicio, horaFin)) {
                for (RecursoReserva recurso : reserva.getRecursos()) {
                    ocupados.merge(recurso.getRecurso().getId(), recurso.getCantidadReservada(), Integer::sum);
                }
            }
        }

        List<Solicitud> solicitudesPendientes = solicitudRepository
                .findByEstadoAndDiaDeLaSemanaAndDiaDeInicioLessThanEqualAndDiaDeFinGreaterThanEqual(
                        EstadoSolicitud.PENDIENTE, diaSemana, fechaFin, fechaInicio);
        for (Solicitud solicitud : solicitudesPendientes) {
            if (Objects.equals(solicitud.getId(), solicitudExcluidaId)
                    || !seSolapan(solicitud.getDiaDeInicio(), solicitud.getDiaDeFin(),
                    solicitud.getHoraDeInicio(), solicitud.getHoraDeFin(),
                    fechaInicio, fechaFin, horaInicio, horaFin)) {
                continue;
            }
            for (RecursoSolicitud recurso : solicitud.getRecursos()) {
                ocupados.merge(recurso.getRecurso().getId(), recurso.getCantidadSolicitada(), Integer::sum);
            }
        }
        return ocupados;
    }

    private boolean seSolapan(
            LocalDate inicioExistente,
            LocalDate finExistente,
            LocalTime horaInicioExistente,
            LocalTime horaFinExistente,
            LocalDate inicioSolicitado,
            LocalDate finSolicitado,
            LocalTime horaInicioSolicitada,
            LocalTime horaFinSolicitada) {
        return !inicioSolicitado.isAfter(finExistente)
                && !finSolicitado.isBefore(inicioExistente)
                && horaInicioSolicitada.isBefore(horaFinExistente)
                && horaFinSolicitada.isAfter(horaInicioExistente);
    }

    private void validarRango(
            LocalDate fechaInicio,
            LocalDate fechaFin,
            DiaSemana diaSemana,
            LocalTime horaInicio,
            LocalTime horaFin) {
        if (fechaInicio == null || fechaFin == null || diaSemana == null
                || horaInicio == null || horaFin == null) {
            throw new EntityValidationException("Debe especificar fechas, día y horario para consultar disponibilidad.");
        }
        if (fechaFin.isBefore(fechaInicio) || !horaFin.isAfter(horaInicio)) {
            throw new EntityValidationException("El rango de fechas u horario solicitado no es válido.");
        }
    }
}
