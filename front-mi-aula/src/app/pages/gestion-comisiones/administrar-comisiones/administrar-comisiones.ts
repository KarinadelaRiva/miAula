import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';

interface Comision {
  id: number;
  codigo: string;
  nombre: string;
  materiaNombre: string;
  materiaId: number;
  carreraNombre: string;
  carreraId: number;
  profesorNombre: string;
  profesorId: number;
  cantidadEstudiantes: number;
  activo: boolean;
}

interface Usuario {
  id: string | number;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  activo: boolean;
}

@Component({
  selector: 'app-administrar-comisiones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './administrar-comisiones.html',
  styleUrl: './administrar-comisiones.css'
})
export class AdministrarComisiones implements OnInit {

  private apiUrl = 'http://localhost:8080';

  comisiones: Comision[] = [];
  comisionesFiltradas: Comision[] = [];
  comisionesPaginadas: Comision[] = [];

  profesores: Usuario[] = [];

  busqueda = '';
  paginaActual = 1;
  readonly limite = 8;

  comisionEditando: Comision | null = null;
  esAdministrador = false;
  esProfesor = false;
  cargandoRol = true;

  mensaje = '';

  mostrarConfirmacionEstado = false;
  comisionSeleccionada: Comision | null = null;
  actualizandoEstado = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.usuarioService.me().subscribe({
      next: (usuario) => {
        const roles = usuario.roles ?? [];
        this.esAdministrador = roles.includes('administrador');
        this.esProfesor = roles.includes('profesor');
        this.cargandoRol = false;

        this.cargarComisiones();
        if (this.esAdministrador) {
          this.cargarProfesores();
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error obteniendo el usuario actual:', error);
        this.esAdministrador = false;
        this.esProfesor = false;
        this.cargandoRol = false;
        this.mensaje = 'No se pudo obtener la información del usuario.';
        this.cdr.markForCheck();
      }
    });

  }

  private cargarProfesores(): void {
    this.http.get<Usuario[]>('http://localhost:8080/usuarios').subscribe({
      next: (data) => {
        this.profesores = data.filter(usuario =>
          usuario.roles?.includes('profesor') &&
          usuario.activo
        );
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
      }
    });
  }

  cargarComisiones(): void {

    this.http.get<Comision[]>(
      `${this.apiUrl}/comisiones`
    ).subscribe({
      next: (data) => {
        this.comisiones = data;
        this.buscar();
        this.cdr.markForCheck();

        console.log(
          'Comisiones cargadas:',
          this.comisiones
        );
      },

      error: (error) => {
        console.error(
          'Error cargando comisiones:',
          error
        );

        this.comisiones = [];
        this.comisionesFiltradas = [];
        this.comisionesPaginadas = [];
        this.paginaActual = 1;

        this.mensaje =
          'No se pudieron cargar las comisiones.';
        this.cdr.markForCheck();
      }
    });
  }

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    console.log(
      'Texto buscado:',
      texto
    );

    if (!texto) {

      this.comisionesFiltradas = [
        ...this.comisiones
      ];

    } else {

      this.comisionesFiltradas =
        this.comisiones.filter(comision =>

          comision.nombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.materiaNombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.carreraNombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.profesorNombre
            .toLowerCase()
            .includes(texto)

        );
    }

    this.paginaActual = 1;
    this.actualizarComisionesPaginadas();
  }

  get totalPaginas(): number {
    return Math.ceil(this.comisionesFiltradas.length / this.limite);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual += 1;
      this.actualizarComisionesPaginadas();
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.actualizarComisionesPaginadas();
    }
  }

  private actualizarComisionesPaginadas(): void {
    const inicio = (this.paginaActual - 1) * this.limite;
    this.comisionesPaginadas = this.comisionesFiltradas.slice(
      inicio,
      inicio + this.limite
    );
  }

  editarComision(comision: Comision): void {
    if (!this.esAdministrador) {
      return;
    }

    this.comisionEditando = {
      ...comision
    };

    this.mensaje = '';
    this.cdr.markForCheck();
  }

  cancelarEdicion(): void {

    this.comisionEditando = null;
  }

  guardarEdicion(): void {
    if (!this.esAdministrador) {
      return;
    }

    if (!this.comisionEditando) {
      return;
    }

    if (
      !this.comisionEditando.nombre.trim()
      ||
      !this.comisionEditando.codigo
      ||
      !this.comisionEditando.cantidadEstudiantes
      ||
      !this.comisionEditando.profesorId
    ) {

      this.mostrarMensaje('Completá todos los campos.');

      return;
    }

    if (!esCodigoValido(this.comisionEditando.codigo)) {
      this.mostrarMensaje(
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.'
      );
      return;
    }

    const comisionActualizada = {
      id: this.comisionEditando.id,
      codigo: normalizarCodigo(this.comisionEditando.codigo),
      nombre: this.comisionEditando.nombre,
      carreraId: this.comisionEditando.carreraId,
      profesorId: this.comisionEditando.profesorId,
      cantidadEstudiantes: this.comisionEditando.cantidadEstudiantes
    };

    this.http.put(
      `${this.apiUrl}/comisiones`,
      comisionActualizada
    ).subscribe({
      next: () => {

        this.mostrarMensaje('Comisión actualizada correctamente.');

        this.comisionEditando = null;

        this.cargarComisiones();
      },

      error: (error) => {

        console.error(error);

        this.mostrarMensaje(this.obtenerMensajeError(error));
      }
    });
  }

  private mostrarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    this.cdr.markForCheck();
  }

  private obtenerMensajeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body: unknown = error.error;

      if (typeof body === 'string' && body.trim()) {
        return body;
      }

      if (body && typeof body === 'object') {
        const mensajes = Object.values(body).filter(
          (valor): valor is string =>
            typeof valor === 'string' && valor.trim().length > 0
        );

        if (mensajes.length > 0) {
          return mensajes.join(' ');
        }
      }

      if (error.status === 0) {
        return 'No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.';
      }

      return `No se pudo actualizar la comisión (error ${error.status}).`;
    }

    return 'Ocurrió un error inesperado al actualizar la comisión.';
  }

  abrirConfirmacionEstado(comision: Comision): void {
    if (!this.esAdministrador) {
      return;
    }

    this.comisionSeleccionada = comision;
    this.mostrarConfirmacionEstado = true;
    this.mensaje = '';
  }

  cerrarConfirmacionEstado(): void {
    if (this.actualizandoEstado) {
      return;
    }

    this.mostrarConfirmacionEstado = false;
    this.comisionSeleccionada = null;
  }

  confirmarCambioEstado(): void {
    if (!this.esAdministrador) {
      return;
    }

    if (!this.comisionSeleccionada || this.actualizandoEstado) {
      return;
    }

    const { id, activo } = this.comisionSeleccionada;
    const nuevoEstado = !activo;
    this.actualizandoEstado = true;
    this.mensaje = '';

    const solicitud = activo
      ? this.http.delete(`${this.apiUrl}/comisiones/${id}`)
      : this.http.put(`${this.apiUrl}/comisiones/activar/${id}`, null);

    solicitud.subscribe({
      next: () => {
        this.actualizandoEstado = false;
        this.mostrarConfirmacionEstado = false;
        this.comisionSeleccionada = null;
        this.mensaje = nuevoEstado
          ? 'Comisión habilitada correctamente.'
          : 'Comisión deshabilitada correctamente.';
        this.cargarComisiones();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error actualizando el estado de la comisión:', error);
        this.actualizandoEstado = false;
        this.mensaje = 'No se pudo actualizar el estado de la comisión.';
        this.cdr.markForCheck();
      }
    });
  }
}