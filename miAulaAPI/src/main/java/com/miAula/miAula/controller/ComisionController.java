//package com.miAula.miAula.controller;
//
//import com.miAula.miAula.dtos.comision.ComisionCreateDTO;
//import com.miAula.miAula.dtos.comision.ComisionResponseDTO;
//import com.miAula.miAula.dtos.comision.ComisionUpdateDTO;
//import com.miAula.miAula.dtos.cronograma.CronogramaComisionDTO;
//import com.miAula.miAula.dtos.usuario.UsuarioResponseDTO;
//import com.miAula.miAula.entities.Comision;
//import com.miAula.miAula.service.ComisionService;
//import com.miAula.miAula.service.UsuarioService;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.Parameter;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/comisiones")
//@Tag(name = "Comisiones", description = "Operaciones relacionadas con las comisiones.")
//public class ComisionController {
//
//    private final ComisionService comisionService;
//    private final UsuarioService usuarioService;
//
//    @Autowired
//    public ComisionController(ComisionService comisionService, UsuarioService usuarioService) {
//        this.comisionService = comisionService;
//        this.usuarioService = usuarioService;
//    }
//
//    @GetMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    @Operation(
//            summary = "Obtener comisiones.",
//            description = "Permite a administradores obtener un listado de todas las comisiones.")
//    public ResponseEntity<List<ComisionResponseDTO>> obtenerComisiones() {
//        return new ResponseEntity<>(comisionService.obtenerTodasComisionesDTO(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    @Operation(
//            summary = "Obtener comision por id.",
//            description = "Permite a administradores obtener una comisión a través de su id.")
//    public ResponseEntity<CronogramaComisionDTO> obtenerComisonPorId(
//            @Parameter(description = "ID de la comisión a buscar", example = "1")
//            @PathVariable Long id) {
//        return new ResponseEntity<>(comisionService.obtenerComisionDTOPorId(id), HttpStatus.OK);
//    }
//
//    @PostMapping
//    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESOR')")
//    @Operation(
//            summary = "Crear nueva comisión.",
//            description = "Permite a administradores y profesores crear una nueva comisión.")
//    public ResponseEntity<Comision> crearComision(
//            @Parameter(description = "DTO de creación de comisión", required = true)
//            @Valid @RequestBody ComisionCreateDTO comisionCreateDTO) {
//        return new ResponseEntity<>(comisionService.crearComisionDesdeDTO(comisionCreateDTO), HttpStatus.CREATED);
//    }
//
//    @PutMapping
//    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESOR')")
//    @Operation(
//            summary = "Actualizar comision.",
//            description = "Permite a administradores y profesores actualizar una comisión.")
//    public ResponseEntity<Comision> actualizarComision(
//            @Parameter(description = "DTO de actualización de comisión", required = true)
//            @Valid @RequestBody ComisionUpdateDTO comisionUpdateDTO) {
//        return new ResponseEntity<>(comisionService.actualizarComision(comisionUpdateDTO), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    @Operation(
//            summary = "Actualizar comision.",
//            description = "Permite a administradores y profesores actualizar una comisión.")
//    public ResponseEntity<Void> eliminarComision(
//            @Parameter(description = "ID de la comisión a eliminar", example = "1")
//            @PathVariable Long id) {
//        comisionService.eliminarComision(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/por-materia/{materiaId}")
//    @PreAuthorize("hasRole('ADMIN')")
//    @Operation(
//            summary = "Obtener comisiones asociadas a materia.",
//            description = "Permite a administradores obtener un listado de las comisiones de una materia.")
//    public ResponseEntity<List<ComisionResponseDTO>> obtenerComisionesPorMateria(
//            @Parameter(description = "ID de la materia", example = "1")
//            @PathVariable Long materiaId) {
//        List<ComisionResponseDTO> comisiones = comisionService.obtenerComisionesPorMateria(materiaId);
//
//        if (comisiones.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//
//        return ResponseEntity.ok(comisiones);
//    }
//
//    @GetMapping("/mis-comisiones")
//    @PreAuthorize("hasRole('PROFESOR')")
//    @Operation(
//            summary = "Obtener comisiones asociadas al profesor autenticado.",
//            description = "Permite al profesor logueado obtener un listado de las comisiones a su cargo.")
//    public ResponseEntity<List<ComisionResponseDTO>> obtenerMisComisiones(Authentication authentication) {
//        String username = authentication.getName();
//        UsuarioResponseDTO profesor = usuarioService.obtenerPorUsername(username);
//
//        List<ComisionResponseDTO> comisiones = comisionService.obtenerComisionesPorProfesor(profesor.getId());
//
//        if (comisiones.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//
//        return ResponseEntity.ok(comisiones);
//    }
//}