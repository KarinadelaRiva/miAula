import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Comision {
  id: string;
  cantidad_alumnos: number;
  nombre: string;
  asignatura_id: number;
  carrera_id: number;
  usuario_profesor_id: number;
}

interface Asignatura {
  id: string;
  codigo: number;
  nombre_asignatura: string;
}

interface Carrera {
  id: string;
  nombre: string;
}

interface Usuario {
  id: string | number;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  activo: boolean;
}

@Component({
  selector: 'app-administrar-comisiones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './administrar-comisiones.html',
  styleUrl: './administrar-comisiones.css'
})
export class AdministrarComisiones implements OnInit {

  private apiUrl = 'http://localhost:3000';

  comisiones: Comision[] = [];
  comisionesFiltradas: Comision[] = [];

  asignaturas: Asignatura[] = [];
  carreras: Carrera[] = [];
  profesores: Usuario[] = [];

  busqueda = '';

  comisionEditando: Comision | null = null;

  mensaje = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.http.get<Asignatura[]>(
      `${this.apiUrl}/asignaturas`
    ).subscribe({
      next: (data) => {
        this.asignaturas = data;
      },
      error: (error) => {
        console.error('Error cargando asignaturas:', error);
      }
    });

    this.http.get<Carrera[]>(
      `${this.apiUrl}/carreras`
    ).subscribe({
      next: (data) => {
        this.carreras = data;
      },
      error: (error) => {
        console.error('Error cargando carreras:', error);
      }
    });

    this.http.get<Usuario[]>('http://localhost:8080/usuarios').subscribe({
      next: (data) => {
        this.profesores = data.filter(usuario =>
          usuario.roles?.some((rol) => rol.toUpperCase().replace(/^ROLE_/, '') === 'PROFESOR') &&
          usuario.activo
        );
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
      }
    });

    this.cargarComisiones();
  }

  cargarComisiones(): void {

    this.http.get<Comision[]>(
      `${this.apiUrl}/comisiones`
    ).subscribe({
      next: (data) => {
        this.comisiones = data;
        this.comisionesFiltradas = [...data];
        this.mensaje = '';

        console.log(
          'Comisiones cargadas:',
          this.comisiones
        );
      },

      error: (error) => {
        console.error(
          'Error cargando comisiones:',
          error
        );

        this.comisiones = [];
        this.comisionesFiltradas = [];

        this.mensaje =
          'No se pudieron cargar las comisiones.';
      }
    });
  }

  mostrarTodas(): void {

    console.log('Click en buscador');

    console.log(
      'Comisiones disponibles:',
      this.comisiones
    );

    this.comisionesFiltradas = [
      ...this.comisiones
    ];
  }

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    console.log(
      'Texto buscado:',
      texto
    );

    if (!texto) {

      this.comisionesFiltradas = [
        ...this.comisiones
      ];

      return;
    }

    this.comisionesFiltradas =
      this.comisiones.filter(comision =>

        comision.nombre
          .toLowerCase()
          .includes(texto)

        ||

        this.obtenerAsignatura(
          comision.asignatura_id
        )
          .toLowerCase()
          .includes(texto)

        ||

        this.obtenerCarrera(
          comision.carrera_id
        )
          .toLowerCase()
          .includes(texto)

        ||

        this.obtenerProfesor(
          comision.usuario_profesor_id
        )
          .toLowerCase()
          .includes(texto)

      );
  }

  obtenerAsignatura(id: number): string {

    const asignatura =
      this.asignaturas.find(
        a => Number(a.id) === Number(id)
      );

    return asignatura?.nombre_asignatura
      ?? 'Sin asignatura';
  }

  obtenerCarrera(id: number): string {

    const carrera =
      this.carreras.find(
        c => Number(c.id) === Number(id)
      );

    return carrera?.nombre
      ?? 'Sin carrera';
  }

  obtenerProfesor(id: number): string {

    const profesor =
      this.profesores.find(
        p => Number(p.id) === Number(id)
      );

    return profesor
      ? `${profesor.apellido}, ${profesor.nombre}`
      : 'Sin profesor';
  }

  editarComision(comision: Comision): void {

    this.comisionEditando = {
      ...comision
    };

    this.mensaje = '';
  }

  cancelarEdicion(): void {

    this.comisionEditando = null;
  }

  guardarEdicion(): void {

    if (!this.comisionEditando) {
      return;
    }

    if (
      !this.comisionEditando.nombre.trim()
      ||
      !this.comisionEditando.cantidad_alumnos
      ||
      !this.comisionEditando.asignatura_id
      ||
      !this.comisionEditando.carrera_id
      ||
      !this.comisionEditando.usuario_profesor_id
    ) {

      this.mensaje =
        'Completá todos los campos.';

      return;
    }

    this.http.put(
      `${this.apiUrl}/comisiones/${this.comisionEditando.id}`,
      this.comisionEditando
    ).subscribe({
      next: () => {

        this.mensaje =
          'Comisión actualizada correctamente.';

        this.comisionEditando = null;

        this.cargarComisiones();
      },

      error: (error) => {

        console.error(error);

        this.mensaje =
          'No se pudo actualizar la comisión.';
      }
    });
  }

  eliminarComision(
    comision: Comision
  ): void {

    const confirmar = confirm(
      `¿Seguro que querés eliminar la comisión "${comision.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.http.delete(
      `${this.apiUrl}/comisiones/${comision.id}`
    ).subscribe({
      next: () => {

        this.mensaje =
          'Comisión eliminada correctamente.';

        this.cargarComisiones();
      },

      error: (error) => {

        console.error(error);

        this.mensaje =
          'No se pudo eliminar la comisión.';
      }
    });
  }
}