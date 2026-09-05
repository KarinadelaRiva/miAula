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
        error: () => {
          this.listaEspacios.set([]);
          this.totalPaginas.set(0);
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
    return Number(espacio.enabled) === 1;
  }
}