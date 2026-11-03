import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth-service';
import { UsuarioService } from '../services/usuario-service/usuario-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (!localStorage.getItem('jwt')) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  return usuarioService.me().pipe(
    map(() => true),
    catchError((error) => {
      console.error('No se pudo validar la sesión:', error);
      auth.logout();
      return of(router.createUrlTree(['/login']));
    })
  );
};
