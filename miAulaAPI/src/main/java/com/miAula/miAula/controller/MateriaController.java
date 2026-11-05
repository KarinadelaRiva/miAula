package com.miAula.miAula.controller;

import com.miAula.miAula.dtos.materia.MateriaCreateDTO;
import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.dtos.materia.MateriaUpdateDTO;
import com.miAula.miAula.service.MateriaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materias")
@CrossOrigin(origins = "http://localhost:4200")
public class MateriaController {

    private final MateriaService materiaService;

    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @GetMapping
    public ResponseEntity<List<MateriaResponseDTO>> obtenerMaterias() {
        return ResponseEntity.ok(materiaService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaResponseDTO> obtenerMateriaPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                materiaService.obtenerDTOPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<MateriaResponseDTO> crearMateria(
            @Valid @RequestBody MateriaCreateDTO dto) {

        MateriaResponseDTO materiaCreada =
                materiaService.crearMateria(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(materiaCreada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MateriaResponseDTO> actualizarMateria(
            @PathVariable Long id,
            @Valid @RequestBody MateriaUpdateDTO dto) {

        MateriaResponseDTO materiaActualizada =
                materiaService.actualizarMateria(id, dto);

        return ResponseEntity.ok(materiaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMateria(
            @PathVariable Long id) {

        materiaService.eliminarMateria(id);

        return ResponseEntity.noContent().build();
    }
}