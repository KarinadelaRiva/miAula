/*
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth-service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const rolesPermitidos = route.data['roles'] as string[] | undefined;

  if (!localStorage.getItem('jwt')) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  if (!rolesPermitidos?.length) {
    return router.createUrlTree(['/dashboard']);
  }

  return auth.cargarUsuarioActual().pipe(
    map((usuario) => {
      const roles = usuario.roles.map((rol) => rol.toUpperCase().replace(/^ROLE_/, ''));
      return rolesPermitidos.some((rol) => {
        const permitido = rol.toUpperCase();
        return roles.includes(permitido) ||
          (permitido === 'ADMIN' && roles.includes('ADMINISTRADOR'));
      })
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
*/
