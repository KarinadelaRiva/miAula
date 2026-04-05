import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth-service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.userInfo().role;
  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles || !role || !allowedRoles.includes(role)) {
    window.alert('No tienes permiso para acceder a esta página');
    // Si está logueado, redirigir a dashboard; si no, dejar como está
    if (auth.loggedInUser()) {
      router.navigate(['/dashboard']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }
  return true;
};
