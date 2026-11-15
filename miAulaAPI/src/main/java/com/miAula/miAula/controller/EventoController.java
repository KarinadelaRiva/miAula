package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.evento.EventoCreateDTO;
import com.miAula.miAula.dtos.evento.EventoResponseDTO;
import com.miAula.miAula.dtos.evento.EventoUpdateDTO;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.service.EventoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/eventos")
public class EventoController {

    private final EventoService eventoService;


    public EventoController(
            EventoService eventoService
    ) {
        this.eventoService = eventoService;
    }


    // ============================================================
    // OBTENER TODOS LOS EVENTOS
    // ADMINISTRADOR
    // ============================================================

    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<EventoResponseDTO>> obtenerTodos() {

        return ResponseEntity.ok(
                eventoService.obtenerTodos()
        );
    }


    // ============================================================
    // OBTENER EVENTOS ACTIVOS
    // ADMINISTRADOR
    // ============================================================

    @GetMapping("/activos")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<EventoResponseDTO>> obtenerActivos() {

        return ResponseEntity.ok(
                eventoService.obtenerActivos()
        );
    }


    // ============================================================
    // OBTENER MIS EVENTOS
    // PROFESOR
    // ============================================================

    @GetMapping("/mis-eventos")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<List<EventoResponseDTO>> obtenerMisEventos(
            Authentication authentication
    ) {

        Usuario usuario =
                (Usuario) authentication.getPrincipal();


        return ResponseEntity.ok(
                eventoService.obtenerPorOrganizador(
                        usuario.getId()
                )
        );
    }


    // ============================================================
    // OBTENER EVENTOS POR ORGANIZADOR
    // ADMINISTRADOR
    // ============================================================

    @GetMapping("/organizador/{organizadorId}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<EventoResponseDTO>> obtenerPorOrganizador(
            @PathVariable Long organizadorId
    ) {

        return ResponseEntity.ok(
                eventoService.obtenerPorOrganizador(
                        organizadorId
                )
        );
    }


    // ============================================================
    // OBTENER EVENTO POR ID
    // ADMINISTRADOR
    // ============================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponseDTO> obtenerPorId(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                eventoService.obtenerDTOPorId(id)
        );
    }


    // ============================================================
    // CREAR EVENTO
    // ADMINISTRADOR
    // ============================================================

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponseDTO> crearEvento(
            @Valid @RequestBody EventoCreateDTO dto
    ) {

        EventoResponseDTO eventoCreado =
                eventoService.crearEvento(dto);


        return new ResponseEntity<>(
                eventoCreado,
                HttpStatus.CREATED
        );
    }


    // ============================================================
    // ACTUALIZAR EVENTO
    // ADMINISTRADOR
    // ============================================================

    @PutMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponseDTO> actualizarEvento(
            @Valid @RequestBody EventoUpdateDTO dto
    ) {

        return ResponseEntity.ok(
                eventoService.actualizarEvento(dto)
        );
    }


    // ============================================================
    // DESHABILITAR EVENTO
    // BAJA LÓGICA
    // ADMINISTRADOR
    // ============================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Map<String, String>> deshabilitarEvento(
            @PathVariable Long id
    ) {

        eventoService.deshabilitarEvento(id);


        return ResponseEntity.ok(
                Map.of(
                        "mensaje",
                        "Evento deshabilitado correctamente."
                )
        );
    }


    // ============================================================
    // REACTIVAR EVENTO
    // ADMINISTRADOR
    // ============================================================

    @PutMapping("/activar/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponseDTO> activarEvento(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                eventoService.activarEvento(id)
        );
    }
}