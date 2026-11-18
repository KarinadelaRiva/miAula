package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.reserva.ReservaModificableDTO;
import com.miAula.miAula.dtos.reserva.ReservaCalendarioDTO;
import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.service.ReservaService;
import com.miAula.miAula.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@Tag(name = "Reservas", description = "Operaciones relacionadas con las reservas.")
public class ReservaController {

    private final ReservaService reservaService;
    private final UsuarioService usuarioService;

    public ReservaController(ReservaService reservaService, UsuarioService usuarioService) {
        this.reservaService = reservaService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @Operation(summary = "Obtener reservas para el calendario.")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerReservas() {
        return ResponseEntity.ok(reservaService.obtenerReservasParaCalendario());
    }

    @GetMapping("/mis-reservas")
    @PreAuthorize("hasRole('PROFESOR')")
    @Operation(summary = "Obtener las reservas del profesor autenticado.")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerMisReservas(Authentication authentication) {
        return ResponseEntity.ok(reservaService.obtenerReservasDeUsuario(authentication.getName()));
    }

    @GetMapping("/mis-reservas/activas")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerMisReservasActivas(
            Authentication authentication) {
        return ResponseEntity.ok(reservaService.obtenerReservasActivasDeUsuario(authentication.getName()));
    }

    @GetMapping("/mis-reservas/terminadas")
    @PreAuthorize("hasRole('PROFESOR')")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerMisReservasTerminadas(
            Authentication authentication) {
        return ResponseEntity.ok(reservaService.obtenerReservasTerminadasDeUsuario(authentication.getName()));
    }

    @GetMapping("/activas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerReservasActivas() {
        return new ResponseEntity<>(reservaService.obtenerReservasActivas(), HttpStatus.OK);
    }

    @GetMapping("/terminadas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<ReservaCalendarioDTO>> obtenerReservasTerminadas() {
        return new ResponseEntity<>(reservaService.obtenerReservasTerminadas(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('PROFESOR')")
    public ResponseEntity<Void> desactivarReserva(
            @PathVariable Long id,
            Authentication authentication) {
        boolean esAdministrador = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMINISTRADOR".equals(authority.getAuthority()));
        reservaService.desactivarReserva(id, authentication.getName(), esAdministrador);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mias/modificables")
    @PreAuthorize("hasRole('PROFESOR')")
    @Operation(summary = "Obtener reservas actuales y futuras del profesor para solicitar una modificación.")
    public ResponseEntity<List<ReservaModificableDTO>> obtenerMisReservasModificables(
            Authentication authentication) {
        Long solicitanteId = usuarioService.obtenerPorEmailDto(authentication.getName()).getId();
        return ResponseEntity.ok(reservaService.obtenerModificables(solicitanteId));
    }
}
