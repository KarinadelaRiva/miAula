import {
  HttpClient
} from "./chunk-7FGDNYX4.js";
import {
  Injectable,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-3OUMOY5R.js";

// src/app/services/solicitud.ts
var Solicitud = class _Solicitud {
  http;
  apiUrl = "http://localhost:3000/solicitudes";
  constructor(http) {
    this.http = http;
  }
  getSolicitudes() {
    return this.http.get(this.apiUrl);
  }
  createSolicitud(solicitud) {
    return this.http.post(this.apiUrl, solicitud);
  }
  updateSolicitud(id, solicitud) {
    return this.http.put(`${this.apiUrl}/${id}`, solicitud);
  }
  cancelarSolicitud(id, solicitud) {
    const payload = { estado: "CANCELADA" };
    return this.http.patch(`${this.apiUrl}/${id}`, payload);
  }
  /**
   * Comprueba si la solicitud puede ser modificada por el usuario actual.
   * Solo el usuario creador y cuando el estado sea 'PENDIENTE'.
   */
  isEditable(solicitud, currentUserId) {
    return String(solicitud?.usuario_id) === String(currentUserId) && solicitud?.estado === "PENDIENTE";
  }
  /**
   * Intenta actualizar la solicitud solo si el usuario está autorizado.
   * Devuelve un error observable si no está permitido.
   */
  updateSolicitudIfAllowed(id, solicitud, currentUserId) {
    if (!this.isEditable(solicitud, currentUserId)) {
      return throwError(() => new Error("No autorizado: solo el creador puede modificar solicitudes en estado PENDIENTE"));
    }
    return this.updateSolicitud(id, solicitud);
  }
  cancelarSolicitudIfAllowed(id, solicitud, currentUserId) {
    if (!this.isEditable(solicitud, currentUserId)) {
      return throwError(() => new Error("No autorizado: solo el creador puede cancelar solicitudes en estado PENDIENTE"));
    }
    return this.cancelarSolicitud(id, solicitud);
  }
  /**
   * Actualiza el estado y comentario de estado de una solicitud (funcionalidad de admin)
   */
  patchEstadoComentario(id, estado, comentario) {
    const payload = {
      estado,
      comentario_estado: comentario
    };
    return this.http.patch(`${this.apiUrl}/${id}`, payload);
  }
  /**
   * Actualiza solo el comentario de estado de una solicitud (funcionalidad de admin)
   */
  patchComentarioEstado(id, comentario) {
    const payload = {
      comentario_estado: comentario
    };
    return this.http.patch(`${this.apiUrl}/${id}`, payload);
  }
  static \u0275fac = function Solicitud_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Solicitud)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Solicitud, factory: _Solicitud.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Solicitud, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  Solicitud
};
//# sourceMappingURL=chunk-QMBGUYZJ.js.map
