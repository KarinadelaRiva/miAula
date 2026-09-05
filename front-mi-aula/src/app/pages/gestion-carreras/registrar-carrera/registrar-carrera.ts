import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-carrera.html',
  styleUrl: './registrar-carrera.css'
})
export class RegistrarCarrera {

  nombre = '';

  guardando = false;
  mostrarExito = false;
  mensajeError = '';

  private apiUrl = 'http://localhost:3000/carreras';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  guardarCarrera(): void {

    if (!this.nombre.trim()) {
      this.mensajeError = 'Ingresá el nombre de la carrera.';
      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    const nuevaCarrera = {
      nombre: this.nombre.trim()
    };

    this.http.post(this.apiUrl, nuevaCarrera).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarExito = true;
        this.nombre = '';
      },

      error: (error) => {
        console.error(error);
        this.guardando = false;
        this.mensajeError = 'No se pudo registrar la carrera.';
      }
    });
  }

  cerrarExito(): void {
    this.mostrarExito = false;
    this.router.navigate(['/gestion-carreras']);
  }

  cancelar(): void {
    this.router.navigate(['/gestion-carreras']);
  }
}