import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { User } from '../../../models/user';
import { AuthService } from '../../../auth/service/auth-service';

@Component({
  selector: 'app-administrar-usuario',
  imports: [RouterLink, FormsModule],
  templateUrl: './administrar-usuario.html',
  // styleUrl: './administrar-usuario.css',
})
export class AdministrarUsuario implements OnInit {
  usuarioService = inject(UsuarioService);
  auth = inject(AuthService);
  paginaActual = signal(1);
  limite = 8;
  totalPaginas = signal(0);
  filtroRol = signal('');
  filtroBusqueda = signal('');
  filtroActivo = signal<string | boolean>('');
  selectedUser = signal<User | null>(null);

  userList = signal<User[]>([]);

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
  const active = this.filtroActivo() === '' ? undefined : this.filtroActivo() as boolean;
    
    this.usuarioService
      .obtenerUsuariosPaginados(
        this.paginaActual(),
        this.limite,
        this.filtroBusqueda(),
        this.filtroRol(),
  active
      )
      .subscribe({
        next: (data) => {
          this.listaUsuarios.set(data.usuarios);
          this.totalPaginas.set(Math.ceil(data.total / this.limite));
        },
      });
  }

  aplicarFiltros() {
    this.paginaActual.set(1);
    this.cargarUsuarios();
  }

  siguientePagina() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.set(this.paginaActual() + 1);
      this.cargarUsuarios();
    }
  }

  anteriorPagina() {
    if (this.paginaActual() > 1) {
      this.paginaActual.set(this.paginaActual() - 1);
      this.cargarUsuarios();
    }
  }

  openModal(user: User) {
    this.selectedUser.set(user);
  }

  closeModal() {
    this.selectedUser.set(null);
  }

  eliminar(){
    this.userService.deleteById(this.selectedUser()!.id).subscribe({
      next: () => {
        this.selectedUser.set(null);
        this.loadUsers();
      },
    })
  }

  reactivar() {
    this.userService.reactivateById(this.selectedUser()!.id).subscribe({
      next: () => {
        this.selectedUser.set(null);
        this.loadUsers();
      },
    })
  }

  seleccionadoIgualLogueado(): boolean {
  if(this.auth.userInfo().id === this.selectedUser()?.id) {
      return true;
    }
    return false;
  }
}
