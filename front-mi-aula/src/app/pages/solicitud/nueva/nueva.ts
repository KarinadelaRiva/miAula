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

  form!: FormGroup;
  espacios: Espacio[] = [];
  comisiones: Comision[] = [];
  fechaMinima = '';
  fechaFinMinima = '';
  loading = false;
  mensaje: string | null = null;
  error: string | null = null;

  ngOnInit() {
    const hoy = new Date();
    this.fechaMinima = this.toDateInputValue(hoy);
    hoy.setDate(hoy.getDate() + 1);
    this.fechaFinMinima = this.toDateInputValue(hoy);

    this.form = this.fb.group({
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
      },
      error: () => this.router.navigate(['/login']),
    });
  }

  private readonly fechaNoAnteriorAHoy: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
    control.value && control.value < this.fechaMinima ? { fechaAnteriorAHoy: true } : null;

  private readonly fechaPosteriorAHoy: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
    control.value && control.value <= this.fechaMinima ? { fechaNoPosteriorAHoy: true } : null;

  private readonly rangoFechasValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fechaInicio = control.get('fecha_inicio')?.value;
    const fechaFin = control.get('fecha_fin')?.value;
    return fechaInicio && fechaFin && fechaInicio > fechaFin ? { rangoFechasInvalido: true } : null;
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

  onSubmit() {
    this.mensaje = null;
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;

    const solicitud = {
      nuevoEspacioId: Number(form.nuevo_espacio_id),
      fechaInicio: form.fecha_inicio,
      fechaFin: form.fecha_fin,
      horaInicio: form.hora_inicio,
      horaFin: form.hora_fin,
      comentarioSolicitante: form.comentario_profesor?.trim() || null,
      comisionId: Number(form.comision_id),
      diaSemana: form.dia_semana,
    };
    this.loading = true;
    this.solicitudService.createNuevaSolicitud(solicitud).subscribe({
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
