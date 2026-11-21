import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

import {
  forkJoin,
  Observable
} from 'rxjs';


interface Carrera {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}


interface Materia {
  id: number;
  codigo: string;
  nombre: string;
}


@Component({
  selector: 'app-administrar-carreras',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './administrar-carreras.html',
  styleUrl: './administrar-carreras.css'
})
export class AdministrarCarreras implements OnInit {

  private apiUrl =
    'http://localhost:8080/carreras';

  private materiasUrl =
    'http://localhost:8080/materias';


  // ============================================================
  // CARRERAS
  // ============================================================

  carreras: Carrera[] = [];
  carrerasFiltradas: Carrera[] = [];
  carrerasPaginadas: Carrera[] = [];

  busqueda = '';
  filtroEstado = 'todos';
  paginaActual = 1;
  limite = 8;
  cargando = true;

  mensaje = '';


  // ============================================================
  // EDICIÓN
  // ============================================================

  carreraEditando: Carrera | null = null;

  codigoEditado = '';
  nombreEditado = '';


  // ============================================================
  // CAMBIAR ESTADO
  // ============================================================

  mostrarConfirmacionEstado = false;

  carreraSeleccionada: Carrera | null = null;

  actualizandoEstado = false;


  // ============================================================
  // MATERIAS DE LA CARRERA
  // ============================================================

  mostrarGestionMaterias = false;

  carreraMaterias: Carrera | null = null;

  materiasDisponibles: Materia[] = [];
  busquedaMaterias = '';

  materiasSeleccionadas =
    new Set<number>();

  materiasOriginales =
    new Set<number>();

  cargandoMaterias = false;

  guardandoMaterias = false;

  get materiasDisponiblesFiltradas(): Materia[] {
    const texto = this.busquedaMaterias.trim().toLowerCase();
    if (!texto) {
      return this.materiasDisponibles;
    }

    return this.materiasDisponibles.filter((materia) =>
      materia.nombre.toLowerCase().includes(texto) ||
      materia.codigo.toLowerCase().includes(texto)
    );
  }


  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.cargarCarreras();
  }


  // ============================================================
  // CARGAR CARRERAS
  // ============================================================

  cargarCarreras(): void {

    this.cargando = true;

    this.http
      .get<Carrera[]>(`${this.apiUrl}/administracion`)
      .subscribe({

        next: (data) => {

          this.carreras = data;
          this.cargando = false;
          this.buscar();

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando carreras:',
            error
          );

          this.carreras = [];
          this.carrerasFiltradas = [];
          this.carrerasPaginadas = [];
          this.paginaActual = 1;
          this.cargando = false;

          this.mensaje =
            'No se pudieron cargar las carreras.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // BUSCAR
  // ============================================================

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    this.carrerasFiltradas = this.carreras.filter((carrera) => {
      const coincideTexto =
        !texto ||
        carrera.nombre.toLowerCase().includes(texto) ||
        carrera.codigo.toLowerCase().includes(texto);
      const coincideEstado =
        this.filtroEstado === 'todos' ||
        (this.filtroEstado === 'habilitadas' && carrera.activo) ||
        (this.filtroEstado === 'deshabilitadas' && !carrera.activo);

      return coincideTexto && coincideEstado;
    });

    this.paginaActual = 1;
    this.actualizarCarrerasPaginadas();
  }

  get totalPaginas(): number {
    return Math.ceil(this.carrerasFiltradas.length / this.limite);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual += 1;
      this.actualizarCarrerasPaginadas();
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.actualizarCarrerasPaginadas();
    }
  }

  private actualizarCarrerasPaginadas(): void {
    const inicio = (this.paginaActual - 1) * this.limite;
    this.carrerasPaginadas = this.carrerasFiltradas.slice(
      inicio,
      inicio + this.limite
    );
  }


  // ============================================================
  // EDITAR
  // ============================================================

  editarCarrera(
    carrera: Carrera
  ): void {

    this.carreraEditando = carrera;

    this.codigoEditado =
      carrera.codigo;

    this.nombreEditado =
      carrera.nombre;

    this.mensaje = '';

    this.cdr.detectChanges();
  }


  cancelarEdicion(): void {

    this.carreraEditando = null;

    this.codigoEditado = '';
    this.nombreEditado = '';

    this.cdr.detectChanges();
  }


  guardarEdicion(): void {

    if (!this.carreraEditando) {
      return;
    }

    const codigoLimpio = normalizarCodigo(this.codigoEditado);

    const nombreLimpio =
      this.nombreEditado
        .trim();


    if (!this.codigoEditado) {

      this.mensaje =
        'Ingresá un código para la carrera.';

      return;
    }


    if (!esCodigoValido(this.codigoEditado)) {

      this.mensaje =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }


    if (!nombreLimpio) {

      this.mensaje =
        'Ingresá un nombre para la carrera.';

      return;
    }


    if (nombreLimpio.length > 50) {

      this.mensaje =
        'El nombre no puede superar los 50 caracteres.';

      return;
    }


    const carreraActualizada = {

      codigo: codigoLimpio,

      nombre: nombreLimpio
    };


    this.http
      .put<Carrera>(
        `${this.apiUrl}/${this.carreraEditando.id}`,
        carreraActualizada
      )
      .subscribe({

        next: () => {

          this.carreraEditando = null;

          this.codigoEditado = '';
          this.nombreEditado = '';

          this.cargarCarreras();

          this.mensaje =
            'Carrera actualizada correctamente.';

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error actualizando carrera:',
            error
          );

          if (error.status === 400) {

            this.mensaje =
              'Revisá los datos ingresados.';

          } else if (error.status === 409) {

            this.mensaje =
              'Ya existe otra carrera con ese código.';

          } else {

            this.mensaje =
              'No se pudo actualizar la carrera.';
          }

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // GESTIONAR MATERIAS
  // ============================================================

  abrirGestionMaterias(
    carrera: Carrera
  ): void {

    this.carreraMaterias =
      carrera;

    this.mostrarGestionMaterias =
      true;

    this.cargandoMaterias =
      true;

    this.mensaje = '';
    this.busquedaMaterias = '';

    this.materiasSeleccionadas =
      new Set<number>();

    this.materiasOriginales =
      new Set<number>();


    forkJoin({

      todas:
        this.http.get<Materia[]>(
          this.materiasUrl
        ),

      asignadas:
        this.http.get<Materia[]>(
          `${this.apiUrl}/${carrera.id}/materias`
        )

    })
    .subscribe({

      next: ({
        todas,
        asignadas
      }) => {

        this.materiasDisponibles =
          todas;

        const idsAsignados =
          asignadas.map(
            materia => materia.id
          );

        this.materiasSeleccionadas =
          new Set(idsAsignados);

        this.materiasOriginales =
          new Set(idsAsignados);

        this.cargandoMaterias =
          false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error cargando materias de la carrera:',
          error
        );

        this.cargandoMaterias =
          false;

        this.mensaje =
          'No se pudieron cargar las materias.';

        this.cdr.detectChanges();
      }

    });
  }


  estaMateriaSeleccionada(
    materiaId: number
  ): boolean {

    return this.materiasSeleccionadas
      .has(materiaId);
  }


  cambiarSeleccionMateria(
    materiaId: number,
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (input.checked) {

      this.materiasSeleccionadas
        .add(materiaId);

    } else {

      this.materiasSeleccionadas
        .delete(materiaId);
    }
  }


  cancelarGestionMaterias(): void {

    if (this.guardandoMaterias) {
      return;
    }

    this.mostrarGestionMaterias =
      false;

    this.carreraMaterias =
      null;

    this.materiasDisponibles = [];
    this.busquedaMaterias = '';

    this.materiasSeleccionadas =
      new Set<number>();

    this.materiasOriginales =
      new Set<number>();
  }


  guardarMaterias(): void {

    if (!this.carreraMaterias) {
      return;
    }


    const carreraId =
      this.carreraMaterias.id;


    const materiasAgregar =
      [...this.materiasSeleccionadas]
        .filter(
          id =>
            !this.materiasOriginales
              .has(id)
        );


    const materiasQuitar =
      [...this.materiasOriginales]
        .filter(
          id =>
            !this.materiasSeleccionadas
              .has(id)
        );


    if (
      materiasAgregar.length === 0 &&
      materiasQuitar.length === 0
    ) {

      this.cancelarGestionMaterias();

      this.mensaje =
        'No se realizaron cambios en las materias.';

      return;
    }


    const operaciones:
      Observable<unknown>[] = [];


    materiasAgregar.forEach(
      materiaId => {

        operaciones.push(

          this.http.post(
            `${this.apiUrl}/${carreraId}/materias/${materiaId}`,
            {}
          )

        );
      }
    );


    materiasQuitar.forEach(
      materiaId => {

        operaciones.push(

          this.http.delete(
            `${this.apiUrl}/${carreraId}/materias/${materiaId}`
          )

        );
      }
    );


    this.guardandoMaterias =
      true;


    forkJoin(operaciones)
      .subscribe({

        next: () => {

          this.guardandoMaterias =
            false;

          this.mostrarGestionMaterias =
            false;

          this.carreraMaterias =
            null;

          this.materiasDisponibles = [];
          this.busquedaMaterias = '';

          this.materiasSeleccionadas =
            new Set<number>();

          this.materiasOriginales =
            new Set<number>();

          this.mensaje =
            'Materias de la carrera actualizadas correctamente.';

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error actualizando materias:',
            error
          );

          this.guardandoMaterias =
            false;

          this.mensaje =
            'No se pudieron actualizar las materias de la carrera.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // CAMBIAR ESTADO DE CARRERA
  // ============================================================

  abrirConfirmacionEstado(
    carrera: Carrera
  ): void {

    this.carreraSeleccionada =
      carrera;

    this.mostrarConfirmacionEstado =
      true;

    this.mensaje = '';
    this.cdr.detectChanges();
  }

  cancelarCambioEstado(): void {
    if (this.actualizandoEstado) {
      return;
    }

    this.carreraSeleccionada = null;

    this.mostrarConfirmacionEstado =
      false;

    this.cdr.detectChanges();
  }

  confirmarCambioEstado(): void {
    if (!this.carreraSeleccionada) {
      return;
    }

    const { id, activo } = this.carreraSeleccionada;
    const nuevoEstado = !activo;
    this.actualizandoEstado = true;
    this.mensaje = '';

    this.http
      .patch<Carrera>(`${this.apiUrl}/${id}/estado`, { activo: nuevoEstado })
      .subscribe({

        next: () => {

          this.actualizandoEstado = false;
          this.carreraSeleccionada =
            null;

          this.mostrarConfirmacionEstado =
            false;

          this.cargarCarreras();

          this.mensaje = nuevoEstado
            ? 'Carrera habilitada correctamente.'
            : 'Carrera deshabilitada correctamente.';

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error actualizando el estado de la carrera:',
            error
          );

          this.actualizandoEstado = false;

          this.mensaje =
            'No se pudo actualizar el estado de la carrera.';

          this.cdr.detectChanges();
        }

      });
  }

}