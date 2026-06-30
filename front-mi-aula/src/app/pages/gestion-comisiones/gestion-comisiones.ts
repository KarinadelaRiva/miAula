import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

type Carrera = {
  id: string;
  nombre: string;
};

type Comision = {
  id: string;
  nombre: string;
  cantidad_alumnos: number;
  carrera_id: number;
  asignatura_id: number;
  usuario_profesor_id: number;
};

@Component({
  selector: 'app-gestion-comisiones',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './gestion-comisiones.html',
  styleUrl: './gestion-comisiones.css',
})
export class GestionComisiones implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  comisiones: Comision[] = [];
  carreras: Carrera[] = [];
  cargando = false;
  error: string | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    cantidad_alumnos: [null as number | null, [Validators.required, Validators.min(1)]],
    carrera_id: [null as number | null, [Validators.required]],
    asignatura_id: [null as number | null, [Validators.required]],
    usuario_profesor_id: [null as number | null, [Validators.required]],
  });

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.error = null;

    this.http.get<Carrera[]>('http://localhost:3000/carreras').subscribe({
      next: (carreras) => {
        this.carreras = carreras || [];
      },
      error: () => {
        this.carreras = [];
      },
    });

    this.http.get<Comision[]>('http://localhost:3000/comisiones').subscribe({
      next: (comisiones) => {
        this.comisiones = comisiones || [];
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las comisiones.';
        this.comisiones = [];
        this.cargando = false;
      },
    });
  }

  registrarComision() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      nombre: (value.nombre || '').trim(),
      cantidad_alumnos: Number(value.cantidad_alumnos),
      carrera_id: Number(value.carrera_id),
      asignatura_id: Number(value.asignatura_id),
      usuario_profesor_id: Number(value.usuario_profesor_id),
    };

    this.http.post<Comision>('http://localhost:3000/comisiones', payload).subscribe({
      next: () => {
        this.form.reset();
        this.cargarDatos();
      },
      error: () => {
        this.error = 'No se pudo registrar la comisión.';
      },
    });
  }

  eliminarComision(id: string) {
    this.http.delete(`http://localhost:3000/comisiones/${id}`).subscribe({
      next: () => this.cargarDatos(),
      error: () => {
        this.error = 'No se pudo eliminar la comisión.';
      },
    });
  }

  nombreCarrera(id: number) {
    return this.carreras.find((carrera) => Number(carrera.id) === Number(id))?.nombre || '-';
  }
}
