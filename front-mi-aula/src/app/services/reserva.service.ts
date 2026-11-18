import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { Espacio } from '../models/espacio';
import type { Reserva } from '../models/reserva';
import type { ReservaCalendario } from '../models/reserva-calendario';
import { ComisionService } from './comision-service/comision-service';
import { EspacioService } from './espacio-service/espacio-service';
import type { Carrera } from './comision-service/comision-service';

interface ReservaApiResponse {
  id: number;
  dia: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  comisionId: number;
  aulaId: number;
  comisionNombre: string;
  materiaNombre: string;
  carreraId: number;
  carreraNombre: string;
  profesorId: number;
  profesorNombre: string;
  espacioNombre: string;
  capacidad: number;
}

export interface ReservaModificable {
  id: number;
  diaSemana: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  espacioId: number;
  nombreEspacio: string;
  comisionId: number;
  nombreComision: string;
  recursos: Array<{
    recursoId: number;
    cantidad: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/reservas';
  private readonly espacioService = inject(EspacioService);
  private readonly comisionService = inject(ComisionService);

  getMisReservasModificables(): Observable<ReservaModificable[]> {
    return this.http.get<ReservaModificable[]>(`${this.api}/mias/modificables`);
  }

  getReservas(): Observable<Reserva[]> {
    return this.obtenerReservas(this.api);
  }

  getReservasActivas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/activas`);
  }

  getReservasTerminadas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/terminadas`);
  }

  getMisReservasActivas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/mis-reservas/activas`);
  }

  getMisReservasTerminadas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/mis-reservas/terminadas`);
  }

  eliminarReserva(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  private obtenerReservasPorEstado(url: string): Observable<Reserva[]> {
    return this.http.get<ReservaApiResponse[]>(url).pipe(
      map(reservas => reservas.map(reserva => this.reservaApiToReserva(reserva)))
    );
  }

  getMisReservas(): Observable<Reserva[]> {
    return this.obtenerReservas(`${this.api}/mis-reservas`);
  }

  getEspacios(): Observable<Espacio[]> {
    return this.espacioService.getAll();
  }

  getCarreras(): Observable<Carrera[]> {
    return this.comisionService.getCarreras();
  }

  getReservasParaCalendario(): Observable<ReservaCalendario[]> {
    return this.http.get<ReservaApiResponse[]>(this.api).pipe(
      map(reservas => reservas.map(reserva => ({
        id: reserva.id,
        title: `${reserva.materiaNombre || 'Sin asignatura'} - ${reserva.espacioNombre || 'Sin aula'}`,
        start: `${reserva.fechaInicio}T${reserva.horaInicio}`,
        end: `${reserva.fechaInicio}T${reserva.horaFin}`,
        color: this.getColorPorAsignatura(reserva.materiaNombre || ''),
        resourceId: reserva.espacioNombre || 'sin-aula',
        extendedProps: {
          asignatura: reserva.materiaNombre || 'Sin asignatura',
          aula: reserva.espacioNombre || 'Sin aula',
          comision: reserva.comisionNombre || 'Sin comisión',
          profesor: reserva.profesorNombre || 'Sin profesor',
          dia: reserva.dia,
          capacidad: reserva.capacidad || 0,
          tipoEspacio: 'AULA',
          profesorId: reserva.profesorId || null,
          comisionId: reserva.comisionId,
          estado: 'ACTIVA'
        }
      })))
    );
  }

  private obtenerReservas(url: string): Observable<Reserva[]> {
    return this.http.get<ReservaApiResponse[]>(url).pipe(
      map(reservas => reservas.map(reserva => this.reservaApiToReserva(reserva)))
    );
  }

  private reservaApiToReserva(reserva: ReservaApiResponse): Reserva {
    return {
      id: String(reserva.id),
      dia: reserva.dia,
      fecha_inicio: reserva.fechaInicio,
      fecha_fin: reserva.fechaFin,
      hora_inicio: reserva.horaInicio,
      hora_fin: reserva.horaFin,
      comision_id: reserva.comisionId,
      aula_id: reserva.aulaId,
      comision_nombre: reserva.comisionNombre,
      materia_nombre: reserva.materiaNombre,
      carrera_id: reserva.carreraId,
      carrera_nombre: reserva.carreraNombre,
      profesor_id: reserva.profesorId,
      profesor_nombre: reserva.profesorNombre,
      espacio_nombre: reserva.espacioNombre,
      capacidad: reserva.capacidad
    };
  }

  private getColorPorAsignatura(nombreAsignatura: string): string {
    const nombre = nombreAsignatura.toLowerCase();
    
    if (nombre.includes('matemática') || nombre.includes('matematica') || nombre.includes('álgebra') || nombre.includes('algebra')) {
      return '#007bff'; // Azul
    } else if (nombre.includes('física') || nombre.includes('fisica') || nombre.includes('laboratorio')) {
      return '#28a745'; // Verde
    } else if (nombre.includes('programación') || nombre.includes('programacion') || nombre.includes('algoritmos')) {
      return '#dc3545'; // Rojo
    } else if (nombre.includes('base') || nombre.includes('datos') || nombre.includes('sistemas')) {
      return '#ffc107'; // Amarillo
    } else if (nombre.includes('inglés') || nombre.includes('ingles')) {
      return '#6f42c1'; // Púrpura
    } else if (nombre.includes('química') || nombre.includes('quimica')) {
      return '#fd7e14'; // Naranja
    } else {
      return '#6c757d'; // Gris por defecto
    }
  }
}