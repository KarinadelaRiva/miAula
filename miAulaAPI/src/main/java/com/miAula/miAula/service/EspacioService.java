package com.miAula.miAula.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.miAula.miAula.dtos.espacio.EspacioCreateDTO;
import com.miAula.miAula.dtos.espacio.EspacioResponseDTO;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.EspacioRepository;

@Service 
public class EspacioService {
    
    private final EspacioRepository espacioRepository;

    public EspacioService(EspacioRepository espacioRepository) {
        this.espacioRepository = espacioRepository;
    }

    private EspacioResponseDTO espacioToEspacioResponseDto(Espacio espacio) {
        return EspacioResponseDTO.builder()
            .id(espacio.getId())
            .codigo(espacio.getCodigo())
            .nombre(espacio.getNombre())
            .capacidad(espacio.getCapacidad())
            .nroPiso(espacio.getNroPiso())
            .activo(espacio.getActivo())
            .build();
    }

    private Espacio espacioCreateDtoToEspacio(EspacioCreateDTO dto) {
        return Espacio.builder()
            .codigo(dto.getCodigo())
            .nombre(dto.getNombre())
            .capacidad(dto.getCapacidad())
            .nroPiso(dto.getNroPiso())
            .build();
    }

    public List<EspacioResponseDTO> getAllEspaciosDTO() {
        List<Espacio> espacios = espacioRepository.findAll();
        return espacios.stream()
            .map(this::espacioToEspacioResponseDto)
            .toList();
    }

    public Espacio guardar(EspacioCreateDTO espacioDTO) {
        System.err.println("GUARDAR");

        // Validación de nombre duplicado
        if (espacioRepository.existsByNombre(espacioDTO.getNombre())) {
            throw new ResourceConflictException("Ya existe un espacio con ese nombre");
        }

        // Validación de capacidad
        if (espacioDTO.getCapacidad() == null || espacioDTO.getCapacidad() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor a 0");
        }

        System.err.println("VALIDACIONES HECHAS");

        Espacio nuevoEspacio = espacioCreateDtoToEspacio(espacioDTO);

        System.err.println("FIN");

        return espacioRepository.save(nuevoEspacio);
    }

}
