import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';

interface ReservaHistorial {
  id: string;
  dia: string;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  comision: string;
  espacio: string;
  profesor: string;
  asignatura: string;
  estado: string;
}

@Component({
  selector: 'app-reservas-anteriores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas-anteriores.component.html',
  styleUrls: ['./reservas-anteriores.component.css']
})
export class ReservasAnterioresComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private route = inject(ActivatedRoute);
  readonly esProfesor = this.route.snapshot.data['esProfesor'] === true;

  reservas = signal<ReservaHistorial[]>([]);
  filtroBusqueda = signal('');
  paginaActual = signal(1);
  limite = 8;
  cargando = signal(false);
  mostrarDesactivadas = signal(false);
  error = signal('');
  totalPaginas = computed(() => Math.ceil(this.reservasFiltradas().length / this.limite));
  reservasFiltradas = computed(() => {
    const termino = this.filtroBusqueda().trim().toLocaleLowerCase();
    return this.reservas().filter(reserva =>
      `${reserva.asignatura} ${reserva.comision} ${reserva.espacio} ${reserva.profesor} ${reserva.dia}`
        .toLocaleLowerCase()
        .includes(termino)
    );
  });
  reservasPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.limite;
    return this.reservasFiltradas().slice(inicio, inicio + this.limite);
  });

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.cargando.set(true);
    this.error.set('');
    const reservas$ = this.esProfesor
      ? this.mostrarDesactivadas()
        ? this.reservaService.getMisReservasInactivas()
        : this.reservaService.getMisReservasTerminadas()
      : this.mostrarDesactivadas()
        ? this.reservaService.getReservasInactivas()
        : this.reservaService.getReservasTerminadas();

    reservas$.subscribe({
      next: reservas => {
        this.reservas.set(
          reservas
            .map(reserva => this.aReservaHistorial(reserva))
            .sort((a, b) =>
              `${b.fecha_fin}T${b.hora_fin}`.localeCompare(`${a.fecha_fin}T${a.hora_fin}`)
            )
        );
        this.paginaActual.set(1);
        this.cargando.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error cargando reservas finalizadas:', error);
        this.error.set(error.error?.mensaje ?? 'No se pudieron cargar las reservas finalizadas.');
        this.cargando.set(false);
      }
    });
  }

  cambiarVistaDesactivadas(): void {
    if (this.esProfesor) return;

    this.mostrarDesactivadas.update(mostrar => !mostrar);
    this.cargarReservas();
  }

  private aReservaHistorial(reserva: Reserva): ReservaHistorial {
    return {
      id: reserva.id,
      dia: reserva.dia,
      fecha_inicio: reserva.fecha_inicio,
      fecha_fin: reserva.fecha_fin,
      hora_inicio: reserva.hora_inicio,
      hora_fin: reserva.hora_fin,
      comision: reserva.comision_nombre || 'Sin comisión',
      espacio: reserva.espacio_nombre || 'Sin espacio',
      profesor: reserva.profesor_nombre || 'Sin profesor',
      asignatura: reserva.materia_nombre || 'Sin asignatura',
      estado: reserva.activo === false ? 'Cancelada' : 'Finalizada'
    };
  }

  aplicarFiltro(termino: string): void {
    this.filtroBusqueda.set(termino);
    this.paginaActual.set(1);
  }

  siguientePagina(): void {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.update(pagina => pagina + 1);
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual() > 1) {
      this.paginaActual.update(pagina => pagina - 1);
    }
  }

  formatFecha(fecha: string): string {
    return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatHora(hora: string): string {
    return hora.slice(0, 5);
  }
}
