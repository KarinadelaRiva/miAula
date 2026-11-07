package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.solicitud.SolicitudCreateDTO;
import com.miAula.miAula.dtos.solicitud.SolicitudResponseDTO;
import com.miAula.miAula.dtos.usuario.UsuarioResponseDTO;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import com.miAula.miAula.service.SolicitudService;
import com.miAula.miAula.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/solicitudes")
@Tag(name = "Solicitudes", description = "Operaciones relacionadas con las solicitudes.")
public class SolicitudController {

    private final SolicitudService solicitudService;
    private final UsuarioService usuarioService;

    @Autowired
    public SolicitudController(SolicitudService solicitudService, UsuarioService usuarioService) {
        this.solicitudService = solicitudService;
        this.usuarioService = usuarioService;
    }


    @Operation(
            summary = "Obtener todas las solicitudes",
            description = "Devuelve la lista de todas las solicitudes ordenadas por fecha y hora de solicitud descendente.")
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<SolicitudResponseDTO>> obtenerSolicitudes() {

        List<SolicitudResponseDTO> solicitudes = solicitudService.obtenerTodasOrdenadasPorFechaHoraSolicitudDescDTO();

        if (solicitudes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(solicitudes);
    }

    @Operation(
            summary = "Obtener solicitud por ID",
            description = "Devuelve los detalles de una solicitud específica según su ID.")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('PROFESOR')")
    public ResponseEntity<SolicitudResponseDTO> obtenerSolicitudPorId(
            @Parameter(description = "ID de la solicitud", example = "1")
            @PathVariable Long id,
            Authentication authentication) {
        boolean esAdministrador = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMINISTRADOR"));
        SolicitudResponseDTO solicitud = esAdministrador
                ? solicitudService.obtenerPorIdDTO(id)
                : solicitudService.obtenerPorIdDTO(
                        id, usuarioService.obtenerPorEmailDto(authentication.getName()).getId());
        return ResponseEntity.ok(solicitud);
    }

    @Operation(
            summary = "Cancelar solicitud",
            description = "Cancela una solicitud pendiente existente según su ID y actualiza sus datos.")
    @PutMapping("/{id}/cancelar")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<SolicitudResponseDTO> cancelarSolicitud(
            @Parameter(description = "ID de la solicitud a cancelar", example = "1")
            @PathVariable Long id,
            Authentication authentication ) {

        String username = authentication.getName();
        UsuarioResponseDTO usuario = usuarioService.obtenerPorEmailDto(username);
        SolicitudResponseDTO cancelada = solicitudService.cancelarSolicitud(id , usuario.getId());

        return ResponseEntity.ok(cancelada);
    }

    @Operation(
            summary = "Buscar solicitudes",
            description = "Permite buscar solicitudes por ID de usuario y/o estado. Si no se especifican parámetros, devuelve todas las solicitudes.")
    @GetMapping("/buscar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<SolicitudResponseDTO>> buscarSolicitudes(
            @Parameter(description = "ID del usuario solicitante", example = "5")
            @RequestParam(required = false) Long idUsuario,
            @Parameter(description = "Estado de la solicitud (PENDIENTE, ACEPTADA, RECHAZADA, CANCELADA)", example = "PENDIENTE")
            @RequestParam(required = false) EstadoSolicitud estado) {

        List<SolicitudResponseDTO> resultado;

        if (idUsuario != null && estado != null) {
            resultado = solicitudService.obtenerPorEstadoYUsuarioDTO(estado, idUsuario);
        } else if (idUsuario != null) {
            resultado = solicitudService.obtenerPorUsuarioDTO(idUsuario);
        } else if (estado != null) {
            resultado = solicitudService.obtenerPorEstadoDTO(estado);
        } else {
            resultado = solicitudService.obtenerTodasOrdenadasPorFechaHoraSolicitudDescDTO();
        }

        if (resultado.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(resultado);
    }

    @Operation(
            summary = "Aprobar solicitud",
            description = "Aprueba una solicitud existente según su ID.")
    @PutMapping("/{id}/aprobar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<SolicitudResponseDTO> aprobarSolicitud(
            @Parameter(description = "ID de la solicitud a aprobar", example = "1")
            @PathVariable Long id,
            @RequestBody(required = false) String comentario) {
        return ResponseEntity.ok(solicitudService.solicitudToSolicitudResponseDTO(
                solicitudService.aprobar(id, comentario)));
    }

    @Operation(
            summary = "Rechazar solicitud",
            description = "Rechaza una solicitud existente según su ID y guarda un comentario de rechazo.")
    @PutMapping("/{id}/rechazar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<SolicitudResponseDTO> rechazarSolicitud(
            @Parameter(description = "ID de la solicitud a rechazar", example = "1")
            @PathVariable Long id,
            @Parameter(description = "Comentario del rechazo", example = "No se cumplen los requisitos")
            @RequestBody(required = false) String comentario) {
        return ResponseEntity.ok(solicitudService.solicitudToSolicitudResponseDTO(
                solicitudService.rechazar(id, comentario)));
    }

    @PatchMapping("/{id}/comentario")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<SolicitudResponseDTO> actualizarComentarioAdmin(
            @PathVariable Long id,
            @RequestBody Map<String, String> cuerpo) {
        return ResponseEntity.ok(solicitudService.solicitudToSolicitudResponseDTO(
                solicitudService.actualizarComentarioAdmin(id, cuerpo.get("comentario"))));
    }

    @Operation(
            summary = "Solicitar nueva reserva",
            description = "Permite crear una nueva solicitud de reserva con los datos proporcionados.")
    @PostMapping("/nueva")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<SolicitudResponseDTO> solicitarNuevaReserva(
            @Parameter(description = "Datos de la nueva solicitud", required = true)
            @Valid @RequestBody SolicitudCreateDTO solicitud,
            Authentication authentication) {

        String usuarioLogueado = authentication.getName();
        Long solicitanteId = usuarioService.obtenerPorEmailDto(usuarioLogueado).getId();
        SolicitudResponseDTO nueva = solicitudService.solicitudToSolicitudResponseDTO(
                solicitudService.solicitarNuevaReservaDTO(solicitanteId, solicitud));
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @Operation(
            summary = "Solicitar modificación de reserva",
            description = "Permite solicitar la modificación de una reserva existente proporcionando el ID de la reserva y los nuevos datos.")
    @PostMapping("/modificar")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<SolicitudResponseDTO> solicitarModificacionReservaPorId(
            @Parameter(description = "Datos de la nueva solicitud de modificación", required = true)
            @Valid @RequestBody SolicitudCreateDTO datosNuevos,
            Authentication authentication) {

        String usuarioLogueado = authentication.getName();
        Long solicitanteId = usuarioService.obtenerPorEmailDto(usuarioLogueado).getId();
        SolicitudResponseDTO solicitud = solicitudService.solicitudToSolicitudResponseDTO(
                solicitudService.solicitarModificacionPorIdReservaDTO(solicitanteId, datosNuevos));
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitud);
    }

    @Operation(
            summary = "Obtener solicitudes pendientes paginadas",
            description = "Devuelve una página de solicitudes pendientes, ordenadas por fecha y hora de solicitud descendente.")
    @GetMapping("/pendientes")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Page<SolicitudResponseDTO>> obtenerPendientesPaginado(
            @Parameter(description = "Número de página a obtener", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Número de elementos por página", example = "10")
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaHoraSolicitud").descending());
        Page<SolicitudResponseDTO> pendientes = solicitudService.obtenerSolicitudesPendientesDTO(pageable);

        if (pendientes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(pendientes);
    }

    @Operation(
            summary = "Historial de solicitudes de un usuario paginado",
            description = "Devuelve el historial paginado de solicitudes de un usuario específico.")
    @GetMapping("/usuario/historial")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<Page<SolicitudResponseDTO>> historialSolicitudesUsuarioPaginado(
            Authentication authentication,
            @Parameter(description = "Número de página a obtener", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Número de elementos por página", example = "10")
            @RequestParam(defaultValue = "10") int size) {
        Long usuarioId = usuarioService.obtenerPorEmailDto(authentication.getName()).getId();

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaHoraSolicitud").descending());
        Page<SolicitudResponseDTO> historial = solicitudService.obtenerHistorialPorUsuarioDTO(usuarioId, pageable);

        if (historial.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(historial);
    }

    @Operation(
            summary = "Historial total de solicitudes paginado",
            description = "Devuelve el historial total paginado de todas las solicitudes registradas.")
    @GetMapping("/historial")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Page<SolicitudResponseDTO>> historialTotal(
            @Parameter(description = "Número de página a obtener", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Número de elementos por página", example = "10")
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaHoraSolicitud").descending());
        Page<SolicitudResponseDTO> historial = solicitudService.obtenerTodasPaginadasDTO(pageable);

        if (historial.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(historial);
    }
}
