package com.miAula.miAula.controllers;

import com.miAula.miAula.dto.CarreraDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.services.CarreraService;
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

    public CarreraController(CarreraService carreraService) {
        this.carreraService = carreraService;
    }

    // GET http://localhost:8080/carreras
    @GetMapping
    public List<CarreraDTO> listarCarreras() {
        return carreraService.listarCarreras()
                .stream()
                .map(this::convertirADTO)
                .toList();
    }

    // GET http://localhost:8080/carreras/1
    @GetMapping("/{id}")
    public CarreraDTO buscarCarrera(@PathVariable Long id) {
        Carrera carrera = carreraService.buscarPorId(id);
        return convertirADTO(carrera);
    }

    // POST http://localhost:8080/carreras
    @PostMapping
    public ResponseEntity<CarreraDTO> crearCarrera(
            @Valid @RequestBody CarreraDTO dto) {

        Carrera carrera = new Carrera();
        carrera.setCodigo(dto.getCodigo());
        carrera.setNombre(dto.getNombre());

        Carrera guardada = carreraService.crearCarrera(carrera);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(convertirADTO(guardada));
    }

    // PUT http://localhost:8080/carreras/1
    @PutMapping("/{id}")
    public CarreraDTO actualizarCarrera(
            @PathVariable Long id,
            @Valid @RequestBody CarreraDTO dto) {

        Carrera carrera = new Carrera();
        carrera.setCodigo(dto.getCodigo());
        carrera.setNombre(dto.getNombre());

        Carrera actualizada =
                carreraService.actualizarCarrera(id, carrera);

        return convertirADTO(actualizada);
    }

    // DELETE http://localhost:8080/carreras/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarrera(@PathVariable Long id) {

        carreraService.eliminarCarrera(id);

        return ResponseEntity.noContent().build();
    }

    private CarreraDTO convertirADTO(Carrera carrera) {
        return new CarreraDTO(
                carrera.getId(),
                carrera.getCodigo(),
                carrera.getNombre()
        );
    }
}