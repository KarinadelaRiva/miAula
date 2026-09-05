import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Asignatura {
  id: string;
  codigo: number;
  nombre_asignatura: string;
  requiere_laboratorio: number;
}

interface Carrera {
  id: string;
  nombre: string;
}

interface Usuario {
  id: string;
  apellido: string;
  nombre: string;
  rol: string;
  activo: boolean;
}

@Component({
  selector: 'app-registrar-comision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-comision.html',
  styleUrl: './registrar-comision.css'
})
export class RegistrarComision implements OnInit {

  comision = {
    nombre: '',
    cantidad_alumnos: null as number | null,
    asignatura_id: null as number | null,
    carrera_id: null as number | null,
    usuario_profesor_id: null as number | null
  };

  asignaturas: Asignatura[] = [];
  carreras: Carrera[] = [];
  profesores: Usuario[] = [];

  guardando = false;
  mostrarExito = false;
  mensajeError = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.http.get<Asignatura[]>('http://localhost:3000/asignaturas')
      .subscribe(data => this.asignaturas = data);

    this.http.get<Carrera[]>('http://localhost:3000/carreras')
      .subscribe(data => this.carreras = data);

    this.http.get<Usuario[]>('http://localhost:3000/usuarios')
      .subscribe(data => {
        this.profesores = data.filter(usuario =>
          usuario.rol === 'PROFESOR' && usuario.activo
        );
      });
  }

  guardarComision(): void {

    if (
      !this.comision.nombre.trim() ||
      !this.comision.cantidad_alumnos ||
      !this.comision.asignatura_id ||
      !this.comision.carrera_id ||
      !this.comision.usuario_profesor_id
    ) {
      this.mensajeError = 'Completá todos los campos obligatorios.';
      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    this.http.post(
      'http://localhost:3000/comisiones',
      this.comision
    ).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarExito = true;
      },

      error: (error) => {
        console.error(error);
        this.guardando = false;
        this.mensajeError = 'No se pudo registrar la comisión.';
      }
    });
  }

  cerrarExito(): void {
    this.mostrarExito = false;
    this.router.navigate(['/gestion-comisiones']);
  }

  cancelar(): void {
    this.router.navigate(['/gestion-comisiones']);
  }
}