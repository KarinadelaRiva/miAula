import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth-service';
import { UsuarioService } from '../services/usuario-service/usuario-service';

export const publicOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (!localStorage.getItem('jwt')) {
    return true;
  }

  return usuarioService.me().pipe(
    map(() => router.createUrlTree(['/dashboard'])),
    catchError((error) => {
      console.error('No se pudo validar la sesión:', error);
      auth.logout();
      return of(true);
    })
  );
};
