package com.miAula.miAula.service;

import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.enums.DiaSemana;
import com.miAula.miAula.repository.ReservaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private ReservaService reservaService;

    @Test
    void modificarDesdeSolicitudFinalizaLaOriginalYCreaOtraReserva() {
        LocalDate hoy = LocalDate.now();
        Espacio espacioOriginal = new Espacio();
        espacioOriginal.setId(1L);
        Comision comision = new Comision();
        comision.setId(3L);
        Usuario solicitante = new Usuario();
        solicitante.setId(4L);

        Reserva original = new Reserva();
        original.setId(5L);
        original.setActivo(true);
        original.setDiaDeLaSemana(DiaSemana.LUNES);
        original.setDiaDeInicio(hoy.minusDays(30));
        original.setDiaDeFin(hoy.plusDays(60));
        original.setHoraDeInicio(LocalTime.of(9, 0));
        original.setHoraDeFin(LocalTime.of(10, 0));
        original.setEspacio(espacioOriginal);
        original.setComision(comision);
        original.setSolicitante(solicitante);

        LocalDate nuevoInicio = hoy.plusDays(10);
        Solicitud solicitud = new Solicitud();
        solicitud.setReservaOriginal(original);
        solicitud.setDiaDeLaSemana(DiaSemana.LUNES);
        solicitud.setDiaDeInicio(nuevoInicio);
        solicitud.setDiaDeFin(hoy.plusDays(40));
        solicitud.setHoraDeInicio(LocalTime.of(9, 0));
        solicitud.setHoraDeFin(LocalTime.of(10, 0));
        solicitud.setEspacio(espacioOriginal);
        solicitud.setComision(comision);
        solicitud.setSolicitante(solicitante);

        when(reservaRepository.findByEspacio_IdAndDiaDeLaSemanaAndActivoTrue(1L, DiaSemana.LUNES))
                .thenReturn(List.of(original));
        when(reservaRepository.save(any(Reserva.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Reserva nueva = reservaService.modificarDesdeSolicitud(solicitud);

        assertEquals(nuevoInicio.minusDays(1), original.getDiaDeFin());
        assertFalse(original.getActivo());
        assertEquals(hoy.minusDays(30), original.getDiaDeInicio());
        assertEquals(DiaSemana.LUNES, original.getDiaDeLaSemana());
        assertEquals(LocalTime.of(9, 0), original.getHoraDeInicio());
        assertEquals(espacioOriginal, original.getEspacio());
        assertNotSame(original, nueva);
        assertEquals(nuevoInicio, nueva.getDiaDeInicio());
        assertEquals(DiaSemana.LUNES, nueva.getDiaDeLaSemana());
        assertEquals(espacioOriginal, nueva.getEspacio());
        verify(reservaRepository, times(2)).save(any(Reserva.class));
    }

    @Test
    void modificarDesdeSolicitudPermiteUnaFechaAnteriorAlInicioOriginal() {
        LocalDate hoy = LocalDate.now();
        Espacio espacio = new Espacio();
        espacio.setId(1L);
        Comision comision = new Comision();
        comision.setId(3L);
        Usuario solicitante = new Usuario();
        solicitante.setId(4L);

        Reserva original = new Reserva();
        original.setId(5L);
        original.setActivo(true);
        original.setDiaDeLaSemana(DiaSemana.LUNES);
        original.setDiaDeInicio(hoy.plusDays(30));
        original.setDiaDeFin(hoy.plusDays(60));
        original.setHoraDeInicio(LocalTime.of(9, 0));
        original.setHoraDeFin(LocalTime.of(10, 0));
        original.setEspacio(espacio);
        original.setComision(comision);
        original.setSolicitante(solicitante);

        Solicitud solicitud = new Solicitud();
        solicitud.setReservaOriginal(original);
        solicitud.setDiaDeLaSemana(DiaSemana.LUNES);
        solicitud.setDiaDeInicio(hoy);
        solicitud.setDiaDeFin(hoy.plusDays(20));
        solicitud.setHoraDeInicio(LocalTime.of(11, 0));
        solicitud.setHoraDeFin(LocalTime.of(12, 0));
        solicitud.setEspacio(espacio);
        solicitud.setComision(comision);
        solicitud.setSolicitante(solicitante);

        when(reservaRepository.findByEspacio_IdAndDiaDeLaSemanaAndActivoTrue(1L, DiaSemana.LUNES))
                .thenReturn(List.of(original));
        when(reservaRepository.save(any(Reserva.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Reserva nueva = reservaService.modificarDesdeSolicitud(solicitud);

        assertEquals(hoy.plusDays(60), original.getDiaDeFin());
        assertFalse(original.getActivo());
        assertEquals(hoy, nueva.getDiaDeInicio());
        assertEquals(LocalTime.of(11, 0), nueva.getHoraDeInicio());
        assertEquals(LocalTime.of(12, 0), nueva.getHoraDeFin());
        verify(reservaRepository, times(2)).save(any(Reserva.class));
    }
}
