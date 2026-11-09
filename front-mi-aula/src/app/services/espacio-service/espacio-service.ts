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
  private baseDatosUrlBack = 'http://localhost:8080/espacios';

  getAll(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.baseDatosUrlBack);
  }

  getEspacioById(id: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.baseDatosUrlBack}/${id}`);
  }

  actualizarEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.put<Espacio>(this.baseDatosUrlBack, espacio);
  }

  actualizarEstado(id: number, activo: boolean): Observable<Espacio> {
    return this.http.patch<Espacio>(`${this.baseDatosUrlBack}/${id}`, { activo });
  }

  eliminarById(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseDatosUrlBack}/${id}`, null);
  }

  reactivarById(id: number): Observable<Espacio> {
    return this.http.patch<Espacio>(`${this.baseDatosUrlBack}/${id}`, { activo: true });
  }

  crear(espacioNuevo: EspacioCreateDto): Observable<Espacio> {
    return this.http.post<Espacio>(this.baseDatosUrlBack, espacioNuevo);
  }

  obtenerEspaciosPaginados(
    pagina: number,
    limite: number,
    filtroTexto?: string,
    filtroEstado?: string | boolean
  ): Observable<{ espacios: Espacio[]; total: number }> {
    return this.http.get<Espacio[]>(this.baseDatosUrlBack, { observe: 'response' }).pipe(
      map((response) => {
        let espacios = response.body || [];

        if (filtroTexto && filtroTexto.trim() !== '') {
          const textoLower = filtroTexto.toLowerCase();
          espacios = espacios.filter(
            (espacio) =>
              espacio.codigo.toLowerCase().includes(textoLower) ||
              espacio.nombre.toLowerCase().includes(textoLower) ||
              String(espacio.nroPiso).includes(textoLower)
          );
        }

        if (filtroEstado !== undefined && filtroEstado !== '') {
          const valorEstado = String(filtroEstado).toLowerCase();
          const activo = valorEstado === 'true' || valorEstado === '1';
          espacios = espacios.filter((espacio) => espacio.activo === activo);
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
