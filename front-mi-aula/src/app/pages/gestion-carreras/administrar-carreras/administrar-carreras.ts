import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Carrera {
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


  carreras: Carrera[] = [];
  carrerasFiltradas: Carrera[] = [];

  busqueda = '';

  carreraEditando: Carrera | null = null;

  codigoEditado = '';
  nombreEditado = '';

  mensaje = '';

  mostrarConfirmacionEliminar = false;
  carreraAEliminar: Carrera | null = null;


  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.cargarCarreras();
  }


  cargarCarreras(): void {

    this.http
      .get<Carrera[]>(this.apiUrl)
      .subscribe({

        next: (data) => {

          this.carreras = data;

          this.carrerasFiltradas = [
            ...data
          ];

          console.log(
            'Carreras cargadas:',
            this.carreras
          );

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

    const codigoLimpio =
      this.codigoEditado
        .trim()
        .toUpperCase();

    const nombreLimpio =
      this.nombreEditado
        .trim();


    if (!codigoLimpio) {

      this.mensaje =
        'Ingresá un código para la carrera.';

      this.cdr.detectChanges();

      return;
    }


    if (codigoLimpio.length > 6) {

      this.mensaje =
        'El código no puede superar los 6 caracteres.';

      this.cdr.detectChanges();

      return;
    }


    if (!nombreLimpio) {

      this.mensaje =
        'Ingresá un nombre para la carrera.';

      this.cdr.detectChanges();

      return;
    }


    if (nombreLimpio.length > 50) {

      this.mensaje =
        'El nombre no puede superar los 50 caracteres.';

      this.cdr.detectChanges();

      return;
    }


    const carreraActualizada = {

      codigo: codigoLimpio,

      nombre: nombreLimpio

    };


    this.http.put<Carrera>(
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

        } else {

          this.mensaje =
            'No se pudo actualizar la carrera.';

        }

        this.cdr.detectChanges();
      }

    });
  }


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


    this.http.delete(
      `${this.apiUrl}/${carrera.id}`
    )
    .subscribe({

      next: () => {

        console.log(
          'Carrera eliminada correctamente:',
          carrera
        );

        this.carreraAEliminar = null;

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

        this.carreraAEliminar = null;

        this.mostrarConfirmacionEliminar =
          false;

        this.mensaje =
          'No se pudo eliminar la carrera.';

        this.cdr.detectChanges();
      }

    });
  }

}