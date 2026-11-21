package com.miAula.miAula.service;

import java.util.List;
import java.util.Locale;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miAula.miAula.dtos.usuario.UsuarioAdminUpdateDTO;
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
    public UsuarioResponseDTO actualizarUsuarioAdmin(
            Long id,
            UsuarioAdminUpdateDTO dto,
            Long administradorId) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (id.equals(administradorId)
                && (usuario.getUsuarioRoles().size() != 1
                || !usuario.getUsuarioRoles().get(0).getRol().getNombre().equalsIgnoreCase(dto.getRol()))) {
            throw new ResourceConflictException("No podés cambiar tu propio rol desde la administración de usuarios");
        }

        if (!dto.getEmail().equals(usuario.getEmail()) &&
                usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceConflictException("Ya existe un usuario con este email");
        }

        Rol nuevoRol = entityManager.createQuery(
                        "select r from Rol r where lower(r.nombre) = :nombre",
                        Rol.class)
                .setParameter("nombre", dto.getRol())
                .getResultStream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No existe el rol: " + dto.getRol()));

        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());

        UsuarioRol asignacionElegida = usuario.getUsuarioRoles().stream()
                .filter(usuarioRol -> usuarioRol.getRol().getId().equals(nuevoRol.getId()))
                .findFirst()
                .orElse(null);

        for (UsuarioRol usuarioRol : List.copyOf(usuario.getUsuarioRoles())) {
            if (usuarioRol != asignacionElegida) {
                usuarioRol.getRol().getUsuarioRoles().remove(usuarioRol);
                usuario.getUsuarioRoles().remove(usuarioRol);
                entityManager.remove(usuarioRol);
            }
        }

        entityManager.flush();

        if (asignacionElegida == null) {
            UsuarioRol nuevaAsignacion = UsuarioRol.builder()
                    .id(new UsuarioRolId(usuario.getId(), nuevoRol.getId()))
                    .usuario(usuario)
                    .rol(nuevoRol)
                    .build();
            usuario.getUsuarioRoles().add(nuevaAsignacion);
            nuevoRol.getUsuarioRoles().add(nuevaAsignacion);
            entityManager.persist(nuevaAsignacion);
        }

        return usuarioToUsuarioResponseDTO(usuario);
    }

    public void desactivarUsuario(Long id, Long administradorId) {
        if (id.equals(administradorId)) {
            throw new ResourceConflictException("No podés eliminar tu propia cuenta desde la administración de usuarios");
        }

        if (Long.valueOf(1L).equals(id)) {
            throw new ResourceConflictException(
                    "No se puede deshabilitar al usuario administrador con ID 1");
        }

        actualizarEstadoUsuario(obtenerPorId(id), false);
    }

    public void reactivarUsuario(Long id) {
        actualizarEstadoUsuario(obtenerPorId(id), true);
    }

    public void desactivarUsuarioActual(String email) {
        Usuario usuario = obtenerPorEmail(email);
        if (Long.valueOf(1L).equals(usuario.getId())) {
            throw new ResourceConflictException(
                    "No se puede deshabilitar al usuario administrador con ID 1");
        }
        actualizarEstadoUsuario(usuario, false);
    }

    private void actualizarEstadoUsuario(Usuario usuario, boolean activo) {
        usuario.setActivo(activo);
        usuarioRepository.save(usuario);
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

    public boolean validarPassword(Usuario usuario, String password) {
        return usuario != null
                && password != null
                && usuario.getPassword() != null
                && passwordEncoder.matches(password, usuario.getPassword());
    }

    @Transactional
    public void actualizarPassword(String email, String nuevaPassword) {
        Usuario usuario = obtenerPorEmail(email);
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(usuario);
    }
    
    @Override
    public Usuario loadUserByUsername(String email) throws UsernameNotFoundException {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con username: " + email));
    }
}
