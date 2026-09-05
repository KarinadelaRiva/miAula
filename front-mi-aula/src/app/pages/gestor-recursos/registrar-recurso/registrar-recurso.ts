import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecursoCreateDto } from '../../../models/recursoCreateDto';
import { RecursoService } from '../../../services/recurso-service/recurso-service';

@Component({
  selector: 'app-registrar-recurso',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-recurso.html',
  styleUrl: './registrar-recurso.css',
})
export class RegistrarRecurso {
  private fb = inject(FormBuilder);
  private recursoService = inject(RecursoService);

  error: string | null = null;
  exito: string | null = null;

  form = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    quantity: [null as number | null, [Validators.required, Validators.min(1)]],
    enabled: [true, [Validators.required]],
  });

  registrarRecurso() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = null;
    this.exito = null;

    const value = this.form.getRawValue();
    const payload: RecursoCreateDto = {
      code: (value.code || '').trim().toUpperCase(),
      name: (value.name || '').trim(),
      description: (value.description || '').trim(),
      quantity: Number(value.quantity),
    };

    this.recursoService.crear(payload).subscribe({
      next: () => {
        this.form.reset({
          code: '',
          name: '',
          description: '',
          quantity: null,
          enabled: true,
        });
        this.exito = 'Recurso registrado correctamente.';
      },
      error: () => {
        this.error = 'No se pudo registrar el recurso.';
      },
    });
  }
}
