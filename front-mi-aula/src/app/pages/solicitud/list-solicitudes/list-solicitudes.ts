
import { Component, OnInit, computed, inject, signal, WritableSignal } from '@angular/core';
import { Solicitud as SolicitudService } from '../../../services/solicitud';
import type { SolicitudData as SolicitudModel } from '../../../services/solicitud';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-list-solicitudes',
  imports: [RouterLink],
  templateUrl: './list-solicitudes.html',
  styleUrls: ['./list-solicitudes.css'],
})
export class ListSolicitudes implements OnInit {
  private solicitudService = inject(SolicitudService);
  private usuarioService = inject(UsuarioService);
  private esAdministrador = signal(false);
  errorMensaje = signal<string | null>(null);
  cargando = signal(false);

  // Señales públicas para usar en la plantilla separadas por estado
  solicitudes: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  pendientes: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  aprobadas: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  rechazadas: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  otras: WritableSignal<SolicitudModel[]> = signal<SolicitudModel[]>([]);
  pestanaActiva = signal<'pendientes' | 'aprobadas' | 'rechazadas' | 'otras'>('pendientes');
  paginaActual = signal(1);
  limite = 8;
  solicitudesActivas = computed(() => this.obtenerSolicitudesPorPestana(this.pestanaActiva()));
  totalPaginas = computed(() => Math.ceil(this.solicitudesActivas().length / this.limite));
  solicitudesPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.limite;
    return this.solicitudesActivas().slice(inicio, inicio + this.limite);
  });

  // Señal privada para la solicitud seleccionada (usada por los helpers siguientes)
  private _selected: WritableSignal<SolicitudModel | null> = signal<SolicitudModel | null>(null);

  // Señal para editar el comentario de estado en la UI
  private _comentarioEditing: WritableSignal<string> = signal<string>('');
  private _isSavingComment: WritableSignal<boolean> = signal<boolean>(false);

  constructor() { }

  ngOnInit(): void {
    this.loadSolicitudes();
    this.usuarioService.me().subscribe({
      next: (usuario) => {
        this.esAdministrador.set(usuario.roles.some((rol) => rol.toLowerCase() === 'administrador'));
      },
      error: () => this.errorMensaje.set('No se pudo verificar el usuario administrador.'),
    });
  }

  // === Helpers y acciones de detalle (usados por la plantilla) ===
  selectedSolicitud(): SolicitudModel | null {
    return this._selected();
  }

  openDetails(s: SolicitudModel): void {
    this._selected.set(s);
    this._comentarioEditing.set(s.comentario_estado || '');
  }

  comentarioEditing(): string {
    return this._comentarioEditing();
  }

  isSavingComment(): boolean {
    return this._isSavingComment();
  }

  setComentarioEditing(v: string): void {
    this._comentarioEditing.set(v);
  }

  isAdmin(): boolean {
    return this.esAdministrador();
  }

  saveComentarioEstado(): void {
    const s = this._selected();
    if (!s || s.id == null) return;
    const idStr = String(s.id);
    const nuevo = this._comentarioEditing();
    this._isSavingComment.set(true);
    this.solicitudService.patchComentarioEstado(idStr, nuevo).subscribe({
      next: (updated) => {
        this._isSavingComment.set(false);
        // actualizar la solicitud seleccionada localmente
        const newS = { ...s, comentario_estado: updated.comentario_estado };
        this._selected.set(newS);
        this.updateLocalSolicitud(newS);
        this.errorMensaje.set(null);
      },
      error: (err) => {
        this.errorMensaje.set(this.obtenerMensajeError(err));
        this._isSavingComment.set(false);
      },
    });
  }

  // Aprobar la solicitud y guardar comentario de estado
  approveSolicitud(): void {
    this.changeEstadoConComentario('APROBADA');
  }

  // Rechazar la solicitud y guardar comentario de estado
  rejectSolicitud(): void {
    this.changeEstadoConComentario('RECHAZADA');
  }

  // Mostrar confirmación al usuario antes de acciones irreversibles
  confirmApprove(): void {
    const s = this._selected();
    if (!s) return;
    const ok = window.confirm('Esta acción aceptará la solicitud y no tiene vuelta atrás. ¿Deseás continuar?');
    if (ok) this.approveSolicitud();
  }

  confirmReject(): void {
    const s = this._selected();
    if (!s) return;
    const ok = window.confirm('Esta acción rechazará la solicitud y no tiene vuelta atrás. ¿Deseás continuar?');
    if (ok) this.rejectSolicitud();
  }

  private changeEstadoConComentario(estado: string): void {
    const s = this._selected();
    if (!s || s.id == null) return;
    const comentario = this._comentarioEditing();
    this._isSavingComment.set(true);
    const accion = estado === 'APROBADA'
      ? this.solicitudService.aprobarSolicitud(s.id, comentario)
      : this.solicitudService.rechazarSolicitud(s.id, comentario);
    accion.subscribe({
      next: (updated) => {
        this._isSavingComment.set(false);
        const newS = { ...updated, estado: updated.estado };
        this._selected.set(newS);
        this.updateLocalSolicitud(newS);
        this._comentarioEditing.set(newS.comentario_estado || '');
        this.errorMensaje.set(null);
      },
      error: (err) => {
        this.errorMensaje.set(this.obtenerMensajeError(err));
        this._isSavingComment.set(false);
      },
    });
  }

  private updateLocalSolicitud(updated: SolicitudModel): void {
    const all = this.solicitudes();
    const mapped = all.map((x) => (x.id === updated.id ? updated : x));
    this.solicitudes.set(mapped);
    this.categorizeSolicitudes(mapped);
  }

  closeDetails(): void {
    this._selected.set(null);
  }

  seleccionarPestana(pestana: 'pendientes' | 'aprobadas' | 'rechazadas' | 'otras'): void {
    this.pestanaActiva.set(pestana);
    this.paginaActual.set(1);
  }

  siguientePagina(): void {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.update(pagina => pagina + 1);
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual() > 1) {
      this.paginaActual.update(pagina => pagina - 1);
    }
  }

  loadSolicitudes(): void {
    this.cargando.set(true);
    this.errorMensaje.set(null);
    this.solicitudService.getSolicitudesAdministracion().subscribe({
      next: (data) => {
        this.solicitudes.set(data);
        this.categorizeSolicitudes(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.errorMensaje.set(this.obtenerMensajeError(err));
        this.cargando.set(false);
      },
    });
  }

  private categorizeSolicitudes(data: SolicitudModel[]): void {
    const pendientes: SolicitudModel[] = [];
    const aprobadas: SolicitudModel[] = [];
    const rechazadas: SolicitudModel[] = [];
    const otras: SolicitudModel[] = [];

    for (const s of data) {
      const norm = s.estado === 'APROBADA' ? 'aprobada' : s.estado.toLowerCase();

      if (norm.includes('pend')) {
        pendientes.push(s);
      } else if (norm.includes('aprob')) {
        aprobadas.push(s);
      } else if (norm.includes('rech')) {
        rechazadas.push(s);
      } else {
        otras.push(s);
      }
    }

    this.pendientes.set(pendientes);
    this.aprobadas.set(aprobadas);
    this.rechazadas.set(rechazadas);
    this.otras.set(otras);
    this.paginaActual.set(1);
  }

  private obtenerSolicitudesPorPestana(pestana: 'pendientes' | 'aprobadas' | 'rechazadas' | 'otras'): SolicitudModel[] {
    return {
      pendientes: this.pendientes(),
      aprobadas: this.aprobadas(),
      rechazadas: this.rechazadas(),
      otras: this.otras(),
    }[pestana];
  }

  private obtenerMensajeError(error: { error?: unknown; message?: string }): string {
    const body = error?.error;
    if (typeof body === 'string' && body.trim()) return body;
    if (body && typeof body === 'object') {
      const values = Object.values(body as Record<string, unknown>)
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
      if (values.length > 0) return values.join(' ');
    }
    return error?.message || 'No se pudo completar la operación. Intentá nuevamente.';
  }

   // Ejemplo de helper para formatear la fecha 
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