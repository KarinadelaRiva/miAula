import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Materia {

  id: number;

  codigo: string;

  nombre: string;
}


export interface MateriaCreateDTO {

  codigo: string;

  nombre: string;
}


export interface MateriaUpdateDTO {

  codigo: string;

  nombre: string;
}


@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private readonly apiUrl =
    'http://localhost:8080/materias';


  constructor(
    private http: HttpClient
  ) {}


  // ============================================================
  // OBTENER TODAS
  // ============================================================

  obtenerTodas(): Observable<Materia[]> {

    return this.http.get<Materia[]>(
      this.apiUrl
    );
  }


  // ============================================================
  // OBTENER POR ID
  // ============================================================

  obtenerPorId(
    id: number
  ): Observable<Materia> {

    return this.http.get<Materia>(
      `${this.apiUrl}/${id}`
    );
  }


  // ============================================================
  // CREAR
  // ============================================================

  crear(
    materia: MateriaCreateDTO
  ): Observable<Materia> {

    return this.http.post<Materia>(
      this.apiUrl,
      materia
    );
  }


  // ============================================================
  // ACTUALIZAR
  // ============================================================

  actualizar(
    id: number,
    materia: MateriaUpdateDTO
  ): Observable<Materia> {

    return this.http.put<Materia>(
      `${this.apiUrl}/${id}`,
      materia
    );
  }


  // ============================================================
  // ELIMINAR
  // ============================================================

  eliminar(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}