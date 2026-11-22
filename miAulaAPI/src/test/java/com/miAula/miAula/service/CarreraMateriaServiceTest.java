package com.miAula.miAula.service;

import com.miAula.miAula.dtos.materia.MateriaCreateDTO;
import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.entities.tablas_intermedias.CarreraMateria;
import com.miAula.miAula.repository.CarreraMateriaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarreraMateriaServiceTest {

    @Mock
    private CarreraMateriaRepository carreraMateriaRepository;

    @Mock
    private CarreraService carreraService;

    @Mock
    private MateriaService materiaService;

    @InjectMocks
    private CarreraMateriaService carreraMateriaService;

    @Test
    void crearMateriaLaAsignaALaCarreraSeleccionada() {
        MateriaCreateDTO dto = materiaCreateDTO(3L);
        MateriaResponseDTO materiaCreada = MateriaResponseDTO.builder()
                .id(12L)
                .build();
        when(materiaService.crearMateria(dto)).thenReturn(materiaCreada);
        when(carreraMateriaRepository.existsByCarrera_IdAndMateria_Id(3L, 12L))
                .thenReturn(false);
        when(carreraService.obtenerPorId(3L)).thenReturn(Carrera.builder().id(3L).build());
        when(materiaService.obtenerPorId(12L)).thenReturn(Materia.builder().id(12L).build());

        MateriaResponseDTO resultado = carreraMateriaService.crearMateriaConAsignacion(dto);

        assertEquals(materiaCreada, resultado);
        verify(carreraMateriaRepository).save(any(CarreraMateria.class));
    }

    @Test
    void crearMateriaSinCarreraNoCreaUnaAsignacion() {
        MateriaCreateDTO dto = materiaCreateDTO(null);
        MateriaResponseDTO materiaCreada = MateriaResponseDTO.builder()
                .id(12L)
                .build();
        when(materiaService.crearMateria(dto)).thenReturn(materiaCreada);

        MateriaResponseDTO resultado = carreraMateriaService.crearMateriaConAsignacion(dto);

        assertEquals(materiaCreada, resultado);
        verify(carreraMateriaRepository, never()).save(any(CarreraMateria.class));
    }

    private MateriaCreateDTO materiaCreateDTO(Long carreraId) {
        return MateriaCreateDTO.builder()
                .codigo("MAT001")
                .nombre("Materia")
                .carreraId(carreraId)
                .build();
    }
}
