import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Espacio } from '../../models/espacio';
import { EspacioCreateDto } from '../../models/espacioCreateDto';

@Injectable({
  providedIn: 'root',
})
export class EspacioService {
  private http = inject(HttpClient);
  private baseDatosUrl = 'http://localhost:3000/espacios';

  getAll(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.baseDatosUrl);
  }

  getEspacioById(id: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.baseDatosUrl}/${id}`);
  }

  actualizarEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.baseDatosUrl}/${espacio.id}`, espacio);
  }

  actualizarEstado(id: number, enabled: number): Observable<Espacio> {
    return this.http.patch<Espacio>(`${this.baseDatosUrl}/${id}`, { enabled });
  }

  eliminarById(id: number): Observable<Espacio> {
    return this.http.patch<Espacio>(`${this.baseDatosUrl}/${id}`, { enabled: false });
  }

  reactivarById(id: number): Observable<Espacio> {
    return this.http.patch<Espacio>(`${this.baseDatosUrl}/${id}`, { enabled: true });
  }

  crear(espacioNuevo: EspacioCreateDto): Observable<Espacio> {
    const espacio = {
      ...espacioNuevo,
      enabled: true,
    };
    return this.http.post<Espacio>(this.baseDatosUrl, espacio);
  }

  obtenerEspaciosPaginados(
    pagina: number,
    limite: number,
    filtroTexto?: string,
    filtroEstado?: string | boolean
  ): Observable<{ espacios: Espacio[]; total: number }> {
    return this.http.get<Espacio[]>(this.baseDatosUrl, { observe: 'response' }).pipe(
      map((response) => {
        let espacios = response.body || [];

        if (filtroTexto && filtroTexto.trim() !== '') {
          const textoLower = filtroTexto.toLowerCase();
          espacios = espacios.filter(
            (espacio) =>
              espacio.code.toLowerCase().includes(textoLower) ||
              espacio.name.toLowerCase().includes(textoLower) ||
              String(espacio.floor_number).includes(textoLower)
          );
        }

        if (filtroEstado !== undefined && filtroEstado !== '') {
          const valorEstado = String(filtroEstado).toLowerCase();
          const activo = valorEstado === 'true' || valorEstado === '1';
          espacios = espacios.filter((espacio) => Number(espacio.enabled) === Number(activo));
        }

        const inicio = (pagina - 1) * limite;
        const fin = inicio + limite;

        return {
          espacios: espacios.slice(inicio, fin),
          total: espacios.length,
        };
      })
    );
  }
}
