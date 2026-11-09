import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recurso } from '../../models/recurso';
import { RecursoCreateDto } from '../../models/recursoCreateDto';

interface RecursoApiResponse {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  cantidad: number;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private http = inject(HttpClient);
  private baseDatosUrl = 'http://localhost:8080/recursos';

  private mapearRecurso(recurso: RecursoApiResponse): Recurso {
    return {
      id: recurso.id,
      code: recurso.codigo,
      name: recurso.nombre,
      description: recurso.descripcion ?? '',
      quantity: recurso.cantidad,
      enabled: Number(recurso.activo),
    };
  }

  getAll(): Observable<Recurso[]> {
    return this.http
      .get<RecursoApiResponse[]>(this.baseDatosUrl)
      .pipe(map((recursos) => recursos.map((recurso) => this.mapearRecurso(recurso))));
  }

  getRecursoById(id: number): Observable<Recurso> {
    return this.http
      .get<RecursoApiResponse>(`${this.baseDatosUrl}/id/${id}`)
      .pipe(map((recurso) => this.mapearRecurso(recurso)));
  }

  actualizarRecurso(recurso: Recurso): Observable<Recurso> {
    return this.http
      .put<RecursoApiResponse>(this.baseDatosUrl, {
        id: recurso.id,
        codigo: recurso.code,
        nombre: recurso.name,
        descripcion: recurso.description,
        cantidad: recurso.quantity,
      })
      .pipe(map((recursoActualizado) => this.mapearRecurso(recursoActualizado)));
  }

  crear(recursoNuevo: RecursoCreateDto): Observable<Recurso> {
    return this.http
      .post<RecursoApiResponse>(this.baseDatosUrl, {
        codigo: recursoNuevo.code,
        nombre: recursoNuevo.name,
        descripcion: recursoNuevo.description,
        cantidad: recursoNuevo.quantity,
      })
      .pipe(map((recursoCreado) => this.mapearRecurso(recursoCreado)));
  }

  eliminarById(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseDatosUrl}/${id}`, null);
  }

  reactivarById(id: number): Observable<Recurso> {
    return this.http
      .patch<RecursoApiResponse>(`${this.baseDatosUrl}/${id}`, { activo: true })
      .pipe(map((recurso) => this.mapearRecurso(recurso)));
  }

  obtenerRecursosPaginados(
    pagina: number,
    limite: number,
    filtroTexto?: string,
    filtroEstado?: string | boolean
  ): Observable<{ recursos: Recurso[]; total: number }> {
    return this.http.get<RecursoApiResponse[]>(this.baseDatosUrl, { observe: 'response' }).pipe(
      map((response) => {
        let recursos = (response.body || []).map((recurso) => this.mapearRecurso(recurso));

        if (filtroTexto && filtroTexto.trim() !== '') {
          const textoLower = filtroTexto.toLowerCase();
          recursos = recursos.filter(
            (recurso) =>
              recurso.code.toLowerCase().includes(textoLower) ||
              recurso.name.toLowerCase().includes(textoLower) ||
              recurso.description.toLowerCase().includes(textoLower)
          );
        }

        if (filtroEstado !== undefined && filtroEstado !== '') {
          const valorEstado = String(filtroEstado).toLowerCase();
          const activo = valorEstado === 'true' || valorEstado === '1';
          recursos = recursos.filter((recurso) => Number(recurso.enabled) === Number(activo));
        }

        const inicio = (pagina - 1) * limite;
        const fin = inicio + limite;

        return {
          recursos: recursos.slice(inicio, fin),
          total: recursos.length,
        };
      })
    );
  }
}
