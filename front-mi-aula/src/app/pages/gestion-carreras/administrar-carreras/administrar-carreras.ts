import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Carrera {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-administrar-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './administrar-carreras.html',
  styleUrl: './administrar-carreras.css'
})
export class AdministrarCarreras implements OnInit {

  private apiUrl = 'http://localhost:3000/carreras';

  carreras: Carrera[] = [];
  carrerasFiltradas: Carrera[] = [];

  busqueda = '';

  carreraEditando: Carrera | null = null;
  nombreEditado = '';

  mensaje = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.http.get<Carrera[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.carreras = data;
        this.carrerasFiltradas = [...data];
        this.mensaje = '';

        console.log('Carreras cargadas:', this.carreras);
      },

      error: (error) => {
        console.error('Error cargando carreras:', error);

        this.carreras = [];
        this.carrerasFiltradas = [];

        this.mensaje = 'No se pudieron cargar las carreras.';
      }
    });
  }

  mostrarTodas(): void {
    console.log('Click en buscador');
    console.log('Carreras disponibles:', this.carreras);

    this.carrerasFiltradas = [...this.carreras];
  }

  buscar(): void {
    const texto = this.busqueda.toLowerCase().trim();

    console.log('Texto buscado:', texto);

    if (!texto) {
      this.carrerasFiltradas = [...this.carreras];
      return;
    }

    this.carrerasFiltradas = this.carreras.filter(carrera =>
      carrera.nombre.toLowerCase().includes(texto)
    );
  }

  editarCarrera(carrera: Carrera): void {
    this.carreraEditando = carrera;
    this.nombreEditado = carrera.nombre;
    this.mensaje = '';
  }

  cancelarEdicion(): void {
    this.carreraEditando = null;
    this.nombreEditado = '';
  }

  guardarEdicion(): void {

    if (!this.carreraEditando || !this.nombreEditado.trim()) {
      this.mensaje = 'Ingresá un nombre para la carrera.';
      return;
    }

    const carreraActualizada: Carrera = {
      ...this.carreraEditando,
      nombre: this.nombreEditado.trim()
    };

    this.http.put<Carrera>(
      `${this.apiUrl}/${this.carreraEditando.id}`,
      carreraActualizada
    ).subscribe({
      next: () => {
        this.mensaje = 'Carrera actualizada correctamente.';
        this.cancelarEdicion();
        this.cargarCarreras();
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'No se pudo actualizar la carrera.';
      }
    });
  }

  eliminarCarrera(carrera: Carrera): void {

    const confirmar = confirm(
      `¿Seguro que querés eliminar la carrera "${carrera.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.http.delete(
      `${this.apiUrl}/${carrera.id}`
    ).subscribe({
      next: () => {
        this.mensaje = 'Carrera eliminada correctamente.';
        this.cargarCarreras();
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'No se pudo eliminar la carrera.';
      }
    });
  }
}