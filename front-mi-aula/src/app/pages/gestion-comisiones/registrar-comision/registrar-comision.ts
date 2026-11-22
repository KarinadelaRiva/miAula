import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';


interface Materia {
  id: number;
  codigo: string;
  nombre: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

interface Usuario {
  id: string | number;
  apellido: string;
  nombre: string;
  email: string;
  roles: string[];
  activo: boolean;
}


@Component({
  selector: 'app-registrar-comision',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registrar-comision.html',
  styleUrl: './registrar-comision.css'
})
export class RegistrarComision implements OnInit {

  comision = {
    codigo: '',
    nombre: '',
    cantidad_alumnos: null as number | null,
    asignatura_id: null as number | null,
    carrera_id: null as number | null,
    usuario_profesor_id: null as number | null
  };

  asignaturas: Materia[] = [];
  carreras: Carrera[] = [];
  profesores: Usuario[] = [];

  guardando = false;

  mensajeError = '';
  mensajeExito = '';
  errorCargaMaterias = '';
  errorCargaCarreras = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.http
      .get<Materia[]>(
        'http://localhost:8080/materias'
      )
      .subscribe({
        next: (data) => {
          this.asignaturas = [...data].sort((a, b) =>
            a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
          );
          this.errorCargaMaterias = '';
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error(
            'Error cargando materias:',
            error
          );
          this.errorCargaMaterias =
            'No se pudieron cargar las materias.';
          this.cdr.markForCheck();
        }
      });


    this.http
      .get<Carrera[]>(
        'http://localhost:8080/carreras'
      )
      .subscribe({
        next: (data) => {
          this.carreras = data;
          this.errorCargaCarreras = '';
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error(
            'Error cargando carreras:',
            error
          );
          this.errorCargaCarreras =
            'No se pudieron cargar las carreras.';
          this.cdr.markForCheck();
        }
      });


    this.http
      .get<Usuario[]>('http://localhost:8080/usuarios')
      .subscribe({
        next: (data) => {

          this.profesores = data.filter(usuario =>
            usuario.roles?.includes('profesor') &&
            usuario.activo
          );
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error(
            'Error cargando profesores:',
            error
          );
        }
      });
  }


  guardarComision(): void {

    this.mensajeError = '';
    this.mensajeExito = '';

    const codigo = normalizarCodigo(this.comision.codigo);

    if (!esCodigoValido(this.comision.codigo)) {
      this.mensajeError =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }

    if (!this.comision.nombre.trim()) {

      this.mensajeError =
        'Ingresá el nombre de la comisión.';

      return;
    }


    if (
      this.comision.cantidad_alumnos === null ||
      this.comision.cantidad_alumnos <= 0 ||
      this.comision.cantidad_alumnos > 100
    ) {

      this.mensajeError =
        'Ingresá una cantidad de alumnos entre 1 y 100.';

      return;
    }


    if (this.comision.asignatura_id === null) {

      this.mensajeError =
        'Seleccioná una asignatura.';

      return;
    }


    if (this.comision.carrera_id === null) {

      this.mensajeError =
        'Seleccioná una carrera.';

      return;
    }


    if (
      this.comision.usuario_profesor_id === null
    ) {

      this.mensajeError =
        'Seleccioná un profesor.';

      return;
    }


    this.guardando = true;


    const nuevaComision = {
      codigo,
      nombre:
        this.comision.nombre.trim(),
      cantidadEstudiantes:
        Number(this.comision.cantidad_alumnos),
      materiaId:
        Number(this.comision.asignatura_id),
      carreraId:
        Number(this.comision.carrera_id),
      profesorId:
        Number(this.comision.usuario_profesor_id)
    };

    this.http.post(
      'http://localhost:8080/comisiones',
      nuevaComision
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'Comisión registrada correctamente:',
          respuesta
        );

        this.guardando = false;

        this.mensajeExito =
          '¡Comisión registrada correctamente!';


        this.comision = {
          codigo: '',
          nombre: '',
          cantidad_alumnos: null,
          asignatura_id: null,
          carrera_id: null,
          usuario_profesor_id: null
        };


        this.cdr.detectChanges();
      },


      error: (error) => {

        console.error(
          'Error registrando comisión:',
          error
        );

        this.guardando = false;

        this.mensajeError = this.obtenerMensajeError(error);

        this.cdr.detectChanges();
      }

    });
  }

  private obtenerMensajeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body: unknown = error.error;

      if (typeof body === 'string' && body.trim()) {
        return body;
      }

      if (body && typeof body === 'object') {
        const mensajes = Object.values(body).filter(
          (valor): valor is string => typeof valor === 'string'
        );

        if (mensajes.length > 0) {
          return mensajes[0];
        }
      }
    }

    return 'No se pudo registrar la comisión.';
  }


  cancelar(): void {

    this.router.navigate([
      '/gestion-comisiones/administrar-comisiones'
    ]);
  }
}