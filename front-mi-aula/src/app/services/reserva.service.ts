import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { Espacio } from '../models/espacio';
import type { Reserva } from '../models/reserva';
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

interface ReservaEstadoApiResponse {
  id: number;
  diaDeLaSemana: string;
  diaDeInicio: string;
  diaDeFin: string;
  horaDeInicio: string;
  horaDeFin: string;
  comision?: {
    id?: number;
    nombre?: string;
    materia?: { nombre?: string };
    profesor?: { nombre?: string; apellido?: string };
  };
  espacio?: {
    id?: number;
    nombre?: string;
    capacidad?: number;
  };
}

export interface ReservaCalendario {
  id: string | number;
  title: string;
  start: string;
  end: string;
  color?: string;
  resourceId?: string;
  extendedProps?: {
    asignatura?: string;
    aula?: string;
    comision?: string;
    profesor?: string;
    dia?: string;
    capacidad?: number;
    tipoEspacio?: string;
    profesorId?: number | null;
    comisionId?: number;
    estado?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/reservas';
  private readonly espacioService = inject(EspacioService);
  private readonly comisionService = inject(ComisionService);

  getReservas(): Observable<Reserva[]> {
    return this.obtenerReservas(this.api);
  }

  getReservasActivas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/activas`);
  }

  getReservasTerminadas(): Observable<Reserva[]> {
    return this.obtenerReservasPorEstado(`${this.api}/terminadas`);
  }

  eliminarReserva(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  private obtenerReservasPorEstado(url: string): Observable<Reserva[]> {
    return this.http.get<ReservaEstadoApiResponse[]>(url).pipe(
      map(reservas => reservas.map(reserva => ({
        id: String(reserva.id),
        dia: reserva.diaDeLaSemana,
        fecha_inicio: reserva.diaDeInicio,
        fecha_fin: reserva.diaDeFin,
        hora_inicio: reserva.horaDeInicio,
        hora_fin: reserva.horaDeFin,
        comision_id: reserva.comision?.id ?? 0,
        aula_id: reserva.espacio?.id ?? 0,
        comision_nombre: reserva.comision?.nombre,
        materia_nombre: reserva.comision?.materia?.nombre,
        profesor_nombre: `${reserva.comision?.profesor?.nombre ?? ''} ${reserva.comision?.profesor?.apellido ?? ''}`.trim() || undefined,
        espacio_nombre: reserva.espacio?.nombre,
        capacidad: reserva.espacio?.capacidad
      })))
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