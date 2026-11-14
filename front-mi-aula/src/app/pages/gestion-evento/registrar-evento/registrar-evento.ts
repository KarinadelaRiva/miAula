import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  EventoCreateDTO,
  EventoService
} from '../../../services/evento-service/evento-service';

import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { Usuario } from '../../../models/usuario';


@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registrar-evento.html',
  styleUrls: ['./registrar-evento.css']
})
export class RegistrarEvento implements OnInit {

  // ============================================================
  // DATOS DEL EVENTO
  // ============================================================

  codigo: string = '';
  nombre: string = '';
  descripcion: string = '';

  participantesMaximos: number | null = null;


  // ============================================================
  // ORGANIZADOR
  // ============================================================

  usuarios: Usuario[] = [];

  usuariosFiltrados: Usuario[] = [];

  textoOrganizador: string = '';

  organizadorSeleccionado: Usuario | null = null;

  organizadorId: number | null = null;

  mostrarOpciones: boolean = false;


  // ============================================================
  // ESTADOS
  // ============================================================

  cargandoUsuarios: boolean = true;

  guardando: boolean = false;

  mensajeExito: string = '';

  mensajeError: string = '';


  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // ============================================================
  // INICIO
  // ============================================================

  ngOnInit(): void {

    this.cargarUsuarios();
  }


  // ============================================================
  // CARGAR USUARIOS DEL SISTEMA
  // ============================================================

  cargarUsuarios(): void {

    this.cargandoUsuarios = true;

    this.mensajeError = '';


    this.usuarioService
      .getAll()
      .subscribe({

        next: (usuarios) => {

          // Solo usuarios activos pueden ser organizadores
          this.usuarios = usuarios.filter(
            usuario => usuario.activo
          );

          this.cargandoUsuarios = false;

          this.cdr.detectChanges();
        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Error obteniendo usuarios:',
            error
          );

          this.usuarios = [];

          this.cargandoUsuarios = false;

          this.mensajeError =
            'No se pudieron cargar los usuarios del sistema.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // BUSCAR ORGANIZADOR
  // ============================================================

  buscarOrganizadores(): void {

    const texto =
      this.textoOrganizador
        .trim()
        .toLowerCase();


    // Si el administrador empieza a modificar
    // el texto después de seleccionar un usuario,
    // quitamos la selección anterior.
    if (
      this.organizadorSeleccionado &&
      this.textoOrganizador !==
        this.obtenerTextoUsuario(
          this.organizadorSeleccionado
        )
    ) {

      this.organizadorSeleccionado = null;

      this.organizadorId = null;
    }


    if (!texto) {

      this.usuariosFiltrados = [];

      this.mostrarOpciones = false;

      return;
    }


    this.usuariosFiltrados =
      this.usuarios
        .filter(usuario => {

          const nombre =
            usuario.nombre
              ?.toLowerCase() ?? '';

          const apellido =
            usuario.apellido
              ?.toLowerCase() ?? '';

          const email =
            usuario.email
              ?.toLowerCase() ?? '';

          const nombreCompleto =
            `${nombre} ${apellido}`;


          return (
            nombre.includes(texto) ||
            apellido.includes(texto) ||
            nombreCompleto.includes(texto) ||
            email.includes(texto)
          );

        })
        .slice(0, 8);


    this.mostrarOpciones =
      this.usuariosFiltrados.length > 0;
  }


  // ============================================================
  // SELECCIONAR ORGANIZADOR
  // ============================================================

  seleccionarOrganizador(
    usuario: Usuario
  ): void {

    this.organizadorSeleccionado =
      usuario;

    this.organizadorId =
      usuario.id;

    this.textoOrganizador =
      this.obtenerTextoUsuario(usuario);

    this.usuariosFiltrados = [];

    this.mostrarOpciones = false;
  }


  // ============================================================
  // QUITAR ORGANIZADOR
  // ============================================================

  quitarOrganizador(): void {

    this.organizadorSeleccionado = null;

    this.organizadorId = null;

    this.textoOrganizador = '';

    this.usuariosFiltrados = [];

    this.mostrarOpciones = false;
  }


  // ============================================================
  // MOSTRAR TEXTO DEL USUARIO
  // ============================================================

  private obtenerTextoUsuario(
    usuario: Usuario
  ): string {

    return (
      `${usuario.nombre} ${usuario.apellido} - ${usuario.email}`
    );
  }


  // ============================================================
  // REGISTRAR EVENTO
  // ============================================================

  registrarEvento(): void {

    this.mensajeExito = '';

    this.mensajeError = '';


    // ==========================================================
    // VALIDAR ORGANIZADOR
    // ==========================================================

    if (
      this.organizadorId === null ||
      !this.organizadorSeleccionado
    ) {

      this.mensajeError =
        'Seleccioná un organizador para el evento.';

      return;
    }


    // ==========================================================
    // VALIDAR CÓDIGO
    // ==========================================================

    const codigoLimpio =
      this.codigo.trim();


    if (!codigoLimpio) {

      this.mensajeError =
        'Ingresá el código del evento.';

      return;
    }


    if (codigoLimpio.length > 6) {

      this.mensajeError =
        'El código no puede superar los 6 caracteres.';

      return;
    }


    // ==========================================================
    // VALIDAR NOMBRE
    // ==========================================================

    const nombreLimpio =
      this.nombre.trim();


    if (!nombreLimpio) {

      this.mensajeError =
        'Ingresá el nombre del evento.';

      return;
    }


    if (nombreLimpio.length > 50) {

      this.mensajeError =
        'El nombre no puede superar los 50 caracteres.';

      return;
    }


    // ==========================================================
    // VALIDAR DESCRIPCIÓN
    // ==========================================================

    const descripcionLimpia =
      this.descripcion.trim();


    if (descripcionLimpia.length > 500) {

      this.mensajeError =
        'La descripción no puede superar los 500 caracteres.';

      return;
    }


    // ==========================================================
    // VALIDAR PARTICIPANTES
    // ==========================================================

    if (
      this.participantesMaximos === null ||
      this.participantesMaximos <= 0
    ) {

      this.mensajeError =
        'La cantidad máxima de participantes debe ser mayor a 0.';

      return;
    }


    // ==========================================================
    // CREAR DTO
    // ==========================================================

    const nuevoEvento: EventoCreateDTO = {

      codigo:
        codigoLimpio,

      nombre:
        nombreLimpio,

      descripcion:
        descripcionLimpia.length > 0
          ? descripcionLimpia
          : null,

      participantesMaximos:
        Number(
          this.participantesMaximos
        ),

      organizadorId:
        this.organizadorId
    };


    // ==========================================================
    // ENVIAR AL BACKEND
    // ==========================================================

    this.guardando = true;


    this.eventoService
      .crear(nuevoEvento)
      .subscribe({

        next: () => {

          this.guardando = false;

          this.mensajeExito =
            'Evento registrado correctamente.';

          this.limpiarFormulario();

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error registrando evento:',
            error
          );

          this.guardando = false;

          this.mensajeError =
            this.obtenerMensajeError(
              error
            );

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // LIMPIAR FORMULARIO
  // ============================================================

  limpiarFormulario(): void {

    this.codigo = '';

    this.nombre = '';

    this.descripcion = '';

    this.participantesMaximos = null;

    this.quitarOrganizador();
  }


  // ============================================================
  // CANCELAR
  // ============================================================

  cancelar(): void {

    this.router.navigate(
      ['/gestion-evento']
    );
  }


  // ============================================================
  // MENSAJE DE ERROR
  // ============================================================

  private obtenerMensajeError(
    error: HttpErrorResponse
  ): string {

    if (
      typeof error.error === 'string' &&
      error.error.trim().length > 0
    ) {

      return error.error;
    }


    if (
      error.error &&
      error.error.message
    ) {

      return error.error.message;
    }


    if (error.status === 409) {

      return 'Ya existe un evento con ese código.';
    }


    if (error.status === 403) {

      return 'No tenés permisos para registrar eventos.';
    }


    if (error.status === 400) {

      return 'Los datos ingresados no son válidos.';
    }


    if (error.status === 0) {

      return 'No se pudo conectar con el servidor.';
    }


    return 'Ocurrió un error al registrar el evento.';
  }
}