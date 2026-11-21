import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { esCodigoValido, normalizarCodigo } from '../../../shared/codigo';

import {
  Materia,
  MateriaService,
  MateriaUpdateDTO
} from '../../../services/materia-service/materia-service';


@Component({
  selector: 'app-administrar-materias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './administrar-materias.html',
  styleUrls: ['./administrar-materias.css']
})
export class AdministrarMaterias implements OnInit {

  // ============================================================
  // MATERIAS
  // ============================================================

  materias: Materia[] = [];
  materiasFiltradas: Materia[] = [];
  materiasPaginadas: Materia[] = [];

  cargando: boolean = true;
  paginaActual: number = 1;
  limite: number = 8;


  // ============================================================
  // BUSCADOR
  // ============================================================

  textoBusqueda: string = '';

  filtroEstado: string = 'todos';


  // ============================================================
  // EDICIÓN
  // ============================================================

  materiaEditando: Materia | null = null;

  editCodigo: string = '';
  editNombre: string = '';

  guardando: boolean = false;


  // ============================================================
  // CAMBIAR ESTADO
  // ============================================================

  modalVisible: boolean = false;

  materiaSeleccionada: Materia | null = null;

  actualizandoEstado: boolean = false;


  // ============================================================
  // MENSAJES
  // ============================================================

  mensajeExito: string = '';
  mensajeError: string = '';


  constructor(
    private materiaService: MateriaService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.cargarMaterias();
  }


  // ============================================================
  // CARGAR
  // ============================================================

  cargarMaterias(): void {

    this.cargando = true;
    this.mensajeError = '';


    this.materiaService
      .obtenerTodasParaAdministracion()
      .subscribe({

        next: (materias) => {

          this.materias = materias;

          this.aplicarFiltro();

          this.cargando = false;

          this.cdr.detectChanges();
        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Error cargando materias:',
            error
          );

          this.materias = [];
          this.materiasFiltradas = [];
          this.materiasPaginadas = [];
          this.paginaActual = 1;

          this.cargando = false;

          this.mensajeError =
            'No se pudieron cargar las materias.';

          this.cdr.detectChanges();
        }

      });
  }


  // ============================================================
  // FILTRAR
  // ============================================================

  aplicarFiltro(): void {

    const texto = this.textoBusqueda.trim().toLowerCase();

    this.materiasFiltradas = this.materias.filter((materia) => {
      const coincideTexto =
        !texto ||
        materia.codigo.toLowerCase().includes(texto) ||
        materia.nombre.toLowerCase().includes(texto);
      const coincideEstado =
        this.filtroEstado === 'todos' ||
        (this.filtroEstado === 'habilitadas' && materia.activo) ||
        (this.filtroEstado === 'deshabilitadas' && !materia.activo);

      return coincideTexto && coincideEstado;
    });

    this.paginaActual = 1;
    this.actualizarMateriasPaginadas();
  }

  get totalPaginas(): number {
    return Math.ceil(this.materiasFiltradas.length / this.limite);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual += 1;
      this.actualizarMateriasPaginadas();
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.actualizarMateriasPaginadas();
    }
  }

  private actualizarMateriasPaginadas(): void {
    const inicio = (this.paginaActual - 1) * this.limite;
    this.materiasPaginadas = this.materiasFiltradas.slice(
      inicio,
      inicio + this.limite
    );
  }


  // ============================================================
  // EDITAR
  // ============================================================

  editarMateria(
    materia: Materia
  ): void {

    this.mensajeExito = '';
    this.mensajeError = '';

    this.materiaEditando = materia;

    this.editCodigo =
      materia.codigo;

    this.editNombre =
      materia.nombre;
  }


  // ============================================================
  // CANCELAR EDICIÓN
  // ============================================================

  cancelarEdicion(): void {

    this.materiaEditando = null;

    this.editCodigo = '';
    this.editNombre = '';

    this.mensajeError = '';
  }


  // ============================================================
  // GUARDAR
  // ============================================================

  guardarCambios(): void {

    this.mensajeExito = '';
    this.mensajeError = '';


    if (!this.materiaEditando) {
      return;
    }


    if (!this.editCodigo) {

      this.mensajeError =
        'Ingresá el código de la materia.';

      return;
    }


    if (!esCodigoValido(this.editCodigo)) {

      this.mensajeError =
        'El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios.';

      return;
    }


    if (!this.editNombre.trim()) {

      this.mensajeError =
        'Ingresá el nombre de la materia.';

      return;
    }


    if (
      this.editNombre
        .trim()
        .length > 50
    ) {

      this.mensajeError =
        'El nombre no puede superar los 50 caracteres.';

      return;
    }


    const dto: MateriaUpdateDTO = {

      codigo: normalizarCodigo(this.editCodigo),

      nombre:
        this.editNombre.trim()
    };


    this.guardando = true;


    this.materiaService
      .actualizar(
        this.materiaEditando.id,
        dto
      )
      .subscribe({

        next: () => {

          this.guardando = false;

          this.mensajeExito =
            'Materia actualizada correctamente.';

          this.cancelarEdicion();

          this.cargarMaterias();

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error actualizando materia:',
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
  // MODAL DE ESTADO
  // ============================================================

  abrirModalEstado(
    materia: Materia
  ): void {

    this.materiaSeleccionada =
      materia;

    this.modalVisible =
      true;

    this.mensajeError =
      '';
  }


  cerrarModal(): void {

    if (this.actualizandoEstado) {
      return;
    }


    this.modalVisible =
      false;

    this.materiaSeleccionada =
      null;
  }


  // ============================================================
  // CAMBIAR ESTADO
  // ============================================================

  confirmarCambioEstado(): void {

    if (!this.materiaSeleccionada) {
      return;
    }


    const { id, activo } = this.materiaSeleccionada;
    const nuevoEstado = !activo;
    this.actualizandoEstado = true;

    this.mensajeExito =
      '';

    this.mensajeError =
      '';


    this.materiaService
      .actualizarEstado(id, nuevoEstado)
      .subscribe({

        next: () => {

          this.actualizandoEstado = false;

          this.modalVisible =
            false;

          this.materiaSeleccionada =
            null;

          this.mensajeExito = nuevoEstado
            ? 'Materia habilitada correctamente.'
            : 'Materia deshabilitada correctamente.';

          this.cargarMaterias();

          this.cdr.detectChanges();
        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'Error actualizando el estado de la materia:',
            error
          );

          this.actualizandoEstado = false;

          this.mensajeError =
            this.obtenerMensajeError(
              error
            );

          this.cdr.detectChanges();
        }

      });
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

    if (
      error.error &&
      error.error.mensaje
    ) {

      return error.error.mensaje;
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


    return 'Ocurrió un error al procesar la operación.';
  }
}