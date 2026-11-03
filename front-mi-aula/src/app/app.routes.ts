import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';

import { Nueva } from './pages/solicitud/nueva/nueva';
import { MisSolicitudes } from './pages/solicitud/mis-solicitudes/mis-solicitudes';
import { ListSolicitudes } from './pages/solicitud/list-solicitudes/list-solicitudes';

import { RegistrarUsuario } from './pages/gestion-usuarios/registrar-usuario/registrar-usuario';
import { AdministrarUsuario } from './pages/gestion-usuarios/administrar-usuario/administrar-usuario';

import { RegistrarEspacio } from './pages/gestor-espacios/registrar-espacio/registrar-espacio';
import { AdministrarEspacios } from './pages/gestor-espacios/administrar-espacios/administrar-espacios';

import { RegistrarRecurso } from './pages/gestor-recursos/registrar-recurso/registrar-recurso';
import { AdministrarRecursos } from './pages/gestor-recursos/administrar-recursos/administrar-recursos';

import { GestionCarreras } from './pages/gestion-carreras/gestion-carreras';


export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.component')
        .then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },


  /* =========================
     SOLICITUDES
     ========================= */

  {
    path: 'solicitud/nueva',
    component: Nueva,
    canActivate: [authGuard]
  },

  {
    path: 'solicitud/mis-solicitudes',
    component: MisSolicitudes,
    canActivate: [authGuard]
  },

  {
    path: 'solicitudes',
    component: ListSolicitudes,
    canActivate: [adminGuard]
  },


  /* =========================
     AGENDA Y RESERVAS
     ========================= */

  {
    path: 'agenda',
    loadComponent: () =>
      import('./pages/calendario/calendario.component')
        .then(m => m.CalendarioComponent)
  },

  {
    path: 'reservas-todas',
    loadComponent: () =>
      import('./pages/gestor-reservas/gestor-reservas.component')
        .then(m => m.GestorReservasComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'reservas-anteriores',
    loadComponent: () =>
      import('./pages/gestor-reservas/reservas-anteriores/reservas-anteriores.component')
        .then(m => m.ReservasAnterioresComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'mis-reservas',
    loadComponent: () =>
      import('./pages/calendario/calendario.component')
        .then(m => m.CalendarioComponent),
    canActivate: [authGuard]
  },


  /* =========================
     USUARIOS
     ========================= */

  {
    path: 'gestionUsuarios',
    loadComponent: () =>
      import('./pages/gestion-usuarios/gestion-usuarios')
        .then(m => m.GestionUsuarios),
    canActivate: [adminGuard]
  },

  {
    path: 'gestionUsuarios/registrarUsuario',
    component: RegistrarUsuario,
    canActivate: [adminGuard]
  },

  {
    path: 'gestionUsuarios/administracionUsuarios',
    component: AdministrarUsuario,
    canActivate: [adminGuard]
  },


  /* =========================
     CARRERAS
     ========================= */

  {
    path: 'gestion-carreras',
    component: GestionCarreras,
    canActivate: [adminGuard]
  },

  {
    path: 'gestion-carreras/registrar-carrera',
    loadComponent: () =>
      import('./pages/gestion-carreras/registrar-carrera/registrar-carrera')
        .then(m => m.RegistrarCarrera),
    canActivate: [adminGuard]
  },

  {
    path: 'gestion-carreras/administrar-carreras',
    loadComponent: () =>
      import('./pages/gestion-carreras/administrar-carreras/administrar-carreras')
        .then(m => m.AdministrarCarreras),
    canActivate: [adminGuard]
  },


  /* =========================
     COMISIONES
     ========================= */

  {
    path: 'gestion-comisiones',
    redirectTo: 'gestion-comisiones/administrar-comisiones',
    pathMatch: 'full'
  },

  {
    path: 'gestion-comisiones/administrar-comisiones',
    loadComponent: () =>
      import('./pages/gestion-comisiones/administrar-comisiones/administrar-comisiones')
        .then(m => m.AdministrarComisiones),

    // ADMIN y PROFESOR pueden consultar esta pantalla
    canActivate: [authGuard]
  },

  {
    path: 'gestion-comisiones/registrar-comision',
    loadComponent: () =>
      import('./pages/gestion-comisiones/registrar-comision/registrar-comision')
        .then(m => m.RegistrarComision),

    // Registrar sigue siendo exclusivo de ADMIN
    canActivate: [adminGuard]
  },


  /* =========================
     ESPACIOS
     ========================= */

  {
    path: 'espacios',
    redirectTo: 'espacios/administrar',
    pathMatch: 'full'
  },

  {
    path: 'espacios/registrar',
    component: RegistrarEspacio,
    canActivate: [adminGuard]
  },

  {
    path: 'espacios/administrar',
    component: AdministrarEspacios,
    canActivate: [adminGuard]
  },


  /* =========================
     RECURSOS
     ========================= */

  {
    path: 'recursos',
    redirectTo: 'recursos/administrar',
    pathMatch: 'full'
  },

  {
    path: 'recursos/registrar',
    component: RegistrarRecurso,
    canActivate: [adminGuard]
  },

  {
    path: 'recursos/administrar',
    component: AdministrarRecursos,
    canActivate: [adminGuard]
  },


  /* =========================
     OTRAS PÁGINAS
     ========================= */

  {
    path: 'leer-mas',
    loadComponent: () =>
      import('./pages/leer-mas/leer-mas')
        .then(m => m.LeerMas)
  },

  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon')
        .then(m => m.ComingSoon)
  },


  /* =========================
     RUTA DESCONOCIDA
     ========================= */

  {
    path: '**',
    redirectTo: '/home'
  }

];