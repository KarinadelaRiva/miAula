package com.miAula.miAula.dtos.usuario;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PasswordPolicyValidationTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        validatorFactory.close();
    }

    @Test
    void acceptsStrongPasswordsForCreationAndChange() {
        assertPasswordValidForBothRequests("Abcdef1!");
    }

    @Test
    void rejectsPasswordsMissingAnyRequirementForCreationAndChange() {
        for (String password : List.of(
                "abcdefg1!",
                "ABCDEFG1!",
                "Abcdefgh!",
                "Abcdefg1",
                "Ab1!xyz"
        )) {
            assertPasswordInvalidForBothRequests(password);
        }
    }

    private void assertPasswordValidForBothRequests(String password) {
        assertFalse(hasPasswordViolation(usuarioCreateDTO(password)));
        assertFalse(hasPasswordViolation(actualizarPasswordRequest(password)));
    }

    private void assertPasswordInvalidForBothRequests(String password) {
        assertTrue(hasPasswordViolation(usuarioCreateDTO(password)), password);
        assertTrue(hasPasswordViolation(actualizarPasswordRequest(password)), password);
    }

    private boolean hasPasswordViolation(Object request) {
        return validator.validate(request).stream()
                .anyMatch(violation -> "password".equals(violation.getPropertyPath().toString()));
    }

    private UsuarioCreateDTO usuarioCreateDTO(String password) {
        UsuarioCreateDTO dto = new UsuarioCreateDTO();
        dto.setNombre("Ana");
        dto.setApellido("Pérez");
        dto.setEmail("ana@example.com");
        dto.setPassword(password);
        dto.setRol("profesor");
        return dto;
    }

    private ActualizarPasswordRequest actualizarPasswordRequest(String password) {
        ActualizarPasswordRequest request = new ActualizarPasswordRequest();
        request.setPassword(password);
        return request;
    }
}
