import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../../auth/service/auth-service';


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
  id: string;
  nombre: string;
  apellido: string;
  rol: string;
  activo: boolean;
}


@Component({
  selector: 'app-administrar-comisiones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './administrar-comisiones.html',
  styleUrl: './administrar-comisiones.css'
})
export class AdministrarComisiones implements OnInit {

  private apiUrl = 'http://localhost:3000';

  private auth = inject(AuthService);


  comisiones: Comision[] = [];

  comisionesFiltradas: Comision[] = [];


  asignaturas: Asignatura[] = [];

  carreras: Carrera[] = [];

  profesores: Usuario[] = [];


  busqueda = '';

  comisionEditando: Comision | null = null;

  mensaje = '';


  // =========================
  // ELIMINACIÓN
  // =========================

  mostrarConfirmacionEliminar = false;

  comisionAEliminar: Comision | null = null;


  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.cargarDatos();

  }


  // =========================
  // ROLES
  // =========================

  get esAdmin(): boolean {

    return (
      this.auth.infoUsuario().rol === 'ADMIN'
    );

  }


  get esProfesor(): boolean {

    return (
      this.auth.infoUsuario().rol === 'PROFESOR'
    );

  }


  // =========================
  // CARGA GENERAL
  // =========================

  cargarDatos(): void {

    this.cargarAsignaturas();

    this.cargarCarreras();

    this.cargarProfesores();

    this.cargarComisiones();

  }


  cargarAsignaturas(): void {

    this.http
      .get<Asignatura[]>(
        `${this.apiUrl}/asignaturas`
      )
      .subscribe({

        next: (data) => {

          this.asignaturas = data;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error cargando asignaturas:',
            error
          );

        }

      });

  }


  cargarCarreras(): void {

    this.http
      .get<Carrera[]>(
        `${this.apiUrl}/carreras`
      )
      .subscribe({

        next: (data) => {

          this.carreras = data;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error cargando carreras:',
            error
          );

        }

      });

  }


  cargarProfesores(): void {

    this.http
      .get<Usuario[]>(
        `${this.apiUrl}/usuarios`
      )
      .subscribe({

        next: (data) => {

          this.profesores =
            data.filter(
              usuario =>
                usuario.rol === 'PROFESOR'
                &&
                usuario.activo
            );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error cargando profesores:',
            error
          );

        }

      });

  }


  cargarComisiones(): void {

    this.http
      .get<Comision[]>(
        `${this.apiUrl}/comisiones`
      )
      .subscribe({

        next: (data) => {

          // PROFESOR:
          // ve solamente las comisiones
          // asociadas a su usuario.

          if (this.esProfesor) {

            const usuarioId =
              Number(
                this.auth.infoUsuario().id
              );

            this.comisiones =
              data.filter(
                comision =>
                  Number(
                    comision.usuario_profesor_id
                  )
                  === usuarioId
              );

          }

          // ADMIN:
          // ve todas las comisiones.

          else {

            this.comisiones = data;

          }


          this.comisionesFiltradas = [
            ...this.comisiones
          ];


          this.mensaje = '';


          console.log(
            'Comisiones visibles:',
            this.comisiones
          );


          // Fuerza la actualización visual
          this.cdr.detectChanges();

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


          this.cdr.detectChanges();

        }

      });

  }


  // =========================
  // BUSCADOR
  // =========================

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();


    if (!texto) {

      this.comisionesFiltradas = [
        ...this.comisiones
      ];

      return;

    }


    this.comisionesFiltradas =
      this.comisiones.filter(
        comision =>

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


  // =========================
  // DATOS RELACIONADOS
  // =========================

  obtenerAsignatura(
    id: number
  ): string {

    const asignatura =
      this.asignaturas.find(
        a =>
          Number(a.id)
          ===
          Number(id)
      );


    return (
      asignatura?.nombre_asignatura
      ??
      'Sin asignatura'
    );

  }


  obtenerCarrera(
    id: number
  ): string {

    const carrera =
      this.carreras.find(
        c =>
          Number(c.id)
          ===
          Number(id)
      );


    return (
      carrera?.nombre
      ??
      'Sin carrera'
    );

  }


  obtenerProfesor(
    id: number
  ): string {

    const profesor =
      this.profesores.find(
        p =>
          Number(p.id)
          ===
          Number(id)
      );


    return profesor
      ? `${profesor.apellido}, ${profesor.nombre}`
      : 'Sin profesor';

  }


  // =========================
  // EDITAR
  // =========================

  editarComision(
    comision: Comision
  ): void {

    if (!this.esAdmin) {
      return;
    }


    this.comisionEditando = {
      ...comision
    };


    this.mensaje = '';


    this.cdr.detectChanges();

  }


  cancelarEdicion(): void {

    this.comisionEditando = null;

    this.cdr.detectChanges();

  }


  guardarEdicion(): void {

    if (!this.esAdmin) {
      return;
    }


    if (!this.comisionEditando) {
      return;
    }


    if (
      !this.comisionEditando.nombre.trim()

      ||

      this.comisionEditando
        .cantidad_alumnos <= 0

      ||

      this.comisionEditando
        .asignatura_id == null

      ||

      this.comisionEditando
        .carrera_id == null

      ||

      this.comisionEditando
        .usuario_profesor_id == null
    ) {

      this.mensaje =
        'Completá todos los campos.';

      this.cdr.detectChanges();

      return;

    }


    this.http.put(
      `${this.apiUrl}/comisiones/${this.comisionEditando.id}`,
      this.comisionEditando
    )
    .subscribe({

      next: () => {

        this.mensaje =
          'Comisión actualizada correctamente.';


        this.comisionEditando = null;


        this.cargarComisiones();


        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Error actualizando comisión:',
          error
        );


        this.mensaje =
          'No se pudo actualizar la comisión.';


        this.cdr.detectChanges();

      }

    });

  }


  // =========================
  // ELIMINAR
  // =========================

  abrirConfirmacionEliminar(
    comision: Comision
  ): void {

    if (!this.esAdmin) {

      return;

    }


    console.log(
      'Abriendo confirmación para:',
      comision
    );


    this.comisionAEliminar =
      comision;


    this.mostrarConfirmacionEliminar =
      true;


    // Importante en este proyecto:
    // fuerza a Angular a mostrar
    // inmediatamente el modal.

    this.cdr.detectChanges();

  }


  cancelarEliminar(): void {

    this.comisionAEliminar =
      null;


    this.mostrarConfirmacionEliminar =
      false;


    this.cdr.detectChanges();

  }


  confirmarEliminar(): void {

    if (!this.esAdmin) {

      return;

    }


    if (!this.comisionAEliminar) {

      return;

    }


    const comision =
      this.comisionAEliminar;


    this.http.delete(
      `${this.apiUrl}/comisiones/${comision.id}`
    )
    .subscribe({

      next: () => {

        console.log(
          'Comisión eliminada:',
          comision
        );


        this.comisionAEliminar =
          null;


        this.mostrarConfirmacionEliminar =
          false;


        this.mensaje =
          'Comisión eliminada correctamente.';


        this.cargarComisiones();


        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Error eliminando comisión:',
          error
        );


        this.comisionAEliminar =
          null;


        this.mostrarConfirmacionEliminar =
          false;


        this.mensaje =
          'No se pudo eliminar la comisión.';


        this.cdr.detectChanges();

      }

    });

  }

}