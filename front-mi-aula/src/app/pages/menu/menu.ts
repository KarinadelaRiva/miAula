import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/service/auth-service';

@Component({
  selector: 'app-menu',
  imports: [AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private readonly auth = inject(AuthService);
  readonly infoUsuario$ = this.auth.cargarUsuarioActual();
}
