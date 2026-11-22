import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

interface Comision {
  id: number;
  codigo: string;
  nombre: string;
  materiaNombre: string;
  materiaId: number;
  carreraNombre: string;
  carreraId: number;
  profesorNombre: string;
  profesorId: number;
  cantidadEstudiantes: number;
  activo: boolean;
}

interface Asignatura {
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

  private apiUrl = 'http://localhost:8080';

  comisiones: Comision[] = [];
  comisionesFiltradas: Comision[] = [];
  comisionesPaginadas: Comision[] = [];

  asignaturas: Asignatura[] = [];
  carreras: Carrera[] = [];
  profesores: Usuario[] = [];

  busqueda = '';
  paginaActual = 1;
  readonly limite = 8;

  comisionEditando: Comision | null = null;

  mensaje = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

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

    this.http.get<Asignatura[]>(
      `${this.apiUrl}/materias`
    ).subscribe({
      next: (data) => {
        this.asignaturas = data;
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
      }
    });

    this.http.get<Usuario[]>('http://localhost:8080/usuarios').subscribe({
      next: (data) => {
        this.profesores = data.filter(usuario =>
          usuario.roles?.includes('profesor') &&
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
        this.buscar();
        this.mensaje = '';
        this.cdr.markForCheck();

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
        this.comisionesPaginadas = [];
        this.paginaActual = 1;

        this.mensaje =
          'No se pudieron cargar las comisiones.';
        this.cdr.markForCheck();
      }
    });
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

    } else {

      this.comisionesFiltradas =
        this.comisiones.filter(comision =>

          comision.nombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.materiaNombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.carreraNombre
            .toLowerCase()
            .includes(texto)

          ||

          comision.profesorNombre
            .toLowerCase()
            .includes(texto)

        );
    }

    this.paginaActual = 1;
    this.actualizarComisionesPaginadas();
  }

  get totalPaginas(): number {
    return Math.ceil(this.comisionesFiltradas.length / this.limite);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual += 1;
      this.actualizarComisionesPaginadas();
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.actualizarComisionesPaginadas();
    }
  }

  private actualizarComisionesPaginadas(): void {
    const inicio = (this.paginaActual - 1) * this.limite;
    this.comisionesPaginadas = this.comisionesFiltradas.slice(
      inicio,
      inicio + this.limite
    );
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
      !this.comisionEditando.codigo
      ||
      !this.comisionEditando.cantidadEstudiantes
      ||
      !this.comisionEditando.carreraId
      ||
      !this.comisionEditando.profesorId
    ) {

      this.mensaje =
        'Completá todos los campos.';

      return;
    }

    if (!esCodigoValido(this.comisionEditando.codigo)) {
      this.mensaje =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';
      return;
    }

    const comisionActualizada = {
      id: this.comisionEditando.id,
      codigo: normalizarCodigo(this.comisionEditando.codigo),
      nombre: this.comisionEditando.nombre,
      carreraId: this.comisionEditando.carreraId,
      profesorId: this.comisionEditando.profesorId,
      cantidadEstudiantes: this.comisionEditando.cantidadEstudiantes
    };

    this.http.put(
      `${this.apiUrl}/comisiones`,
      comisionActualizada
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
      `¿Seguro que querés deshabilitar la comisión "${comision.nombre}"?`
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

  activarComision(comision: Comision): void {
    this.http.put(
      `${this.apiUrl}/comisiones/activar/${comision.id}`,
      null
    ).subscribe({
      next: () => {
        this.mensaje = 'Comisión reactivada correctamente.';
        this.cargarComisiones();
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'No se pudo reactivar la comisión.';
      }
    });
  }
}