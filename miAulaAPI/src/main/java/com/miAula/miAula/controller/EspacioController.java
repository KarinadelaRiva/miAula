package com.miAula.miAula.controller;

import java.util.List;

import com.miAula.miAula.dtos.espacio.EspacioUpdateDTO;
import com.miAula.miAula.dtos.espacio.EspacioEstadoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.miAula.miAula.dtos.espacio.EspacioCreateDTO;
import com.miAula.miAula.dtos.espacio.EspacioResponseDTO;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.service.EspacioService;

@RestController
@RequestMapping("/espacios")
@Tag(name = "Espacios", description = "Operaciones relacionadas con los espacios.")
public class EspacioController {
    
    private final EspacioService espacioService;

    @Autowired
    public EspacioController(EspacioService espacioService) {
        this.espacioService = espacioService;
    }

    @GetMapping
    @Operation(
            summary = "Obtener todos los espacios.",
            description = "Permite a los usuarios obtener un listado con todos los espacios.")

    public ResponseEntity<List<EspacioResponseDTO>> obtenerEspacios() {
        return new ResponseEntity<>(espacioService.getAllEspaciosDTO(), HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    @Operation(
            summary = "Obtener espacio por id.",
            description = "Permite a los usuarios obtener un espacio por medio de su id.")
    public ResponseEntity<EspacioResponseDTO> obtenerEspacioPorId(
            @Parameter(description = "ID del espacio a buscar", example = "1")
            @PathVariable Long id) {
        return new ResponseEntity<>(espacioService.obtenerDTOPorId(id), HttpStatus.OK);
    }

    @GetMapping("/codigo/{codigo}")
    @Operation(
            summary = "Obtener espacio por código.",
            description = "Permite a los usuarios obtener un espacio por medio de su código.")
    public ResponseEntity<EspacioResponseDTO> obtenerEspacioPorCodigo(
            @Parameter(description = "Código del espacio a buscar", example = "AULA01")
            @PathVariable String codigo) {
        return new ResponseEntity<>(espacioService.obtenerPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping("/nombre/{nombre}")
    @Operation(
            summary = "Obtener espacio por nombre.",
            description = "Permite a los usuarios obtener un espacio por medio de su nombre.")
    public ResponseEntity<EspacioResponseDTO> obtenerEspacioPorNombre(
            @Parameter(description = "Nombre del espacio a buscar", example = "Aula 101")
            @PathVariable String nombre) {
        return new ResponseEntity<>(espacioService.obtenerPorNombre(nombre), HttpStatus.OK);
    }

//    @GetMapping("/{id}/reservas")
//    @Operation(
//            summary = "Obtener reservas de un espacio.",
//            description = "Permite a administradores obtener las reservas de un espacio por medio de su id.")
//    public ResponseEntity<List<ReservaResponseDTO>> obtenerReservasPorEspacio(
//            @Parameter(description = "ID del espacio para obtener sus reservas", example = "1")
//            @PathVariable Long id) {
//        return new ResponseEntity<>(espacioService.obtenerReservasPorEspacio(id), HttpStatus.OK);
//    }

    @GetMapping("/capacidad/{capacidad}")
    @Operation(
            summary = "Obtener espacio por capacidad mayor a valor pasado por parámetro.",
            description = "Permite a administradores y profesores obtener un listado de los espacios que cumplan al menos con la capacidad especificada.")
    public ResponseEntity<List<EspacioResponseDTO>> obtenerEspaciosPorCapacidadMayorA(
            @Parameter(description = "Capacidad mínima del espacio", example = "30")
            @PathVariable Integer capacidad) {
        return new ResponseEntity<>(espacioService.obtenerPorCapacidadMayorA(capacidad), HttpStatus.OK);
    }

    @PostMapping
    @Operation(
            summary = "Crear espacio.",
            description = "Permite a administradores crear un nuevo espacio.")
    public ResponseEntity<Espacio> crearEspacio(@RequestBody EspacioCreateDTO espacio) {
        System.err.println("CONTROLLER");
        return new ResponseEntity<>(espacioService.guardar(espacio), HttpStatus.CREATED);
    }

    @PutMapping
    @Operation(
            summary = "Actualizar espacio.",
            description = "Permite a administradores actualizar un espacio.")
    public ResponseEntity<Espacio> actualizarEspacio(
            @Parameter(description = "Datos del espacio a actualizar")
            @Valid @RequestBody EspacioUpdateDTO espacio) {
        return new ResponseEntity<>(espacioService.actualizar(espacio), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Deshabilitar espacio.",
            description = "Permite a administradores deshabilitar un espacio.")
    public  ResponseEntity<Espacio> DeshabilitarEspacio(
            @Parameter(description = "ID del espacio a deshabilitar", example = "1")
            @PathVariable Long id) {
        espacioService.deshabilitar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    @Operation(
            summary = "Actualizar estado de un espacio.",
            description = "Permite habilitar o deshabilitar un espacio.")
    public ResponseEntity<EspacioResponseDTO> actualizarEstado(
            @Parameter(description = "ID del espacio", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody EspacioEstadoDTO estado) {
        return new ResponseEntity<>(
                espacioService.actualizarEstado(id, estado.getActivo()),
                HttpStatus.OK);
    }

}
