import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Espacio } from '../../../models/espacio';
import { EspacioService } from '../../../services/espacio-service/espacio-service';

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

  /*
  cargarEspacios() {
    this.espacioService
      .obtenerEspaciosPaginados(this.paginaActual(), this.limite, this.filtroBusqueda(), this.filtroEstado())
      .subscribe({
        next: ({ espacios, total }) => {
          this.listaEspacios.set(espacios);
          this.totalPaginas.set(Math.ceil(total / this.limite));
        },
        error: () => {
          this.listaEspacios.set([]);
          this.totalPaginas.set(0);
        },
      });
  }
  */

  cargarEspacios() {
    this.espacioService.getAll().subscribe({
      next:(data) => {
        this.listaEspacios.set(data);
      }
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

  abrirModal(espacio: Espacio) {
    this.espacioSeleccionado.set(espacio);
  }

  cerrarModal() {
    this.espacioSeleccionado.set(null);
  }

  eliminar() {
    const espacio = this.espacioSeleccionado();
    if (!espacio) return;

    this.espacioService.eliminarById(espacio.id).subscribe({
      next: () => {
        this.espacioSeleccionado.set(null);
        this.cargarEspacios();
      },
    });
  }

  reactivar() {
    const espacio = this.espacioSeleccionado();
    if (!espacio) return;

    this.espacioService.reactivarById(espacio.id).subscribe({
      next: () => {
        this.espacioSeleccionado.set(null);
        this.cargarEspacios();
      },
    });
  }

  cambiarEstadoEspacio(espacio: Espacio) {
    if (this.estaHabilitado(espacio)) {
      this.espacioService.eliminarById(espacio.id).subscribe({
        next: () => this.cargarEspacios(),
      });
      return;
    }

    this.espacioService.reactivarById(espacio.id).subscribe({
      next: () => this.cargarEspacios(),
    });
  }

  estaHabilitado(espacio: Espacio): boolean {
    return Number(espacio.activo) === 1;
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
    const codigo = this.codigoEditado.trim();
    const nombre = this.nombreEditado.trim();
    const capacidad = this.capacidadEditado;
    const nroPiso = this.pisoEditado;

    if (!espacio || !codigo || !nombre || !capacidad || !nroPiso) {
      this.mensaje.set('Completá todos los campos para poder guardar.');
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
        this.mensaje.set('Usuario actualizado correctamente.');
        this.cancelarEdicion();
        this.cargarEspacios();
      },
      error: () => this.mensaje.set('No se pudo actualizar el usuario.'),
    });
  }

  cancelarEdicion() {
    this.espacioEditando.set(null);
    this.codigoEditado = '';
    this.nombreEditado = '';
    this.capacidadEditado = 0;
    this.pisoEditado = 0;
  }
}