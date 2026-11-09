package com.miAula.miAula.service;

import com.miAula.miAula.entities.Reserva;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.ReservaRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public List<Reserva> obtenerReservasDeUsuario(String email) {
        return reservaRepository.findBySolicitante_Email(email);
    }

    public void desactivarReserva(Long id, String email, boolean administrador) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        if (!administrador && !reserva.getSolicitante().getEmail().equals(email)) {
            throw new AccessDeniedException("No tenés permiso para cancelar esta reserva");
        }

        reserva.setActivo(false);
        reservaRepository.save(reserva);
    }

    public List<Reserva> obtenerReservasActivas() {
        LocalDateTime ahora = LocalDateTime.now();
        return reservaRepository.findByDiaDeFinGreaterThanOrDiaDeFinEqualsAndHoraDeFinGreaterThan(
                ahora.toLocalDate(),
                ahora.toLocalDate(),
                ahora.toLocalTime());
    }

    public List<Reserva> obtenerReservasTerminadas() {
        LocalDateTime ahora = LocalDateTime.now();
        return reservaRepository.findByDiaDeFinLessThanOrDiaDeFinEqualsAndHoraDeFinLessThan(
                ahora.toLocalDate(),
                ahora.toLocalDate(),
                ahora.toLocalTime());
    }
}
