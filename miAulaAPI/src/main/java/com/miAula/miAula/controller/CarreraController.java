package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.carrera.CarreraCreateDTO;
import com.miAula.miAula.dtos.carrera.CarreraResponseDTO;
import com.miAula.miAula.dtos.carrera.CarreraUpdateDTO;
import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.service.CarreraMateriaService;
import com.miAula.miAula.service.CarreraService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carreras")
@CrossOrigin(origins = "http://localhost:4200")
public class CarreraController {

    private final CarreraService carreraService;
    private final CarreraMateriaService carreraMateriaService;

    public CarreraController(
            CarreraService carreraService,
            CarreraMateriaService carreraMateriaService) {

        this.carreraService = carreraService;
        this.carreraMateriaService = carreraMateriaService;
    }

    // Obtener todas las carreras activas
    @GetMapping
    public ResponseEntity<List<CarreraResponseDTO>> obtenerCarreras() {

        return ResponseEntity.ok(
                carreraService.obtenerTodas()
        );
    }

    // Obtener una carrera por ID
    @GetMapping("/{id}")
    public ResponseEntity<CarreraResponseDTO> obtenerCarreraPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                carreraService.obtenerDTOPorId(id)
        );
    }

    // Obtener materias asociadas a una carrera
    @GetMapping("/{carreraId}/materias")
    public ResponseEntity<List<MateriaResponseDTO>> obtenerMateriasDeCarrera(
            @PathVariable Long carreraId) {

        return ResponseEntity.ok(
                carreraMateriaService.obtenerMateriasPorCarrera(carreraId)
        );
    }

    // Crear carrera
    @PostMapping
    public ResponseEntity<CarreraResponseDTO> crearCarrera(
            @Valid @RequestBody CarreraCreateDTO dto) {

        CarreraResponseDTO carreraCreada =
                carreraService.crearCarrera(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(carreraCreada);
    }

    // Asignar una materia a una carrera
    @PostMapping("/{carreraId}/materias/{materiaId}")
    public ResponseEntity<MateriaResponseDTO> asignarMateriaACarrera(
            @PathVariable Long carreraId,
            @PathVariable Long materiaId) {

        MateriaResponseDTO materiaAsignada =
                carreraMateriaService.asignarMateriaACarrera(
                        carreraId,
                        materiaId
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(materiaAsignada);
    }

    // Actualizar carrera
    @PutMapping("/{id}")
    public ResponseEntity<CarreraResponseDTO> actualizarCarrera(
            @PathVariable Long id,
            @Valid @RequestBody CarreraUpdateDTO dto) {

        CarreraResponseDTO carreraActualizada =
                carreraService.actualizarCarrera(id, dto);

        return ResponseEntity.ok(carreraActualizada);
    }

    // Baja lógica de carrera
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarrera(
            @PathVariable Long id) {

        carreraService.eliminarCarrera(id);

        return ResponseEntity.noContent().build();
    }

    // Eliminar la relación entre una carrera y una materia
    @DeleteMapping("/{carreraId}/materias/{materiaId}")
    public ResponseEntity<Void> eliminarMateriaDeCarrera(
            @PathVariable Long carreraId,
            @PathVariable Long materiaId) {

        carreraMateriaService.eliminarMateriaDeCarrera(
                carreraId,
                materiaId
        );

        return ResponseEntity.noContent().build();
    }
}