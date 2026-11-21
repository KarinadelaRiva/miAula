import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

import {
  MateriaCreateDTO,
  MateriaService
} from '../../../services/materia-service/materia-service';


@Component({
  selector: 'app-registrar-materia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: 'registrar-materias.html',
  styleUrls: ['registrar-materias.css']
})
export class RegistrarMateria {

  // ============================================================
  // FORMULARIO
  // ============================================================

  codigo: string = '';
  nombre: string = '';

  guardando: boolean = false;


  // ============================================================
  // MENSAJES
  // ============================================================

  mensajeExito: string = '';
  mensajeError: string = '';


  constructor(
    private materiaService: MateriaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // ============================================================
  // REGISTRAR
  // ============================================================

  registrarMateria(): void {

    this.mensajeExito = '';
    this.mensajeError = '';


    if (!this.codigo) {

      this.mensajeError =
        'Ingresá el código de la materia.';

      return;
    }


    if (!esCodigoValido(this.codigo)) {

      this.mensajeError =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }


    if (!this.nombre.trim()) {

      this.mensajeError =
        'Ingresá el nombre de la materia.';

      return;
    }


    if (
      this.nombre
        .trim()
        .length > 50
    ) {

      this.mensajeError =
        'El nombre no puede superar los 50 caracteres.';

      return;
    }


    const dto: MateriaCreateDTO = {

      codigo: normalizarCodigo(this.codigo),

      nombre:
        this.nombre.trim()
    };


    this.guardando = true;


    this.materiaService
      .crear(dto)
      .subscribe({

        next: () => {

          this.guardando = false;

          this.mensajeExito =
            'Materia registrada correctamente.';

          this.limpiarFormulario();

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error registrando materia:',
            error
          );

          this.guardando = false;

          this.mensajeError =
            this.obtenerMensajeError(
              error
            );

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // LIMPIAR
  // ============================================================

  limpiarFormulario(): void {

    this.codigo = '';
    this.nombre = '';
  }


  // ============================================================
  // CANCELAR
  // ============================================================

  cancelar(): void {

    this.router.navigate([
      '/gestion-materia/administrar-materias'
    ]);
  }


  // ============================================================
  // ERRORES
  // ============================================================

  private obtenerMensajeError(
    error: HttpErrorResponse
  ): string {

    if (
      typeof error.error === 'string' &&
      error.error.trim().length > 0
    ) {

      return error.error;
    }


    if (
      error.error &&
      error.error.message
    ) {

      return error.error.message;
    }


    if (error.status === 409) {

      return 'Ya existe una materia con esos datos.';
    }


    if (error.status === 400) {

      return 'Los datos ingresados no son válidos.';
    }


    if (error.status === 0) {

      return 'No se pudo conectar con el servidor.';
    }


    return 'Ocurrió un error al registrar la materia.';
  }
}