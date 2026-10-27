import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Solicitud as SolicitudService } from '../../services/solicitud';
import { AuthService } from '../../auth/service/auth-service';

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
  private auth = inject(AuthService);

  usuario = computed(() => this.auth.infoUsuario());

  // Simulamos solicitudes pendientes - después se conectará con el servicio real
  private pendingCount = signal<number>(0);

  get pendingSolicitudes(): number {
    return this.pendingCount();
  }

  constructor() {
    this.solicitudService.getSolicitudes().subscribe((sols) => {
      if (!sols) {
        this.pendingCount.set(0);
        return;
      }
      const pending = sols.filter((s) => s.estado === 'PENDIENTE').length;
      this.pendingCount.set(pending);
    });
  }

  tieneRol(rolEsperado: 'ADMIN' | 'PROFESOR'): boolean {
    return (this.usuario()?.roles ?? []).some((rol) => {
      const normalizado = rol.toUpperCase().replace(/^ROLE_/, '');
      return normalizado === rolEsperado ||
        (rolEsperado === 'ADMIN' && normalizado === 'ADMINISTRADOR');
    });
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