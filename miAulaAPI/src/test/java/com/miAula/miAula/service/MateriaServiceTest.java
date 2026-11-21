package com.miAula.miAula.service;

import com.miAula.miAula.dtos.materia.MateriaResponseDTO;
import com.miAula.miAula.entities.Materia;
import com.miAula.miAula.repository.MateriaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MateriaServiceTest {

    @Mock
    private MateriaRepository materiaRepository;

    @InjectMocks
    private MateriaService materiaService;

    @Test
    void administracionListaMateriasHabilitadasYDeshabilitadas() {
        Materia habilitada = materia(1L, true);
        Materia deshabilitada = materia(2L, false);
        when(materiaRepository.findAll()).thenReturn(List.of(habilitada, deshabilitada));

        List<MateriaResponseDTO> materias = materiaService.obtenerTodasParaAdministracion();

        assertEquals(List.of(true, false), materias.stream()
                .map(MateriaResponseDTO::getActivo)
                .toList());
    }

    @Test
    void actualizarEstadoPermiteReactivarMateriaDeshabilitada() {
        Materia materia = materia(1L, false);
        when(materiaRepository.findById(1L)).thenReturn(Optional.of(materia));
        when(materiaRepository.save(materia)).thenReturn(materia);

        MateriaResponseDTO resultado = materiaService.actualizarEstado(1L, true);

        assertEquals(true, resultado.getActivo());
    }

    private Materia materia(Long id, boolean activo) {
        return Materia.builder()
                .id(id)
                .codigo("MAT00" + id)
                .nombre("Materia " + id)
                .activo(activo)
                .build();
    }
}
