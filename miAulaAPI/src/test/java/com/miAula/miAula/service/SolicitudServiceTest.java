package com.miAula.miAula.service;

import com.miAula.miAula.entities.Comision;
import com.miAula.miAula.entities.Espacio;
import com.miAula.miAula.entities.Evento;
import com.miAula.miAula.entities.Recurso;
import com.miAula.miAula.entities.Solicitud;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.enums.EstadoSolicitud;
import com.miAula.miAula.entities.tablas_intermedias.RecursoSolicitud;
import com.miAula.miAula.exceptions.EntityValidationException;
import com.miAula.miAula.repository.SolicitudRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SolicitudServiceTest {

    @Mock
    private SolicitudRepository solicitudRepository;

    @Mock
    private ReservaService reservaService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private EspacioService espacioService;

    @Mock
    private ComisionService comisionService;

    @Mock
    private RecursoService recursoService;

    @InjectMocks
    private SolicitudService solicitudService;

    @Test
    void aprobarRechazaEspacioInactivo() {
        Solicitud solicitud = solicitud(espacio(false), usuario(true), comision(true), null, List.of());
        prepararSolicitud(solicitud);

        EntityValidationException error = assertThrows(
                EntityValidationException.class,
                () -> solicitudService.aprobar(1L));

        assertEquals(
                "No se puede aprobar la solicitud porque el espacio solicitado ya no está activo.",
                error.getMessage());
        verify(reservaService, never()).generarDesdeSolicitud(any());
    }

    @Test
    void aprobarRechazaUsuarioInactivo() {
        Solicitud solicitud = solicitud(espacio(true), usuario(false), comision(true), null, List.of());
        prepararSolicitud(solicitud);

        EntityValidationException error = assertThrows(
                EntityValidationException.class,
                () -> solicitudService.aprobar(1L));

        assertEquals(
                "No se puede aprobar la solicitud porque el usuario solicitante ya no está activo.",
                error.getMessage());
        verify(reservaService, never()).generarDesdeSolicitud(any());
    }

    @Test
    void aprobarRechazaComisionInactiva() {
        Solicitud solicitud = solicitud(espacio(true), usuario(true), comision(false), null, List.of());
        prepararSolicitud(solicitud);

        EntityValidationException error = assertThrows(
                EntityValidationException.class,
                () -> solicitudService.aprobar(1L));

        assertEquals(
                "No se puede aprobar la solicitud porque la comisión asociada ya no está activa.",
                error.getMessage());
        verify(reservaService, never()).generarDesdeSolicitud(any());
    }

    @Test
    void aprobarRechazaEventoInactivo() {
        Evento evento = Evento.builder().activo(false).build();
        Solicitud solicitud = solicitud(espacio(true), usuario(true), null, evento, List.of());
        prepararSolicitud(solicitud);

        EntityValidationException error = assertThrows(
                EntityValidationException.class,
                () -> solicitudService.aprobar(1L));

        assertEquals(
                "No se puede aprobar la solicitud porque el evento asociado ya no está activo.",
                error.getMessage());
        verify(reservaService, never()).generarDesdeSolicitud(any());
    }

    @Test
    void aprobarRechazaRecursoInactivoAntesDeCrearLaReserva() {
        Recurso recurso = Recurso.builder().id(8L).activo(false).build();
        RecursoSolicitud recursoSolicitud = RecursoSolicitud.builder().recurso(recurso).build();
        Solicitud solicitud = solicitud(
                espacio(true), usuario(true), comision(true), null, List.of(recursoSolicitud));
        prepararSolicitud(solicitud);
        doThrow(new EntityValidationException("Uno de los recursos solicitados ya no está disponible."))
                .when(recursoService).validarDisponibilidadDeSolicitud(solicitud);

        assertThrows(EntityValidationException.class, () -> solicitudService.aprobar(1L));

        verify(recursoService).validarDisponibilidadDeSolicitud(solicitud);
        verify(reservaService, never()).generarDesdeSolicitud(any());
    }

    @Test
    void aprobarSolicitudConTodasLasEntidadesActivas() {
        Solicitud solicitud = solicitud(espacio(true), usuario(true), comision(true), null, List.of());
        prepararSolicitud(solicitud);
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);

        Solicitud resultado = solicitudService.aprobar(1L);

        assertEquals(EstadoSolicitud.ACEPTADA, resultado.getEstado());
        verify(reservaService).generarDesdeSolicitud(solicitud);
    }

    @Test
    void validarAntesDeAprobarCompruebaRecursosSinCrearLaReserva() {
        Solicitud solicitud = solicitud(espacio(true), usuario(true), comision(true), null, List.of());
        prepararSolicitud(solicitud);

        solicitudService.validarAntesDeAprobar(1L);

        verify(recursoService).validarDisponibilidadDeSolicitud(solicitud);
        verify(reservaService, never()).generarDesdeSolicitud(any());
        verify(solicitudRepository, never()).save(any(Solicitud.class));
    }

    private void prepararSolicitud(Solicitud solicitud) {
        when(solicitudRepository.findById(1L)).thenReturn(Optional.of(solicitud));
    }

    private Solicitud solicitud(
            Espacio espacio,
            Usuario solicitante,
            Comision comision,
            Evento evento,
            List<RecursoSolicitud> recursos) {
        return Solicitud.builder()
                .id(1L)
                .estado(EstadoSolicitud.PENDIENTE)
                .espacio(espacio)
                .solicitante(solicitante)
                .comision(comision)
                .evento(evento)
                .recursos(recursos)
                .build();
    }

    private Espacio espacio(boolean activo) {
        return Espacio.builder().activo(activo).build();
    }

    private Usuario usuario(boolean activo) {
        return Usuario.builder().activo(activo).build();
    }

    private Comision comision(boolean activo) {
        return Comision.builder().activo(activo).build();
    }
}
