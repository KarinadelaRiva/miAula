package com.miAula.miAula.service;

import com.miAula.miAula.dtos.materia.MateriaCreateDTO;
import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.dtos.materia.MateriaUpdateDTO;
import com.miAula.miAula.util.CodigoUtils;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.MateriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public MateriaService(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    public Materia materiaCreateDTOtoMateria(MateriaCreateDTO dto) {
        return Materia.builder()
                .codigo(CodigoUtils.normalizar(dto.getCodigo()))
                .nombre(dto.getNombre().trim())
                .activo(true)
                .build();
    }

    public MateriaResponseDTO materiaToMateriaResponseDTO(Materia materia) {
        return MateriaResponseDTO.builder()
                .id(materia.getId())
                .codigo(materia.getCodigo())
                .nombre(materia.getNombre())
                .activo(materia.getActivo())
                .build();
    }

    public List<MateriaResponseDTO> obtenerTodas() {
        return materiaRepository.findByActivoTrue()
                .stream()
                .map(this::materiaToMateriaResponseDTO)
                .toList();
    }

    public List<MateriaResponseDTO> obtenerTodasParaAdministracion() {
        return materiaRepository.findAll()
                .stream()
                .map(this::materiaToMateriaResponseDTO)
                .toList();
    }

    public MateriaResponseDTO obtenerDTOPorId(Long id) {
        return materiaToMateriaResponseDTO(obtenerPorId(id));
    }

    public Materia obtenerPorId(Long id) {
        return materiaRepository.findByIdAndActivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Materia no encontrada con ID: " + id));
    }

    public MateriaResponseDTO crearMateria(MateriaCreateDTO dto) {

        Materia nuevaMateria = materiaCreateDTOtoMateria(dto);

        String codigo = nuevaMateria.getCodigo();

        Optional<Materia> existente =
                materiaRepository.findByCodigoIgnoreCase(codigo);

        if (existente.isPresent()) {

            Materia materiaExistente = existente.get();

            if (Boolean.FALSE.equals(materiaExistente.getActivo())) {

                materiaExistente.setNombre(nuevaMateria.getNombre());
                materiaExistente.setActivo(true);

                Materia reactivada =
                        materiaRepository.save(materiaExistente);

                return materiaToMateriaResponseDTO(reactivada);
            }

            throw new ResourceConflictException(
                    "Ya existe una materia con el código " + codigo);
        }

        Materia guardada = materiaRepository.save(nuevaMateria);

        return materiaToMateriaResponseDTO(guardada);
    }

    public MateriaResponseDTO actualizarMateria(
            Long id,
            MateriaUpdateDTO dto) {

        Materia existente = materiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Materia no encontrada con ID: " + id));

        String codigoNuevo =
                CodigoUtils.normalizar(dto.getCodigo());

        Optional<Materia> materiaConEseCodigo =
                materiaRepository.findByCodigoIgnoreCase(codigoNuevo);

        if (materiaConEseCodigo.isPresent()
                && !materiaConEseCodigo.get().getId().equals(id)) {

            throw new ResourceConflictException(
                    "Ya existe otra materia con el código " + codigoNuevo);
        }

        existente.setCodigo(codigoNuevo);
        existente.setNombre(dto.getNombre().trim());

        Materia actualizada =
                materiaRepository.save(existente);

        return materiaToMateriaResponseDTO(actualizada);
    }

    public MateriaResponseDTO actualizarEstado(Long id, Boolean activo) {
        Materia materia = materiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Materia no encontrada con ID: " + id));

        materia.setActivo(activo);

        return materiaToMateriaResponseDTO(materiaRepository.save(materia));
    }

    public void deshabilitarMateria(Long id) {
        actualizarEstado(id, false);
    }
}