package com.miAula.miAula.service;

import com.miAula.miAula.dtos.materia.MateriaCreateDTO;
import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.entities.tablas_intermedias.CarreraMateria;
import com.miAula.miAula.entities.tablas_intermedias.CarreraMateriaId;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.CarreraMateriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarreraMateriaService {

    private final CarreraMateriaRepository carreraMateriaRepository;
    private final CarreraService carreraService;
    private final MateriaService materiaService;

    public CarreraMateriaService(
            CarreraMateriaRepository carreraMateriaRepository,
            CarreraService carreraService,
            MateriaService materiaService) {

        this.carreraMateriaRepository = carreraMateriaRepository;
        this.carreraService = carreraService;
        this.materiaService = materiaService;
    }

    @Transactional
    public MateriaResponseDTO crearMateriaConAsignacion(MateriaCreateDTO dto) {
        MateriaResponseDTO materia = materiaService.crearMateria(dto);
        Long carreraId = dto.getCarreraId();

        if (carreraId != null) {
            carreraService.obtenerPorId(carreraId);
            if (!carreraMateriaRepository.existsByCarrera_IdAndMateria_Id(
                    carreraId, materia.getId())) {
                asignarMateriaACarrera(carreraId, materia.getId());
            }
        }

        return materia;
    }

    // Obtener materias asociadas a una carrera
    public List<MateriaResponseDTO> obtenerMateriasPorCarrera(Long carreraId) {

        carreraService.obtenerPorId(carreraId);

        return carreraMateriaRepository
                .findByCarrera_Id(carreraId)
                .stream()
                .map(CarreraMateria::getMateria)
                .filter(materia -> Boolean.TRUE.equals(materia.getActivo()))
                .map(materiaService::materiaToMateriaResponseDTO)
                .toList();
    }

    // Asignar una materia a una carrera
    @Transactional
    public MateriaResponseDTO asignarMateriaACarrera(
            Long carreraId,
            Long materiaId) {

        Carrera carrera = carreraService.obtenerPorId(carreraId);
        Materia materia = materiaService.obtenerPorId(materiaId);

        boolean yaExiste =
                carreraMateriaRepository
                        .existsByCarrera_IdAndMateria_Id(
                                carreraId,
                                materiaId
                        );

        if (yaExiste) {
            throw new ResourceConflictException(
                    "La materia ya está asignada a esta carrera"
            );
        }

        CarreraMateriaId id =
                new CarreraMateriaId(carreraId, materiaId);

        CarreraMateria relacion =
                CarreraMateria.builder()
                        .id(id)
                        .carrera(carrera)
                        .materia(materia)
                        .build();

        carreraMateriaRepository.save(relacion);

        return materiaService.materiaToMateriaResponseDTO(materia);
    }

    // Eliminar una materia de una carrera
    @Transactional
    public void eliminarMateriaDeCarrera(
            Long carreraId,
            Long materiaId) {

        carreraService.obtenerPorId(carreraId);
        materiaService.obtenerPorId(materiaId);

        boolean existe =
                carreraMateriaRepository
                        .existsByCarrera_IdAndMateria_Id(
                                carreraId,
                                materiaId
                        );

        if (!existe) {
            throw new ResourceNotFoundException(
                    "La materia no está asignada a esta carrera"
            );
        }

        carreraMateriaRepository
                .deleteByCarrera_IdAndMateria_Id(
                        carreraId,
                        materiaId
                );
    }
}