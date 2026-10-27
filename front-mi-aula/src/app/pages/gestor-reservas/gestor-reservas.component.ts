import { Component, OnInit, computed, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../auth/service/auth-service';

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
  selector: 'app-gestor-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestor-reservas.component.html',
  styleUrls: ['./gestor-reservas.component.css']
})
export class GestorReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  public authService = inject(AuthService);

  // Señales para las reservas separadas por estado
  reservas: WritableSignal<ReservaCompleta[]> = signal<ReservaCompleta[]>([]);
  activas: WritableSignal<ReservaCompleta[]> = signal<ReservaCompleta[]>([]);
  pasadas: WritableSignal<ReservaCompleta[]> = signal<ReservaCompleta[]>([]);
  paginaActual = signal(1);
  limite = 8;
  totalPaginas = computed(() => Math.ceil(this.activas().length / this.limite));
  activasPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.limite;
    return this.activas().slice(inicio, inicio + this.limite);
  });
  
  // Reserva seleccionada para ver detalles
  private _selectedReserva: WritableSignal<ReservaCompleta | null> = signal<ReservaCompleta | null>(null);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getReservasParaCalendario().subscribe({
      next: (reservas) => {
        console.log('📊 Cargadas', reservas.length, 'reservas para gestión');
        
        // Convertir las reservas del calendario a formato de gestión
        const reservasCompletas = reservas.map(reserva => ({
          id: reserva.id || 0,
          dia: reserva.extendedProps?.['dia'] || '',
          fecha_inicio: reserva.start as string,
          fecha_fin: reserva.end as string,
          estado: reserva.extendedProps?.['estado'] || 'ACTIVA',
          comision: reserva.extendedProps?.['comision'] || 'Sin comisión',
          espacio: reserva.extendedProps?.['aula'] || 'Sin espacio',
          profesor: reserva.extendedProps?.['profesor'] || 'Sin profesor',
          asignatura: reserva.extendedProps?.['asignatura'] || 'Sin asignatura'
        } as ReservaCompleta));

        this.reservas.set(reservasCompletas);
        this.separarPorEstado(reservasCompletas);
      },
      error: (error) => {
        console.error('❌ Error cargando reservas:', error);
      }
    });
  }

  private separarPorEstado(reservas: ReservaCompleta[]): void {
    const ahora = new Date();
    
    const activas = reservas.filter(r => {
      const fechaFin = new Date(r.fecha_fin);
      return fechaFin >= ahora;
    });

    const pasadas = reservas.filter(r => {
      const fechaFin = new Date(r.fecha_fin);
      return fechaFin < ahora;
    });

    this.activas.set(activas);
    this.pasadas.set(pasadas);
    this.paginaActual.set(1);
    
    console.log('📋 Reservas activas:', activas.length);
    console.log('📋 Reservas pasadas:', pasadas.length);
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatHora(fecha: string): string {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  openDetails(reserva: ReservaCompleta): void {
    this._selectedReserva.set(reserva);
  }

  closeDetails(): void {
    this._selectedReserva.set(null);
  }

  selectedReserva() {
    return this._selectedReserva();
  }

  isAdmin(): boolean {
    return this.authService.tieneRol('ADMIN');
  }
}