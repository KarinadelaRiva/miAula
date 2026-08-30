import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaCalendario, ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  private reservaService = inject(ReservaService);

  vistaActual = signal<'diario' | 'semanal' | 'mensual'>('diario');
  reservasAprobadas = signal<ReservaCalendario[]>([]);
  espaciosRecursos = signal<any[]>([]);

  ngOnInit() {
    this.reservasAprobadas.set([]);
    this.espaciosRecursos.set([]);
    this.cargarReservas();
  }

  cargarReservas() {
    console.log('🔄 Cargando reservas desde la API...');
    this.reservaService.getReservasParaCalendario().subscribe({
      next: (reservas) => {
        console.log('✅ Reservas cargadas:', reservas.length);

        if (reservas.length === 0) {
          console.log('⚠️ No se encontraron reservas, cargando fallback...');
          this.cargarDatosFallback();
          return;
        }

        this.reservasAprobadas.set(this.procesarReservasConRecursos(reservas));
      },
      error: (error) => {
        console.error('❌ Error cargando reservas:', error);
        console.log('🔄 Cargando datos de fallback debido a error de API');
        this.cargarDatosFallback();
      }
    });
  }

  private procesarReservasConRecursos(reservas: ReservaCalendario[]) {
    const espaciosUnicos = Array.from(
      new Set(
        reservas
          .map(reserva => reserva.extendedProps?.aula)
          .filter((aula): aula is string => !!aula)
      )
    );

    this.espaciosRecursos.set(
      espaciosUnicos.map(aula => ({
        id: aula,
        title: aula
      }))
    );

    return reservas.map(reserva => ({
      ...reserva,
      resourceId: reserva.extendedProps?.aula || 'sin-aula'
    }));
  }

  private cargarDatosFallback() {
    const reservasFallback: ReservaCalendario[] = [
      {
        id: 'fallback-1',
        title: 'Programación I - Aula 101',
        start: '2025-11-25T08:00:00',
        end: '2025-11-25T10:00:00',
        color: '#dc3545',
        resourceId: 'Aula 101',
        extendedProps: {
          asignatura: 'Programación I',
          aula: 'Aula 101',
          comision: 'K1051',
          dia: '2025-11-25'
        }
      },
      {
        id: 'fallback-2',
        title: 'Base de Datos - Laboratorio 2',
        start: '2025-11-25T10:00:00',
        end: '2025-11-25T12:00:00',
        color: '#ffc107',
        resourceId: 'Laboratorio 2',
        extendedProps: {
          asignatura: 'Base de Datos',
          aula: 'Laboratorio 2',
          comision: 'K2052',
          dia: '2025-11-25'
        }
      },
      {
        id: 'fallback-3',
        title: 'Matemática I - Aula 203',
        start: '2025-11-25T14:00:00',
        end: '2025-11-25T16:00:00',
        color: '#007bff',
        resourceId: 'Aula 203',
        extendedProps: {
          asignatura: 'Matemática I',
          aula: 'Aula 203',
          comision: 'K1053',
          dia: '2025-11-25'
        }
      }
    ];

    this.reservasAprobadas.set(this.procesarReservasConRecursos(reservasFallback));
    console.log('⚠️ Usando datos de fallback - JSON server no disponible');
  }

  getReservasFiltradas(): ReservaCalendario[] {
    const reservas = this.reservasAprobadas();
    const hoy = new Date();

    return reservas.filter(reserva => {
      const inicio = new Date(reserva.start);

      switch (this.vistaActual()) {
        case 'diario':
          return this.isSameDay(inicio, hoy);
        case 'semanal':
          return this.isSameWeek(inicio, hoy);
        case 'mensual':
          return inicio.getMonth() === hoy.getMonth() && inicio.getFullYear() === hoy.getFullYear();
        default:
          return true;
      }
    });
  }

  cambiarVista(vista: 'diario' | 'semanal' | 'mensual') {
    this.vistaActual.set(vista);
  }

  getTituloVista(): string {
    switch (this.vistaActual()) {
      case 'diario':
        return 'Vista Diario';
      case 'semanal':
        return 'Vista Semanal';
      case 'mensual':
        return 'Vista Mensual';
      default:
        return 'Calendario';
    }
  }

  getMensajeInfo(): string {
    return 'Se muestran las reservas disponibles para la vista seleccionada.';
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatHora(fecha: string): string {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private isSameDay(fechaA: Date, fechaB: Date): boolean {
    return fechaA.getFullYear() === fechaB.getFullYear()
      && fechaA.getMonth() === fechaB.getMonth()
      && fechaA.getDate() === fechaB.getDate();
  }

  private isSameWeek(fechaA: Date, fechaB: Date): boolean {
    const primerDiaSemana = new Date(fechaB);
    const diaSemana = (primerDiaSemana.getDay() + 6) % 7;
    primerDiaSemana.setDate(fechaB.getDate() - diaSemana);
    primerDiaSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(primerDiaSemana);
    finSemana.setDate(primerDiaSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);

    return fechaA >= primerDiaSemana && fechaA <= finSemana;
  }

  trackByReserva = (_: number, reserva: ReservaCalendario) => reserva.id ?? `${reserva.title}-${reserva.start}`;
}