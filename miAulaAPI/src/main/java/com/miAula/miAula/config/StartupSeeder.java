package com.miAula.miAula.config;

import com.miAula.miAula.entities.Rol;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRol;
import com.miAula.miAula.entities.tablas_intermedias.UsuarioRolId;
import com.miAula.miAula.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StartupSeeder implements ApplicationRunner {

    private static final long ADMIN_ROLE_ID = 1L;
    private static final String ADMIN_EMAIL = "admin@gmail.com";

    private final EntityManager entityManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public StartupSeeder(
            EntityManager entityManager,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.entityManager = entityManager;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        Long adminCount = entityManager.createQuery(
                        "select count(ur) from UsuarioRol ur where ur.rol.id = :roleId",
                        Long.class)
                .setParameter("roleId", ADMIN_ROLE_ID)
                .getSingleResult();
 
        if (adminCount > 0) {
            return;
        }


        Rol adminRole = entityManager.find(Rol.class, ADMIN_ROLE_ID);
        if (adminRole == null) {
            throw new IllegalStateException(
                    "No se puede crear el administrador: no existe el rol con ID " + ADMIN_ROLE_ID);
        }

        if (usuarioRepository.findByEmail(ADMIN_EMAIL).isPresent()) {
            throw new IllegalStateException(
                    "No se puede crear el administrador: ya existe un usuario con el email " + ADMIN_EMAIL
                            + " pero no tiene asignado el rol administrador.");
        }

        Usuario admin = usuarioRepository.save(Usuario.builder()
                .email(ADMIN_EMAIL)
                .nombre("admin")
                .apellido("admin")
                .password(passwordEncoder.encode("admin"))
                .build());

        UsuarioRol usuarioRol = UsuarioRol.builder()
                .id(new UsuarioRolId(admin.getId(), adminRole.getId()))
                .usuario(admin)
                .rol(adminRole)
                .build();

        admin.getUsuarioRoles().add(usuarioRol);
        adminRole.getUsuarioRoles().add(usuarioRol);
        entityManager.persist(usuarioRol);
    }
}
