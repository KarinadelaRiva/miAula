import {
  AuthService
} from "./chunk-PLPPL4DU.js";
import {
  ReservaService
} from "./chunk-H3KRVU2N.js";
import {
  RouterLink
} from "./chunk-IRPFJV3S.js";
import {
  CommonModule
} from "./chunk-7FGDNYX4.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3OUMOY5R.js";

// src/app/pages/gestor-reservas/gestor-reservas.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function GestorReservasComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 13);
    \u0275\u0275listener("click", function GestorReservasComponent_For_14_Template_article_click_0_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r2));
    })("keydown.enter", function GestorReservasComponent_For_14_Template_article_keydown_enter_0_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r2));
    })("keydown.space", function GestorReservasComponent_For_14_Template_article_keydown_space_0_listener($event) {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r2));
    });
    \u0275\u0275elementStart(1, "div", 14)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "span", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 17)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 18)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 19)(16, "strong");
    \u0275\u0275text(17, "Aula:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 20)(20, "strong");
    \u0275\u0275text(21, "Profesor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 21)(24, "div", 22)(25, "span", 23);
    \u0275\u0275text(26, "ACTIVA");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.asignatura);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.dia);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(r_r2.fecha_inicio), " - ", ctx_r2.formatHora(r_r2.fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(r_r2.fecha_inicio), " - ", ctx_r2.formatFecha(r_r2.fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", r_r2.espacio);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", r_r2.profesor);
  }
}
function GestorReservasComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "No hay reservas activas");
    \u0275\u0275elementEnd();
  }
}
function GestorReservasComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 13);
    \u0275\u0275listener("click", function GestorReservasComponent_For_24_Template_article_click_0_listener() {
      const r_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r5));
    })("keydown.enter", function GestorReservasComponent_For_24_Template_article_keydown_enter_0_listener() {
      const r_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r5));
    })("keydown.space", function GestorReservasComponent_For_24_Template_article_keydown_space_0_listener($event) {
      const r_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(r_r5));
    });
    \u0275\u0275elementStart(1, "div", 14)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "span", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 17)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 18)(12, "strong");
    \u0275\u0275text(13, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 19)(16, "strong");
    \u0275\u0275text(17, "Aula:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 20)(20, "strong");
    \u0275\u0275text(21, "Profesor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 21)(24, "div", 22)(25, "span", 24);
    \u0275\u0275text(26, "FINALIZADA");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r5.asignatura);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r5.dia);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(r_r5.fecha_inicio), " - ", ctx_r2.formatHora(r_r5.fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatFecha(r_r5.fecha_inicio));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", r_r5.espacio);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", r_r5.profesor);
  }
}
function GestorReservasComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "No hay reservas pasadas");
    \u0275\u0275elementEnd();
  }
}
function GestorReservasComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function GestorReservasComponent_Conditional_26_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275listener("click", function GestorReservasComponent_Conditional_26_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 27)(3, "h2");
    \u0275\u0275text(4, "Detalle de Reserva");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function GestorReservasComponent_Conditional_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29)(8, "div", 30)(9, "h3");
    \u0275\u0275text(10, "Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Asignatura:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p")(16, "strong");
    \u0275\u0275text(17, "Comisi\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p")(20, "strong");
    \u0275\u0275text(21, "Profesor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p")(24, "strong");
    \u0275\u0275text(25, "Aula:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 30)(28, "h3");
    \u0275\u0275text(29, "Horarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p")(31, "strong");
    \u0275\u0275text(32, "D\xEDa:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p")(35, "strong");
    \u0275\u0275text(36, "Hora inicio:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p")(39, "strong");
    \u0275\u0275text(40, "Hora fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p")(43, "strong");
    \u0275\u0275text(44, "Fecha inicio:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "p")(47, "strong");
    \u0275\u0275text(48, "Fecha fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 30)(51, "h3");
    \u0275\u0275text(52, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "p")(54, "strong");
    \u0275\u0275text(55, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(57, "footer", 31)(58, "button", 32);
    \u0275\u0275listener("click", function GestorReservasComponent_Conditional_26_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275text(59, "Cerrar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().asignatura);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().comision);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().profesor);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().espacio);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().dia);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatHora(ctx_r2.selectedReserva().fecha_inicio));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatHora(ctx_r2.selectedReserva().fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatFecha(ctx_r2.selectedReserva().fecha_inicio));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatFecha(ctx_r2.selectedReserva().fecha_fin));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedReserva().estado);
  }
}
var GestorReservasComponent = class _GestorReservasComponent {
  reservaService = inject(ReservaService);
  authService = inject(AuthService);
  // Señales para las reservas separadas por estado
  reservas = signal([], ...ngDevMode ? [{ debugName: "reservas" }] : []);
  activas = signal([], ...ngDevMode ? [{ debugName: "activas" }] : []);
  pasadas = signal([], ...ngDevMode ? [{ debugName: "pasadas" }] : []);
  // Reserva seleccionada para ver detalles
  _selectedReserva = signal(null, ...ngDevMode ? [{ debugName: "_selectedReserva" }] : []);
  ngOnInit() {
    this.cargarReservas();
  }
  cargarReservas() {
    this.reservaService.getReservasParaCalendario().subscribe({
      next: (reservas) => {
        console.log("\u{1F4CA} Cargadas", reservas.length, "reservas para gesti\xF3n");
        const reservasCompletas = reservas.map((reserva) => ({
          id: reserva.id || 0,
          dia: reserva.extendedProps?.["dia"] || "",
          fecha_inicio: reserva.start,
          fecha_fin: reserva.end,
          estado: reserva.extendedProps?.["estado"] || "ACTIVA",
          comision: reserva.extendedProps?.["comision"] || "Sin comisi\xF3n",
          espacio: reserva.extendedProps?.["aula"] || "Sin espacio",
          profesor: reserva.extendedProps?.["profesor"] || "Sin profesor",
          asignatura: reserva.extendedProps?.["asignatura"] || "Sin asignatura"
        }));
        this.reservas.set(reservasCompletas);
        this.separarPorEstado(reservasCompletas);
      },
      error: (error) => {
        console.error("\u274C Error cargando reservas:", error);
      }
    });
  }
  separarPorEstado(reservas) {
    const ahora = /* @__PURE__ */ new Date();
    const activas = reservas.filter((r) => {
      const fechaFin = new Date(r.fecha_fin);
      return fechaFin >= ahora;
    });
    const pasadas = reservas.filter((r) => {
      const fechaFin = new Date(r.fecha_fin);
      return fechaFin < ahora;
    });
    this.activas.set(activas);
    this.pasadas.set(pasadas);
    console.log("\u{1F4CB} Reservas activas:", activas.length);
    console.log("\u{1F4CB} Reservas pasadas:", pasadas.length);
  }
  formatFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }
  formatHora(fecha) {
    return new Date(fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  openDetails(reserva) {
    this._selectedReserva.set(reserva);
  }
  closeDetails() {
    this._selectedReserva.set(null);
  }
  selectedReserva() {
    return this._selectedReserva();
  }
  isAdmin() {
    return String(this.authService.infoUsuario().rol) === "ADMIN";
  }
  static \u0275fac = function GestorReservasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GestorReservasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GestorReservasComponent, selectors: [["app-gestor-reservas"]], decls: 27, vars: 5, consts: [[1, "container"], [1, "header"], ["type", "button", "routerLink", "/dashboard", 1, "btn-secondary"], [1, "grid-container", "sector", "activas"], [1, "section-header"], [1, "list-title"], [1, "section-count", "activas-count"], [1, "grid-list"], ["role", "button", "tabindex", "0", 1, "card"], [1, "empty-message"], [1, "grid-container", "sector", "pasadas"], [1, "section-count", "pasadas-count"], [1, "modal-overlay"], ["role", "button", "tabindex", "0", 1, "card", 3, "click", "keydown.enter", "keydown.space"], [1, "card-content"], [1, "meta"], [1, "day"], [1, "horas"], [1, "fechas"], [1, "espacio"], [1, "profesor"], [1, "right"], [1, "card-footer"], [1, "status", "activa"], [1, "status", "pasada"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], ["aria-label", "Cerrar modal", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "detail-section"], [1, "modal-footer"], [1, "btn", "secondary", 3, "click"]], template: function GestorReservasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "h1");
      \u0275\u0275text(3, "Gesti\xF3n de Reservas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275text(5, " \u2190 Volver ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "section", 3)(7, "div", 4)(8, "h2", 5);
      \u0275\u0275text(9, "Reservas Activas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7);
      \u0275\u0275repeaterCreate(13, GestorReservasComponent_For_14_Template, 27, 8, "article", 8, _forTrack0);
      \u0275\u0275conditionalCreate(15, GestorReservasComponent_Conditional_15_Template, 2, 0, "p", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "section", 10)(17, "div", 4)(18, "h2", 5);
      \u0275\u0275text(19, "Reservas Pasadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 11);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 7);
      \u0275\u0275repeaterCreate(23, GestorReservasComponent_For_24_Template, 27, 7, "article", 8, _forTrack0);
      \u0275\u0275conditionalCreate(25, GestorReservasComponent_Conditional_25_Template, 2, 0, "p", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(26, GestorReservasComponent_Conditional_26_Template, 60, 10, "div", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.activas().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.activas());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activas().length === 0 ? 15 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.pasadas().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.pasadas());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.pasadas().length === 0 ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedReserva() ? 26 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ['\n\n[_ngcontent-%COMP%]:root {\n  --bg: #f5f7fb;\n  --card: #ffffff;\n  --muted: #6b7280;\n  --accent: #0366d6;\n  --success: #2a9d8f;\n  --danger: #d9534f;\n  --border: #e6e9ef;\n  --color-primary: var(--accent);\n  --color-primary-dark: #234f86;\n  --color-text-inverse: #ffffff;\n  --color-text-secondary: #475569;\n  --shadow-light: 0 2px 6px rgba(2,6,23,0.08);\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\nbody[_ngcontent-%COMP%] {\n  background: var(--bg);\n  color: #111827;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    "Segoe UI",\n    Roboto,\n    "Helvetica Neue",\n    Arial;\n}\n.header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 2rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n  text-decoration: none;\n  display: inline-block;\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.75rem 0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.list-title[_ngcontent-%COMP%] {\n  margin: .25rem 0 0.75rem;\n  font-size: 1.125rem;\n  color: var(--muted);\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.section-count[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: bold;\n}\n.activas-count[_ngcontent-%COMP%] {\n  background: var(--success);\n}\n.pasadas-count[_ngcontent-%COMP%] {\n  background: var(--muted);\n}\n.grid-list[_ngcontent-%COMP%] {\n  display: block;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: 0.25rem;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 10px;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(15, 23, 42, 0.08);\n  border-radius: 6px;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 23, 42, 0.12);\n}\narticle.card[_ngcontent-%COMP%] {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.9rem;\n  margin-bottom: 0.6rem;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\n  transition: box-shadow .12s ease, transform .08s ease;\n}\narticle.card[_ngcontent-%COMP%]:hover {\n  background: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);\n}\narticle.card[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\narticle.card[_ngcontent-%COMP%]:focus {\n  outline: 3px solid rgba(3, 102, 214, 0.16);\n  outline-offset: 3px;\n}\narticle.card[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.card-content[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  padding-right: 0.75rem;\n}\n.card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1rem;\n  color: #0b1220;\n  display: block;\n  font-weight: 600;\n}\n.meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--muted);\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.meta[_ngcontent-%COMP%]   .fechas[_ngcontent-%COMP%], \n.meta[_ngcontent-%COMP%]   .horas[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.meta[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--color-primary) !important;\n}\n.meta[_ngcontent-%COMP%]   .espacio[_ngcontent-%COMP%], \n.meta[_ngcontent-%COMP%]   .profesor[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.status[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.status.activa[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.status.pasada[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--muted);\n  font-style: italic;\n  padding: 2rem;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: _ngcontent-%COMP%_overlay-fade 160ms ease;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: _ngcontent-%COMP%_modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: var(--shadow-light);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.modal-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  border-bottom: 1px solid var(--border);\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  background: #234f86;\n}\n.btn.secondary[_ngcontent-%COMP%] {\n  background: var(--muted);\n  color: var(--color-text-inverse);\n}\n.btn.secondary[_ngcontent-%COMP%]:hover {\n  background: #5a6268;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .meta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.25rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_modal-pop {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=gestor-reservas.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GestorReservasComponent, [{
    type: Component,
    args: [{ selector: "app-gestor-reservas", standalone: true, imports: [CommonModule, RouterLink], template: '<main class="container">\r\n    <section class="header">\r\n        <h1>Gesti\xF3n de Reservas</h1>\r\n        <button type="button" routerLink="/dashboard" class="btn-secondary">\r\n            \u2190 Volver\r\n        </button>\r\n    </section>\r\n\r\n    <section class="grid-container sector activas">\r\n        <div class="section-header">\r\n            <h2 class="list-title">Reservas Activas</h2>\r\n            <span class="section-count activas-count">{{ activas().length }}</span>\r\n        </div>\r\n        <div class="grid-list">\r\n            @for(r of activas(); track r.id) {\r\n            <article class="card" role="button" tabindex="0" (click)="openDetails(r)" (keydown.enter)="openDetails(r)" (keydown.space)="$event.preventDefault(); openDetails(r)">\r\n                <div class="card-content">\r\n                    <h2>{{ r.asignatura }}</h2>\r\n                    <div class="meta">\r\n                        <span class="day">{{ r.dia }}</span>\r\n                        <span class="horas"><strong>Horario:</strong> {{ formatHora(r.fecha_inicio) }} - {{ formatHora(r.fecha_fin) }}</span>\r\n                        <span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(r.fecha_inicio) }} - {{ formatFecha(r.fecha_fin) }}</span>\r\n                        <span class="espacio"><strong>Aula:</strong> {{ r.espacio }}</span>\r\n                        <span class="profesor"><strong>Profesor:</strong> {{ r.profesor }}</span>\r\n                    </div>\r\n                </div>\r\n                <div class="right">\r\n                    <div class="card-footer">\r\n                        <span class="status activa">ACTIVA</span>\r\n                    </div>\r\n                </div>\r\n            </article>\r\n            }\r\n            @if (activas().length === 0) {\r\n            <p class="empty-message">No hay reservas activas</p>\r\n            }\r\n        </div>\r\n    </section>\r\n\r\n    <section class="grid-container sector pasadas">\r\n        <div class="section-header">\r\n            <h2 class="list-title">Reservas Pasadas</h2>\r\n            <span class="section-count pasadas-count">{{ pasadas().length }}</span>\r\n        </div>\r\n        <div class="grid-list">\r\n            @for(r of pasadas(); track r.id) {\r\n            <article class="card" role="button" tabindex="0" (click)="openDetails(r)" (keydown.enter)="openDetails(r)" (keydown.space)="$event.preventDefault(); openDetails(r)">\r\n                <div class="card-content">\r\n                    <h2>{{ r.asignatura }}</h2>\r\n                    <div class="meta">\r\n                        <span class="day">{{ r.dia }}</span>\r\n                        <span class="horas"><strong>Horario:</strong> {{ formatHora(r.fecha_inicio) }} - {{ formatHora(r.fecha_fin) }}</span>\r\n                        <span class="fechas"><strong>Fecha:</strong> {{ formatFecha(r.fecha_inicio) }}</span>\r\n                        <span class="espacio"><strong>Aula:</strong> {{ r.espacio }}</span>\r\n                        <span class="profesor"><strong>Profesor:</strong> {{ r.profesor }}</span>\r\n                    </div>\r\n                </div>\r\n                <div class="right">\r\n                    <div class="card-footer">\r\n                        <span class="status pasada">FINALIZADA</span>\r\n                    </div>\r\n                </div>\r\n            </article>\r\n            }\r\n            @if (pasadas().length === 0) {\r\n            <p class="empty-message">No hay reservas pasadas</p>\r\n            }\r\n        </div>\r\n    </section>\r\n\r\n    <!-- Modal para detalles de reserva -->\r\n    @if (selectedReserva()) {\r\n    <div class="modal-overlay" (click)="closeDetails()">\r\n        <div class="modal-content" (click)="$event.stopPropagation()">\r\n            <header class="modal-header">\r\n                <h2>Detalle de Reserva</h2>\r\n                <button class="btn-close" (click)="closeDetails()" aria-label="Cerrar modal">&times;</button>\r\n            </header>\r\n            \r\n            <div class="modal-body">\r\n                <div class="detail-section">\r\n                    <h3>Informaci\xF3n General</h3>\r\n                    <p><strong>Asignatura:</strong> {{ selectedReserva()!.asignatura }}</p>\r\n                    <p><strong>Comisi\xF3n:</strong> {{ selectedReserva()!.comision }}</p>\r\n                    <p><strong>Profesor:</strong> {{ selectedReserva()!.profesor }}</p>\r\n                    <p><strong>Aula:</strong> {{ selectedReserva()!.espacio }}</p>\r\n                </div>\r\n                \r\n                <div class="detail-section">\r\n                    <h3>Horarios</h3>\r\n                    <p><strong>D\xEDa:</strong> {{ selectedReserva()!.dia }}</p>\r\n                    <p><strong>Hora inicio:</strong> {{ formatHora(selectedReserva()!.fecha_inicio) }}</p>\r\n                    <p><strong>Hora fin:</strong> {{ formatHora(selectedReserva()!.fecha_fin) }}</p>\r\n                    <p><strong>Fecha inicio:</strong> {{ formatFecha(selectedReserva()!.fecha_inicio) }}</p>\r\n                    <p><strong>Fecha fin:</strong> {{ formatFecha(selectedReserva()!.fecha_fin) }}</p>\r\n                </div>\r\n                \r\n                <div class="detail-section">\r\n                    <h3>Estado</h3>\r\n                    <p><strong>Estado:</strong> {{ selectedReserva()!.estado }}</p>\r\n                </div>\r\n            </div>\r\n\r\n            <footer class="modal-footer">\r\n                <button class="btn secondary" (click)="closeDetails()">Cerrar</button>\r\n            </footer>\r\n        </div>\r\n    </div>\r\n    }\r\n</main>', styles: ['/* src/app/pages/gestor-reservas/gestor-reservas.component.css */\n:root {\n  --bg: #f5f7fb;\n  --card: #ffffff;\n  --muted: #6b7280;\n  --accent: #0366d6;\n  --success: #2a9d8f;\n  --danger: #d9534f;\n  --border: #e6e9ef;\n  --color-primary: var(--accent);\n  --color-primary-dark: #234f86;\n  --color-text-inverse: #ffffff;\n  --color-text-secondary: #475569;\n  --shadow-light: 0 2px 6px rgba(2,6,23,0.08);\n}\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\nbody {\n  background: var(--bg);\n  color: #111827;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    "Segoe UI",\n    Roboto,\n    "Helvetica Neue",\n    Arial;\n}\n.header {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header h1 {\n  color: var(--color-primary);\n  font-size: 2rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header .btn-secondary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n  text-decoration: none;\n  display: inline-block;\n}\n.header .btn-secondary:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container {\n  display: block;\n  padding: 0.75rem 0;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.list-title {\n  margin: .25rem 0 0.75rem;\n  font-size: 1.125rem;\n  color: var(--muted);\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.section-count {\n  background: var(--color-primary);\n  color: white;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: bold;\n}\n.activas-count {\n  background: var(--success);\n}\n.pasadas-count {\n  background: var(--muted);\n}\n.grid-list {\n  display: block;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: 0.25rem;\n}\n.grid-list::-webkit-scrollbar {\n  width: 10px;\n}\n.grid-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n.grid-list::-webkit-scrollbar-thumb {\n  background: rgba(15, 23, 42, 0.08);\n  border-radius: 6px;\n}\n.grid-list::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 23, 42, 0.12);\n}\narticle.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.9rem;\n  margin-bottom: 0.6rem;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\n  transition: box-shadow .12s ease, transform .08s ease;\n}\narticle.card:hover {\n  background: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);\n}\narticle.card {\n  cursor: pointer;\n}\narticle.card:focus {\n  outline: 3px solid rgba(3, 102, 214, 0.16);\n  outline-offset: 3px;\n}\narticle.card:active {\n  transform: translateY(0);\n}\n.card-content {\n  flex: 1 1 auto;\n  padding-right: 0.75rem;\n}\n.card-content h2 {\n  margin: 0 0 0.25rem 0;\n  font-size: 1rem;\n  color: #0b1220;\n  display: block;\n  font-weight: 600;\n}\n.meta {\n  font-size: 0.85rem;\n  color: var(--muted);\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.meta .fechas,\n.meta .horas {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.meta .day {\n  font-weight: 600;\n  color: var(--color-primary) !important;\n}\n.meta .espacio,\n.meta .profesor {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.right {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n.card-footer {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.status {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.status.activa {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.status.pasada {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.empty-message {\n  text-align: center;\n  color: var(--muted);\n  font-style: italic;\n  padding: 2rem;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: overlay-fade 160ms ease;\n}\n.modal-content {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header h2 {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.btn-close {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: var(--shadow-light);\n}\n.modal-body {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body p {\n  margin: 0.5rem 0;\n}\n.modal-body strong {\n  color: var(--color-text-secondary);\n}\n.detail-section {\n  margin-bottom: 2rem;\n}\n.detail-section h3 {\n  color: var(--color-primary);\n  border-bottom: 1px solid var(--border);\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n}\n.modal-footer {\n  padding: 0.75rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn {\n  white-space: nowrap;\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn:hover {\n  background: #234f86;\n}\n.btn.secondary {\n  background: var(--muted);\n  color: var(--color-text-inverse);\n}\n.btn.secondary:hover {\n  background: #5a6268;\n}\n@media (max-width: 768px) {\n  .container {\n    padding: 1rem;\n  }\n  .header {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n  }\n  .section-header {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .meta {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.25rem;\n  }\n}\n@keyframes overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes modal-pop {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=gestor-reservas.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GestorReservasComponent, { className: "GestorReservasComponent", filePath: "src/app/pages/gestor-reservas/gestor-reservas.component.ts", lineNumber: 26 });
})();
export {
  GestorReservasComponent
};
//# sourceMappingURL=chunk-4UCQ6BWB.js.map
