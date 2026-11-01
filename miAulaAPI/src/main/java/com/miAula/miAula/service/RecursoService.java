package com.miAula.miAula.service;

import com.miAula.miAula.dtos.recurso.RecursoCreateDTO;
import com.miAula.miAula.dtos.recurso.RecursoResponseDTO;
import com.miAula.miAula.dtos.recurso.RecursoUpdateDTO;
import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.RecursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecursoService {

    private final RecursoRepository recursoRepository;

    public RecursoService(RecursoRepository recursoRepository) {
        this.recursoRepository = recursoRepository;
    }

    private static RecursoResponseDTO recursoToRecursoResponseDTO(Recurso recurso) {
        return RecursoResponseDTO.builder()
                .id(recurso.getId())
                .codigo(recurso.getCodigo())
                .nombre(recurso.getNombre())
                .descripcion(recurso.getDescripcion())
                .cantidad(recurso.getCantidad())
                .activo(recurso.getActivo())
                .build();
    }

    private static Recurso recursoCreateDTOToRecurso(RecursoCreateDTO dto) {
        return Recurso.builder()
                .codigo(dto.getCodigo())
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .cantidad(dto.getCantidad())
                .build();
    }

    public List<RecursoResponseDTO> getAllRecursosDTO() {
        return recursoRepository.findAll().stream()
                .map(RecursoService::recursoToRecursoResponseDTO)
                .toList();
    }

    public Recurso obtenerPorId(Long id) {
        return recursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + id));
    }

    public RecursoResponseDTO obtenerDTOPorId(Long id) {
        return recursoRepository.findById(id)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + id));
    }

    public RecursoResponseDTO obtenerPorCodigo(String codigo) {
        return recursoRepository.findByCodigo(codigo)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con código: " + codigo));
    }

    public RecursoResponseDTO obtenerPorNombre(String nombre) {
        return recursoRepository.findByNombre(nombre)
                .map(RecursoService::recursoToRecursoResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con nombre: " + nombre));
    }

    public List<RecursoResponseDTO> obtenerPorCantidadMayorA(Integer cantidad) {
        return recursoRepository.findByCantidadGreaterThanEqual(cantidad).stream()
                .map(RecursoService::recursoToRecursoResponseDTO)
                .toList();
    }

    public Recurso guardar(RecursoCreateDTO recursoDTO) {
        if (recursoRepository.existsByCodigo(recursoDTO.getCodigo())) {
            throw new ResourceConflictException("Ya existe un recurso con ese código");
        }

        if (recursoRepository.existsByNombre(recursoDTO.getNombre())) {
            throw new ResourceConflictException("Ya existe un recurso con ese nombre");
        }

        return recursoRepository.save(recursoCreateDTOToRecurso(recursoDTO));
    }

    public Recurso actualizar(RecursoUpdateDTO nuevoRecurso) {
        Recurso existente = obtenerPorId(nuevoRecurso.getId());

        if (!existente.getCodigo().equals(nuevoRecurso.getCodigo())
                && recursoRepository.existsByCodigo(nuevoRecurso.getCodigo())) {
            throw new ResourceConflictException("Ya existe otro recurso con ese código");
        }

        if (!existente.getNombre().equals(nuevoRecurso.getNombre())
                && recursoRepository.existsByNombre(nuevoRecurso.getNombre())) {
            throw new ResourceConflictException("Ya existe otro recurso con ese nombre");
        }

        existente.setCodigo(nuevoRecurso.getCodigo());
        existente.setNombre(nuevoRecurso.getNombre());
        existente.setDescripcion(nuevoRecurso.getDescripcion());
        existente.setCantidad(nuevoRecurso.getCantidad());

        return recursoRepository.save(existente);
    }

    public void deshabilitar(Long id) {
        Recurso recurso = obtenerPorId(id);
        recurso.setActivo(false);
        recursoRepository.save(recurso);
    }

    public Recurso actualizarEstado(Long id, Boolean activo) {
        Recurso recurso = obtenerPorId(id);
        recurso.setActivo(activo);
        return recursoRepository.save(recurso);
    }

}
