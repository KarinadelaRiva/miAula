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
        this.carrerasFiltradas = data;
        this.mensaje = 'Carrera cargada correctamente.';
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'No se pudieron cargar las carreras.';
      }
    });
  }

  buscar(): void {
    const texto = this.busqueda.toLowerCase().trim();

    this.carrerasFiltradas = this.carreras.filter(carrera =>
      carrera.nombre.toLowerCase().includes(texto)
    );
  }

  editarCarrera(carrera: Carrera): void {
    this.carreraEditando = carrera;
    this.nombreEditado = carrera.nombre;
  }

  cancelarEdicion(): void {
    this.carreraEditando = null;
    this.nombreEditado = '';
  }

  guardarEdicion(): void {
    if (!this.carreraEditando || !this.nombreEditado.trim()) {
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

    this.http.delete(`${this.apiUrl}/${carrera.id}`).subscribe({
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