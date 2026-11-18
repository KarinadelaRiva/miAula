import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../models/reserva';
import { Carrera } from '../../services/comision-service/comision-service';
import { ReservaService } from '../../services/reserva.service';
import { UsuarioService } from '../../services/usuario-service/usuario-service';

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
  private readonly usuarioService = inject(UsuarioService);

  aulas: Aula[] = [];
  fechaSeleccionada = this.obtenerFechaLocal();
  carreras: Carrera[] = [];
  reservaSeleccionada: Reserva | null = null;
  usuarioLogueado = false;
  esProfesor = false;
  mostrarTodasLasReservas = true;

  readonly HORA_INICIO = 7; // 07:00 AM
  readonly HORA_FIN = 22;   // 10:00 PM
  readonly INTERVALO_MINUTOS = 30; // Bloques de 30 min

  bloquesHorarios: string[] = [];

  ngOnInit() {
    this.generarBloquesHorarios();
    this.cargarEspacios();
    this.cargarCarreras();
    this.cargarUsuario();
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

  private cargarCarreras(): void {
    this.reservaService.getCarreras().subscribe({
      next: carreras => {
        this.carreras = carreras;
        this.changeDetector.markForCheck();
      },
      error: error => console.error('Error cargando carreras del calendario:', error)
    });
  }

  private cargarUsuario(): void {
    this.usuarioService.me().subscribe({
      next: usuario => {
        this.usuarioLogueado = true;
        this.esProfesor = usuario.roles.some(rol => rol.toLowerCase() === 'profesor');
        this.cargarReservas();
        this.changeDetector.markForCheck();
      },
      error: error => {
        this.usuarioLogueado = false;
        this.esProfesor = false;
        if (error.status !== 401 && error.status !== 403) {
          console.error('Error obteniendo el usuario del calendario:', error);
        }
        this.cargarReservas();
        this.changeDetector.markForCheck();
      }
    });
  }

  private cargarReservas(): void {
    const reservas$ = this.esProfesor && !this.mostrarTodasLasReservas
      ? this.reservaService.getMisReservas()
      : this.reservaService.getReservas();

    reservas$.subscribe({
      next: reservas => {
        this.reservas = reservas;
        this.changeDetector.markForCheck();
      },
      error: error => console.error('Error cargando reservas del calendario:', error)
    });
  }

  alternarVistaReservas(): void {
    if (!this.esProfesor) {
      return;
    }

    this.mostrarTodasLasReservas = !this.mostrarTodasLasReservas;
    this.reservaSeleccionada = null;
    this.cargarReservas();
  }

  getMateria(reserva: Reserva): string {
    return reserva.materia_nombre || 'Materia sin nombre';
  }

  getCarreraId(reserva: Reserva): number {
    return reserva.carrera_id || 0;
  }

  getCarrera(reserva: Reserva): string {
    const carreraId = this.getCarreraId(reserva);
    return reserva.carrera_nombre
      || this.carreras.find(carrera => Number(carrera.id) === carreraId)?.nombre
      || 'Carrera sin nombre';
  }

  getEspacio(reserva: Reserva): string {
    return reserva.espacio_nombre
      || this.aulas.find(aula => aula.id === Number(reserva.aula_id))?.nombre
      || 'Espacio sin nombre';
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