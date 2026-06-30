import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

type Carrera = {
  id: string;
  nombre: string;
};

@Component({
  selector: 'app-gestion-carreras',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './gestion-carreras.html',
  styleUrl: './gestion-carreras.css',
})
export class GestionCarreras implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  carreras: Carrera[] = [];
  cargando = false;
  error: string | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras() {
    this.cargando = true;
    this.error = null;

    this.http.get<Carrera[]>('http://localhost:3000/carreras').subscribe({
      next: (carreras) => {
        this.carreras = carreras || [];
        this.cargando = false;
      },
      error: () => {
        this.carreras = [];
        this.cargando = false;
        this.error = 'No se pudieron cargar las carreras.';
      },
    });
  }

  registrarCarrera() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nombre = (this.form.getRawValue().nombre || '').trim();
    this.http.post<Carrera>('http://localhost:3000/carreras', { nombre }).subscribe({
      next: () => {
        this.form.reset();
        this.cargarCarreras();
      },
      error: () => {
        this.error = 'No se pudo registrar la carrera.';
      },
    });
  }

  eliminarCarrera(id: string) {
    this.http.delete(`http://localhost:3000/carreras/${id}`).subscribe({
      next: () => this.cargarCarreras(),
      error: () => {
        this.error = 'No se pudo eliminar la carrera.';
      },
    });
  }
}
