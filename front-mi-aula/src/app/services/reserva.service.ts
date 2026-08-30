import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Reserva {
  id: string;
  dia: string;
  fecha_fin: string;
  fecha_inicio: string;
  hora_fin: string;
  hora_inicio: string;
  comision_id: number;
  aula_id: number;
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

export interface Espacio {
  id: string;
  nombre: string;
  tipo_espacio: string;
  capacidad: number;
}

export interface Comision {
  id: string;
  nombre: string;
  asignatura_id: number;
  usuario_profesor_id: number;
}

export interface Asignatura {
  id: string;
  nombre_asignatura: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  constructor() { }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.baseUrl}/reservas`);
  }

  getEspacios(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(`${this.baseUrl}/espacios`);
  }

  getComisiones(): Observable<Comision[]> {
    return this.http.get<Comision[]>(`${this.baseUrl}/comisiones`);
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseUrl}/asignaturas`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  // Obtener reservas formateadas para la vista de agenda
  getReservasParaCalendario(): Observable<ReservaCalendario[]> {
    return forkJoin({
      reservas: this.getReservas(),
      espacios: this.getEspacios(),
      comisiones: this.getComisiones(),
      asignaturas: this.getAsignaturas(),
      usuarios: this.getUsuarios()
    }).pipe(
      map(({ reservas, espacios, comisiones, asignaturas, usuarios }) => {
        console.log('🔄 Procesando datos de la API...');
        console.log('📊 Reservas:', reservas.length);
        console.log('🏫 Espacios:', espacios.length);
        console.log('👥 Comisiones:', comisiones.length);
        console.log('📚 Asignaturas:', asignaturas.length);
        console.log('👨‍🏫 Usuarios:', usuarios.length);

        return reservas.map(reserva => {
          const espacio = espacios.find(e => e.id === reserva.aula_id.toString());
          const comision = comisiones.find(c => c.id === reserva.comision_id.toString());
          const asignatura = comision ? asignaturas.find(a => a.id === comision.asignatura_id.toString()) : null;
          const profesor = comision ? usuarios.find(u => u.id === comision.usuario_profesor_id.toString()) : null;

          const fechaInicio = new Date(`${reserva.fecha_inicio}T${reserva.hora_inicio.split('.')[0]}`);
          const fechaFin = new Date(`${reserva.fecha_inicio}T${reserva.hora_fin.split('.')[0]}`);

          const evento: ReservaCalendario = {
            id: reserva.id,
            title: `${asignatura?.nombre_asignatura || 'Sin asignatura'} - ${espacio?.nombre || 'Sin aula'}`,
            start: fechaInicio.toISOString(),
            end: fechaFin.toISOString(),
            color: this.getColorPorAsignatura(asignatura?.nombre_asignatura || ''),
            resourceId: espacio?.nombre || 'sin-aula',
            extendedProps: {
              asignatura: asignatura?.nombre_asignatura || 'Sin asignatura',
              aula: espacio?.nombre || 'Sin aula',
              comision: comision?.nombre || 'Sin comisión',
              profesor: profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Sin profesor',
              dia: reserva.dia,
              capacidad: espacio?.capacidad || 0,
              tipoEspacio: espacio?.tipo_espacio || 'AULA',
              profesorId: comision?.usuario_profesor_id || null,
              comisionId: reserva.comision_id,
              estado: 'ACTIVA'
            }
          };

          console.log('✅ Evento procesado:', evento.title, 'en', evento.extendedProps?.aula);
          return evento;
        });
      })
    );
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