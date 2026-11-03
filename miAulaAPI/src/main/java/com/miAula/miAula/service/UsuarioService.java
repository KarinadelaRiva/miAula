package com.miAula.miAula.service;

import java.util.List;
import java.util.Locale;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miAula.miAula.dtos.usuario.UsuarioCreateDTO;
import com.miAula.miAula.dtos.usuario.UsuarioResponseDTO;
import com.miAula.miAula.dtos.usuario.UsuarioUpdateDTO;
import com.miAula.miAula.entities.Rol;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRol;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRolId;
import com.miAula.miAula.exceptions.ResourceConflictException;
import com.miAula.miAula.exceptions.ResourceNotFoundException;
import com.miAula.miAula.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            EntityManager entityManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.entityManager = entityManager;
    }

    private UsuarioResponseDTO usuarioToUsuarioResponseDTO(Usuario usuario) {
        return UsuarioResponseDTO.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getUsername())
                .roles(usuario.getUsuarioRoles().stream()
                    .map(usuarioRol -> usuarioRol.getRol().getNombre().toLowerCase(Locale.ROOT))
                    .toList())
                .activo(usuario.getActivo())
                .build();
    }

    public List<UsuarioResponseDTO> getAllUsuariosDTO() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(this::usuarioToUsuarioResponseDTO)
                .toList();
    }

    public UsuarioResponseDTO obtenerPorEmailDto(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con username: " + email));
        return this.usuarioToUsuarioResponseDTO(usuario);
    }

    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con username: " + email));
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
    }

    public UsuarioResponseDTO obtenerPorIdDto(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return usuarioToUsuarioResponseDTO(usuario);
    }

    public boolean existePorEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public UsuarioResponseDTO actualizarUsuario(Usuario usuarioActual, UsuarioUpdateDTO dto) {
        // Validar nuevo email si cambia
        if (!dto.getEmail().equals(usuarioActual.getUsername()) &&
                usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceConflictException("Ya existe un usuario con este email");
        }

        usuarioActual.setNombre(dto.getNombre());
        usuarioActual.setApellido(dto.getApellido());
        usuarioActual.setEmail(dto.getEmail());

        Usuario guardado = usuarioRepository.save(usuarioActual);
        return usuarioToUsuarioResponseDTO(guardado);
    }

    @Transactional
    public UsuarioResponseDTO crearUsuario(UsuarioCreateDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceConflictException("Ya existe un usuario con este email");
        }

        String nombreRol = switch (dto.getRol()) {
            case "administrador" -> "administrador";
            case "profesor" -> "profesor";
            default -> throw new ResourceNotFoundException("Rol no válido: " + dto.getRol());
        };

        Rol rol = entityManager.createQuery(
                        "select r from Rol r where lower(r.nombre) = :nombre",
                        Rol.class)
                .setParameter("nombre", nombreRol)
                .getResultStream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No existe el rol: " + nombreRol));

        Usuario usuario = Usuario.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();
        Usuario guardado = usuarioRepository.save(usuario);

        UsuarioRol usuarioRol = UsuarioRol.builder()
                .id(new UsuarioRolId(guardado.getId(), rol.getId()))
                .usuario(guardado)
                .rol(rol)
                .build();
        entityManager.persist(usuarioRol);
        guardado.getUsuarioRoles().add(usuarioRol);
        rol.getUsuarioRoles().add(usuarioRol);

        return usuarioToUsuarioResponseDTO(guardado);
    }
    
    @Override
    public Usuario loadUserByUsername(String email) throws UsernameNotFoundException {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con username: " + email));
    }
}
