import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { map, Observable, tap } from 'rxjs';
import { UsuarioService } from '../../services/usuario-service/usuario-service';
import { AuthError } from '../errors/AuthError';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);

  
loggedInUser = signal<boolean>(false);
  userInfo = signal<User>({
    id: '',
    lastName: '',
    name: '',
    role: undefined,
    email: '',
    active: false,
  });

  constructor() {
  // Limpiar cualquier sesión previa para que siempre inicie sin usuario logueado
  this.clearSession();
  // this.cargarSesion();
  }

  private loadSession(): void {
    const savedUser = localStorage.getItem('usuario');
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        this.loggedInUser.set(true);
        this.userInfo.set(user);
      } catch (error) {
        localStorage.removeItem('usuario');
      }
    }
  }

  private clearSession(): void {
    localStorage.removeItem('usuario');
    this.loggedInUser.set(false);
    this.resetUser();
  }

  private saveSession(user: User): void {
    const userToSave = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      active: user.active,
    };
    localStorage.setItem('usuario', JSON.stringify(userToSave));
  }

  updateUserInfo(user: User): Observable<User> {
    return this.userService.updateUserInfo(user).pipe(
      tap((userUpdated) => {
        this.userInfo.set({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          active: user.active,
        });
        this.saveSession(userUpdated);
      })
    );
  }

  validateCredentials(credentials: LoginRequest): Observable<User> {
    console.log('validar credenciales');
    return this.userService.getUserByEmail(credentials.email).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          if(!user.active){
            throw AuthError.UserDeleted();
          }
          if (user.password === credentials.password) {
            return user;
          } else {
            throw AuthError.invalidCredentials();
          }
        }
        throw AuthError.UserNotRegistered();
      }),
      tap((user) => {
        console.log('guardar datos de sesion');
        this.loggedInUser.set(true);
        this.userInfo.set(user);
        this.saveSession(user);
      })
    );
  }

  validatePassword(password1: string, password2: string): boolean {
    return password1 === password2;
  }

  isAdmin(): boolean {
    const user = this.userInfo();
    return user?.role === 'ADMIN';
  }

  logout(): void {
    this.loggedInUser.set(false);
    this.resetUser();
    localStorage.removeItem('usuario');
  }

  private resetUser(): void {
    this.userInfo.set({
      id: '',
      lastName: '',
      name: '',
      role: undefined,
      email: '',
      active: false,
    });
  }
}
