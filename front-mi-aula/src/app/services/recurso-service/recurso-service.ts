import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recurso } from '../../models/recurso';
import { RecursoCreateDto } from '../../models/recursoCreateDto';

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private http = inject(HttpClient);
  private baseDatosUrl = 'http://localhost:3000/recursos';

  getAll(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.baseDatosUrl);
  }

  getRecursoById(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.baseDatosUrl}/${id}`);
  }

  crear(recursoNuevo: RecursoCreateDto): Observable<Recurso> {
    const recurso = {
      ...recursoNuevo,
      enabled: 1,
    };
    return this.http.post<Recurso>(this.baseDatosUrl, recurso);
  }

  eliminarById(id: number): Observable<Recurso> {
    return this.http.patch<Recurso>(`${this.baseDatosUrl}/${id}`, { enabled: 0 });
  }

  reactivarById(id: number): Observable<Recurso> {
    return this.http.patch<Recurso>(`${this.baseDatosUrl}/${id}`, { enabled: 1 });
  }

  obtenerRecursosPaginados(
    pagina: number,
    limite: number,
    filtroTexto?: string,
    filtroEstado?: string | boolean
  ): Observable<{ recursos: Recurso[]; total: number }> {
    return this.http.get<Recurso[]>(this.baseDatosUrl, { observe: 'response' }).pipe(
      map((response) => {
        let recursos = response.body || [];

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
