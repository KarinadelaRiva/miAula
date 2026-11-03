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

    private static final String ADMIN_ROLE_CODE = "ADMIN";
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
        Long roleCount = entityManager.createQuery(
                        "select count(r) from Rol r",
                        Long.class)
                .getSingleResult();

        if (roleCount == 0) {
            Rol adminRole = Rol.builder()
                    .nombre("administrador")
                    .codigo(ADMIN_ROLE_CODE)
                    .descripcion("Rol de administración")
                    .build();
            entityManager.persist(adminRole);
            entityManager.flush();

            entityManager.persist(Rol.builder()
                    .nombre("profesor")
                    .codigo("PROFE")
                    .descripcion("Rol de profesor")
                    .build());
            entityManager.flush();
        }

        Rol adminRole = entityManager.createQuery(
                        "select r from Rol r where r.codigo = :code",
                        Rol.class)
                .setParameter("code", ADMIN_ROLE_CODE)
                .getResultStream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "No se puede crear el administrador: no existe el rol con código " + ADMIN_ROLE_CODE));

        Long adminCount = entityManager.createQuery(
                        "select count(ur) from UsuarioRol ur where ur.rol.id = :roleId",
                        Long.class)
                .setParameter("roleId", adminRole.getId())
                .getSingleResult();

        if (adminCount > 0) {
            return;
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
