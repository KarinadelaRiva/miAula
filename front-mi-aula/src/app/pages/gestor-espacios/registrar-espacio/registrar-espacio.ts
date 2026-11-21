import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EspacioCreateDto } from '../../../models/espacioCreateDto';
import { EspacioService } from '../../../services/espacio-service/espacio-service';
import { CODIGO_PATTERN, normalizarCodigo } from '../../../shared/codigo';

@Component({
  selector: 'app-registrar-espacio',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-espacio.html',
  styleUrl: './registrar-espacio.css',
})
export class RegistrarEspacio {
  private fb = inject(FormBuilder);
  private espacioService = inject(EspacioService);

  error = signal('');
  exito = signal('');

  form = this.fb.group({
    codigo: ['', [Validators.required, Validators.pattern(CODIGO_PATTERN)]],
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    capacidad: [null as number | null, [Validators.required, Validators.min(1)]],
    nroPiso: [null as number | null, [Validators.required]],
  });

  registrarEspacio() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set('');
    this.exito.set('');

    const value = this.form.getRawValue();
    const payload: EspacioCreateDto = {
      codigo: normalizarCodigo(value.codigo || ''),
      nombre: (value.nombre || '').trim(),
      capacidad: Number(value.capacidad),
      nroPiso: Number(value.nroPiso),
    };

    this.espacioService.crear(payload).subscribe({
      next: () => {
        this.form.reset({
          codigo: '',
          nombre: '',
          capacidad: null,
          nroPiso: null,
        });
        this.exito.set('Espacio registrado correctamente.');
      },
      error: () => {
        this.error.set('No se pudo registrar el espacio.');
      },
    });
  }
}
