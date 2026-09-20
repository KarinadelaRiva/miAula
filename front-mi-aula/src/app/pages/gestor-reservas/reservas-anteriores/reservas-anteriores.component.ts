import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/service/auth-service';
import { ReservaService } from '../../../services/reserva.service';

interface ReservaCompleta {
  id: number;
  dia: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  comision: string;
  espacio: string;
  profesor: string;
  asignatura: string;
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
  public authService = inject(AuthService);

  reservas = signal<ReservaCompleta[]>([]);
  paginaActual = signal(1);
  limite = 8;
  totalPaginas = computed(() => Math.ceil(this.reservas().length / this.limite));
  reservasPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.limite;
    return this.reservas().slice(inicio, inicio + this.limite);
  });
  private selectedReservaSignal = signal<ReservaCompleta | null>(null);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getReservasParaCalendario().subscribe({
      next: reservas => {
        const ahora = new Date();
        const reservasPasadas = reservas
          .map(reserva => ({
            id: reserva.id || 0,
            dia: reserva.extendedProps?.['dia'] || '',
            fecha_inicio: reserva.start as string,
            fecha_fin: reserva.end as string,
            estado: reserva.extendedProps?.['estado'] || 'FINALIZADA',
            comision: reserva.extendedProps?.['comision'] || 'Sin comisión',
            espacio: reserva.extendedProps?.['aula'] || 'Sin espacio',
            profesor: reserva.extendedProps?.['profesor'] || 'Sin profesor',
            asignatura: reserva.extendedProps?.['asignatura'] || 'Sin asignatura'
          } as ReservaCompleta))
          .filter(reserva => new Date(reserva.fecha_fin) < ahora);

        this.reservas.set(reservasPasadas);
        this.paginaActual.set(1);
      },
      error: error => console.error('Error cargando reservas anteriores:', error)
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
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  formatHora(fecha: string): string {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit', minute: '2-digit'
    });
  }

  openDetails(reserva: ReservaCompleta): void {
    this.selectedReservaSignal.set(reserva);
  }

  closeDetails(): void {
    this.selectedReservaSignal.set(null);
  }

  selectedReserva(): ReservaCompleta | null {
    return this.selectedReservaSignal();
  }
}
