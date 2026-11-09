import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-administrar-usuario',
  imports: [RouterLink, FormsModule],
  templateUrl: './administrar-usuario.html',
  styleUrl: './administrar-usuario.css',
})
export class AdministrarUsuario implements OnInit {
  usuarioService = inject(UsuarioService);
  usuarioLogueadoId = signal<number | null>(null);
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
  rolEditado: 'administrador' | 'profesor' = 'profesor';
  mensaje = signal('');

  listaUsuarios = signal<Usuario[]>([]);
  private todosLosUsuarios = signal<Usuario[]>([]);

  ngOnInit() {
    this.cargarUsuarios();
    this.usuarioService.me().subscribe({
      next: (usuario) => this.usuarioLogueadoId.set(usuario.id),
      error: (error) => console.error('No se pudo obtener el usuario autenticado:', error),
    });
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (usuarios) => {
        this.todosLosUsuarios.set(usuarios);
        this.actualizarUsuariosVisibles();
      },
    });
  }

  aplicarFiltros() {
    this.paginaActual.set(1);
    this.actualizarUsuariosVisibles();
  }

  siguientePagina() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.set(this.paginaActual() + 1);
      this.actualizarUsuariosVisibles();
    }
  }

  anteriorPagina() {
    if (this.paginaActual() > 1) {
      this.paginaActual.set(this.paginaActual() - 1);
      this.actualizarUsuariosVisibles();
    }
  }

  private actualizarUsuariosVisibles() {
    const texto = this.filtroBusqueda().trim().toLocaleLowerCase();
    const rol = this.filtroRol();
    const estado = this.filtroActivo();

    const usuariosFiltrados = this.todosLosUsuarios().filter((usuario) => {
      const coincideTexto =
        !texto ||
        `${usuario.nombre} ${usuario.apellido} ${usuario.email}`
          .toLocaleLowerCase()
          .includes(texto);
      const coincideRol = !rol || usuario.roles.some((usuarioRol) => usuarioRol === rol);
      const coincideEstado =
        estado === '' || usuario.activo === (estado === true || estado === 'true');

      return coincideTexto && coincideRol && coincideEstado;
    });

    this.totalPaginas.set(Math.ceil(usuariosFiltrados.length / this.limite));
    const ultimaPagina = Math.max(this.totalPaginas(), 1);
    if (this.paginaActual() > ultimaPagina) {
      this.paginaActual.set(ultimaPagina);
    }

    const inicio = (this.paginaActual() - 1) * this.limite;
    this.listaUsuarios.set(usuariosFiltrados.slice(inicio, inicio + this.limite));
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
    this.rolEditado = usuario.roles?.includes('administrador') ? 'administrador' : 'profesor';
    this.mensaje.set('');
  }

  cancelarEdicion() {
    this.usuarioEditando.set(null);
    this.nombreEditado = '';
    this.apellidoEditado = '';
    this.emailEditado = '';
    this.rolEditado = 'profesor';
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

    const rolActual = usuario.roles?.includes('administrador') ? 'administrador' : 'profesor';
    if (usuario.id === this.usuarioLogueadoId() && this.rolEditado !== rolActual) {
      this.mensaje.set('No podés cambiar tu propio rol desde la administración de usuarios.');
      return;
    }

    this.usuarioService.actualizarUsuarioAdmin(usuario.id, {
      nombre,
      apellido,
      email,
      rol: this.rolEditado,
    }).subscribe({
      next: () => {
        this.mensaje.set('Usuario actualizado correctamente.');
        this.cancelarEdicion();
        this.cargarUsuarios();
      },
      error: (error: HttpErrorResponse) =>
        this.mensaje.set(error.error?.mensaje ?? 'No se pudo actualizar el usuario.'),
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
      },
      error: (error: HttpErrorResponse) =>
        this.mensaje.set(error.error?.mensaje ?? 'No se pudo eliminar el usuario.'),
    });
  }

  reactivar() {
    const usuario = this.usuarioSeleccionado();
    if (!usuario) return;

    this.usuarioService.reactivarById(String(usuario.id)).subscribe({
      next: () => {
        this.usuarioSeleccionado.set(null);
        this.mensaje.set('Usuario reactivado correctamente.');
        this.cargarUsuarios();
      },
      error: (error: HttpErrorResponse) =>
        this.mensaje.set(error.error?.mensaje ?? 'No se pudo reactivar el usuario.'),
    });
  }

  seleccionadoIgualLogueado(): boolean {
    const usuarioId = this.usuarioSeleccionado()?.id;
    const usuarioLogueadoId = this.usuarioLogueadoId();
    return usuarioLogueadoId === null || usuarioId === usuarioLogueadoId;
  }

  esUsuarioLogueado(usuario: Usuario): boolean {
    return usuario.id === this.usuarioLogueadoId();
  }
}
