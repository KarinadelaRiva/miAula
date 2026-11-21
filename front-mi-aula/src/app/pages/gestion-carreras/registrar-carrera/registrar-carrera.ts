import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

@Component({
  selector: 'app-registrar-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-carrera.html',
  styleUrl: './registrar-carrera.css'
})
export class RegistrarCarrera {

  codigo = '';
  nombre = '';

  guardando = false;
  mensajeError = '';
  mensajeExito = '';

  private apiUrl = 'http://localhost:8080/carreras';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  guardarCarrera(): void {

    this.mensajeError = '';
    this.mensajeExito = '';

    const codigoLimpio = normalizarCodigo(this.codigo);

    const nombreLimpio =
      this.nombre
        .trim();

    if (!this.codigo) {

      this.mensajeError =
        'Ingresá el código de la carrera.';

      return;
    }

    if (!esCodigoValido(this.codigo)) {

      this.mensajeError =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }

    if (!nombreLimpio) {

      this.mensajeError =
        'Ingresá el nombre de la carrera.';

      return;
    }

    if (nombreLimpio.length > 50) {

      this.mensajeError =
        'El nombre de la carrera no puede superar los 50 caracteres.';

      return;
    }

    this.guardando = true;

    const nuevaCarrera = {
      codigo: codigoLimpio,
      nombre: nombreLimpio
    };

    this.http.post(
      this.apiUrl,
      nuevaCarrera
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'Carrera registrada correctamente:',
          respuesta
        );

        this.guardando = false;

        this.mensajeExito =
          '¡Carrera registrada correctamente!';

        this.codigo = '';
        this.nombre = '';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error registrando carrera:',
          error
        );

        this.guardando = false;

        if (error.status === 409) {

          this.mensajeError =
            error.error?.mensaje
            ?? 'Ya existe una carrera con ese código.';

        } else if (error.status === 400) {

          this.mensajeError =
            'Revisá los datos ingresados.';

        } else {

          this.mensajeError =
            'No se pudo registrar la carrera.';

        }

        this.cdr.detectChanges();
      }

    });
  }

  cancelar(): void {

    this.router.navigate([
      '/gestion-carreras/administrar-carreras'
    ]);
  }
}