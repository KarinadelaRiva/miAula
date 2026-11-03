import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { AuthService } from './auth/service/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestor-aulas');
  private auth = inject(AuthService);
/*
  get isLoggedIn() {
    // Current AuthService uses `usuarioLogueado` signal. Use it directly.
    return this.auth.usuarioLogueado();
  } */
}
