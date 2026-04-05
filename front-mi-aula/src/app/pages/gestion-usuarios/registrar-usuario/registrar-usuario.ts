import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { AuthService } from '../../../auth/service/auth-service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserCreateDto } from '../../../models/userCreateDto';

@Component({
  selector: 'app-registrar-usuario',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registrar-usuario.html',
  // styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario {
  private userService = inject(UsuarioService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  error = signal('');
  mensajeExito = signal('');

  form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    passwordConfirmar: ['', [Validators.required]],
  role: ['', [Validators.required]],
  });

  enviar() {
    if (this.form.invalid) {
      return;
    }

    this.mensajeExito.set('');
    this.error.set('');

  if (!this.auth.validatePassword(this.form.value.password!, this.form.value.passwordConfirmar!)) {
      this.error.set('Repita correctamente la contraseña');
      return;
    }

  this.userService.getUserByEmail(this.form.value.email!).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.error.set('Ya existe un usuario registrado con este Email');
          return;
        }

  this.userService.create(this.buildUser()).subscribe({
          next: () => {
            this.mensajeExito.set('¡Usuario creado exitosamente!');
            this.form.reset();
          },
          error: (err) => {
            console.log(err);
            this.error.set('Error al registrar el nuevo usuario');
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.error.set('Error al verificar el email');
      },
    });
  }

  private buildUser(): UserCreateDto {
    return {
      name: this.form.value.name!,
      lastName: this.form.value.lastName!,
      password: this.form.value.password!,
      role: this.userService.convertRole(this.form.value.role!),
      email: this.form.value.email!,
    };
  }
}
