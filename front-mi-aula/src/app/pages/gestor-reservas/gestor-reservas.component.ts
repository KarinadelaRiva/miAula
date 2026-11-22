import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import type { Reserva } from '../../models/reserva';

interface ReservaProgramada {
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
}

@Component({
  selector: 'app-gestor-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestor-reservas.component.html',
  styleUrls: ['./gestor-reservas.component.css']
})
export class GestorReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private route = inject(ActivatedRoute);
  readonly esProfesor = this.route.snapshot.data['esProfesor'] === true;

  reservas = signal<ReservaProgramada[]>([]);
  filtroBusqueda = signal('');
  paginaActual = signal(1);
  limite = 8;
  cargando = signal(false);
  eliminando = signal(false);
  mostrarDesactivadas = signal(false);
  mensaje = signal('');
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
  reservaSeleccionada = signal<ReservaProgramada | null>(null);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.cargando.set(true);
    this.mensaje.set('');
    this.error.set('');
    const reservas$ = this.esProfesor
      ? this.mostrarDesactivadas()
        ? this.reservaService.getMisReservasInactivas()
        : this.reservaService.getMisReservasActivas()
      : this.mostrarDesactivadas()
        ? this.reservaService.getReservasInactivas()
        : this.reservaService.getReservasActivas();

    reservas$.subscribe({
      next: (reservas) => {
        const reservasProgramadas = reservas
          .map(reserva => this.aReservaProgramada(reserva))
          .sort((a, b) =>
            `${a.fecha_inicio}T${a.hora_inicio}`.localeCompare(`${b.fecha_inicio}T${b.hora_inicio}`)
          );
        this.reservas.set(reservasProgramadas);
        this.paginaActual.set(1);
        this.cargando.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error cargando reservas programadas:', error);
        this.error.set(error.error?.mensaje ?? 'No se pudieron cargar las reservas programadas.');
        this.cargando.set(false);
      }
    });
  }

  private aReservaProgramada(reserva: Reserva): ReservaProgramada {
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
      asignatura: reserva.materia_nombre || 'Sin asignatura'
    };
  }

  aplicarFiltro(termino: string): void {
    this.filtroBusqueda.set(termino);
    this.paginaActual.set(1);
    this.mensaje.set('');
  }

  cambiarVistaDesactivadas(): void {
    if (this.esProfesor) return;

    this.mostrarDesactivadas.update(mostrar => !mostrar);
    this.cargarReservas();
  }

  abrirConfirmacion(reserva: ReservaProgramada): void {
    this.mensaje.set('');
    this.error.set('');
    this.reservaSeleccionada.set(reserva);
  }

  cerrarConfirmacion(): void {
    if (!this.eliminando()) {
      this.reservaSeleccionada.set(null);
    }
  }

  desactivarReserva(): void {
    const reserva = this.reservaSeleccionada();
    if (!reserva || this.eliminando()) return;

    this.eliminando.set(true);
    this.reservaService.eliminarReserva(reserva.id).subscribe({
      next: () => {
        this.reservaSeleccionada.set(null);
        this.eliminando.set(false);
        this.reservas.update(reservas => reservas.filter(item => item.id !== reserva.id));
        this.error.set('');
        this.mensaje.set('La reserva se desactivó correctamente.');
        this.paginaActual.set(1);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error desactivando la reserva:', error);
        this.error.set(error.error?.mensaje ?? 'No se pudo desactivar la reserva.');
        this.eliminando.set(false);
      }
    });
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

  formatHora(fecha: string): string {
    return fecha.slice(0, 5);
  }
}