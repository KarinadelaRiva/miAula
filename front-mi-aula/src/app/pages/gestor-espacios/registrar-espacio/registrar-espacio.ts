import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EspacioCreateDto } from '../../../models/espacioCreateDto';
import { EspacioService } from '../../../services/espacio-service/espacio-service';

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
    code: ['', [Validators.required, Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.maxLength(25)]],
    capacity: [null as number | null, [Validators.required, Validators.min(1)]],
    floor_number: [null as number | null, [Validators.required, Validators.min(0)]],
    enabled: [true, [Validators.required]],
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
      code: (value.code || '').trim().toUpperCase(),
      name: (value.name || '').trim(),
      capacity: Number(value.capacity),
      floor_number: Number(value.floor_number),
    };

    this.espacioService.crear(payload).subscribe({
      next: () => {
        this.form.reset({
          code: '',
          name: '',
          capacity: null,
          floor_number: null,
        });
        this.exito.set('Espacio registrado correctamente.');
      },
      error: () => {
        this.error.set('No se pudo registrar el espacio.');
      },
    });
  }
}
