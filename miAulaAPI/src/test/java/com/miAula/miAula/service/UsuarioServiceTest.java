package com.miAula.miAula.service;

import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.repository.ComisionRepository;
import com.miAula.miAula.repository.EventoRepository;
import com.miAula.miAula.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EntityManager entityManager;

    @Mock
    private ComisionRepository comisionRepository;

    @Mock
    private EventoRepository eventoRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void desactivarUsuarioNoPermiteComisionesActivas() {
        when(usuarioRepository.findById(7L)).thenReturn(Optional.of(usuario(7L)));
        when(comisionRepository.existsByProfesor_IdAndActivoTrue(7L)).thenReturn(true);

        assertThrows(ResourceConflictException.class, () -> usuarioService.desactivarUsuario(7L, 2L));
    }

    @Test
    void desactivarUsuarioNoPermiteEventosActivos() {
        when(usuarioRepository.findById(7L)).thenReturn(Optional.of(usuario(7L)));
        when(comisionRepository.existsByProfesor_IdAndActivoTrue(7L)).thenReturn(false);
        when(eventoRepository.existsByOrganizador_IdAndActivoTrue(7L)).thenReturn(true);

        assertThrows(ResourceConflictException.class, () -> usuarioService.desactivarUsuario(7L, 2L));
    }

    private Usuario usuario(Long id) {
        return Usuario.builder().id(id).activo(true).build();
    }
}
