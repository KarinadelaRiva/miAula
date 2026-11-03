import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioCreateDto } from '../../models/usuarioCreateDto';
import { UsuarioResponseDto } from '../../models/usuarioResponseDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private baseDatosUrl = 'http://localhost:3000/usuarios';
  private api = 'http://localhost:8080/usuarios';

  me(): Observable<UsuarioResponseDto> {
    return this.http.get<UsuarioResponseDto>(`${this.api}/me`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  usuarioLogueado(): Observable<boolean> {
    return this.me().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.api}/${id}`);
  }

  /*
  getUsuarioByEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api, );
  }
    */

  existePorEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/buscar-email`, {
      params: { email },
    });
  }

  actualizarUsuario(usuario: Usuario): Observable<UsuarioResponseDto> {
    return this.http.put<UsuarioResponseDto>(this.api, usuario);
  }

  actualizarPassword(id: string, password: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseDatosUrl}/${id}`, { password });
  }

  eliminarById(id: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseDatosUrl}/${id}`, { activo: false });
  }

  reactivarById(id: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseDatosUrl}/${id}`, { activo: true });
  }

  crear(usuario: UsuarioCreateDto): Observable<UsuarioResponseDto> {
    return this.http.post<UsuarioResponseDto>(this.api, usuario);
  }

  obtenerUsuariosPaginados(
    pagina: number,
    limite: number,
    filtroTexto?: string,
    filtroRol?: string,
    filtroActivo?: boolean
  ): Observable<{ usuarios: Usuario[]; total: number }> {
    let params = '';

    if (filtroRol && filtroRol !== '') {
      params += `rol=${filtroRol}`;
    }

    if (filtroActivo !== undefined) {
      params += params ? '&' : '';
      params += `activo=${filtroActivo}`;
    }

    const url = params ? `${this.baseDatosUrl}?${params}` : this.baseDatosUrl;

    return this.http
      .get<Usuario[]>(url, { observe: 'response' })
      .pipe(
        map((response) => {
          let usuarios = response.body || [];
          
          if (filtroTexto && filtroTexto.trim() !== '') {
            const textoLower = filtroTexto.toLowerCase();
            usuarios = usuarios.filter(u => 
              u.nombre.toLowerCase().includes(textoLower) ||
              u.apellido.toLowerCase().includes(textoLower) ||
              u.email.toLowerCase().includes(textoLower)
            );
          }
          
          const inicio = (pagina - 1) * limite;
          const fin = inicio + limite;
          const usuariosPaginados = usuarios.slice(inicio, fin);
          
          return {
            usuarios: usuariosPaginados,
            total: usuarios.length,
          };
        })
      );
  }

  getUsuarioLogueado(): Observable<UsuarioResponseDto> {
    return this.http.get<UsuarioResponseDto>(`${this.baseDatosUrl}/me`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

}
