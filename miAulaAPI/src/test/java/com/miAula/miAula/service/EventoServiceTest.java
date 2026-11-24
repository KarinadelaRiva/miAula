package com.miAula.miAula.service;

import com.miAula.miAula.entities.Evento;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.EventoRepository;
import com.miAula.miAula.repository.ReservaRepository;
import com.miAula.miAula.repository.UsuarioRepository;
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
class EventoServiceTest {

    @Mock
    private EventoRepository eventoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private EventoService eventoService;

    @Test
    void deshabilitarEventoNoPermiteReservasConFinHoyOEnElFuturo() {
        when(eventoRepository.findById(5L)).thenReturn(Optional.of(Evento.builder().id(5L).build()));
        when(reservaRepository.existsByEvento_IdAndActivoTrueAndDiaDeFinGreaterThanEqual(
                5L, LocalDate.now())).thenReturn(true);

        assertThrows(ResourceConflictException.class, () -> eventoService.deshabilitarEvento(5L));
    }
}
