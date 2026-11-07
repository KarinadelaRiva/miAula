package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.recurso.*;
import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.service.RecursoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Controller
@RequestMapping("/recursos")
@Tag(name = "Recursos", description = "Operaciones relacionadas con los recursos.")
public class RecursoController {

    private final RecursoService recursoService;

    @Autowired
    public RecursoController(RecursoService recursoService) {
        this.recursoService = recursoService;
    }

    @GetMapping
    @Operation(summary = "Obtener todos los recursos.",
            description = "Permite obtener un listado con todos los recursos.")
    public ResponseEntity<List<RecursoResponseDTO>> obtenerRecursos() {
        return new ResponseEntity<>(recursoService.getAllRecursosDTO(), HttpStatus.OK);
    }

    @GetMapping("/disponibles")
    @Operation(summary = "Consultar recursos disponibles para un horario.")
    public ResponseEntity<List<RecursoDisponibilidadDTO>> obtenerRecursosDisponibles(
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin,
            @RequestParam DiaSemana diaSemana,
            @RequestParam LocalTime horaInicio,
            @RequestParam LocalTime horaFin,
            @RequestParam(required = false) Long reservaOriginalId) {
        return ResponseEntity.ok(recursoService.obtenerDisponibles(
                fechaInicio, fechaFin, diaSemana, horaInicio, horaFin, reservaOriginalId));
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "Obtener recurso por id.",
            description = "Permite obtener un recurso por medio de su id.")
    public ResponseEntity<RecursoResponseDTO> obtenerRecursoPorId(
            @Parameter(description = "ID del recurso a buscar", example = "1")
            @PathVariable Long id) {
        return new ResponseEntity<>(recursoService.obtenerDTOPorId(id), HttpStatus.OK);
    }

    @GetMapping("/codigo/{codigo}")
    @Operation(summary = "Obtener recurso por código.",
            description = "Permite obtener un recurso por medio de su código.")
    public ResponseEntity<RecursoResponseDTO> obtenerRecursoPorCodigo(
            @Parameter(description = "Código del recurso a buscar", example = "PROY01")
            @PathVariable String codigo) {
        return new ResponseEntity<>(recursoService.obtenerPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping("/nombre/{nombre}")
    @Operation(summary = "Obtener recurso por nombre.",
            description = "Permite obtener un recurso por medio de su nombre.")
    public ResponseEntity<RecursoResponseDTO> obtenerRecursoPorNombre(
            @Parameter(description = "Nombre del recurso a buscar", example = "Proyector")
            @PathVariable String nombre) {
        return new ResponseEntity<>(recursoService.obtenerPorNombre(nombre), HttpStatus.OK);
    }

    @GetMapping("/cantidad/{cantidad}")
    @Operation(summary = "Obtener recursos por cantidad mínima.",
            description = "Permite obtener los recursos cuya cantidad sea al menos la especificada.")
    public ResponseEntity<List<RecursoResponseDTO>> obtenerRecursosPorCantidadMayorA(
            @Parameter(description = "Cantidad mínima del recurso", example = "2")
            @PathVariable Integer cantidad) {
        return new ResponseEntity<>(recursoService.obtenerPorCantidadMayorA(cantidad), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Crear recurso.",
            description = "Permite crear un nuevo recurso.")
    public ResponseEntity<Recurso> crearRecurso(@Valid @RequestBody RecursoCreateDTO recurso) {
        return new ResponseEntity<>(recursoService.guardar(recurso), HttpStatus.CREATED);
    }

    @PutMapping
    @Operation(summary = "Actualizar recurso.",
            description = "Permite actualizar un recurso.")
    public ResponseEntity<Recurso> actualizarRecurso(
            @Parameter(description = "Datos del recurso a actualizar")
            @Valid @RequestBody RecursoUpdateDTO recurso) {
        return new ResponseEntity<>(recursoService.actualizar(recurso), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Deshabilitar recurso.",
            description = "Permite deshabilitar un recurso.")
    public ResponseEntity<Void> deshabilitarRecurso(
            @Parameter(description = "ID del recurso a deshabilitar", example = "1")
            @PathVariable Long id) {
        recursoService.deshabilitar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Actualizar estado de un recurso.",
            description = "Permite habilitar o deshabilitar un recurso.")
    public ResponseEntity<Recurso> actualizarEstado(
            @Parameter(description = "ID del recurso", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody RecursoEstadoDTO estado) {
        return new ResponseEntity<>(recursoService.actualizarEstado(id, estado.getActivo()), HttpStatus.OK);
    }
}
