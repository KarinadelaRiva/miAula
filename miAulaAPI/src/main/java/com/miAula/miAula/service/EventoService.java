package com.miAula.miAula.service;

import com.miAula.miAula.dtos.evento.EventoCreateDTO;
import com.miAula.miAula.dtos.evento.EventoResponseDTO;
import com.miAula.miAula.dtos.evento.EventoUpdateDTO;
import com.miAula.miAula.entities.Evento;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.EventoRepository;
import com.miAula.miAula.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;


    public EventoService(
            EventoRepository eventoRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }


    // ============================================================
    // CONVERSIÓN ENTIDAD -> DTO
    // ============================================================

    public EventoResponseDTO eventoToResponseDTO(Evento evento) {

        Usuario organizador = evento.getOrganizador();

        return EventoResponseDTO.builder()
                .id(evento.getId())
                .codigo(evento.getCodigo())
                .nombre(evento.getNombre())
                .descripcion(evento.getDescripcion())
                .participantesMaximos(evento.getParticipantesMaximos())

                .organizadorId(
                        organizador != null
                                ? organizador.getId()
                                : null
                )

                .organizadorNombre(
                        organizador != null
                                ? organizador.getNombre()
                                : null
                )

                .organizadorApellido(
                        organizador != null
                                ? organizador.getApellido()
                                : null
                )

                .organizadorEmail(
                        organizador != null
                                ? organizador.getEmail()
                                : null
                )

                .activo(evento.getActivo())
                .build();
    }


    // ============================================================
    // OBTENER TODOS
    // ============================================================

    @Transactional(readOnly = true)
    public List<EventoResponseDTO> obtenerTodos() {

        return eventoRepository
                .findAllByOrderByNombreAsc()
                .stream()
                .map(this::eventoToResponseDTO)
                .toList();
    }


    // ============================================================
    // OBTENER ACTIVOS
    // ============================================================

    @Transactional(readOnly = true)
    public List<EventoResponseDTO> obtenerActivos() {

        return eventoRepository
                .findByActivoTrueOrderByNombreAsc()
                .stream()
                .map(this::eventoToResponseDTO)
                .toList();
    }


    // ============================================================
    // OBTENER POR ID - DTO
    // ============================================================

    @Transactional(readOnly = true)
    public EventoResponseDTO obtenerDTOPorId(Long id) {

        Evento evento = obtenerPorId(id);

        return eventoToResponseDTO(evento);
    }


    // ============================================================
    // OBTENER ENTIDAD POR ID
    // ============================================================

    @Transactional(readOnly = true)
    public Evento obtenerPorId(Long id) {

        return eventoRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Evento no encontrado con ID: " + id
                        )
                );
    }


    // ============================================================
    // OBTENER EVENTOS POR ORGANIZADOR
    // ============================================================

    @Transactional(readOnly = true)
    public List<EventoResponseDTO> obtenerPorOrganizador(
            Long organizadorId
    ) {

        // Verificamos que exista
        obtenerOrganizador(organizadorId);

        return eventoRepository
                .findByOrganizador_IdAndActivoTrueOrderByNombreAsc(
                        organizadorId
                )
                .stream()
                .map(this::eventoToResponseDTO)
                .toList();
    }


    // ============================================================
    // CREAR EVENTO
    // ============================================================

    @Transactional
    public EventoResponseDTO crearEvento(
            EventoCreateDTO dto
    ) {

        String codigo =
                dto.getCodigo().trim();


        // Validamos código único
        if (eventoRepository.existsByCodigo(codigo)) {

            throw new ResourceConflictException(
                    "Ya existe un evento con el código: "
                            + codigo
            );
        }


        // El organizador debe existir
        Usuario organizador =
                obtenerOrganizador(
                        dto.getOrganizadorId()
                );


        Evento evento = Evento.builder()

                .codigo(codigo)

                .nombre(
                        dto.getNombre().trim()
                )

                .descripcion(
                        limpiarDescripcion(
                                dto.getDescripcion()
                        )
                )

                .participantesMaximos(
                        dto.getParticipantesMaximos()
                )

                .organizador(
                        organizador
                )

                .activo(true)

                .build();


        Evento eventoGuardado =
                eventoRepository.save(evento);


        return eventoToResponseDTO(
                eventoGuardado
        );
    }


    // ============================================================
    // ACTUALIZAR EVENTO
    // ============================================================

    @Transactional
    public EventoResponseDTO actualizarEvento(
            EventoUpdateDTO dto
    ) {

        Evento evento =
                obtenerPorId(
                        dto.getId()
                );


        String codigoNuevo =
                dto.getCodigo().trim();


        /*
         * Puede conservar su propio código.
         * Pero no puede usar el código de otro evento.
         */
        eventoRepository
                .findByCodigo(codigoNuevo)
                .ifPresent(
                        eventoConMismoCodigo -> {

                            if (!eventoConMismoCodigo
                                    .getId()
                                    .equals(evento.getId())) {

                                throw new ResourceConflictException(
                                        "Ya existe otro evento con el código: "
                                                + codigoNuevo
                                );
                            }
                        }
                );


        // El organizador debe existir
        Usuario organizador =
                obtenerOrganizador(
                        dto.getOrganizadorId()
                );


        evento.setCodigo(
                codigoNuevo
        );


        evento.setNombre(
                dto.getNombre().trim()
        );


        evento.setDescripcion(
                limpiarDescripcion(
                        dto.getDescripcion()
                )
        );


        evento.setParticipantesMaximos(
                dto.getParticipantesMaximos()
        );


        evento.setOrganizador(
                organizador
        );


        Evento eventoActualizado =
                eventoRepository.save(evento);


        return eventoToResponseDTO(
                eventoActualizado
        );
    }


    // ============================================================
    // DESHABILITAR EVENTO
    // BAJA LÓGICA
    // ============================================================

    @Transactional
    public void deshabilitarEvento(Long id) {

        Evento evento =
                obtenerPorId(id);


        evento.setActivo(false);


        eventoRepository.save(evento);
    }


    // ============================================================
    // REACTIVAR EVENTO
    // ============================================================

    @Transactional
    public EventoResponseDTO activarEvento(Long id) {

        Evento evento =
                obtenerPorId(id);


        evento.setActivo(true);


        Evento eventoActivado =
                eventoRepository.save(evento);


        return eventoToResponseDTO(
                eventoActivado
        );
    }


    // ============================================================
    // OBTENER Y VALIDAR ORGANIZADOR
    // ============================================================

    private Usuario obtenerOrganizador(Long organizadorId) {

        Usuario usuario = usuarioRepository.findById(organizadorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No se encontró el usuario organizador."
                        )
                );

        if (!usuario.getActivo()) {
            throw new EntityValidationException(
                    "El usuario organizador debe estar activo."
            );
        }

        return usuario;
    }


    // ============================================================
    // LIMPIAR DESCRIPCIÓN
    // ============================================================

    private String limpiarDescripcion(
            String descripcion
    ) {

        if (descripcion == null) {

            return null;
        }


        String descripcionLimpia =
                descripcion.trim();


        return descripcionLimpia.isEmpty()
                ? null
                : descripcionLimpia;
    }
}