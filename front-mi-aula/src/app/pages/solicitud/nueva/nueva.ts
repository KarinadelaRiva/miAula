import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitud as SolicitudService } from '../../../services/solicitud';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { EspacioService } from '../../../services/espacio-service/espacio-service';
import { Comision, ComisionService } from '../../../services/comision-service/comision-service';
import { Espacio } from '../../../models/espacio';
import { ReservaModificable, ReservaService as ReservaApiService } from '../../../services/reserva.service';

@Component({
  selector: 'app-nueva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva.html',
  styleUrl: './nueva.css',
})
export class Nueva implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private solicitudService = inject(SolicitudService);
  private usuarioService = inject(UsuarioService);
  private espacioService = inject(EspacioService);
  private comisionService = inject(ComisionService);
  private reservaApiService = inject(ReservaApiService);

  form!: FormGroup;
  espacios: Espacio[] = [];
  comisiones: Comision[] = [];
  reservasModificables: ReservaModificable[] = [];
  cargandoReservas = false;
  fechaMinima = '';
  fechaFinMinima = '';
  private fechaMinimaNueva = '';
  private fechaFinMinimaNueva = '';
  loading = false;
  mensaje: string | null = null;
  error: string | null = null;

  ngOnInit() {
    const hoy = new Date();
    this.fechaMinima = this.toDateInputValue(hoy);
    this.fechaMinimaNueva = this.fechaMinima;
    hoy.setDate(hoy.getDate() + 1);
    this.fechaFinMinima = this.toDateInputValue(hoy);
    this.fechaFinMinimaNueva = this.fechaFinMinima;

    this.form = this.fb.group({
      reserva_original_id: [null],
      comentario_profesor: [''],
      dia_semana: ['LUNES', [Validators.required]],
      fecha_inicio: ['', [Validators.required, this.fechaNoAnteriorAHoy]],
      fecha_fin: ['', [Validators.required, this.fechaPosteriorAHoy]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      nuevo_espacio_id: [null, [Validators.required]],
      comision_id: [null, [Validators.required]]
    }, {
      validators: [this.rangoFechasValido, this.rangoHorasValido],
    });

    this.usuarioService.me().subscribe({
      next: () => {
        this.cargarEspacios();
        this.cargarComisionesDelProfesor();
        this.cargarReservasModificables();
      },
      error: () => this.router.navigate(['/login']),
    });
  }

  get nombreMateriaSeleccionada(): string {
    const comisionId = Number(this.form?.get('comision_id')?.value);
    return this.comisiones.find((comision) => comision.id === comisionId)?.materiaNombre ?? '';
  }

  private readonly fechaNoAnteriorAHoy: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
    control.value && control.value < this.fechaMinima ? { fechaAnteriorAHoy: true } : null;

  private readonly fechaPosteriorAHoy: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
    control.value && control.value <= this.fechaMinimaNueva ? { fechaNoPosteriorAHoy: true } : null;

  private readonly rangoFechasValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fechaInicio = control.get('fecha_inicio')?.value;
    const fechaFin = control.get('fecha_fin')?.value;
    return fechaInicio && fechaFin && fechaInicio >= fechaFin ? { rangoFechasInvalido: true } : null;
  };

  private readonly rangoHorasValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const horaInicio = control.get('hora_inicio')?.value;
    const horaFin = control.get('hora_fin')?.value;
    return horaInicio && horaFin && horaInicio >= horaFin ? { rangoHorasInvalido: true } : null;
  };

  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private sumarDias(fecha: string, dias: number): string {
    const [year, month, day] = fecha.split('-').map(Number);
    return this.toDateInputValue(new Date(year, month - 1, day + dias));
  }

  private maxFecha(...fechas: string[]): string {
    return fechas.reduce((mayor, fecha) => fecha > mayor ? fecha : mayor);
  }

  actualizarFechaFinMinima(): void {
    const fechaInicio = this.form.get('fecha_inicio')?.value;
    this.fechaFinMinima = fechaInicio
      ? this.maxFecha(this.fechaFinMinimaNueva, this.sumarDias(fechaInicio, 1))
      : this.fechaFinMinimaNueva;
  }

  onReservaOriginalChange(): void {
    const reserva = this.reservaOriginalSeleccionada();

    if (!reserva) {
      this.fechaMinima = this.fechaMinimaNueva;
      this.fechaFinMinima = this.fechaFinMinimaNueva;
      this.form.patchValue({
        nuevo_espacio_id: null,
        comision_id: this.comisiones[0]?.id ?? null,
        dia_semana: 'LUNES',
        fecha_inicio: '',
        fecha_fin: '',
        hora_inicio: '',
        hora_fin: '',
      });
      return;
    }

    this.fechaMinima = this.fechaMinimaNueva;
    const fechaInicio = this.fechaMinima;
    const fechaInicioReserva = this.maxFecha(reserva.fechaInicio, fechaInicio);
    this.fechaFinMinima = this.maxFecha(
      this.fechaFinMinimaNueva,
      this.sumarDias(fechaInicioReserva, 1)
    );
    const fechaFin = this.maxFecha(reserva.fechaFin, this.fechaFinMinima);

    this.form.patchValue({
      nuevo_espacio_id: reserva.espacioId,
      comision_id: reserva.comisionId,
      dia_semana: reserva.diaSemana,
      fecha_inicio: fechaInicioReserva,
      fecha_fin: fechaFin,
      hora_inicio: reserva.horaInicio,
      hora_fin: reserva.horaFin,
    });
  }

  private reservaOriginalSeleccionada(): ReservaModificable | null {
    const id = this.form.get('reserva_original_id')?.value;
    if (id == null || String(id).trim() === '') return null;
    return this.reservasModificables.find((reserva) => reserva.id === Number(id)) ?? null;
  }

  etiquetaReserva(reserva: ReservaModificable): string {
    return `${reserva.nombreComision} — ${reserva.nombreEspacio}, ${reserva.diaSemana} `
      + `${reserva.horaInicio}-${reserva.horaFin} (${reserva.fechaInicio} - ${reserva.fechaFin})`;
  }

  private cargarEspacios() {
    this.espacioService.getAll().subscribe({
      next: (espacios) => {
        this.espacios = espacios.filter((espacio) => espacio.activo);
      },
      error: () => {
        this.error = 'No se pudieron cargar los espacios. Intentá nuevamente más tarde.';
      },
    });
  }

  private cargarComisionesDelProfesor() {
    this.comisionService.getAll().subscribe({
      next: (comisiones) => {
        this.comisiones = comisiones.filter((comision) => comision.activo);
        if (this.comisiones.length > 0 && !this.form.value.comision_id) {
          this.form.patchValue({ comision_id: this.comisiones[0].id });
        }
      },
      error: () => {
        this.error = 'No se pudieron cargar tus comisiones. Intentá nuevamente más tarde.';
      },
    });
  }

  private cargarReservasModificables(): void {
    this.cargandoReservas = true;
    this.reservaApiService.getMisReservasModificables().subscribe({
      next: (reservas) => {
        this.reservasModificables = reservas;
        this.cargandoReservas = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus reservas actuales o futuras.';
        this.cargandoReservas = false;
      },
    });
  }

  onSubmit() {
    this.mensaje = null;
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.getRawValue();
    const solicitud = {
      reservaOriginalId: form.reserva_original_id == null || String(form.reserva_original_id).trim() === ''
        ? null
        : Number(form.reserva_original_id),
      nuevoEspacioId: Number(form.nuevo_espacio_id),
      fechaInicio: form.fecha_inicio,
      fechaFin: form.fecha_fin,
      horaInicio: form.hora_inicio,
      horaFin: form.hora_fin,
      comentarioSolicitante: form.comentario_profesor?.trim() || null,
      comisionId: Number(form.comision_id),
      diaSemana: form.dia_semana,
      recursos: [],
    };
    this.loading = true;
    const enviarSolicitud = solicitud.reservaOriginalId == null
      ? this.solicitudService.createNuevaSolicitud(solicitud)
      : this.solicitudService.createModificacionSolicitud(solicitud);
    enviarSolicitud.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/solicitud/mis-solicitudes']);
      },
      error: (err) => {
        this.loading = false;
        this.error = this.mensajeError(err);
      },
    });
  }

  private mensajeError(error: {
    error?: unknown;
    message?: string;
  }): string {
    const respuesta = error?.error;
    if (typeof respuesta === 'string' && respuesta.trim()) {
      return respuesta;
    }

    if (respuesta && typeof respuesta === 'object') {
      const datos = respuesta as Record<string, unknown>;
      const mensaje = datos['mensaje'] ?? datos['message'];
      if (typeof mensaje === 'string' && mensaje.trim()) {
        return mensaje;
      }

      const errores = Object.values(datos).filter(
        (valor): valor is string => typeof valor === 'string' && valor.trim().length > 0
      );
      if (errores.length > 0) {
        return errores.join(' ');
      }
    }

    return error?.message || 'No se pudo enviar la solicitud. Intentá nuevamente.';
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}
