package com.miAula.miAula.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miAula.miAula.dtos.usuario.UsuarioResponseDTO;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UsuarioResponseDTO usuarioToUsuarioResponseDTO(Usuario usuario) {
        return UsuarioResponseDTO.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getUsername())
                //.roles(usuario.getUsuarioRoles())
                .activo(usuario.getActivo())
                .build();
    }

    public List<UsuarioResponseDTO> getAllUsuariosDTO() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(this::usuarioToUsuarioResponseDTO)
                .toList();
    }
    
    @Override
    public Usuario loadUserByUsername(String email) throws UsernameNotFoundException {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con username: " + email));
    }
}
