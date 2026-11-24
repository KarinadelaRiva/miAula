package com.miAula.miAula.service;

import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.EspacioRepository;
import com.miAula.miAula.repository.ReservaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EspacioServiceTest {

    @Mock
    private EspacioRepository espacioRepository;

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private EspacioService espacioService;

    @Test
    void deshabilitarEspacioNoPermiteReservasConFinHoyOEnElFuturo() {
        when(espacioRepository.existsById(6L)).thenReturn(true);
        when(espacioRepository.findById(6L)).thenReturn(Optional.of(Espacio.builder().id(6L).build()));
        when(reservaRepository.existsByEspacio_IdAndActivoTrueAndDiaDeFinGreaterThanEqual(
                6L, LocalDate.now())).thenReturn(true);

        assertThrows(ResourceConflictException.class, () -> espacioService.deshabilitar(6L));
    }
}
