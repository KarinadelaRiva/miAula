package com.miAula.miAula.service;

import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.repository.CarreraMateriaRepository;
import com.miAula.miAula.repository.ComisionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
}
