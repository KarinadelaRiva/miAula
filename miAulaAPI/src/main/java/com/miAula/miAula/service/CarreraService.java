package com.miAula.miAula.service;

import com.miAula.miAula.dtos.carrera.CarreraCreateDTO;
import com.miAula.miAula.dtos.carrera.CarreraResponseDTO;
import com.miAula.miAula.dtos.carrera.CarreraUpdateDTO;
import com.miAula.miAula.util.CodigoUtils;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.CarreraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarreraService {

    private final CarreraRepository carreraRepository;

    public CarreraService(CarreraRepository carreraRepository) {
        this.carreraRepository = carreraRepository;
    }

    // -----------------------------
    // CONVERSIONES DTO <-> ENTITY
    // -----------------------------

    public Carrera carreraCreateDTOtoCarrera(CarreraCreateDTO dto) {
        return Carrera.builder()
                .codigo(CodigoUtils.normalizar(dto.getCodigo()))
                .nombre(dto.getNombre().trim())
                .activo(true)
                .build();
    }

    public CarreraResponseDTO carreraToCarreraResponseDTO(Carrera carrera) {
        return CarreraResponseDTO.builder()
                .id(carrera.getId())
                .codigo(carrera.getCodigo())
                .nombre(carrera.getNombre())
                .build();
    }

    // -----------------------------
    // CONSULTAS
    // -----------------------------

    public List<CarreraResponseDTO> obtenerTodas() {
        return carreraRepository.findByActivoTrue()
                .stream()
                .map(this::carreraToCarreraResponseDTO)
                .toList();
    }

    public CarreraResponseDTO obtenerDTOPorId(Long id) {
        return carreraToCarreraResponseDTO(obtenerPorId(id));
    }

    /**
     * Devuelve la entidad Carrera.
     * Nos va a servir después desde otros Services,
     * por ejemplo ComisionService.
     */
    public Carrera obtenerPorId(Long id) {
        return carreraRepository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Carrera no encontrada con ID: " + id
                        )
                );
    }


    // CREAR

    public CarreraResponseDTO crearCarrera(CarreraCreateDTO dto) {

        Carrera nuevaCarrera = carreraCreateDTOtoCarrera(dto);

        String codigo = nuevaCarrera.getCodigo();

        Optional<Carrera> existente =
                carreraRepository.findByCodigoIgnoreCase(codigo);

        if (existente.isPresent()) {

            Carrera carreraExistente = existente.get();

            // Si existía pero estaba dada de baja,
            // la reactivamos.
            if (Boolean.FALSE.equals(carreraExistente.getActivo())) {

                carreraExistente.setNombre(nuevaCarrera.getNombre());
                carreraExistente.setActivo(true);

                Carrera reactivada =
                        carreraRepository.save(carreraExistente);

                return carreraToCarreraResponseDTO(reactivada);
            }

            // Si ya está activa, es conflicto.
            throw new ResourceConflictException(
                    "Ya existe una carrera con el código " + codigo
            );
        }

        Carrera guardada =
                carreraRepository.save(nuevaCarrera);

        return carreraToCarreraResponseDTO(guardada);
    }

      // ACTUALIZAR

    public CarreraResponseDTO actualizarCarrera(
            Long id,
            CarreraUpdateDTO dto) {

        Carrera existente = obtenerPorId(id);

        String codigoNuevo =
                CodigoUtils.normalizar(dto.getCodigo());

        Optional<Carrera> carreraConEseCodigo =
                carreraRepository.findByCodigoIgnoreCase(codigoNuevo);

        if (carreraConEseCodigo.isPresent()
                && !carreraConEseCodigo.get().getId().equals(id)) {

            throw new ResourceConflictException(
                    "Ya existe otra carrera con el código " + codigoNuevo
            );
        }

        existente.setCodigo(codigoNuevo);
        existente.setNombre(dto.getNombre().trim());

        Carrera actualizada =
                carreraRepository.save(existente);

        return carreraToCarreraResponseDTO(actualizada);
    }

   // ELIMINAR - BAJA LÓGICA

    public void eliminarCarrera(Long id) {

        Carrera carrera = obtenerPorId(id);

        carrera.setActivo(false);

        carreraRepository.save(carrera);
    }
}