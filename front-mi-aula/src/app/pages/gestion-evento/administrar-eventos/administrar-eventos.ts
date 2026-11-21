import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Evento,
  EventoService,
  EventoUpdateDTO
} from '../../../services/evento-service/evento-service';

import {
  UsuarioService
} from '../../../services/usuario-service/usuario-service';

import {
  Usuario
} from '../../../models/usuario';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';


@Component({
  selector: 'app-administrar-eventos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './administrar-eventos.html',
  styleUrls: ['./administrar-eventos.css']
})
export class AdministrarEventos implements OnInit {

  // ============================================================
  // ROLES
  // ============================================================

  esAdmin: boolean = false;
  esProfesor: boolean = false;

  cargandoRol: boolean = true;


  // ============================================================
  // EVENTOS
  // ============================================================

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  cargando: boolean = true;


  // ============================================================
  // FILTROS
  // ============================================================

  textoBusqueda: string = '';
  filtroEstado: string = 'todos';


  // ============================================================
  // EDICIÓN
  // ============================================================

  eventoEditando: Evento | null = null;

  editCodigo: string = '';
  editNombre: string = '';
  editDescripcion: string = '';

  editParticipantesMaximos: number | null = null;


  // ============================================================
  // ORGANIZADOR
  // ============================================================

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  textoOrganizador: string = '';

  organizadorSeleccionado: Usuario | null = null;

  organizadorId: number | null = null;

  mostrarOpcionesOrganizador: boolean = false;


  // ============================================================
  // MODAL
  // ============================================================

  modalVisible: boolean = false;

  accionModal:
    'activar' |
    'deshabilitar' |
    null = null;

  eventoSeleccionado: Evento | null = null;

  procesandoEstado: boolean = false;


  // ============================================================
  // MENSAJES
  // ============================================================

  mensajeExito: string = '';
  mensajeError: string = '';

  guardando: boolean = false;


  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}


  // ============================================================
  // INICIO
  // ============================================================

  ngOnInit(): void {

    this.cargarUsuarioActual();
  }


  // ============================================================
  // USUARIO ACTUAL
  // ============================================================

  cargarUsuarioActual(): void {

    this.cargandoRol = true;
    this.cargando = true;
    this.mensajeError = '';


    this.usuarioService
      .me()
      .subscribe({

        next: (usuario) => {

          const roles =
            usuario.roles ?? [];


          this.esAdmin =
            roles.includes(
              'administrador'
            );


          this.esProfesor =
            roles.includes(
              'profesor'
            );


          this.cargandoRol =
            false;


          // ADMIN

          if (this.esAdmin) {

            this.cargarEventos();
            this.cargarUsuarios();

            return;
          }


          // PROFESOR

          if (this.esProfesor) {

            this.cargarMisEventos();

            return;
          }


          this.cargando =
            false;

          this.mensajeError =
            'No tenés permisos para consultar los eventos.';

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error obteniendo usuario actual:',
            error
          );

          this.esAdmin =
            false;

          this.esProfesor =
            false;

          this.cargandoRol =
            false;

          this.cargando =
            false;

          this.mensajeError =
            'No se pudo obtener la información del usuario.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // TODOS LOS EVENTOS
  // ADMIN
  // ============================================================

  cargarEventos(): void {

    if (!this.esAdmin) {
      return;
    }


    this.cargando =
      true;

    this.mensajeError =
      '';


    this.eventoService
      .obtenerTodos()
      .subscribe({

        next: (eventos) => {

          this.eventos =
            eventos;

          this.aplicarFiltros();

          this.cargando =
            false;

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error cargando eventos:',
            error
          );

          this.eventos =
            [];

          this.eventosFiltrados =
            [];

          this.cargando =
            false;

          this.mensajeError =
            'No se pudieron cargar los eventos.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // MIS EVENTOS
  // PROFESOR
  // ============================================================

  cargarMisEventos(): void {

    if (!this.esProfesor) {
      return;
    }


    this.cargando =
      true;

    this.mensajeError =
      '';


    this.eventoService
      .obtenerMisEventos()
      .subscribe({

        next: (eventos) => {

          this.eventos =
            eventos;

          this.aplicarFiltros();

          this.cargando =
            false;

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error cargando mis eventos:',
            error
          );

          this.eventos =
            [];

          this.eventosFiltrados =
            [];

          this.cargando =
            false;

          this.mensajeError =
            'No se pudieron cargar tus eventos.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // USUARIOS ACTIVOS
  // ADMIN
  // ============================================================

  cargarUsuarios(): void {

    if (!this.esAdmin) {
      return;
    }


    this.usuarioService
      .getAll()
      .subscribe({

        next: (usuarios) => {

          this.usuarios =
            usuarios.filter(
              usuario =>
                usuario.activo
            );

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error cargando usuarios:',
            error
          );

          this.usuarios =
            [];

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // FILTROS
  // ============================================================

  aplicarFiltros(): void {

    const texto =
      this.textoBusqueda
        .trim()
        .toLowerCase();


    this.eventosFiltrados =
      this.eventos.filter(
        evento => {

          const organizador =
            `${evento.organizadorNombre ?? ''} ${evento.organizadorApellido ?? ''}`
              .trim()
              .toLowerCase();


          const coincideTexto =
            !texto ||

            evento.codigo
              .toLowerCase()
              .includes(texto) ||

            evento.nombre
              .toLowerCase()
              .includes(texto) ||

            (evento.descripcion ?? '')
              .toLowerCase()
              .includes(texto) ||

            organizador
              .includes(texto) ||

            (evento.organizadorEmail ?? '')
              .toLowerCase()
              .includes(texto);


          const coincideEstado =
            this.esProfesor ||

            this.filtroEstado ===
              'todos' ||

            (
              this.filtroEstado ===
                'activos' &&
              evento.activo
            ) ||

            (
              this.filtroEstado ===
                'inactivos' &&
              !evento.activo
            );


          return (
            coincideTexto &&
            coincideEstado
          );
        }
      );
  }


  // ============================================================
  // EDITAR
  // ADMIN
  // ============================================================

  editarEvento(
    evento: Evento
  ): void {

    if (!this.esAdmin) {
      return;
    }


    this.mensajeExito =
      '';

    this.mensajeError =
      '';

    this.eventoEditando =
      evento;

    this.editCodigo =
      evento.codigo;

    this.editNombre =
      evento.nombre;

    this.editDescripcion =
      evento.descripcion ?? '';

    this.editParticipantesMaximos =
      evento.participantesMaximos;

    this.organizadorId =
      evento.organizadorId;


    const usuario =
      this.usuarios.find(
        usuario =>
          usuario.id ===
          evento.organizadorId
      );


    if (usuario) {

      this.organizadorSeleccionado =
        usuario;

      this.textoOrganizador =
        this.obtenerTextoUsuario(
          usuario
        );

    } else {

      this.organizadorSeleccionado =
        null;

      this.textoOrganizador =
        `${evento.organizadorNombre ?? ''} ${evento.organizadorApellido ?? ''} - ${evento.organizadorEmail ?? ''}`
          .trim();
    }


    this.usuariosFiltrados =
      [];

    this.mostrarOpcionesOrganizador =
      false;
  }


  // ============================================================
  // CANCELAR EDICIÓN
  // ============================================================

  cancelarEdicion(): void {

    this.eventoEditando =
      null;

    this.editCodigo =
      '';

    this.editNombre =
      '';

    this.editDescripcion =
      '';

    this.editParticipantesMaximos =
      null;

    this.organizadorId =
      null;

    this.organizadorSeleccionado =
      null;

    this.textoOrganizador =
      '';

    this.usuariosFiltrados =
      [];

    this.mostrarOpcionesOrganizador =
      false;

    this.mensajeError =
      '';
  }


  // ============================================================
  // BUSCAR ORGANIZADOR
  // ============================================================

  buscarOrganizadores(): void {

    if (!this.esAdmin) {
      return;
    }


    const texto =
      this.textoOrganizador
        .trim()
        .toLowerCase();


    if (
      this.organizadorSeleccionado &&
      this.textoOrganizador !==
        this.obtenerTextoUsuario(
          this.organizadorSeleccionado
        )
    ) {

      this.organizadorSeleccionado =
        null;

      this.organizadorId =
        null;
    }


    if (!texto) {

      this.usuariosFiltrados =
        [];

      this.mostrarOpcionesOrganizador =
        false;

      return;
    }


    this.usuariosFiltrados =
      this.usuarios
        .filter(
          usuario => {

            const nombre =
              usuario.nombre
                ?.toLowerCase() ??
              '';

            const apellido =
              usuario.apellido
                ?.toLowerCase() ??
              '';

            const email =
              usuario.email
                ?.toLowerCase() ??
              '';

            const nombreCompleto =
              `${nombre} ${apellido}`;


            return (
              nombre.includes(texto) ||
              apellido.includes(texto) ||
              nombreCompleto.includes(texto) ||
              email.includes(texto)
            );
          }
        )
        .slice(
          0,
          8
        );


    this.mostrarOpcionesOrganizador =
      this.usuariosFiltrados.length >
      0;
  }


  // ============================================================
  // SELECCIONAR ORGANIZADOR
  // ============================================================

  seleccionarOrganizador(
    usuario: Usuario
  ): void {

    if (!this.esAdmin) {
      return;
    }


    this.organizadorSeleccionado =
      usuario;

    this.organizadorId =
      usuario.id;

    this.textoOrganizador =
      this.obtenerTextoUsuario(
        usuario
      );

    this.usuariosFiltrados =
      [];

    this.mostrarOpcionesOrganizador =
      false;
  }


  // ============================================================
  // TEXTO USUARIO
  // ============================================================

  obtenerTextoUsuario(
    usuario: Usuario
  ): string {

    return (
      `${usuario.nombre} ${usuario.apellido} - ${usuario.email}`
    );
  }


  // ============================================================
  // GUARDAR CAMBIOS
  // ADMIN
  // ============================================================

  guardarCambios(): void {

    if (!this.esAdmin) {
      return;
    }


    this.mensajeExito =
      '';

    this.mensajeError =
      '';


    if (!this.eventoEditando) {
      return;
    }


    if (!this.editCodigo) {

      this.mensajeError =
        'Ingresá el código del evento.';

      return;
    }


    if (!esCodigoValido(this.editCodigo)) {

      this.mensajeError =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }


    if (
      !this.editNombre.trim()
    ) {

      this.mensajeError =
        'Ingresá el nombre del evento.';

      return;
    }


    if (
      this.editNombre
        .trim()
        .length > 50
    ) {

      this.mensajeError =
        'El nombre no puede superar los 50 caracteres.';

      return;
    }


    if (
      this.editDescripcion
        .trim()
        .length > 500
    ) {

      this.mensajeError =
        'La descripción no puede superar los 500 caracteres.';

      return;
    }


    if (
      this.editParticipantesMaximos ===
        null ||
      this.editParticipantesMaximos <=
        0
    ) {

      this.mensajeError =
        'La cantidad máxima de participantes debe ser mayor a 0.';

      return;
    }


    if (
      this.organizadorId ===
      null
    ) {

      this.mensajeError =
        'Seleccioná un organizador.';

      return;
    }


    const eventoActualizado:
      EventoUpdateDTO = {

      id:
        this.eventoEditando.id,

      codigo:
        normalizarCodigo(this.editCodigo),

      nombre:
        this.editNombre.trim(),

      descripcion:
        this.editDescripcion.trim()
          ? this.editDescripcion.trim()
          : null,

      participantesMaximos:
        Number(
          this.editParticipantesMaximos
        ),

      organizadorId:
        this.organizadorId
    };


    this.guardando =
      true;


    this.eventoService
      .actualizar(
        eventoActualizado
      )
      .subscribe({

        next: () => {

          this.guardando =
            false;

          this.mensajeExito =
            'Evento actualizado correctamente.';

          this.cancelarEdicion();

          this.cargarEventos();

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error actualizando evento:',
            error
          );

          this.guardando =
            false;

          this.mensajeError =
            this.obtenerMensajeError(
              error
            );

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // MODAL DESHABILITAR
  // ============================================================

  abrirModalDeshabilitar(
    evento: Evento
  ): void {

    if (!this.esAdmin) {
      return;
    }


    this.eventoSeleccionado =
      evento;

    this.accionModal =
      'deshabilitar';

    this.modalVisible =
      true;

    this.mensajeError =
      '';
  }


  // ============================================================
  // MODAL ACTIVAR
  // ============================================================

  abrirModalActivar(
    evento: Evento
  ): void {

    if (!this.esAdmin) {
      return;
    }


    this.eventoSeleccionado =
      evento;

    this.accionModal =
      'activar';

    this.modalVisible =
      true;

    this.mensajeError =
      '';
  }


  // ============================================================
  // CERRAR MODAL
  // ============================================================

  cerrarModal(): void {

    if (
      this.procesandoEstado
    ) {
      return;
    }


    this.modalVisible =
      false;

    this.eventoSeleccionado =
      null;

    this.accionModal =
      null;
  }


  // ============================================================
  // CAMBIAR ESTADO
  // ============================================================

  confirmarCambioEstado(): void {

    if (!this.esAdmin) {
      return;
    }


    if (
      !this.eventoSeleccionado ||
      !this.accionModal
    ) {

      return;
    }


    const evento =
      this.eventoSeleccionado;


    this.procesandoEstado =
      true;

    this.mensajeExito =
      '';

    this.mensajeError =
      '';


    // DESHABILITAR

    if (
      this.accionModal ===
      'deshabilitar'
    ) {

      this.eventoService
        .deshabilitar(
          evento.id
        )
        .subscribe({

          next: () => {

            this.procesandoEstado =
              false;

            this.cerrarModalForzado();

            this.mensajeExito =
              'Evento deshabilitado correctamente.';

            this.cargarEventos();

            this.cdr.detectChanges();
          },


          error: (
            error:
              HttpErrorResponse
          ) => {

            console.error(
              'Error deshabilitando evento:',
              error
            );

            this.procesandoEstado =
              false;

            this.mensajeError =
              this.obtenerMensajeError(
                error
              );

            this.cdr.detectChanges();
          }

        });


      return;
    }


    // ACTIVAR

    this.eventoService
      .activar(
        evento.id
      )
      .subscribe({

        next: () => {

          this.procesandoEstado =
            false;

          this.cerrarModalForzado();

          this.mensajeExito =
            'Evento activado correctamente.';

          this.cargarEventos();

          this.cdr.detectChanges();
        },


        error: (
          error:
            HttpErrorResponse
        ) => {

          console.error(
            'Error activando evento:',
            error
          );

          this.procesandoEstado =
            false;

          this.mensajeError =
            this.obtenerMensajeError(
              error
            );

          this.cdr.detectChanges();
        }

      });
  }


  private cerrarModalForzado(): void {

    this.modalVisible =
      false;

    this.eventoSeleccionado =
      null;

    this.accionModal =
      null;
  }


  // ============================================================
  // ERROR
  // ============================================================

  private obtenerMensajeError(
    error: HttpErrorResponse
  ): string {

    if (
      typeof error.error ===
        'string' &&
      error.error
        .trim()
        .length > 0
    ) {

      return error.error;
    }


    if (
      error.error &&
      error.error.message
    ) {

      return error.error.message;
    }


    if (
      error.status ===
      409
    ) {

      return (
        'Ya existe otro evento con ese código.'
      );
    }


    if (
      error.status ===
      403
    ) {

      return (
        'No tenés permisos para realizar esta acción.'
      );
    }


    if (
      error.status ===
      400
    ) {

      return (
        'Los datos ingresados no son válidos.'
      );
    }


    if (
      error.status ===
      0
    ) {

      return (
        'No se pudo conectar con el servidor.'
      );
    }


    return (
      'Ocurrió un error al procesar la operación.'
    );
  }
}