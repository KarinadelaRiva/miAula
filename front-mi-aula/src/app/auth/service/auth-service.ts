import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioResponseDto } from '../../models/usuarioResponseDto';
import { UsuarioService } from '../../services/usuario-service/usuario-service';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly usuarioService = inject(UsuarioService);
  private readonly api = 'http://localhost:8080/auth';

  readonly infoUsuario = signal<UsuarioResponseDto | null>(null);
  readonly usuarioLogueado = signal(false);

  login(req: LoginRequest): Observable<UsuarioResponseDto> {
    return this.http.post<LoginResponse>(`${this.api}/login`, req).pipe(
      tap(({ token }) => localStorage.setItem('jwt', token)),
      switchMap(() => this.cargarUsuarioActual()),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  cargarUsuarioActual(): Observable<UsuarioResponseDto> {
    return this.usuarioService.me().pipe(
      tap((usuario) => {
        this.infoUsuario.set(usuario);
        this.usuarioLogueado.set(true);
      })
    );
  }

  tieneRol(rolEsperado: 'ADMIN' | 'PROFESOR'): boolean {
    const roles = this.infoUsuario()?.roles ?? [];
    return roles.some((rol) => {
      const normalizado = rol.toUpperCase().replace(/^ROLE_/, '');
      return normalizado === rolEsperado ||
        (rolEsperado === 'ADMIN' && normalizado === 'ADMINISTRADOR');
    });
  }

  validarPassword(password1: string, password2: string): boolean {
    return password1 === password2;
  }

  actualizarInfoUsuario(usuario: Usuario): Observable<Usuario> {
    return this.usuarioService.actualizarUsuario(usuario).pipe(
      tap((usuarioActualizado) => {
        this.infoUsuario.set({
          id: String(usuarioActualizado.id),
          nombre: usuarioActualizado.nombre,
          apellido: usuarioActualizado.apellido,
          email: usuarioActualizado.email,
          roles: usuarioActualizado.roles,
          activo: usuarioActualizado.activo,
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.infoUsuario.set(null);
    this.usuarioLogueado.set(false);
  }
}
