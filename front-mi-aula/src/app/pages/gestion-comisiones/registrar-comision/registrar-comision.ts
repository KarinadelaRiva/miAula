import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Asignatura {
  id: string;
  codigo: number;
  nombre_asignatura: string;
  requiere_laboratorio: number;
}

interface Carrera {
  id: string;
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
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-comision.html',
  styleUrl: './registrar-comision.css'
})
export class RegistrarComision implements OnInit {

  comision = {
    nombre: '',
    cantidad_alumnos: null as number | null,
    asignatura_id: null as number | null,
    carrera_id: null as number | null,
    usuario_profesor_id: null as number | null
  };

  asignaturas: Asignatura[] = [];
  carreras: Carrera[] = [];
  profesores: Usuario[] = [];

  guardando = false;
  mostrarExito = false;
  mensajeError = '';

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
      .get<Asignatura[]>('http://localhost:3000/asignaturas')
      .subscribe({
        next: (data) => {
          this.asignaturas = data;
        },
        error: (error) => {
          console.error('Error cargando asignaturas:', error);
        }
      });

    this.http
      .get<Carrera[]>('http://localhost:3000/carreras')
      .subscribe({
        next: (data) => {
          this.carreras = data;
        },
        error: (error) => {
          console.error('Error cargando carreras:', error);
        }
      });

    this.http
      .get<Usuario[]>('http://localhost:8080/usuarios')
      .subscribe({
        next: (data) => {

          this.profesores = data.filter(usuario =>
            usuario.roles?.some((rol) => rol.toUpperCase().replace(/^ROLE_/, '') === 'PROFESOR') &&
            usuario.activo
          );

        },
        error: (error) => {
          console.error('Error cargando profesores:', error);
        }
      });
  }

  guardarComision(): void {

    console.log(
      'Datos de comisión antes de guardar:',
      this.comision
    );

    if (!this.comision.nombre.trim()) {
      this.mensajeError =
        'Ingresá el nombre de la comisión.';
      return;
    }

    if (
      this.comision.cantidad_alumnos === null ||
      this.comision.cantidad_alumnos <= 0
    ) {
      this.mensajeError =
        'Ingresá una cantidad de alumnos válida.';
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

    if (this.comision.usuario_profesor_id === null) {
      this.mensajeError =
        'Seleccioná un profesor.';
      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    const nuevaComision = {
      nombre: this.comision.nombre.trim(),
      cantidad_alumnos: Number(this.comision.cantidad_alumnos),
      asignatura_id: Number(this.comision.asignatura_id),
      carrera_id: Number(this.comision.carrera_id),
      usuario_profesor_id: Number(
        this.comision.usuario_profesor_id
      )
    };

    console.log(
      'Comisión enviada:',
      nuevaComision
    );

    this.http.post(
      'http://localhost:3000/comisiones',
      nuevaComision
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'Comisión registrada correctamente:',
          respuesta
        );

        this.guardando = false;
        this.mostrarExito = true;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error registrando comisión:',
          error
        );

        this.guardando = false;
        this.mensajeError =
          'No se pudo registrar la comisión.';

        this.cdr.detectChanges();
      }

    });
  }

  cerrarExito(): void {

    this.mostrarExito = false;

    this.router.navigate([
      '/gestion-comisiones/administrar-comisiones'
    ]);
  }

  cancelar(): void {

    this.router.navigate([
      '/gestion-comisiones/administrar-comisiones'
    ]);
  }
}