package com.miAula.miAula.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miAula.miAula.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    
    @EntityGraph(attributePaths = {"usuarioRoles", "usuarioRoles.rol"})
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}
