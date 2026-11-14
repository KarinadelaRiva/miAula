package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.reserva.ReservaModificableDTO;
import com.miAula.miAula.service.ReservaService;
import com.miAula.miAula.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/mias/modificables")
    @PreAuthorize("hasRole('PROFESOR')")
    @Operation(summary = "Obtener reservas actuales y futuras del profesor para solicitar una modificación.")
    public ResponseEntity<List<ReservaModificableDTO>> obtenerMisReservasModificables(
            Authentication authentication) {
        Long solicitanteId = usuarioService.obtenerPorEmailDto(authentication.getName()).getId();
        return ResponseEntity.ok(reservaService.obtenerModificables(solicitanteId));
    }
}