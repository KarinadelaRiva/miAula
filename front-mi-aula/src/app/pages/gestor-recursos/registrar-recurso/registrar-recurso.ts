import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
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

  error = signal('');
  exito = signal('');

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    quantity: [null as number | null, [Validators.required, Validators.min(0)]],
  });

  registrarRecurso() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set('');
    this.exito.set('');

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
        });
        this.exito.set('Recurso registrado correctamente.');
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.error.set(
            'El backend rechazó la solicitud por falta de autenticación. La sesión actual no envía un token válido.'
          );
          return;
        }

        if (error.status === 400) {
          this.error.set('El backend rechazó los datos. Revisá el código, nombre, descripción y cantidad.');
          return;
        }

        if (error.status === 0) {
          this.error.set(
            'No se puede conectar con el backend en localhost:8080. Verificá que la API esté iniciada.'
          );
          return;
        }

        this.error.set('No se pudo registrar el recurso. Revisá la conexión con el backend e intentá nuevamente.');
      },
    });
  }
}
