import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Comision, ComisionService } from '../../../services/comision-service/comision-service';
import { Espacio } from '../../../models/espacio';
import { EspacioService } from '../../../services/espacio-service/espacio-service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { ReservaDirectaCreateRequest, ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-nueva-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-reserva.component.html',
  styleUrl: '../../solicitud/nueva/nueva.css'
})
export class NuevaReservaComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly comisionService = inject(ComisionService);
  private readonly espacioService = inject(EspacioService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly reservaService = inject(ReservaService);

  form!: FormGroup;
  profesores: Usuario[] = [];
  comisiones: Comision[] = [];
  espacios: Espacio[] = [];
  loading = false;
  mostrarConfirmacion = false;
  error: string | null = null;
  fechaMinima = '';
  fechaFinMinima = '';
  private fechaMinimaNueva = '';
  private fechaFinMinimaNueva = '';

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaMinima = this.toDateInputValue(hoy);
    this.fechaMinimaNueva = this.fechaMinima;
    hoy.setDate(hoy.getDate() + 1);
    this.fechaFinMinima = this.toDateInputValue(hoy);
    this.fechaFinMinimaNueva = this.fechaFinMinima;

    this.form = this.fb.group({
      profesor_id: [null, [Validators.required]],
      comision_id: [null, [Validators.required]],
      nuevo_espacio_id: [null, [Validators.required]],
      dia_semana: ['LUNES', [Validators.required]],
      fecha_inicio: ['', [Validators.required, this.fechaNoAnteriorAHoy]],
      fecha_fin: ['', [Validators.required, this.fechaPosteriorAHoy]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      comentario: ['', [Validators.maxLength(1000)]]
    }, {
      validators: [this.rangoFechasValido, this.rangoHorasValido]
    });

    this.cargarProfesores();
    this.cargarComisiones();
    this.cargarEspacios();
  }

  get comisionesDisponibles(): Comision[] {
    const profesorId = Number(this.form?.get('profesor_id')?.value);
    if (!profesorId) {
      return [];
    }

    return this.comisiones.filter(comision =>
      comision.activo === true
      && comision.materiaActiva === true
      && comision.carreraActiva === true
      && Number(comision.profesorId) === profesorId
    );
  }

  get nombreMateriaSeleccionada(): string {
    return this.comisionSeleccionada?.materiaNombre ?? '';
  }

  get nombreCarreraSeleccionada(): string {
    return this.comisionSeleccionada?.carreraNombre ?? '';
  }

  get comisionSeleccionada(): Comision | undefined {
    const comisionId = Number(this.form?.get('comision_id')?.value);
    return this.comisionesDisponibles.find(comision => comision.id === comisionId);
  }

  get espacioSeleccionado(): Espacio | undefined {
    const espacioId = Number(this.form?.get('nuevo_espacio_id')?.value);
    return this.espacios.find(espacio => espacio.id === espacioId);
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

  onProfesorChange(): void {
    const primeraComision = this.comisionesDisponibles[0];
    this.form.patchValue({ comision_id: primeraComision?.id ?? null });
  }

  private cargarProfesores(): void {
    this.usuarioService.getAll().subscribe({
      next: usuarios => {
        this.profesores = usuarios.filter(usuario =>
          usuario.activo && usuario.roles.includes('profesor')
        );
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los profesores. Intentá nuevamente más tarde.';
        this.cdr.markForCheck();
      }
    });
  }

  private cargarComisiones(): void {
    this.comisionService.getAll().subscribe({
      next: comisiones => {
        this.comisiones = comisiones;
        if (this.form.get('profesor_id')?.value) {
          this.onProfesorChange();
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar las comisiones. Intentá nuevamente más tarde.';
        this.cdr.markForCheck();
      }
    });
  }

  private cargarEspacios(): void {
    this.espacioService.getAll().subscribe({
      next: espacios => {
        this.espacios = espacios.filter(espacio => espacio.activo);
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los espacios. Intentá nuevamente más tarde.';
        this.cdr.markForCheck();
      }
    });
  }

  onSubmit(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.mostrarConfirmacion = true;
    this.cdr.detectChanges();
  }

  cancelarConfirmacion(): void {
    if (!this.loading) {
      this.mostrarConfirmacion = false;
    }
  }

  confirmarCreacion(): void {
    if (this.loading || this.form.invalid) {
      return;
    }

    const form = this.form.getRawValue();
    const reserva: ReservaDirectaCreateRequest = {
      profesorId: Number(form.profesor_id),
      comisionId: Number(form.comision_id),
      espacioId: Number(form.nuevo_espacio_id),
      diaSemana: form.dia_semana,
      fechaInicio: form.fecha_inicio,
      fechaFin: form.fecha_fin,
      horaInicio: form.hora_inicio,
      horaFin: form.hora_fin,
      comentario: form.comentario?.trim() || null,
      recursos: []
    };

    this.loading = true;
    this.reservaService.crearReservaDirecta(reserva).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarConfirmacion = false;
        this.cdr.markForCheck();
        this.router.navigate(['/reservas-todas']);
      },
      error: err => {
        this.loading = false;
        this.mostrarConfirmacion = false;
        this.error = this.mensajeError(err);
        this.cdr.markForCheck();
      }
    });
  }

  private mensajeError(error: { error?: unknown; message?: string; statusText?: string }): string {
    const respuesta = error?.error;
    if (typeof respuesta === 'string' && respuesta.trim()) {
      return respuesta;
    }

    if (respuesta && typeof respuesta === 'object') {
      const datos = respuesta as Record<string, unknown>;
      for (const campo of ['mensaje', 'detail', 'message', 'error_description', 'error']) {
        const mensaje = datos[campo];
        if (typeof mensaje === 'string' && mensaje.trim()) {
          return mensaje;
        }
      }
      const errores = Object.values(datos).filter(
        (valor): valor is string => typeof valor === 'string' && valor.trim().length > 0
      );
      if (errores.length > 0) {
        return errores.join(' ');
      }
    }

    return error?.statusText || error?.message || 'No se pudo crear la reserva. Intentá nuevamente.';
  }

  cancelar(): void {
    this.router.navigate(['/reservas-todas']);
  }

  abrirAgendaPublica(): void {
    window.open(
      `${window.location.origin}/agenda`,
      '_blank',
      'noopener,noreferrer'
    );
  }
}
