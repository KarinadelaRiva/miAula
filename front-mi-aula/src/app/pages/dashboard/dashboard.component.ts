import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Solicitud as SolicitudService } from '../../services/solicitud';
import { UsuarioService } from '../../services/usuario-service/usuario-service';
import { UsuarioResponseDto } from '../../models/usuarioResponseDto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private router = inject(Router);
  private solicitudService = inject(SolicitudService);
  private usuarioService = inject(UsuarioService);

  usuario = signal<UsuarioResponseDto | null>(null);

  private pendingCount = signal<number>(0);

  get pendingSolicitudes(): number {
    return this.pendingCount();
  }

  constructor() {
    this.usuarioService.me().subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        if (this.tieneRol('administrador')) {
          this.cargarSolicitudesPendientes();
        }
      },
      error: (error) => console.error('No se pudo obtener el usuario:', error),
    });
  }

  private cargarSolicitudesPendientes(): void {
    this.solicitudService.getSolicitudesAdministracion().subscribe({
      next: (solicitudes) => {
        this.pendingCount.set(solicitudes.filter((solicitud) => solicitud.estado === 'PENDIENTE').length);
      },
      error: (error) => console.error('No se pudieron cargar las solicitudes pendientes:', error),
    });
  }

  tieneRol(rolEsperado: 'administrador' | 'profesor'): boolean {
    return (this.usuario()?.roles ?? []).includes(rolEsperado);
  }

  navigateTo(path: string | null) {
    // Si el path es null, vacío o no implementado, ir a coming-soon
    if (!path || path === '' || path === '#') {
      this.router.navigate(['/coming-soon']);
      return;
    }
    this.router.navigate([path]);
  }
}