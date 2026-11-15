import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  participantesMaximos: number;
  organizadorId: number;
  organizadorNombre: string;
  organizadorApellido: string;
  organizadorEmail: string;
  activo: boolean;
}

export interface EventoCreateDTO {
  codigo: string;
  nombre: string;
  descripcion: string | null;
  participantesMaximos: number;
  organizadorId: number;
}

export interface EventoUpdateDTO {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  participantesMaximos: number;
  organizadorId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly apiUrl = 'http://localhost:8080/eventos';

  constructor(
    private http: HttpClient
  ) {}

  obtenerTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  obtenerActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(
      `${this.apiUrl}/activos`
    );
  }

  obtenerMisEventos(): Observable<Evento[]> {
  return this.http.get<Evento[]>(
    `${this.apiUrl}/mis-eventos`
  );
}

  obtenerPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(
      `${this.apiUrl}/${id}`
    );
  }

  obtenerPorOrganizador(
    organizadorId: number
  ): Observable<Evento[]> {
    return this.http.get<Evento[]>(
      `${this.apiUrl}/organizador/${organizadorId}`
    );
  }

  crear(
    evento: EventoCreateDTO
  ): Observable<Evento> {
    return this.http.post<Evento>(
      this.apiUrl,
      evento
    );
  }

  actualizar(
    evento: EventoUpdateDTO
  ): Observable<Evento> {
    return this.http.put<Evento>(
      this.apiUrl,
      evento
    );
  }

  deshabilitar(
    id: number
  ): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(
      `${this.apiUrl}/${id}`
    );
  }

  activar(
    id: number
  ): Observable<Evento> {
    return this.http.put<Evento>(
      `${this.apiUrl}/activar/${id}`,
      {}
    );
  }
}