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

  busqueda = '';

  mensaje = '';


  // ============================================================
  // EDICIÓN
  // ============================================================

  carreraEditando: Carrera | null = null;

  codigoEditado = '';
  nombreEditado = '';


  // ============================================================
  // ELIMINAR
  // ============================================================

  mostrarConfirmacionEliminar = false;

  carreraAEliminar: Carrera | null = null;


  // ============================================================
  // MATERIAS DE LA CARRERA
  // ============================================================

  mostrarGestionMaterias = false;

  carreraMaterias: Carrera | null = null;

  materiasDisponibles: Materia[] = [];

  materiasSeleccionadas =
    new Set<number>();

  materiasOriginales =
    new Set<number>();

  cargandoMaterias = false;

  guardandoMaterias = false;


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

    this.http
      .get<Carrera[]>(this.apiUrl)
      .subscribe({

        next: (data) => {

          this.carreras = data;

          this.carrerasFiltradas = [
            ...data
          ];

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando carreras:',
            error
          );

          this.carreras = [];
          this.carrerasFiltradas = [];

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

    if (!texto) {

      this.carrerasFiltradas = [
        ...this.carreras
      ];

      return;
    }

    this.carrerasFiltradas =
      this.carreras.filter(
        carrera =>
          carrera.nombre
            .toLowerCase()
            .includes(texto)
          ||
          carrera.codigo
            .toLowerCase()
            .includes(texto)
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
  // ELIMINAR CARRERA
  // ============================================================

  abrirConfirmacionEliminar(
    carrera: Carrera
  ): void {

    this.carreraAEliminar =
      carrera;

    this.mostrarConfirmacionEliminar =
      true;

    this.cdr.detectChanges();
  }


  cancelarEliminar(): void {

    this.carreraAEliminar = null;

    this.mostrarConfirmacionEliminar =
      false;

    this.cdr.detectChanges();
  }


  confirmarEliminar(): void {

    if (!this.carreraAEliminar) {
      return;
    }


    const carrera =
      this.carreraAEliminar;


    this.http
      .delete(
        `${this.apiUrl}/${carrera.id}`
      )
      .subscribe({

        next: () => {

          this.carreraAEliminar =
            null;

          this.mostrarConfirmacionEliminar =
            false;

          this.cargarCarreras();

          this.mensaje =
            'Carrera eliminada correctamente.';

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error eliminando carrera:',
            error
          );

          this.carreraAEliminar =
            null;

          this.mostrarConfirmacionEliminar =
            false;

          this.mensaje =
            'No se pudo eliminar la carrera.';

          this.cdr.detectChanges();
        }

      });
  }

}