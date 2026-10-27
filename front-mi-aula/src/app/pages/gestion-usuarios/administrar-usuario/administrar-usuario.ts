import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { Usuario } from '../../../models/usuario';
import { AuthService } from '../../../auth/service/auth-service';

@Component({
  selector: 'app-administrar-usuario',
  imports: [RouterLink, FormsModule],
  templateUrl: './administrar-usuario.html',
  styleUrl: './administrar-usuario.css',
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
  usuarioSeleccionado = signal<Usuario | null>(null);
  usuarioEditando = signal<Usuario | null>(null);
  nombreEditado = '';
  apellidoEditado = '';
  emailEditado = '';
  rolEditado: 'ADMIN' | 'PROFESOR' = 'PROFESOR';
  mensaje = signal('');

  listaUsuarios = signal<Usuario[]>([]);

  ngOnInit() {
    this.cargarUsuarios();
  }

  /*
  cargarUsuarios() {
    const activo = this.filtroActivo() === '' ? undefined : this.filtroActivo() as boolean;
    
    this.usuarioService
      .obtenerUsuariosPaginados(
        this.paginaActual(),
        this.limite,
        this.filtroBusqueda(),
        this.filtroRol(),
        activo
      )
      .subscribe({
        next: (data) => {
          this.listaUsuarios.set(data.usuarios);
          this.totalPaginas.set(Math.ceil(data.total / this.limite));
        },
      });
  }
  */

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next:(data) => {
        this.listaUsuarios.set(data);
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

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado.set(usuario);
  }

  cerrarModal() {
    this.usuarioSeleccionado.set(null);
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioEditando.set(usuario);
    this.nombreEditado = usuario.nombre;
    this.apellidoEditado = usuario.apellido;
    this.emailEditado = usuario.email;
    this.rolEditado = usuario.roles?.some((rol) =>
      ['ADMIN', 'ADMINISTRADOR'].includes(rol.toUpperCase().replace(/^ROLE_/, ''))
    ) ? 'ADMIN' : 'PROFESOR';
    this.mensaje.set('');
  }

  cancelarEdicion() {
    this.usuarioEditando.set(null);
    this.nombreEditado = '';
    this.apellidoEditado = '';
    this.emailEditado = '';
    this.rolEditado = 'PROFESOR';
  }

  guardarEdicion() {
    const usuario = this.usuarioEditando();
    const nombre = this.nombreEditado.trim();
    const apellido = this.apellidoEditado.trim();
    const email = this.emailEditado.trim();

    if (!usuario || !nombre || !apellido || !email) {
      this.mensaje.set('Completá nombre, apellido y email.');
      return;
    }

    this.usuarioService.actualizarUsuario({
      ...usuario,
      nombre,
      apellido,
      email,
      roles: [this.rolEditado],
    }).subscribe({
      next: () => {
        this.mensaje.set('Usuario actualizado correctamente.');
        this.cancelarEdicion();
        this.cargarUsuarios();
      },
      error: () => this.mensaje.set('No se pudo actualizar el usuario.'),
    });
  }

  eliminar(){
    const usuario = this.usuarioSeleccionado();
    if (!usuario) return;

    this.usuarioService.eliminarById(String(usuario.id)).subscribe({
      next: () => {
        this.usuarioSeleccionado.set(null);
        this.mensaje.set('Usuario eliminado correctamente.');
        this.cargarUsuarios();
      }
    })
  }

  reactivar() {
    const usuario = this.usuarioSeleccionado();
    if (!usuario) return;

    this.usuarioService.reactivarById(String(usuario.id)).subscribe({
      next: () => {
        this.usuarioSeleccionado.set(null);
        this.mensaje.set('Usuario reactivado correctamente.');
        this.cargarUsuarios();
      }
    })
  }

  seleccionadoIgualLogueado(): boolean {
    return String(this.auth.infoUsuario()?.id) === String(this.usuarioSeleccionado()?.id);
  }
}
