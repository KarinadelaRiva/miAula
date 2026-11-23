import { Component, inject, model, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Espacio } from '../../../models/espacio';
import { EspacioService } from '../../../services/espacio-service/espacio-service';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

@Component({
  selector: 'app-administrar-espacios',
  imports: [RouterLink, FormsModule],
  templateUrl: './administrar-espacios.html',
  styleUrl: './administrar-espacios.css',
})
export class AdministrarEspacios {
  espacioService = inject(EspacioService);

  paginaActual = signal(1);
  limite = 8;
  totalPaginas = signal(0);
  filtroBusqueda = model('');
  filtroEstado = model<string | boolean>('');
  espacioSeleccionado = signal<Espacio | null>(null);
  mostrarConfirmacionEstado = signal(false);
  actualizandoEstado = signal(false);
  listaEspacios = signal<Espacio[]>([]);
  espacioEditando = signal<Espacio | null>(null);
  codigoEditado = '';
  nombreEditado = '';
  capacidadEditado = 0;
  pisoEditado = 0;
  mensaje = signal('');

  ngOnInit() {
    this.cargarEspacios();
  }

  cargarEspacios() {
    this.espacioService
      .obtenerEspaciosPaginados(this.paginaActual(), this.limite, this.filtroBusqueda(), this.filtroEstado())
      .subscribe({
        next: ({ espacios, total }) => {
          this.listaEspacios.set(espacios);
          this.totalPaginas.set(Math.ceil(total / this.limite));
        },
        error: (error: HttpErrorResponse) => {
          this.listaEspacios.set([]);
          this.totalPaginas.set(0);
          this.mensaje.set(
            this.obtenerMensajeError(error, 'No se pudo cargar la lista de espacios.')
          );
        },
      });
  }

  aplicarFiltros() {
    this.paginaActual.set(1);
    this.cargarEspacios();
  }

  siguientePagina() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.set(this.paginaActual() + 1);
      this.cargarEspacios();
    }
  }

  anteriorPagina() {
    if (this.paginaActual() > 1) {
      this.paginaActual.set(this.paginaActual() - 1);
      this.cargarEspacios();
    }
  }

  abrirConfirmacionEstado(espacio: Espacio) {
    this.espacioSeleccionado.set(espacio);
    this.mostrarConfirmacionEstado.set(true);
    this.mensaje.set('');
  }

  cerrarConfirmacionEstado() {
    if (this.actualizandoEstado()) return;

    this.mostrarConfirmacionEstado.set(false);
    this.espacioSeleccionado.set(null);
  }

  confirmarCambioEstado() {
    const espacio = this.espacioSeleccionado();
    if (!espacio || this.actualizandoEstado()) return;

    this.actualizandoEstado.set(true);
    this.mensaje.set('');

    const solicitud = espacio.activo
      ? this.espacioService.eliminarById(espacio.id).pipe(map(() => undefined))
      : this.espacioService.reactivarById(espacio.id).pipe(map(() => undefined));

    solicitud.subscribe({
      next: () => {
        this.actualizandoEstado.set(false);
        this.mostrarConfirmacionEstado.set(false);
        this.espacioSeleccionado.set(null);
        this.mensaje.set(
          espacio.activo
            ? 'Espacio deshabilitado correctamente.'
            : 'Espacio habilitado correctamente.'
        );
        this.cargarEspacios();
      },
      error: (error: HttpErrorResponse) => {
        this.actualizandoEstado.set(false);
        this.mensaje.set(
          this.obtenerMensajeError(
            error,
            espacio.activo
              ? 'No se pudo deshabilitar el espacio.'
              : 'No se pudo habilitar el espacio.'
          )
        );
      },
    });
  }

  estaHabilitado(espacio: Espacio): boolean {
    return espacio.activo;
  }

  editarEspacio(espacio: Espacio) {
    this.espacioEditando.set(espacio);
    this.codigoEditado = espacio.codigo;
    this.nombreEditado = espacio.nombre;
    this.capacidadEditado = espacio.capacidad;
    this.pisoEditado = espacio.nroPiso;
    this.mensaje.set('');
  }

  guardarEdicion() {
    const espacio = this.espacioEditando();
    const codigo = normalizarCodigo(this.codigoEditado);
    const nombre = this.nombreEditado.trim();
    const capacidad = this.capacidadEditado;
    const nroPiso = this.pisoEditado;

    if (
      !espacio ||
      !codigo ||
      !nombre ||
      capacidad === null ||
      capacidad === undefined ||
      nroPiso === null ||
      nroPiso === undefined ||
      capacidad < 1
    ) {
      this.mensaje.set(
        capacidad !== null && capacidad !== undefined && capacidad < 1
          ? 'La capacidad debe ser como mínimo 1.'
          : 'Completá todos los campos para poder guardar.'
      );
      return;
    }

    if (!esCodigoValido(this.codigoEditado)) {
      this.mensaje.set('El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.');
      return;
    }

    this.espacioService.actualizarEspacio({
      ...espacio,
      codigo,
      nombre,
      capacidad,
      nroPiso,
    }).subscribe({
      next: () => {
        this.mensaje.set('Espacio actualizado correctamente.');
        this.cancelarEdicion();
        this.cargarEspacios();
      },
      error: (error: HttpErrorResponse) => {
        this.mensaje.set(this.obtenerMensajeError(error, 'No se pudo actualizar el espacio.'));
      },
    });
  }

  private obtenerMensajeError(error: HttpErrorResponse, mensajePredeterminado: string): string {
    const textoError =
      typeof error.error === 'string'
        ? error.error
        : error.error instanceof Error
          ? error.error.message
          : '';

    if (/unexpected non-whitespace character after json|json parse/i.test(textoError)) {
      return 'El servidor devolvió una respuesta inválida. Intentá nuevamente y, si el problema continúa, avisá al soporte.';
    }

    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error && typeof error.error === 'object') {
      const cuerpo = error.error as Record<string, unknown>;
      for (const clave of ['mensaje', 'message', 'detail', 'error']) {
        const valor = cuerpo[clave];
        if (typeof valor === 'string' && valor.trim()) {
          return valor;
        }
      }

      const mensajes = Object.values(cuerpo).filter(
        (valor): valor is string => typeof valor === 'string' && valor.trim().length > 0
      );
      if (mensajes.length > 0) {
        return mensajes.join(' ');
      }
    }

    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.';
    }

    if (error.status === 401) {
      return 'Tu sesión venció. Volvé a iniciar sesión e intentá nuevamente.';
    }

    if (error.status === 403) {
      return 'No tenés permiso para realizar esta acción.';
    }

    if (error.status === 409) {
      return 'Ya existe otro espacio con ese código o nombre. Revisá los datos e intentá nuevamente.';
    }

    if (error.status >= 500) {
      return 'Ocurrió un problema en el servidor. Intentá nuevamente más tarde.';
    }

    return mensajePredeterminado;
  }

  cancelarEdicion() {
    this.espacioEditando.set(null);
    this.codigoEditado = '';
    this.nombreEditado = '';
    this.capacidadEditado = 0;
    this.pisoEditado = 0;
  }
}