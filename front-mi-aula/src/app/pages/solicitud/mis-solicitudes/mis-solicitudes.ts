import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Solicitud as SolicitudModel } from '../../../services/solicitud';
import { Solicitud as SolicitudService } from '../../../services/solicitud';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { RouterLink } from "@angular/router";
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-mis-solicitudes',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-solicitudes.html',
  styleUrls: ['./mis-solicitudes.css'],
})
export class MisSolicitudes implements OnInit {
  private solicitudService = inject(SolicitudService);
  private usuarioService = inject(UsuarioService);
  private usuarioLogueadoId = signal<number | null>(null);

  // Signal que contendrá el array de solicitudes para renderizar en el template
  solicitudes: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  pendientes: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  aprobadas: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  rechazadas: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  otras: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  pestanaActiva = signal<'pendientes' | 'aprobadas' | 'rechazadas' | 'otras'>('pendientes');
  // Signal para la solicitud seleccionada y mostrar modal
  selectedSolicitud: WritableSignal<SolicitudModel | null> = signal<SolicitudModel | null>(null);
  // Signal para indicar que se está procesando la cancelación
  isCancelling: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  solicitudesActivas(): SolicitudModel[] {
    return {
      pendientes: this.pendientes(),
      aprobadas: this.aprobadas(),
      rechazadas: this.rechazadas(),
      otras: this.otras(),
    }[this.pestanaActiva()];
  }

  seleccionarPestana(pestana: 'pendientes' | 'aprobadas' | 'rechazadas' | 'otras'): void {
    this.pestanaActiva.set(pestana);
  }

  // Carga las solicitudes desde el servidor y filtra las del usuario logueado
  loadSolicitudes(): void {
    this.usuarioService.me().pipe(
      switchMap((usuario) => {
        this.usuarioLogueadoId.set(usuario.id);
        return this.solicitudService.getSolicitudes();
      })
    ).subscribe({
      next: (data) => {
        const userId = this.usuarioLogueadoId();
        const filtered = data.filter((s) => String(s.usuario_id) === String(userId));

          // Ordenar por fecha_hora_solicitud descendente (más reciente primero)
        const parseValue = (item: any): number => {
          //Intentar parsear fecha_hora_solicitud
          if (item?.fecha_hora_solicitud) {
            const d = Date.parse(item.fecha_hora_solicitud);
            if (!isNaN(d)) return d;
          }
          
          return 0;
        };

        filtered.sort((a, b) => {
          const va = parseValue(a);
          const vb = parseValue(b);
          return vb - va; // descendente: más reciente primero
        });

        this.solicitudes.set(filtered);
        this.categorizeSolicitudes(filtered);
      },
      error: (err) => {
        console.error('Error cargando solicitudes', err);
      },
    });
  }

  private categorizeSolicitudes(data: SolicitudModel[]): void {
    const pendientes: SolicitudModel[] = [];
    const aprobadas: SolicitudModel[] = [];
    const rechazadas: SolicitudModel[] = [];
    const otras: SolicitudModel[] = [];

    for (const solicitud of data) {
      const estado = String(solicitud.estado ?? '').toLowerCase();

      if (estado.includes('pend')) {
        pendientes.push(solicitud);
      } else if (estado.includes('aprob')) {
        aprobadas.push(solicitud);
      } else if (estado.includes('rech')) {
        rechazadas.push(solicitud);
      } else {
        otras.push(solicitud);
      }
    }

    this.pendientes.set(pendientes);
    this.aprobadas.set(aprobadas);
    this.rechazadas.set(rechazadas);
    this.otras.set(otras);
  }

  openDetails(solicitud: SolicitudModel): void {
    this.selectedSolicitud.set(solicitud);
  }

  closeDetails(): void {
    this.selectedSolicitud.set(null);
  }

  // Cancela la solicitud: actualiza el estado a 'CANCELADA' y persiste en el servidor
  cancelarSolicitud(solicitud: SolicitudModel | null): void {
  if (!solicitud) return;

  // Confirmación antes de cancelar
  const confirmado = window.confirm('¿Estás seguro que deseas cancelar esta solicitud?');
  if (!confirmado) return;

    const usuarioId = this.usuarioLogueadoId();
    const currentUserIdStr = usuarioId === null ? '' : String(usuarioId);

    // Prevención por si ya no está en estado PENDIENTE
    if (solicitud.estado !== 'PENDIENTE') return;

    // Validar que exista id de solicitud y id de usuario como string antes de continuar
    if (solicitud.id == null || currentUserIdStr === '') {
      console.warn('Faltan datos para cancelar la solicitud');
      return;
    }

    this.isCancelling.set(true);

    this.solicitudService.cancelarSolicitudIfAllowed(String(solicitud.id), solicitud, currentUserIdStr).subscribe({
      next: (updated) => {
        // actualizar la lista local (refrescar desde servidor para asegurarnos de consistencia)
        this.loadSolicitudes();

        // dejar de mostrar el modal
        this.isCancelling.set(false);
        this.closeDetails();
      },
      error: (err) => {
        console.error('Error cancelando solicitud', err);
        this.isCancelling.set(false);
      },
    });
  }

  

  // Ejemplo de helper para formatear la fecha (puedes personalizarlo)
  formatFecha(fechaIso?: string): string {
    if (!fechaIso) return '';
    try {
      const d = new Date(fechaIso);
      // Devolver solo la parte de fecha (sin hora)
      return d.toLocaleDateString();
    } catch {
      return fechaIso;
    }
  }

  // Formatea una cadena de hora a HH:MM. Acepta formatos como 'HH:MM', 'HH:MM:SS',
  // o una parte horaria de un ISO datetime. Devuelve '-' si no hay valor.
  formatHora(hora?: string): string {
    if (!hora) return '-';

    // Si viene un ISO datetime, intentar extraer la parte de hora
    const isoMatch = hora.match(/(\d{2}:\d{2})(:\d{2})?/);
    if (isoMatch) {
      return isoMatch[1];
    }

    // Si viene como número o texto con sólo horas/minutos
    const hmMatch = hora.match(/^(\d{1,2})([:.])(\d{2})$/);
    if (hmMatch) {
      const hh = hmMatch[1].padStart(2, '0');
      const mm = hmMatch[3];
      return `${hh}:${mm}`;
    }

    // Fallback: intentar parsear como Date
    const d = new Date(hora);
    if (!isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      return `${hh}:${mm}`;
    }

    // Si no se pudo formatear, devolver el valor crudo
    return hora;
  }
}
