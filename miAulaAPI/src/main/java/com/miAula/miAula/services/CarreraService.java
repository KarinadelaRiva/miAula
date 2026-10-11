package com.miAula.miAula.services;

import com.miAula.miAula.entities.Carrera;
import com.miAula.miAula.repositories.CarreraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarreraService {

    private final CarreraRepository carreraRepository;

    public CarreraService(CarreraRepository carreraRepository) {
        this.carreraRepository = carreraRepository;
    }

    // Listar solamente carreras activas
    public List<Carrera> listarCarreras() {
        return carreraRepository.findByActivoTrue();
    }

    // Buscar una carrera activa por ID
    public Carrera buscarPorId(Long id) {
        return carreraRepository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new RuntimeException("Carrera no encontrada")
                );
    }

    // Crear o reactivar una carrera
    public Carrera crearCarrera(Carrera carrera) {

        String codigo = carrera.getCodigo().trim().toUpperCase();

        Optional<Carrera> carreraExistente =
                carreraRepository.findByCodigoIgnoreCase(codigo);

        if (carreraExistente.isPresent()) {

            Carrera existente = carreraExistente.get();

            // Si estaba eliminada lógicamente, la reactivamos
            if (Boolean.FALSE.equals(existente.getActivo())) {

                existente.setNombre(carrera.getNombre().trim());
                existente.setActivo(true);

                return carreraRepository.save(existente);
            }

            // Si está activa, no permitimos duplicarla
            throw new IllegalArgumentException(
                    "Ya existe una carrera con el código " + codigo
            );
        }

        carrera.setId(null);
        carrera.setCodigo(codigo);
        carrera.setNombre(carrera.getNombre().trim());
        carrera.setActivo(true);

        return carreraRepository.save(carrera);
    }

    // Modificar una carrera
    public Carrera actualizarCarrera(
            Long id,
            Carrera datosNuevos
    ) {

        Carrera carrera = buscarPorId(id);

        String codigoNuevo =
                datosNuevos.getCodigo().trim().toUpperCase();

        Optional<Carrera> otraCarrera =
                carreraRepository.findByCodigoIgnoreCase(codigoNuevo);

        if (
                otraCarrera.isPresent()
                        &&
                        !otraCarrera.get().getId().equals(id)
        ) {

            throw new IllegalArgumentException(
                    "Ya existe otra carrera con el código " + codigoNuevo
            );
        }

        carrera.setCodigo(codigoNuevo);
        carrera.setNombre(
                datosNuevos.getNombre().trim()
        );

        return carreraRepository.save(carrera);
    }

    // Baja lógica
    public void eliminarCarrera(Long id) {

        Carrera carrera = buscarPorId(id);

        carrera.setActivo(false);

        carreraRepository.save(carrera);
    }
}