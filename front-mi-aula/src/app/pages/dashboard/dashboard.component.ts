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

  // Simulamos solicitudes pendientes - después se conectará con el servicio real
  private pendingCount = signal<number>(0);

  get pendingSolicitudes(): number {
    return this.pendingCount();
  }

  constructor() {
    this.usuarioService.me().subscribe({
      next: (usuario) => this.usuario.set(usuario),
      error: (error) => console.error('No se pudo obtener el usuario:', error),
    });

    this.solicitudService.getSolicitudes().subscribe((sols) => {
      if (!sols) {
        this.pendingCount.set(0);
        return;
      }
      const pending = sols.filter((s) => s.estado === 'PENDIENTE').length;
      this.pendingCount.set(pending);
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