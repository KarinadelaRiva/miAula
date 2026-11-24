package com.miAula.miAula.service;

import com.miAula.miAula.dtos.comision.ComisionCreateDTO;
import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.entities.Rol;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRol;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.CarreraMateriaRepository;
import com.miAula.miAula.repository.ComisionRepository;
import com.miAula.miAula.repository.ReservaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class ComisionServiceTest {

    @Mock
    private ComisionRepository comisionRepository;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private CarreraService carreraService;

    @Mock
    private MateriaService materiaService;

    @Mock
    private CarreraMateriaRepository carreraMateriaRepository;

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private ComisionService comisionService;

    @Test
    void respuestaIncluyeEstadosDeCarreraYMateriaAsociadas() {
        Carrera carrera = Carrera.builder()
                .id(1L)
                .nombre("Ingeniería")
                .activo(false)
                .build();
        Materia materia = Materia.builder()
                .id(2L)
                .nombre("Programación")
                .activo(true)
                .build();
        Usuario profesor = Usuario.builder()
                .id(3L)
                .nombre("Ana")
                .build();
        Comision comision = Comision.builder()
                .id(4L)
                .carrera(carrera)
                .materia(materia)
                .profesor(profesor)
                .activo(true)
                .build();

        ComisionResponseDTO resultado = comisionService.comisionToComisionResponseDTO(comision);

        assertEquals(false, resultado.getCarreraActiva());
        assertEquals(true, resultado.getMateriaActiva());
    }

    @Test
    void eliminarComisionNoPermiteReservasConFinHoyOEnElFuturo() {
        Comision comision = Comision.builder().id(4L).activo(true).build();
        when(comisionRepository.findById(4L)).thenReturn(Optional.of(comision));
        when(reservaRepository.existsByComision_IdAndActivoTrueAndDiaDeFinGreaterThanEqual(
                4L, LocalDate.now())).thenReturn(true);

        assertThrows(ResourceConflictException.class, () -> comisionService.eliminarComision(4L));
    }

    @Test
    void crearComisionRequiereMateriaAsociadaALaCarreraSeleccionada() {
        Carrera carrera = Carrera.builder().id(5L).nombre("Ingeniería").activo(true).build();
        Materia materia = Materia.builder().id(10L).nombre("Programación").activo(true).build();
        Usuario profesor = Usuario.builder()
                .id(3L)
                .usuarioRoles(java.util.List.of(UsuarioRol.builder()
                        .rol(Rol.builder().nombre("profesor").build())
                        .build()))
                .build();
        ComisionCreateDTO dto = ComisionCreateDTO.builder()
                .codigo("COM001")
                .nombre("Comisión A")
                .materiaId(10L)
                .carreraId(5L)
                .profesorId(3L)
                .cantidadEstudiantes(30)
                .build();

        when(materiaService.obtenerPorId(10L)).thenReturn(materia);
        when(carreraService.obtenerPorId(5L)).thenReturn(carrera);
        when(usuarioService.obtenerPorId(3L)).thenReturn(profesor);
        when(carreraMateriaRepository.existsByCarrera_IdAndMateria_Id(5L, 10L)).thenReturn(false);

        EntityValidationException error = assertThrows(
                EntityValidationException.class,
                () -> comisionService.crearComisionDesdeDTO(dto));

        assertTrue(error.getMessage().contains("no está asociada a la carrera seleccionada"));
        verify(comisionRepository, never()).save(any(Comision.class));
    }
}
