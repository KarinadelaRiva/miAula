import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/auth';


  login(req: LoginRequest): Observable<void> {
    return this.http.post<LoginResponse>(`${this.api}/login`, req).pipe(
      tap(({ token }) => localStorage.setItem('jwt', token)),
      map(() => undefined),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  validarPassword(password1: string, password2: string): boolean {
    return password1 === password2;
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}
