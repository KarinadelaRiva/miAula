package com.miAula.miAula.service;

import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.entities.Usuario;
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
}
