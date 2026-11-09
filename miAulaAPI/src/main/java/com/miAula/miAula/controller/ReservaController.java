package com.miAula.miAula.controller;

import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.service.ReservaService;
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
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @GetMapping("/mis-reservas")
    @PreAuthorize("hasRole('PROFESOR')") 
    public ResponseEntity<List<Reserva>> obtenerMisReservas(Authentication authentication) {
        return ResponseEntity.ok(reservaService.obtenerReservasDeUsuario(authentication.getName()));
    }

    @GetMapping("/activas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<Reserva>> obtenerReservasActivas() {
        return new ResponseEntity<>(reservaService.obtenerReservasActivas(), HttpStatus.OK);
    }

    @GetMapping("/terminadas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<Reserva>> obtenerReservasTerminadas() {
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


}
