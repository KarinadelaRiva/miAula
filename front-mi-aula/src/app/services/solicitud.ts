import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';

export type DiaSemanaSolicitud =
  | 'LUNES'
  | 'MARTES'
  | 'MIERCOLES'
  | 'JUEVES'
  | 'VIERNES'
  | 'SABADO'
  | 'DOMINGO';

export interface SolicitudData {
  id?: number;
  comentario_estado: string;
  comentario_profesor: string;
  dia_semana: DiaSemanaSolicitud;
  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA" | "CANCELADA";
  fecha_fin: string;
  fecha_hora_solicitud: string;
  fecha_inicio: string;
  hora_inicio?: string;
  hora_fin?: string;
  comision_id?: number;
  nuevo_espacio_id?: number;
  reserva_original_id?: number | null;
  usuario_id?: number;
  solicitante_nombre?: string;
  comision_nombre?: string;
  espacio_nombre?: string;
}

export interface SolicitudCreateRequest {
  nuevoEspacioId: number;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  comentarioSolicitante: string | null;
  comisionId: number;
  diaSemana: DiaSemanaSolicitud;
}

interface SolicitudResponseDTO {
  id: number;
  nombreSolicitante: string | null;
  nombreNuevoEspacio: string | null;
  nombreComision: string | null;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'CANCELADA';
  fechaInicio: string;
  fechaFin: string;
  diaSemana: DiaSemanaSolicitud;
  horaInicio: string;
  horaFin: string;
  comentarioEstado: string | null;
  comentarioSolicitante: string | null;
  fechaHoraSolicitud: string;
}

interface SolicitudesPage {
  content: SolicitudResponseDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class Solicitud {
  private readonly mockApiUrl = 'http://localhost:3000/solicitudes';
  private readonly apiUrl = 'http://localhost:8080/solicitudes';

  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<SolicitudData[]> {
    return this.http.get<SolicitudData[]>(this.mockApiUrl);
  }

  createSolicitud(solicitud: SolicitudData): Observable<SolicitudData> {
    return this.http.post<SolicitudData>(this.mockApiUrl, solicitud);
  }

  createNuevaSolicitud(solicitud: SolicitudCreateRequest): Observable<SolicitudResponseDTO> {
    return this.http.post<SolicitudResponseDTO>(`${this.apiUrl}/nueva`, solicitud);
  }

  getSolicitudesDelUsuario(): Observable<SolicitudData[]> {
    return this.http
      .get<SolicitudesPage>(`${this.apiUrl}/usuario/historial`, {
        params: { page: 0, size: 1000 },
      })
      .pipe(
        map((page) => (page?.content ?? []).map((solicitud) => this.toSolicitudData(solicitud)))
      );
  }

  getSolicitudesAdministracion(): Observable<SolicitudData[]> {
    return this.http
      .get<SolicitudResponseDTO[]>(`${this.apiUrl}/buscar`)
      .pipe(
        map((solicitudes) => (solicitudes ?? []).map((solicitud) => this.toSolicitudData(solicitud)))
      );
  }

  aprobarSolicitud(id: number, comentario: string): Observable<SolicitudData> {
    return this.http
      .put<SolicitudResponseDTO>(`${this.apiUrl}/${id}/aprobar`, comentario)
      .pipe(map((solicitud) => this.toSolicitudData(solicitud)));
  }

  rechazarSolicitud(id: number, comentario: string): Observable<SolicitudData> {
    return this.http
      .put<SolicitudResponseDTO>(`${this.apiUrl}/${id}/rechazar`, comentario)
      .pipe(map((solicitud) => this.toSolicitudData(solicitud)));
  }

  guardarComentarioAdmin(id: number, comentario: string): Observable<SolicitudData> {
    return this.http
      .patch<SolicitudResponseDTO>(`${this.apiUrl}/${id}/comentario`, { comentario })
      .pipe(map((solicitud) => this.toSolicitudData(solicitud)));
  }

  cancelarSolicitudDelUsuario(id: number): Observable<SolicitudData> {
    return this.http
      .put<SolicitudResponseDTO>(`${this.apiUrl}/${id}/cancelar`, {})
      .pipe(map((solicitud) => this.toSolicitudData(solicitud)));
  }

  private toSolicitudData(solicitud: SolicitudResponseDTO): SolicitudData {
    return {
      id: solicitud.id,
      comentario_estado: solicitud.comentarioEstado ?? '',
      comentario_profesor: solicitud.comentarioSolicitante ?? '',
      dia_semana: solicitud.diaSemana,
      estado: solicitud.estado === 'ACEPTADA' ? 'APROBADA' : solicitud.estado,
      fecha_fin: solicitud.fechaFin,
      fecha_hora_solicitud: solicitud.fechaHoraSolicitud,
      fecha_inicio: solicitud.fechaInicio,
      hora_inicio: solicitud.horaInicio,
      hora_fin: solicitud.horaFin,
      solicitante_nombre: solicitud.nombreSolicitante ?? '',
      comision_nombre: solicitud.nombreComision ?? '',
      espacio_nombre: solicitud.nombreNuevoEspacio ?? '',
    };
  }

  updateSolicitud(id: string, solicitud: SolicitudData): Observable<SolicitudData> {
    return this.http.put<SolicitudData>(`${this.mockApiUrl}/${id}`, solicitud);
  }

  cancelarSolicitud(id: string, solicitud: SolicitudData): Observable<SolicitudData> {
    const payload = { estado: 'CANCELADA' };
    return this.http.patch<SolicitudData>(`${this.mockApiUrl}/${id}`, payload);
  }

  /**
   * Comprueba si la solicitud puede ser modificada por el usuario actual.
   * Solo el usuario creador y cuando el estado sea 'PENDIENTE'.
   */
  isEditable(solicitud: SolicitudData, currentUserId: string | number): boolean {
    return (
      String(solicitud?.usuario_id) === String(currentUserId) &&
      solicitud?.estado === 'PENDIENTE'
    );
  }

  /**
   * Intenta actualizar la solicitud solo si el usuario está autorizado.
   * Devuelve un error observable si no está permitido.
   */
  updateSolicitudIfAllowed(
    id: string,
    solicitud: SolicitudData,
    currentUserId: string | number
  ): Observable<SolicitudData> {
    if (!this.isEditable(solicitud, currentUserId)) {
      return throwError(
        () => new Error('No autorizado: solo el creador puede modificar solicitudes en estado PENDIENTE')
      );
    }
    return this.updateSolicitud(id, solicitud);
  }

  cancelarSolicitudIfAllowed(
    id: string,
    solicitud: SolicitudData,
    currentUserId: string
  ): Observable<SolicitudData> {
    if (!this.isEditable(solicitud, currentUserId)) {
      return throwError(
        () => new Error('No autorizado: solo el creador puede cancelar solicitudes en estado PENDIENTE')
      );
    }
    // cancelarSolicitud ya fuerza el estado 'CANCELADA'
    return this.cancelarSolicitud(id, solicitud);
  }

  /**
   * Actualiza el estado y comentario de estado de una solicitud (funcionalidad de admin)
   */
  patchEstadoComentario(id: string, estado: string, comentario: string): Observable<SolicitudData> {
    return estado === 'APROBADA'
      ? this.aprobarSolicitud(Number(id), comentario)
      : this.rechazarSolicitud(Number(id), comentario);
  }

  /**
   * Actualiza solo el comentario de estado de una solicitud (funcionalidad de admin)
   */
  patchComentarioEstado(id: string, comentario: string): Observable<SolicitudData> {
    return this.guardarComentarioAdmin(Number(id), comentario);
  }
}
