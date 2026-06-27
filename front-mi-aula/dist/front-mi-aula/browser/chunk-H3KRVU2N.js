import {
  HttpClient
} from "./chunk-7FGDNYX4.js";
import {
  Injectable,
  forkJoin,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-3OUMOY5R.js";

// src/app/services/reserva.service.ts
var ReservaService = class _ReservaService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:3000";
  constructor() {
  }
  getReservas() {
    return this.http.get(`${this.baseUrl}/reservas`);
  }
  getEspacios() {
    return this.http.get(`${this.baseUrl}/espacios`);
  }
  getComisiones() {
    return this.http.get(`${this.baseUrl}/comisiones`);
  }
  getAsignaturas() {
    return this.http.get(`${this.baseUrl}/asignaturas`);
  }
  getUsuarios() {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }
  // Obtener reservas formateadas para FullCalendar
  getReservasParaCalendario() {
    return forkJoin({
      reservas: this.getReservas(),
      espacios: this.getEspacios(),
      comisiones: this.getComisiones(),
      asignaturas: this.getAsignaturas(),
      usuarios: this.getUsuarios()
    }).pipe(map(({ reservas, espacios, comisiones, asignaturas, usuarios }) => {
      console.log("\u{1F504} Procesando datos de la API...");
      console.log("\u{1F4CA} Reservas:", reservas.length);
      console.log("\u{1F3EB} Espacios:", espacios.length);
      console.log("\u{1F465} Comisiones:", comisiones.length);
      console.log("\u{1F4DA} Asignaturas:", asignaturas.length);
      console.log("\u{1F468}\u200D\u{1F3EB} Usuarios:", usuarios.length);
      return reservas.map((reserva) => {
        const espacio = espacios.find((e) => e.id === reserva.aula_id.toString());
        const comision = comisiones.find((c) => c.id === reserva.comision_id.toString());
        const asignatura = comision ? asignaturas.find((a) => a.id === comision.asignatura_id.toString()) : null;
        const profesor = comision ? usuarios.find((u) => u.id === comision.usuario_profesor_id.toString()) : null;
        const fechaInicio = /* @__PURE__ */ new Date(`${reserva.fecha_inicio}T${reserva.hora_inicio.split(".")[0]}`);
        const fechaFin = /* @__PURE__ */ new Date(`${reserva.fecha_inicio}T${reserva.hora_fin.split(".")[0]}`);
        const evento = {
          id: reserva.id,
          title: `${asignatura?.nombre_asignatura || "Sin asignatura"} - ${espacio?.nombre || "Sin aula"}`,
          start: fechaInicio.toISOString(),
          end: fechaFin.toISOString(),
          color: this.getColorPorAsignatura(asignatura?.nombre_asignatura || ""),
          extendedProps: {
            asignatura: asignatura?.nombre_asignatura || "Sin asignatura",
            aula: espacio?.nombre || "Sin aula",
            comision: comision?.nombre || "Sin comisi\xF3n",
            profesor: profesor ? `${profesor.nombre} ${profesor.apellido}` : "Sin profesor",
            dia: reserva.dia,
            capacidad: espacio?.capacidad || 0,
            tipoEspacio: espacio?.tipo_espacio || "AULA",
            profesorId: comision?.usuario_profesor_id || null,
            comisionId: reserva.comision_id
          }
        };
        console.log("\u2705 Evento procesado:", evento.title, "en", evento.extendedProps?.["aula"]);
        return evento;
      });
    }));
  }
  getColorPorAsignatura(nombreAsignatura) {
    const nombre = nombreAsignatura.toLowerCase();
    if (nombre.includes("matem\xE1tica") || nombre.includes("matematica") || nombre.includes("\xE1lgebra") || nombre.includes("algebra")) {
      return "#007bff";
    } else if (nombre.includes("f\xEDsica") || nombre.includes("fisica") || nombre.includes("laboratorio")) {
      return "#28a745";
    } else if (nombre.includes("programaci\xF3n") || nombre.includes("programacion") || nombre.includes("algoritmos")) {
      return "#dc3545";
    } else if (nombre.includes("base") || nombre.includes("datos") || nombre.includes("sistemas")) {
      return "#ffc107";
    } else if (nombre.includes("ingl\xE9s") || nombre.includes("ingles")) {
      return "#6f42c1";
    } else if (nombre.includes("qu\xEDmica") || nombre.includes("quimica")) {
      return "#fd7e14";
    } else {
      return "#6c757d";
    }
  }
  static \u0275fac = function ReservaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReservaService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReservaService, factory: _ReservaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReservaService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  ReservaService
};
//# sourceMappingURL=chunk-H3KRVU2N.js.map
