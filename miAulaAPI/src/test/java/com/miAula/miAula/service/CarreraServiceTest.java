package com.miAula.miAula.service;

import com.miAula.miAula.dtos.carrera.CarreraResponseDTO;
import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.repository.CarreraRepository;
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
class CarreraServiceTest {

    @Mock
    private CarreraRepository carreraRepository;

    @InjectMocks
    private CarreraService carreraService;

    @Test
    void administracionListaCarrerasHabilitadasYDeshabilitadas() {
        Carrera habilitada = carrera(1L, true);
        Carrera deshabilitada = carrera(2L, false);
        when(carreraRepository.findAll()).thenReturn(List.of(habilitada, deshabilitada));

        List<CarreraResponseDTO> carreras = carreraService.obtenerTodasParaAdministracion();

        assertEquals(List.of(true, false), carreras.stream()
                .map(CarreraResponseDTO::getActivo)
                .toList());
    }

    @Test
    void actualizarEstadoPermiteReactivarCarreraDeshabilitada() {
        Carrera carrera = carrera(1L, false);
        when(carreraRepository.findById(1L)).thenReturn(Optional.of(carrera));
        when(carreraRepository.save(carrera)).thenReturn(carrera);

        CarreraResponseDTO resultado = carreraService.actualizarEstado(1L, true);

        assertEquals(true, resultado.getActivo());
    }

    private Carrera carrera(Long id, boolean activo) {
        return Carrera.builder()
                .id(id)
                .codigo("CAR00" + id)
                .nombre("Carrera " + id)
                .activo(activo)
                .build();
    }
}
