package com.miAula.miAula.service;

import com.miAula.miAula.dtos.comision.ComisionCreateDTO;
import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
import com.miAula.miAula.dtos.comision.ComisionUpdateDTO;
import com.miAula.miAula.util.CodigoUtils;
import com.miAula.miAula.dtos.cronograma.CronogramaComisionDTO;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.CarreraMateriaRepository;
import com.miAula.miAula.repository.ComisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComisionService {

    private final ComisionRepository comisionRepository;
    private final UsuarioService usuarioService;
    private final CarreraService carreraService;
    private final MateriaService materiaService;
    private final CarreraMateriaRepository carreraMateriaRepository;
//    private final ReservaService reservaService;

    @Autowired
    public ComisionService(ComisionRepository comisionRepository, UsuarioService usuarioService,
                           CarreraService carreraService, MateriaService materiaService,
                           CarreraMateriaRepository carreraMateriaRepository
                           /*, @Lazy ReservaService reservaService*/) {
        this.comisionRepository = comisionRepository;
        this.usuarioService = usuarioService;
        this.carreraService = carreraService;
        this.materiaService = materiaService;
        this.carreraMateriaRepository = carreraMateriaRepository;
//        this.reservaService = reservaService;
    }

    public Comision comisionCreateDTOtoComision(ComisionCreateDTO dto) {
        return Comision.builder()
                .codigo(CodigoUtils.normalizar(dto.getCodigo()))
                .nombre(dto.getNombre().trim())
                .cantidadEstudiantes(dto.getCantidadEstudiantes())
                .materia(materiaService.obtenerPorId(dto.getMateriaId()))
                .carrera(carreraService.obtenerPorId(dto.getCarreraId()))
                .profesor(usuarioService.obtenerPorId(dto.getProfesorId()))
                .build();
    }

    public ComisionResponseDTO comisionToComisionResponseDTO(Comision comision) {
        return ComisionResponseDTO.builder()
                .id(comision.getId())
                .codigo(comision.getCodigo())
                .nombre(comision.getNombre())
                .materiaNombre(comision.getMateria().getNombre())
                .materiaId(comision.getMateria().getId())
                .carreraNombre(comision.getCarrera().getNombre())
                .carreraId(comision.getCarrera().getId())
                .profesorNombre(comision.getProfesor().getNombre())
                .profesorId(comision.getProfesor().getId())
                .cantidadEstudiantes(comision.getCantidadEstudiantes())
                .activo(comision.getActivo())
                .build();
    }

    public CronogramaComisionDTO comisionToCronogramaComisionDTO(Comision comision) {
        return CronogramaComisionDTO.builder()
                .id(comision.getId())
                .nombre(comision.getNombre())
                .materiaNombre(comision.getMateria().getNombre())
                .carreraNombre(comision.getCarrera().getNombre())
                .profesorNombre(comision.getProfesor().getNombre())
                .cantidadEstudiantes(comision.getCantidadEstudiantes())
//                .reservasVigentes(reservaService.obtenerReservasVigentesPorComision(comision.getId()))
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
        validarCodigoComision(comision.getCodigo(), null);
        validarNombreComision(comision.getNombre(), comision.getMateria().getId(), null);
        return comisionRepository.save(comision);
    }

    public Comision actualizarComision(ComisionUpdateDTO dto) {
        Comision existente = obtenerComisionPorId(dto.getId());
        existente.setCantidadEstudiantes(dto.getCantidadEstudiantes());
        existente.setCodigo(CodigoUtils.normalizar(dto.getCodigo()));
        existente.setNombre(dto.getNombre().trim());
        existente.setProfesor(usuarioService.obtenerPorId(dto.getProfesorId()));
        existente.setCarrera(carreraService.obtenerPorId(dto.getCarreraId()));

        validarProfesor(dto.getProfesorId());
        validarCarrera(dto.getCarreraId());
        validarMateria(existente.getCarrera().getId(), existente.getMateria().getId());
        validarCodigoComision(existente.getCodigo(), existente.getId());
        validarNombreComision(existente.getNombre(), existente.getMateria().getId(), existente.getId());

        return comisionRepository.save(existente);
    }

    public void eliminarComision(Long id) {
        Comision comision = obtenerComisionPorId(id);
        comision.setActivo(false);
        comisionRepository.save(comision);
    }

    public void activarComision(Long id) {
        Comision comision = obtenerComisionPorId(id);
        comision.setActivo(true);
        comisionRepository.save(comision);
    }

    private void validarProfesor(Long idUsuarioProfesor) {
        Usuario usuario = usuarioService.obtenerPorId(idUsuarioProfesor);
        boolean esProfesor = usuario.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_PROFESOR".equalsIgnoreCase(authority.getAuthority()));

        if (!esProfesor) {
            throw new EntityValidationException("El usuario con ID " + idUsuarioProfesor + " no tiene el rol de profesor");
        }
    }

    private void validarCodigoComision(String codigo, Long idComision) {
        boolean existe = idComision == null
                ? comisionRepository.existsByCodigoIgnoreCase(codigo)
                : comisionRepository.existsByCodigoIgnoreCaseAndIdNot(codigo, idComision);

        if (existe) {
            throw new ResourceConflictException("Ya existe una comisión con el código " + codigo);
        }
    }

    private void validarNombreComision(String nombre, Long idMateria, Long idComision) {
        boolean existe = idComision == null
                ? comisionRepository.existsByNombreIgnoreCaseAndMateriaId(nombre, idMateria)
                : comisionRepository.existsByNombreIgnoreCaseAndMateriaIdAndIdNot(
                        nombre, idMateria, idComision);

        if (existe) {
            throw new ResourceConflictException(
                    "Ya existe una comisión con ese nombre para la materia indicada.");
        }
    }

    private void validarCarrera(Long idCarrera) {
        carreraService.obtenerPorId(idCarrera);
    }

    private void validarMateria(Long idCarrera, Long idMateria) {
        carreraService.obtenerPorId(idCarrera);
        boolean materiaPertenece = carreraMateriaRepository
                .existsByCarrera_IdAndMateria_Id(idCarrera, idMateria);

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
        return comisionRepository.findByProfesorIdAndActivoTrue(profesorId).stream()
                .map(this::comisionToComisionResponseDTO)
                .toList();
    }

}
