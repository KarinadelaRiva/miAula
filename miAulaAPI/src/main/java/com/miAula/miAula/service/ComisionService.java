package com.miAula.miAula.service;

import com.miAula.miAula.dtos.comision.ComisionCreateDTO;
import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
import com.miAula.miAula.dtos.comision.ComisionUpdateDTO;
import com.miAula.miAula.dtos.cronograma.CronogramaComisionDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.ComisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComisionService {

    private final ComisionRepository comisionRepository;
    private final UsuarioService usuarioService;
    private final CarreraService carreraService;
    private final MateriaService materiaService;
    private final ReservaService reservaService;

    @Autowired
    public ComisionService(ComisionRepository comisionRepository, UsuarioService usuarioService,
                           CarreraService carreraService, MateriaService materiaService,
                           @Lazy ReservaService reservaService) {
        this.comisionRepository = comisionRepository;
        this.usuarioService = usuarioService;
        this.carreraService = carreraService;
        this.materiaService = materiaService;
        this.reservaService = reservaService;
    }

    public Comision comisionCreateDTOtoComision(ComisionCreateDTO dto) {
        return Comision.builder()
                .nombre(dto.getNombre())
                .cantidadEstudiantes(dto.getCantidadEstudiantes())
                .materia(materiaService.obtenerPorId(dto.getMateriaId()))
                .carrera(carreraService.obtenerPorId(dto.getCarreraId()))
                .profesor(usuarioService.obtenerPorId(dto.getProfesorId()))
                .build();
    }

    public ComisionResponseDTO comisionToComisionResponseDTO(Comision comision) {
        return ComisionResponseDTO.builder()
                .id(comision.getId())
                .nombre(comision.getNombre())
                .materiaNombre(comision.getMateria().getNombre())
                .carreraNombre(comision.getCarrera().getNombre())
                .profesorNombre(comision.getProfesor().getNombre())
                .cantidadEstudiantes(comision.getCantidadEstudiantes())
                .build();
    }

    public CronogramaComisionDTO comisionToCronogramaComisionDTO(Comision comision) {
        return CronogramaComisionDTO.builder()
                .id(comision.getId())
                .nombre(comision.getNombre())
                .materiaNombre(comision.getMateria().getNombre())
                .carreraNombre(comision.getCarrera().getNombre())
                .profesorNombre(comision.getProfesor().getNombre())
                .cantidadAlumnos(comision.getCantidadAlumnos())
                .reservasVigentes(reservaService.obtenerReservasVigentesPorComision(comision.getId()))
                .build();
    }

    public List<ComisionResponseDTO> obtenerTodasComisionesDTO() {
        return comisionRepository.findAll().stream()
                .map(this::comisionToComisionResponseDTO)
                .toList();
    }

    public Comision obtenerComisionPorId(Long id) {
        return comisionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comisión no encontrada con ID: " + id));
    }

    public CronogramaComisionDTO obtenerComisionDTOPorId(Long id) {
        Comision comision = obtenerComisionPorId(id);
        return comisionToCronogramaComisionDTO(comision);
    }

    public Comision crearComisionDesdeDTO(ComisionCreateDTO dto) {
        Comision comision = comisionCreateDTOtoComision(dto);
        validarProfesor(comision.getProfesor().getId());
        validarCarrera(comision.getCarrera().getId());
        validarMateria(comision.getCarrera().getId(), comision.getMateria().getId());
        validarNombreComision(comision);
        return comisionRepository.save(comision);
    }

    public Comision actualizarComision(ComisionUpdateDTO dto) {
        Comision existente = obtenerComisionPorId(dto.getId());
        existente.setCantidadEstudiantes(dto.getCantidadEstudiantes());
        existente.setNombre(dto.getNombre());
        existente.setProfesor(usuarioService.obtenerPorId(dto.getProfesorId()));
        existente.setCarrera(carreraService.obtenerPorId(dto.getCarreraId()));

        validarProfesor(dto.getProfesorId());
        validarCarrera(dto.getCarreraId());
        validarNombreComision(existente);

        return comisionRepository.save(existente);
    }

    public void eliminarComision(Long id) {
        if (!comisionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comisión no encontrada");
        }
        comisionRepository.deleteById(id);
    }

    private void validarProfesor(Long idUsuarioProfesor) {
        Usuario usuario = usuarioService.obtenerPorId(idUsuarioProfesor);

        if (!"PROFESOR".equalsIgnoreCase(usuario.getRol().name())) {
            throw new EntityValidationException("El usuario con ID " + idUsuarioProfesor + " no tiene el rol de profesor");
        }
    }

    private void validarNombreComision(Comision comision){
        if (comisionRepository.existsByNombreAndMateriaId(
                comision.getNombre(), comision.getMateria().getId())) {
            throw new IllegalArgumentException("Ya existe una comisión con ese nombre para la materia indicada.");
        }
    }

    private void validarCarrera(Long idCarrera) {
        carreraService.obtenerPorId(idCarrera);
    }

    private void validarMateria(Long idCarrera, Long idMateria) {
        Carrera carrera = carreraService.obtenerPorId(idCarrera);
        boolean materiaPertenece = carrera.getMaterias().stream()
                .anyMatch(mat -> mat.getId().equals(idMateria));

        if (!materiaPertenece) {
            throw new EntityValidationException("La materia con ID " + idMateria + " no pertenece a la carrera con ID " + idCarrera);
        }
    }

    public List<ComisionResponseDTO> obtenerComisionesPorMateria(Long materiaId) {
        return comisionRepository.findByMateriaId(materiaId).stream()
                .map(this::comisionToComisionResponseDTO)
                .toList();
    }

    public List<ComisionResponseDTO> obtenerComisionesPorProfesor(Long profesorId) {
        return comisionRepository.findByProfesorId(profesorId).stream()
                .map(this::comisionToComisionResponseDTO)
                .toList();
    }

}