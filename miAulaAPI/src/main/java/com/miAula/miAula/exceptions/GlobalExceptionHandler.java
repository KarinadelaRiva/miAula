package com.miAula.miAula.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // lanzado para excepciones genericas
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> manejarExcepcionGenerica(Exception ex) {
        return new ResponseEntity<>("Error inesperado: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // lanzado cuando no se encuentra un recurso al que se quiere acceder
    // lanzado cuando la solicitud no cumple con las reglas de negocio o validaciones logicas
    @ExceptionHandler(EntityValidationException.class)
    public ResponseEntity<String> manejarEntityValidationException(EntityValidationException ex) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
    }

    @ExceptionHandler(ReservaSolapadaException.class)
    public ResponseEntity<String> manejarReservaSolapada(ReservaSolapadaException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> manejarResourceNotFound(
            ResourceNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "mensaje", ex.getMessage()
                ));
            }

    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<Map<String, String>> manejarResourceConflict(
            ResourceConflictException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "mensaje", ex.getMessage()
                ));
    }
}

