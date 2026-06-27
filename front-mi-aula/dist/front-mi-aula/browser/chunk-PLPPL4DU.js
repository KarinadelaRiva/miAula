import {
  HttpClient
} from "./chunk-7FGDNYX4.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3OUMOY5R.js";

// src/app/services/usuario-service/usuario-service.ts
var UsuarioService = class _UsuarioService {
  http = inject(HttpClient);
  baseDatosUrl = "http://localhost:3000/usuarios";
  getAll() {
    return this.http.get(this.baseDatosUrl);
  }
  getUsuarioById(id) {
    return this.http.get(`${this.baseDatosUrl}/${id}`);
  }
  getUsuarioByEmail(email) {
    return this.http.get(`${this.baseDatosUrl}?email=${email}`);
  }
  actualizarUsuario(usuario) {
    return this.http.put(`${this.baseDatosUrl}/${usuario.id}`, usuario);
  }
  actualizarPassword(id, password) {
    return this.http.patch(`${this.baseDatosUrl}/${id}`, { password });
  }
  eliminarById(id) {
    return this.http.patch(`${this.baseDatosUrl}/${id}`, { activo: false });
  }
  reactivarById(id) {
    return this.http.patch(`${this.baseDatosUrl}/${id}`, { activo: true });
  }
  crear(usuario) {
    const usuarioNuevo = __spreadProps(__spreadValues({}, usuario), {
      activo: true
    });
    return this.http.post(this.baseDatosUrl, usuarioNuevo);
  }
  convertirRol(rol) {
    const rolMayus = rol.toUpperCase();
    if (rolMayus === "ADMIN") {
      return "ADMIN";
    }
    return "PROFESOR";
  }
  obtenerUsuariosPaginados(pagina, limite, filtroTexto, filtroRol, filtroActivo) {
    let params = "";
    if (filtroRol && filtroRol !== "") {
      params += `rol=${filtroRol}`;
    }
    if (filtroActivo !== void 0) {
      params += params ? "&" : "";
      params += `activo=${filtroActivo}`;
    }
    const url = params ? `${this.baseDatosUrl}?${params}` : this.baseDatosUrl;
    return this.http.get(url, { observe: "response" }).pipe(map((response) => {
      let usuarios = response.body || [];
      if (filtroTexto && filtroTexto.trim() !== "") {
        const textoLower = filtroTexto.toLowerCase();
        usuarios = usuarios.filter((u) => u.nombre.toLowerCase().includes(textoLower) || u.apellido.toLowerCase().includes(textoLower) || u.email.toLowerCase().includes(textoLower));
      }
      const inicio = (pagina - 1) * limite;
      const fin = inicio + limite;
      const usuariosPaginados = usuarios.slice(inicio, fin);
      return {
        usuarios: usuariosPaginados,
        total: usuarios.length
      };
    }));
  }
  static \u0275fac = function UsuarioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuarioService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsuarioService, factory: _UsuarioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuarioService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/auth/errores/AuthError.ts
var AuthError = class _AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
  static CredencialesInvalidas() {
    return new _AuthError("La contrase\xF1a es incorrecta");
  }
  static UsuarioNoRegistrado() {
    return new _AuthError("El correo electr\xF3nico que ingresaste no est\xE1 conectado a una cuenta");
  }
  static UsuarioEliminado() {
    return new _AuthError("El usuario registrado con este email ha sido eliminado");
  }
};

// src/app/auth/service/auth-service.ts
var AuthService = class _AuthService {
  usuarioService = inject(UsuarioService);
  usuarioLogueado = signal(false, ...ngDevMode ? [{ debugName: "usuarioLogueado" }] : []);
  infoUsuario = signal({
    id: "",
    apellido: "",
    nombre: "",
    rol: void 0,
    email: "",
    activo: false
  }, ...ngDevMode ? [{ debugName: "infoUsuario" }] : []);
  constructor() {
    this.limpiarSesion();
  }
  cargarSesion() {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuarioLogueado.set(true);
        this.infoUsuario.set(usuario);
      } catch (error) {
        localStorage.removeItem("usuario");
      }
    }
  }
  limpiarSesion() {
    localStorage.removeItem("usuario");
    this.usuarioLogueado.set(false);
    this.usuarioReset();
  }
  guardarSesion(usuario) {
    const usuarioParaGuardar = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      activo: usuario.activo
    };
    localStorage.setItem("usuario", JSON.stringify(usuarioParaGuardar));
  }
  actualizarInfoUsuario(usuario) {
    return this.usuarioService.actualizarUsuario(usuario).pipe(tap((usuarioActualizado) => {
      this.infoUsuario.set({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        activo: usuario.activo
      });
      this.guardarSesion(usuarioActualizado);
    }));
  }
  validarCredenciales(credenciales) {
    console.log("validar credenciales");
    return this.usuarioService.getUsuarioByEmail(credenciales.email).pipe(map((usuarios) => {
      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        if (!usuario.activo) {
          throw AuthError.UsuarioEliminado();
        }
        if (usuario.password === credenciales.password) {
          return usuario;
        } else {
          throw AuthError.CredencialesInvalidas();
        }
      }
      throw AuthError.UsuarioNoRegistrado();
    }), tap((usuario) => {
      console.log("guardar datos de sesion");
      this.usuarioLogueado.set(true);
      this.infoUsuario.set(usuario);
      this.guardarSesion(usuario);
    }));
  }
  validarPassword(password1, password2) {
    if (password1 === password2) {
      return true;
    }
    return false;
  }
  esAdmin() {
    const usuario = this.infoUsuario();
    return usuario?.rol === "ADMIN";
  }
  logout() {
    this.usuarioLogueado.set(false);
    this.usuarioReset();
    localStorage.removeItem("usuario");
  }
  usuarioReset() {
    this.infoUsuario.set({
      id: "",
      apellido: "",
      nombre: "",
      rol: void 0,
      email: "",
      activo: false
    });
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  UsuarioService,
  AuthService
};
//# sourceMappingURL=chunk-PLPPL4DU.js.map
