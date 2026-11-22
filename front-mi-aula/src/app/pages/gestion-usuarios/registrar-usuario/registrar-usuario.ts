import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { AuthService, PASSWORD_PATTERN } from '../../../auth/service/auth-service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioCreateDto } from '../../../models/usuarioCreateDto';

@Component({
  selector: 'app-registrar-usuario',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registrar-usuario.html',
  styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario {
  private usuarioService = inject(UsuarioService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  error = signal('');
  mensajeExito = signal('');

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern(PASSWORD_PATTERN)],
    ],
    passwordConfirmar: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  enviar() {
    if (this.form.invalid) {
      return;
    }

    this.mensajeExito.set('');
    this.error.set('');

    if (!this.auth.validarPassword(this.form.value.password!, this.form.value.passwordConfirmar!)) {
      this.error.set('Repita correctamente la contraseña');
      return;
    }

    const usuario = this.buildUsuario();
    if (!usuario) {
      this.error.set('Seleccioná un rol válido.');
      return;
    }

    this.usuarioService.existePorEmail(this.form.value.email!).subscribe({
      next: (existe) => {
        if (existe) {
          this.error.set('Ya existe un usuario registrado con este Email');
          return;
        }

        this.usuarioService.crear(usuario).subscribe({
          next: () => {
            this.mensajeExito.set('¡Usuario creado exitosamente!');
            this.form.reset();
          },
          error: (err) => {
            console.error('Error al registrar el nuevo usuario:', err);
            this.error.set('Error al registrar el nuevo usuario');
          },
        });
      },
      error: (err) => {
        console.error('Error al verificar el email:', err);
        this.error.set('Error al verificar el email');
      },
    });
  }

  private buildUsuario(): UsuarioCreateDto | null {
    const rol = this.form.value.rol;
    if (rol !== 'administrador' && rol !== 'profesor') {
      return null;
    }

    return {
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      password: this.form.value.password!,
      rol,
      email: this.form.value.email!,
    };
  }
}
