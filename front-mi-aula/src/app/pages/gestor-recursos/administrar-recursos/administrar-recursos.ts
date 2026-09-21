import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso-service/recurso-service';

@Component({
  selector: 'app-administrar-recursos',
  imports: [RouterLink, FormsModule],
  templateUrl: './administrar-recursos.html',
  styleUrl: './administrar-recursos.css',
})
export class AdministrarRecursos {
  recursoService = inject(RecursoService);

  paginaActual = signal(1);
  limite = 8;
  totalPaginas = signal(0);
  filtroBusqueda = model('');
  filtroEstado = model<string | boolean>('');
  recursoSeleccionado = signal<Recurso | null>(null);
  listaRecursos = signal<Recurso[]>([]);
  recursoEditando = signal<Recurso | null>(null);
  codigoEditado = '';
  nombreEditado = '';
  descripcionEditada = '';
  cantidadEditada = 0;
  mensaje = signal('');

  ngOnInit() {
    this.cargarRecursos();
  }

  cargarRecursos() {
    this.recursoService
      .obtenerRecursosPaginados(this.paginaActual(), this.limite, this.filtroBusqueda(), this.filtroEstado())
      .subscribe({
        next: ({ recursos, total }) => {
          this.listaRecursos.set(recursos);
          this.totalPaginas.set(Math.ceil(total / this.limite));
        },
        error: () => {
          this.listaRecursos.set([]);
          this.totalPaginas.set(0);
        },
      });
  }

  aplicarFiltros() {
    this.paginaActual.set(1);
    this.cargarRecursos();
  }

  siguientePagina() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.set(this.paginaActual() + 1);
      this.cargarRecursos();
    }
  }

  anteriorPagina() {
    if (this.paginaActual() > 1) {
      this.paginaActual.set(this.paginaActual() - 1);
      this.cargarRecursos();
    }
  }

  abrirModal(recurso: Recurso) {
    this.recursoSeleccionado.set(recurso);
  }

  cerrarModal() {
    this.recursoSeleccionado.set(null);
  }

  eliminar() {
    const recurso = this.recursoSeleccionado();
    if (!recurso) return;

    this.recursoService.eliminarById(recurso.id).subscribe({
      next: () => {
        this.recursoSeleccionado.set(null);
        this.cargarRecursos();
      },
    });
  }

  reactivar() {
    const recurso = this.recursoSeleccionado();
    if (!recurso) return;

    this.recursoService.reactivarById(recurso.id).subscribe({
      next: () => {
        this.recursoSeleccionado.set(null);
        this.cargarRecursos();
      },
    });
  }

  cambiarEstadoRecurso(recurso: Recurso) {
    if (this.estaHabilitado(recurso)) {
      this.recursoService.eliminarById(recurso.id).subscribe({
        next: () => this.cargarRecursos(),
      });
      return;
    }

    this.recursoService.reactivarById(recurso.id).subscribe({
      next: () => this.cargarRecursos(),
    });
  }

  estaHabilitado(recurso: Recurso): boolean {
    return Number(recurso.enabled) === 1;
  }

  editarRecurso(recurso: Recurso) {
    this.recursoEditando.set(recurso);
    this.codigoEditado = recurso.code;
    this.nombreEditado = recurso.name;
    this.descripcionEditada = recurso.description;
    this.cantidadEditada = recurso.quantity;
    this.mensaje.set('');
  }

  guardarEdicion() {
    const recurso = this.recursoEditando();
    const code = this.codigoEditado.trim();
    const name = this.nombreEditado.trim();
    const description = this.descripcionEditada.trim();
    const quantity = this.cantidadEditada;

    if (!recurso || !code || !name || !description || quantity < 0) {
      this.mensaje.set('Completá todos los campos para poder guardar.');
      return;
    }

    this.recursoService
      .actualizarRecurso({
        ...recurso,
        code,
        name,
        description,
        quantity,
      })
      .subscribe({
        next: () => {
          this.mensaje.set('Recurso actualizado correctamente.');
          this.cancelarEdicion();
          this.cargarRecursos();
        },
        error: () => this.mensaje.set('No se pudo actualizar el recurso.'),
      });
  }

  cancelarEdicion() {
    this.recursoEditando.set(null);
    this.codigoEditado = '';
    this.nombreEditado = '';
    this.descripcionEditada = '';
    this.cantidadEditada = 0;
  }
}
