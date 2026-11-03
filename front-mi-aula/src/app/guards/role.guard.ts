import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth-service';
import type { RolUsuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario-service/usuario-service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const rolesPermitidos = route.data['roles'] as RolUsuario[] | undefined;

  if (!localStorage.getItem('jwt')) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  if (!rolesPermitidos?.length) {
    return router.createUrlTree(['/dashboard']);
  }

  return usuarioService.me().pipe(
    map((usuario) => {
      return rolesPermitidos.some((rol) => usuario.roles.includes(rol))
        ? true
        : router.createUrlTree(['/dashboard']);
    }),
    catchError((error) => {
      console.error('No se pudo verificar el rol del usuario:', error);
      auth.logout();
      return of(router.createUrlTree(['/login']));
    })
  );
};
