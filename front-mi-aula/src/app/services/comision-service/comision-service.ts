import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Comision {
  id: number;
  codigo: string;
  nombre: string;
  materiaNombre: string;
  materiaActiva: boolean;
  carreraNombre: string;
  carreraActiva: boolean;
  profesorNombre: string;
  profesorId: number;
  cantidadEstudiantes: number;
  activo: boolean;
}

export interface ComisionAdministracion {
  id: string;
  cantidad_alumnos: number;
  nombre: string;
  asignatura_id: number;
  carrera_id: number;
  usuario_profesor_id: number;
}

export interface ComisionCreate {
  codigo: string;
  nombre: string;
  asignaturaId: number;
  carreraId: number;
  profesorId: number;
  cantidadEstudiantes: number;
}

export interface ComisionFormulario {
  nombre: string;
  cantidad_alumnos: number;
  asignatura_id: number;
  carrera_id: number;
  usuario_profesor_id: number;
}

export interface Asignatura {
  id: string;
  codigo: number;
  nombre_asignatura: string;
  requiere_laboratorio?: number;
}

export interface Carrera {
  id: string;
  nombre: string;
}

interface CarreraApiResponse {
  id: number;
  nombre: string;
}

export interface Profesor {
  id: string;
  apellido: string;
  nombre: string;
  rol: string;
  activo: boolean;
}

export interface ComisionUpdate extends ComisionCreate {
  id: number;
}

export interface CronogramaComision {
  id: number;
  codigo: string;
  nombre: string;
  cantidadEstudiantes: number;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ComisionService {
  private readonly http = inject(HttpClient);
  private readonly baseDatosUrl = 'http://localhost:8080/comisiones';

  getAll(): Observable<Comision[]> {
    return this.http.get<Comision[]>(this.baseDatosUrl);
  }

  getTodasParaAdministrar(): Observable<ComisionAdministracion[]> {
    return this.http.get<ComisionAdministracion[]>(this.baseDatosUrl);
  }

  getComisionById(id: number): Observable<CronogramaComision> {
    return this.http.get<CronogramaComision>(`${this.baseDatosUrl}/${id}`);
  }

  crear(comision: ComisionCreate): Observable<Comision> {
    return this.http.post<Comision>(this.baseDatosUrl, comision);
  }

  crearDesdeFormulario(comision: ComisionFormulario): Observable<Comision> {
    return this.http.post<Comision>(this.baseDatosUrl, comision);
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>('http://localhost:3000/asignaturas');
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<CarreraApiResponse[]>('http://localhost:8080/carreras').pipe(
      map(carreras => carreras.map(carrera => ({
        id: String(carrera.id),
        nombre: carrera.nombre
      })))
    );
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>('http://localhost:3000/usuarios');
  }

  actualizar(comision: ComisionUpdate): Observable<Comision> {
    return this.http.put<Comision>(this.baseDatosUrl, comision);
  }

  actualizarParaAdministrar(comision: ComisionAdministracion): Observable<void> {
    return this.http.put<void>(this.baseDatosUrl, comision);
  }

  desactivar(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseDatosUrl}/${id}`, null);
  }

  activar(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseDatosUrl}/activar/${id}`, null);
  }

  getByMateria(materiaId: number): Observable<Comision[]> {
    return this.http.get<Comision[]>(
      `${this.baseDatosUrl}/por-materia/${materiaId}`
    );
  }
}