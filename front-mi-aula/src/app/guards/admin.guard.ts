import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth-service';
import { UsuarioService } from '../services/usuario-service/usuario-service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (!localStorage.getItem('jwt')) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  return usuarioService.me().pipe(
    map((usuario) => {
      const esAdministrador = usuario.roles.some(
        (rol) => rol === 'administrador'
      );

      return esAdministrador ? true : router.createUrlTree(['/dashboard']);
    }),
    catchError((error) => {
      console.error('No se pudo obtener el usuario:', error);
      auth.logout();
      return of(router.createUrlTree(['/login']));
    })
  );
};