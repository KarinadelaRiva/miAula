package com.miAula.miAula.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.miAula.miAula.dtos.usuario.ActualizarPasswordRequest;
import com.miAula.miAula.dtos.usuario.UsuarioCreateDTO;
import com.miAula.miAula.dtos.usuario.UsuarioAdminUpdateDTO;
import com.miAula.miAula.dtos.usuario.UsuarioResponseDTO;
import com.miAula.miAula.dtos.usuario.UsuarioUpdateDTO;
import com.miAula.miAula.dtos.usuario.ValidarPasswordRequest;
import com.miAula.miAula.entities.Usuario;
import com.miAula.miAula.service.UsuarioService;

import jakarta.validation.Valid;


@RestController 
@RequestMapping("/usuarios")
public class UsuarioController {
    
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        List<UsuarioResponseDTO> usuarios = usuarioService.getAllUsuariosDTO();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping ("/me")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioLogueado(Authentication authentication) {
        String username = authentication.getName();
        return new ResponseEntity<>(usuarioService.obtenerPorEmailDto(username), HttpStatus.OK);
    }

    @PostMapping("/me/validar-password")
    public ResponseEntity<Boolean> validarPassword(
            Authentication authentication,
            @Valid @RequestBody ValidarPasswordRequest request) {
        Usuario usuario = usuarioService.obtenerPorEmail(authentication.getName());
        return ResponseEntity.ok(usuarioService.validarPassword(usuario, request.getPassword()));
    }

    @PatchMapping("me/usuario")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuario(
            Authentication authentication,
            @Valid @RequestBody UsuarioUpdateDTO usuarioNuevoDto) {

        Usuario usuarioLogueado = (Usuario) authentication.getPrincipal();

        return new ResponseEntity<>(
                usuarioService.actualizarUsuario(usuarioLogueado, usuarioNuevoDto),
                HttpStatus.OK);
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> actualizarPassword(
            Authentication authentication,
            @Valid @RequestBody ActualizarPasswordRequest request) {
        usuarioService.actualizarPassword(authentication.getName(), request.getPassword());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me/desactivar")
    public ResponseEntity<Void> desactivarUsuarioActual(Authentication authentication) {
        usuarioService.desactivarUsuarioActual(authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        return new ResponseEntity<>(usuarioService.obtenerPorIdDto(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuarioAdmin(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UsuarioAdminUpdateDTO request) {
        Usuario administrador = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuarioService.actualizarUsuarioAdmin(id, request, administrador.getId()));
    }

    @PatchMapping("/{id}/desactivar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> desactivarUsuario(Authentication authentication, @PathVariable Long id) {
        Usuario administrador = (Usuario) authentication.getPrincipal();
        usuarioService.desactivarUsuario(id, administrador.getId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/reactivar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> reactivarUsuario(@PathVariable Long id) {
        usuarioService.reactivarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar-email")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Boolean> existeUsuarioPorEmail(@RequestParam String email) {
        return ResponseEntity.ok(usuarioService.existePorEmail(email));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> crearUsuario(
            @Valid @RequestBody UsuarioCreateDTO usuario) {
        return new ResponseEntity<>(usuarioService.crearUsuario(usuario), HttpStatus.CREATED);
    }

}
