import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/service/auth-service';
import { Usuario } from '../../models/usuario';
import { UsuarioResponseDto } from '../../models/usuarioResponseDto';
import { UsuarioService } from '../../services/usuario-service/usuario-service';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);

  usuarioActual = signal<Usuario | null>(null);

  loadingPerfil = false;
  loadingPassword = false;
  mensajePerfil = signal('');
  mensajePassword = signal('');
  errorPerfil = signal('');
  errorPassword = signal('');
  mostrarAlertaEliminar = signal(false);

  formPerfil = this.fb.group({
    nombre: [this.usuarioActual()?.nombre ?? '', [Validators.required, Validators.minLength(2)]],
    apellido: [this.usuarioActual()?.apellido ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.usuarioActual()?.email ?? '', [Validators.required, Validators.email]],
  });

  private passwordsMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const passwordNuevo = control.get('passwordNuevo')?.value;
    const passwordConfirmar = control.get('passwordConfirmar')?.value;

    if (!passwordNuevo || !passwordConfirmar) {
      return null;
    }

    return passwordNuevo === passwordConfirmar ? null : { passwordMismatch: true };
  };

  formPassword = this.fb.group({
    passwordActual: ['', [Validators.required]],
    passwordNuevo: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmar: ['', [Validators.required]],
  }, { validators: this.passwordsMatchValidator });

  ngOnInit() {
    this.getUsuarioActual().subscribe({
      error: () => this.ErrorCargaUsuario(),
    });
  }

  private getUsuarioActual(): Observable<UsuarioResponseDto> {
    return this.usuarioService.me().pipe(
      tap((usuario) => {
        this.usuarioActual.set(usuario);
        this.formPerfil.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
        });
      })
    );
  }

  private ErrorCargaUsuario() {
    this.errorPerfil.set('Fallo en el servidor');
    this.errorPassword.set('Fallo en el servidor');
  }

  enviarDatos() {
    if (this.formPerfil.invalid) {
      return;
    }

    this.loadingPerfil = true;
    this.mensajePerfil.set('');
    this.errorPerfil.set('');

    const usuarioActualizado = {
      ...this.usuarioActual()!,
      nombre: this.formPerfil.value.nombre!,
      apellido: this.formPerfil.value.apellido!,
      email: this.formPerfil.value.email!,
    };

    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe({
      next: () => {
        this.mensajePerfil.set('¡Perfil actualizado correctamente!');
        this.loadingPerfil = false;
        this.formPerfil.markAsUntouched();
        this.getUsuarioActual().subscribe({
          error: () => this.ErrorCargaUsuario(),
        });
      },
      error: (err) => {
        const mensajeBackend = typeof err.error === 'string' ? err.error : '';
        this.errorPerfil.set(mensajeBackend || 'Error al actualizar el perfil');
        this.loadingPerfil = false;
      },
    });
  }

  enviarPassword() {
    if (this.formPassword.invalid) {
      return;
    }

    this.mensajePassword.set('');
    this.errorPassword.set('');

    this.loadingPassword = true;
    this.usuarioService
      .validarPassword(this.formPassword.value.passwordActual!)
      .pipe(
        switchMap((boolean) => {
          if (!boolean) {
            this.errorPassword.set('Contraseña incorrecta');
            this.loadingPassword = false;
            return EMPTY;
          }

          return this.usuarioService.actualizarPassword(this.formPassword.value.passwordNuevo!);
        })
      )
      .subscribe({
        next: () => {
          this.mensajePassword.set('¡Contraseña actualizada correctamente!');
          this.loadingPassword = false;
          this.formPassword.reset();
          this.formPassword.markAsUntouched();
          this.getUsuarioActual().subscribe({
            error: () => this.ErrorCargaUsuario(),
          });
        },
        error: (err: HttpErrorResponse) => {
          const mensajeBackend = typeof err.error === 'string' ? err.error : '';
          this.errorPassword.set(mensajeBackend || 'Error al actualizar la contraseña');
          this.loadingPassword = false;
        },
      });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  abrirAlertaEliminar() {
    this.mostrarAlertaEliminar.set(true);
  }

  cerrarAlertaEliminar() {
    this.mostrarAlertaEliminar.set(false);
  }

  confirmarEliminar() {
    this.usuarioService.desactivarMiUsuario().subscribe({
      next: () => {
        this.cerrarAlertaEliminar();
        this.auth.logout();
        this.router.navigate(['/home']);
      },
      error: (err: unknown) => {
        alert('Error al intentar eliminar la cuenta...');
        this.cerrarAlertaEliminar();
      }
    });
  }
}
