package com.miAula.miAula.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miAula.miAula.dtos.espacio.EspacioCreateDTO;
import com.miAula.miAula.dtos.espacio.EspacioResponseDTO;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.service.EspacioService;

@RestController
@RequestMapping("/espacios")
public class EspacioController {
    
    private final EspacioService espacioService;

    public EspacioController(EspacioService espacioService) {
        this.espacioService = espacioService;
    }

    @GetMapping
    public ResponseEntity<List<EspacioResponseDTO>> obtenerEspacios() {
        return new ResponseEntity<>(espacioService.getAllEspaciosDTO(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Espacio> crearEspacio(@RequestBody EspacioCreateDTO espacio) {
        System.err.println("CONTROLLER");
        return new ResponseEntity<>(espacioService.guardar(espacio), HttpStatus.CREATED);
    }

}
