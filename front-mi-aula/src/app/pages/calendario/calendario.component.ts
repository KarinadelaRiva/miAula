import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../models/reserva';
import { Carrera, Comision, ReservaService } from '../../services/reserva.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../auth/service/auth-service';

interface Aula {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {
  @Input() reservas: Reserva[] = [];
  private readonly reservaService = inject(ReservaService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  readonly authService = inject(AuthService);

  aulas: Aula[] = [];
  fechaSeleccionada = this.obtenerFechaLocal();
  private nombresMaterias = new Map<number, string>();
  carreras: Carrera[] = [];
  private comisiones: Comision[] = [];
  reservaSeleccionada: Reserva | null = null;

  readonly HORA_INICIO = 7; // 07:00 AM
  readonly HORA_FIN = 22;   // 10:00 PM
  readonly INTERVALO_MINUTOS = 30; // Bloques de 30 min

  bloquesHorarios: string[] = [];

  ngOnInit() {
    this.generarBloquesHorarios();
    this.cargarEspacios();
    this.cargarReservas();
  }

  get reservasDelDia(): Reserva[] {
    return this.reservas.filter(reserva => this.reservaCorrespondeAlDia(reserva));
  }

  private reservaCorrespondeAlDia(reserva: Reserva): boolean {
    const fechaSeleccionada = new Date(`${this.fechaSeleccionada}T12:00:00`);
    const fechaInicio = new Date(`${reserva.fecha_inicio.slice(0, 10)}T12:00:00`);
    const fechaFin = new Date(`${(reserva.fecha_fin || reserva.fecha_inicio).slice(0, 10)}T12:00:00`);

    if (fechaSeleccionada < fechaInicio || fechaSeleccionada > fechaFin) {
      return false;
    }

    const diaReserva = this.normalizarDia(reserva.dia);
    return diaReserva === this.diaDeLaSemana(fechaSeleccionada);
  }

  private diaDeLaSemana(fecha: Date): string {
    const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
    return dias[fecha.getDay()];
  }

  private normalizarDia(dia: string): string {
    return dia
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  }

  get fechaFormateada(): string {
    return new Date(`${this.fechaSeleccionada}T12:00:00`).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  cambiarDia(cantidad: number): void {
    const fecha = new Date(`${this.fechaSeleccionada}T12:00:00`);
    fecha.setDate(fecha.getDate() + cantidad);
    this.fechaSeleccionada = this.formatearFechaInput(fecha);
  }

  irAHoy(): void {
    this.fechaSeleccionada = this.obtenerFechaLocal();
  }

  private cargarEspacios(): void {
    this.reservaService.getEspacios().subscribe({
      next: espacios => {
        this.aulas = espacios.map(espacio => ({
          id: Number(espacio.id),
          nombre: espacio.nombre
        }));
        this.changeDetector.markForCheck();
      },
      error: error => console.error('Error cargando espacios del calendario:', error)
    });
  }

  private cargarReservas(): void {
    forkJoin({
      reservas: this.reservaService.getReservas(),
      comisiones: this.reservaService.getComisiones(),
      asignaturas: this.reservaService.getAsignaturas(),
      carreras: this.reservaService.getCarreras()
    }).subscribe({
      next: ({ reservas, comisiones, asignaturas, carreras }) => {
        this.comisiones = comisiones;
        this.carreras = carreras;
        this.nombresMaterias = new Map(
          comisiones.map(comision => {
            const asignatura = asignaturas.find(
              item => Number(item.id) === Number(comision.asignatura_id)
            );
            return [Number(comision.id), asignatura?.nombre_asignatura || 'Materia sin nombre'];
          })
        );

        this.reservas = reservas;
        this.changeDetector.markForCheck();
      },
      error: error => console.error('Error cargando reservas del calendario:', error)
    });
  }

  getMateria(reserva: Reserva): string {
    return this.nombresMaterias.get(reserva.comision_id) || 'Materia sin nombre';
  }

  getCarreraId(reserva: Reserva): number {
    const comision = this.comisiones.find(item => Number(item.id) === Number(reserva.comision_id));
    return comision ? Number(comision.carrera_id) : 0;
  }

  getCarrera(reserva: Reserva): string {
    const carreraId = this.getCarreraId(reserva);
    return this.carreras.find(carrera => Number(carrera.id) === carreraId)?.nombre || 'Carrera sin nombre';
  }

  getEspacio(reserva: Reserva): string {
    return this.aulas.find(aula => aula.id === Number(reserva.aula_id))?.nombre || 'Espacio sin nombre';
  }

  abrirDetalles(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
  }

  cerrarDetalles(): void {
    this.reservaSeleccionada = null;
  }

  private obtenerFechaLocal(): string {
    const fecha = new Date();
    return this.formatearFechaInput(fecha);
  }

  private formatearFechaInput(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }

  private generarBloquesHorarios() {
    for (let h = this.HORA_INICIO; h <= this.HORA_FIN; h++) {
      this.bloquesHorarios.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== this.HORA_FIN) {
        this.bloquesHorarios.push(`${h.toString().padStart(2, '0')}:30`);
      }
    }
  }

  // Convierte "15:24:57.270000" a índice de fila para CSS Grid
  getRowIndex(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = this.HORA_INICIO * 60;
    
    // La fila 1 queda reservada para los encabezados.
    return Math.floor((totalMinutes - startMinutes) / this.INTERVALO_MINUTOS) + 2;
  }

  // Mapea la columna basada en la posición del aula en tu arreglo
  getAulaColumn(aulaId: number): number {
    const index = this.aulas.findIndex(a => a.id === aulaId);
    return index !== -1 ? index + 2 : 2; // +2 porque col 1 es para la hora
  }
}