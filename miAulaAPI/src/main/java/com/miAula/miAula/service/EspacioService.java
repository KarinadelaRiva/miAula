package com.miAula.miAula.service;

import java.util.List;

import com.miAula.miAula.dtos.espacio.EspacioUpdateDTO;
import com.miAula.miAula.util.CodigoUtils;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.miAula.miAula.dtos.espacio.EspacioCreateDTO;
import com.miAula.miAula.dtos.espacio.EspacioResponseDTO;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.EspacioRepository;
import com.miAula.miAula.repository.ReservaRepository;
import java.time.LocalDate;

@Service 
public class EspacioService {
    
    private final EspacioRepository espacioRepository;
    private final ReservaRepository reservaRepository;

    public EspacioService(
            EspacioRepository espacioRepository,
            ReservaRepository reservaRepository) {
        this.espacioRepository = espacioRepository;
        this.reservaRepository = reservaRepository;
    }

    private static EspacioResponseDTO espacioToEspacioResponseDto(Espacio espacio) {
        return EspacioResponseDTO.builder()
            .id(espacio.getId())
            .codigo(espacio.getCodigo())
            .nombre(espacio.getNombre())
            .capacidad(espacio.getCapacidad())
            .nroPiso(espacio.getNroPiso())
            .activo(espacio.getActivo())
            .build();
    }

    private static Espacio espacioCreateDtoToEspacio(EspacioCreateDTO dto) {
        return Espacio.builder()
            .codigo(CodigoUtils.normalizar(dto.getCodigo()))
            .nombre(dto.getNombre())
            .capacidad(dto.getCapacidad())
            .nroPiso(dto.getNroPiso())
            .build();
    }

    public List<EspacioResponseDTO> getAllEspaciosDTO() {
        return espacioRepository.findAll().stream()
            .map(EspacioService::espacioToEspacioResponseDto)
            .toList();
    }

    public Espacio obtenerPorId(Long id) {
        return espacioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Espacio no encontrado con ID: " + id));
    }

    public EspacioResponseDTO obtenerDTOPorId(Long id) {
        return espacioRepository.findById(id)
                .map(EspacioService::espacioToEspacioResponseDto)
                .orElseThrow(() -> new ResourceNotFoundException("Espacio no encontrado con ID: " + id));
    }

    public EspacioResponseDTO obtenerPorCodigo(String codigo) {
        return espacioRepository.findByCodigo(codigo)
                .map(EspacioService::espacioToEspacioResponseDto)
                .orElseThrow(() -> new ResourceNotFoundException("Espacio no encontrado con código: " + codigo));
    }

    public EspacioResponseDTO obtenerPorNombre(String nombre) {
        return espacioRepository.findByNombre(nombre)
                .map(EspacioService::espacioToEspacioResponseDto)
                .orElseThrow(() -> new ResourceNotFoundException("Espacio no encontrado con nombre: " + nombre));
    }

//    public List<ReservaResponseDTO> obtenerReservasPorEspacio(Long espacioId) {
//        return obtenerPorId(espacioId).getReservas().stream()
//                .map(reservaService::reservaToReservaResponseDTO)
//                .toList();
//    }

    public List<EspacioResponseDTO> obtenerPorCapacidadMayorA(Integer capacidad) {
        return espacioRepository.findByCapacidadGreaterThanEqual(capacidad)
                .stream()
                .map(EspacioService::espacioToEspacioResponseDto)
                .toList();
    }

    public Espacio guardar(EspacioCreateDTO espacioDTO) {

        //Validación de código duplicado
        if (espacioRepository.existsByCodigo(espacioDTO.getCodigo())) {
            throw new ResourceConflictException("Ya existe un espacio con ese código");
        }

        // Validación de nombre duplicado
        if (espacioRepository.existsByNombre(espacioDTO.getNombre())) {
            throw new ResourceConflictException("Ya existe un espacio con ese nombre");
        }

        // Validación de capacidad
        if (espacioDTO.getCapacidad() == null || espacioDTO.getCapacidad() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor a 0");
        }

        Espacio nuevoEspacio = espacioCreateDtoToEspacio(espacioDTO);

        return espacioRepository.save(nuevoEspacio);
    }

    public Espacio actualizar(EspacioUpdateDTO nuevoEspacio) {
        Espacio existente = obtenerPorId(nuevoEspacio.getId());
        String codigo = CodigoUtils.normalizar(nuevoEspacio.getCodigo());

        if (!existente.getCodigo().equals(codigo) && espacioRepository.existsByCodigo(codigo)) {
            throw new ResourceConflictException("Ya existe otro espacio con ese código");
        }

        if (!existente.getNombre().equals(nuevoEspacio.getNombre()) && espacioRepository.existsByNombre(nuevoEspacio.getNombre())) {
            throw new ResourceConflictException("Ya existe otro espacio con ese nombre");
        }

        if (nuevoEspacio.getCapacidad() == null || nuevoEspacio.getCapacidad() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor a 0");
        }

        existente.setCodigo(codigo);
        existente.setNombre(nuevoEspacio.getNombre());
        existente.setCapacidad(nuevoEspacio.getCapacidad());
        existente.setNroPiso(nuevoEspacio.getNroPiso());

        return espacioRepository.save(existente);
    }

    public void deshabilitar(Long id) {
        if(!espacioRepository.existsById(id)){
            throw new ResourceNotFoundException("Espacio no encontrado");
        }

        Espacio espacio = obtenerPorId(id);
        validarReservasVigentes(id);
        espacio.setActivo(false);
        espacioRepository.save(espacio);
    }

    public EspacioResponseDTO actualizarEstado(Long id, Boolean activo) {
        Espacio espacio = obtenerPorId(id);
        if (Boolean.FALSE.equals(activo)) {
            validarReservasVigentes(id);
        }
        espacio.setActivo(activo);
        return espacioToEspacioResponseDto(espacioRepository.save(espacio));
    }

    private void validarReservasVigentes(Long id) {
        if (reservaRepository.existsByEspacio_IdAndActivoTrueAndDiaDeFinGreaterThanEqual(
                id, LocalDate.now())) {
            throw new ResourceConflictException(
                    "No se puede deshabilitar el espacio porque tiene reservas vigentes o futuras");
        }
    }

}
