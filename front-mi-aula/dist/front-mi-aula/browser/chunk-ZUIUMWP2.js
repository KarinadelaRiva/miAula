import {
  Solicitud
} from "./chunk-QMBGUYZJ.js";
import {
  AuthService
} from "./chunk-PLPPL4DU.js";
import {
  Router,
  RouterModule,
  RouterOutlet
} from "./chunk-IRPFJV3S.js";
import {
  CommonModule
} from "./chunk-7FGDNYX4.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3OUMOY5R.js";

// src/app/pages/dashboard/dashboard.component.ts
function DashboardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Rol:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.usuario().rol);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.usuario().email);
  }
}
function DashboardComponent_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.pendingSolicitudes);
  }
}
function DashboardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/solicitudes"));
    });
    \u0275\u0275element(1, "img", 6);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Gestor Solicitudes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Administrar solicitudes de cambio de aula");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DashboardComponent_Conditional_9_Conditional_6_Template, 2, 1, "div", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/reservas-todas"));
    });
    \u0275\u0275element(8, "img", 9);
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10, "Ver Todas las Reservas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Administrar todas las reservas del sistema");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/gestionUsuarios"));
    });
    \u0275\u0275element(14, "img", 10);
    \u0275\u0275elementStart(15, "h3");
    \u0275\u0275text(16, "Gesti\xF3n de Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p");
    \u0275\u0275text(18, "Administrar profesores y permisos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_19_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/coming-soon"));
    });
    \u0275\u0275element(20, "img", 11);
    \u0275\u0275elementStart(21, "h3");
    \u0275\u0275text(22, "Gesti\xF3n de Espacios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Administrar aulas y laboratorios");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_25_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/coming-soon"));
    });
    \u0275\u0275element(26, "img", 12);
    \u0275\u0275elementStart(27, "h3");
    \u0275\u0275text(28, "Gesti\xF3n de Comisiones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p");
    \u0275\u0275text(30, "Administrar comisiones y asignaturas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_9_Template_div_click_31_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/coming-soon"));
    });
    \u0275\u0275element(32, "img", 13);
    \u0275\u0275elementStart(33, "h3");
    \u0275\u0275text(34, "Gesti\xF3n de Carreras");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36, "Administrar planes de estudio");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.pendingSolicitudes > 0 ? 6 : -1);
  }
}
function DashboardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/solicitud/nueva"));
    });
    \u0275\u0275element(1, "img", 14);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Solicitar Reserva");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Realizar una nueva solicitud de reserva de aula");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_10_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/solicitud/mis-solicitudes"));
    });
    \u0275\u0275element(7, "img", 6);
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9, "Mis Solicitudes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Ver historial de solicitudes realizadas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_10_Template_div_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/mis-reservas"));
    });
    \u0275\u0275element(13, "img", 9);
    \u0275\u0275elementStart(14, "h3");
    \u0275\u0275text(15, "Ver Mis Reservas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "Ver mis clases programadas ordenadas por estado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_10_Template_div_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateTo("/coming-soon"));
    });
    \u0275\u0275element(19, "img", 12);
    \u0275\u0275elementStart(20, "h3");
    \u0275\u0275text(21, "Mis Comisiones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23, "Ver comisiones asignadas");
    \u0275\u0275elementEnd()();
  }
}
var DashboardComponent = class _DashboardComponent {
  auth = inject(AuthService);
  router = inject(Router);
  solicitudService = inject(Solicitud);
  usuario = computed(() => {
    const user = this.auth.infoUsuario();
    return user.id === "" ? null : user;
  }, ...ngDevMode ? [{ debugName: "usuario" }] : []);
  // Simulamos solicitudes pendientes - después se conectará con el servicio real
  pendingCount = signal(0, ...ngDevMode ? [{ debugName: "pendingCount" }] : []);
  get pendingSolicitudes() {
    return this.pendingCount();
  }
  constructor() {
    this.solicitudService.getSolicitudes().subscribe((sols) => {
      if (!sols) {
        this.pendingCount.set(0);
        return;
      }
      const pending = sols.filter((s) => s.estado === "PENDIENTE").length;
      this.pendingCount.set(pending);
    });
  }
  navigateTo(path) {
    if (!path || path === "" || path === "#") {
      this.router.navigate(["/coming-soon"]);
      return;
    }
    this.router.navigate([path]);
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 12, vars: 4, consts: [[1, "dashboard-container"], [1, "welcome-section"], [1, "user-info"], [1, "actions-section"], [1, "action-cards"], [1, "action-card", "solicitudes", 3, "click"], ["src", "Solicitudes.png", "alt", "Icono de solicitudes", 1, "card-icon"], [1, "notification-badge"], [1, "action-card", 3, "click"], ["src", "Reservas.png", "alt", "Icono de reservas", 1, "card-icon"], ["src", "Usuarios.png", "alt", "Icono de usuarios", 1, "card-icon"], ["src", "Espacios.png", "alt", "Icono de espacios", 1, "card-icon"], ["src", "Comisiones.png", "alt", "Icono de comisiones", 1, "card-icon"], ["src", "Carreras.png", "alt", "Icono de carreras", 1, "card-icon"], ["src", "Solicita reserva.png", "alt", "Icono de solicitar reserva", 1, "card-icon"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Sistema de Gesti\xF3n de Aulas - UTN Regional MdP");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, DashboardComponent_Conditional_6_Template, 9, 2, "div", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 3)(8, "div", 4);
      \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_9_Template, 37, 1);
      \u0275\u0275conditionalCreate(10, DashboardComponent_Conditional_10_Template, 24, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(11, "router-outlet");
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_2_0;
      let tmp_3_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("\xA1Bienvenido/a, ", (tmp_0_0 = ctx.usuario()) == null ? null : tmp_0_0.nombre, "!");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.usuario() ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(((tmp_2_0 = ctx.usuario()) == null ? null : tmp_2_0.rol) === "ADMIN" ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_3_0 = ctx.usuario()) == null ? null : tmp_3_0.rol) === "PROFESOR" ? 10 : -1);
    }
  }, dependencies: [CommonModule, RouterModule, RouterOutlet], styles: ['\n\n.dashboard-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n  background: #ffffff;\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.dev-note[_ngcontent-%COMP%] {\n  color: #666;\n  display: block;\n  margin-top: 4px;\n  font-size: 0.85rem;\n}\n.welcome-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 3rem;\n  color: #0b3d91;\n}\n.welcome-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #0b3d91;\n  text-shadow: none;\n}\n.welcome-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  opacity: 0.95;\n  margin-bottom: 1.5rem;\n  color: #33485a;\n}\n.user-info[_ngcontent-%COMP%] {\n  background: #f8fbff;\n  border-radius: 15px;\n  padding: 1rem 2rem;\n  margin: 1rem auto;\n  max-width: 400px;\n  border: 1px solid rgba(11, 61, 145, 0.06);\n  box-shadow: 0 6px 18px rgba(11, 61, 145, 0.03);\n}\n.user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  font-size: 1rem;\n  color: #33485a;\n}\n.actions-section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.action-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 1.5rem;\n  margin: 0 auto;\n  align-items: stretch;\n}\n.action-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(11, 61, 145, 0.06);\n  position: relative;\n  overflow: hidden;\n  flex: 0 0 320px;\n  max-width: 320px;\n  min-height: 260px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 45px rgba(11, 61, 145, 0.08);\n  background: #f1f6ff;\n}\n.action-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      #4e8ef7,\n      #0b3d91);\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: auto;\n  height: 48px;\n  margin: 0 auto 1rem;\n  filter: drop-shadow(0 4px 10px rgba(11, 61, 145, 0.08));\n}\n.action-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #0b3d91;\n  font-size: 1.3rem;\n  font-weight: 600;\n  margin-bottom: 0.8rem;\n}\n.action-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  margin: 0;\n}\n.action-card.solicitudes[_ngcontent-%COMP%] {\n  position: relative;\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: #ff1111;\n  color: white;\n  border-radius: 50%;\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n  font-weight: bold;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    box-shadow: 0 0 0 0 rgba(194, 28, 28, 0.7);\n  }\n  70% {\n    box-shadow: 0 0 0 10px rgba(194, 28, 28, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(194, 28, 28, 0);\n  }\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 2rem;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 1rem 2.5rem;\n  border: none;\n  border-radius: 25px;\n  font-size: 1.1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  background: #ffffff;\n  color: #0b3d91;\n  border: 2px solid rgba(11, 61, 145, 0.12);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #eaf2ff;\n  transform: translateY(-3px);\n  box-shadow: 0 8px 25px rgba(11, 61, 145, 0.08);\n  border-color: rgba(11, 61, 145, 0.2);\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .welcome-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .action-cards[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n  }\n  .action-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    flex: 0 0 100%;\n    max-width: 100%;\n    width: 100%;\n    height: 220px;\n    min-height: 220px;\n    box-sizing: border-box;\n    overflow: auto;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .action-card[_ngcontent-%COMP%] {\n    flex: 0 0 300px;\n    max-width: 300px;\n    min-height: 260px;\n  }\n  .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 300px;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="dashboard-container">\r
  <div class="welcome-section">\r
    <h1>\xA1Bienvenido/a, {{ usuario()?.nombre }}!</h1>\r
    <p>Sistema de Gesti\xF3n de Aulas - UTN Regional MdP</p>\r
    \r
    @if (usuario()) {\r
      <div class="user-info">\r
        <p><strong>Rol:</strong> {{ usuario()!.rol }}</p>\r
        <p><strong>Email:</strong> {{ usuario()!.email }}</p>\r
      </div>\r
    }\r
  </div>\r
\r
  <div class="actions-section">\r
    <div class="action-cards">\r
      <!-- Cards para ADMIN -->\r
      @if (usuario()?.rol === 'ADMIN') {\r
                \r
        <div class="action-card solicitudes" (click)="navigateTo('/solicitudes')">\r
          <img class="card-icon" src="Solicitudes.png" alt="Icono de solicitudes"/>\r
          <h3>Gestor Solicitudes</h3>\r
          <p>Administrar solicitudes de cambio de aula</p>\r
          @if (pendingSolicitudes > 0) {\r
            <div class="notification-badge">{{ pendingSolicitudes }}</div>\r
          }\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/reservas-todas')">\r
          <img class="card-icon" src="Reservas.png" alt="Icono de reservas"/>\r
          <h3>Ver Todas las Reservas</h3>\r
          <p>Administrar todas las reservas del sistema</p>\r
        </div>\r
        \r
  <div class="action-card" (click)="navigateTo('/gestionUsuarios')">\r
          <img class="card-icon" src="Usuarios.png" alt="Icono de usuarios"/>\r
          <h3>Gesti\xF3n de Usuarios</h3>\r
          <p>Administrar profesores y permisos</p>\r
        </div>\r
        \r
        <div class="action-card" (click)="navigateTo('/coming-soon')">\r
          <img class="card-icon" src="Espacios.png" alt="Icono de espacios"/>\r
          <h3>Gesti\xF3n de Espacios</h3>\r
          <p>Administrar aulas y laboratorios</p>\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/coming-soon')">\r
          <img class="card-icon" src="Comisiones.png" alt="Icono de comisiones"/>\r
          <h3>Gesti\xF3n de Comisiones</h3>\r
          <p>Administrar comisiones y asignaturas</p>\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/coming-soon')">\r
          <img class="card-icon" src="Carreras.png" alt="Icono de carreras"/>\r
          <h3>Gesti\xF3n de Carreras</h3>\r
          <p>Administrar planes de estudio</p>\r
        </div>\r
      }\r
      \r
      <!-- Cards para PROFESOR -->\r
      @if (usuario()?.rol === 'PROFESOR') {\r
        <div class="action-card" (click)="navigateTo('/solicitud/nueva')">\r
          <img class="card-icon" src="Solicita reserva.png" alt="Icono de solicitar reserva"/>\r
          <h3>Solicitar Reserva</h3>\r
          <p>Realizar una nueva solicitud de reserva de aula</p>\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/solicitud/mis-solicitudes')">\r
          <img class="card-icon" src="Solicitudes.png" alt="Icono de solicitudes"/>\r
          <h3>Mis Solicitudes</h3>\r
          <p>Ver historial de solicitudes realizadas</p>\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/mis-reservas')">\r
          <img class="card-icon" src="Reservas.png" alt="Icono de reservas"/>\r
          <h3>Ver Mis Reservas</h3>\r
          <p>Ver mis clases programadas ordenadas por estado</p>\r
        </div>\r
\r
        <div class="action-card" (click)="navigateTo('/coming-soon')">\r
          <img class="card-icon" src="Comisiones.png" alt="Icono de comisiones"/>\r
          <h3>Mis Comisiones</h3>\r
          <p>Ver comisiones asignadas</p>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
<!-- Router outlet to render nested dashboard routes (e.g. gesti\xF3n de usuarios) -->\r
<router-outlet></router-outlet>`, styles: ['/* src/app/pages/dashboard/dashboard.component.css */\n.dashboard-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n  background: #ffffff;\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.dev-note {\n  color: #666;\n  display: block;\n  margin-top: 4px;\n  font-size: 0.85rem;\n}\n.welcome-section {\n  text-align: center;\n  margin-bottom: 3rem;\n  color: #0b3d91;\n}\n.welcome-section h1 {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #0b3d91;\n  text-shadow: none;\n}\n.welcome-section p {\n  font-size: 1.2rem;\n  opacity: 0.95;\n  margin-bottom: 1.5rem;\n  color: #33485a;\n}\n.user-info {\n  background: #f8fbff;\n  border-radius: 15px;\n  padding: 1rem 2rem;\n  margin: 1rem auto;\n  max-width: 400px;\n  border: 1px solid rgba(11, 61, 145, 0.06);\n  box-shadow: 0 6px 18px rgba(11, 61, 145, 0.03);\n}\n.user-info p {\n  margin: 0.5rem 0;\n  font-size: 1rem;\n  color: #33485a;\n}\n.actions-section {\n  margin-bottom: 3rem;\n}\n.action-cards {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 1.5rem;\n  margin: 0 auto;\n  align-items: stretch;\n}\n.action-card {\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);\n  border: 1px solid rgba(11, 61, 145, 0.06);\n  position: relative;\n  overflow: hidden;\n  flex: 0 0 320px;\n  max-width: 320px;\n  min-height: 260px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.action-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 45px rgba(11, 61, 145, 0.08);\n  background: #f1f6ff;\n}\n.action-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      #4e8ef7,\n      #0b3d91);\n}\n.card-icon {\n  width: auto;\n  height: 48px;\n  margin: 0 auto 1rem;\n  filter: drop-shadow(0 4px 10px rgba(11, 61, 145, 0.08));\n}\n.action-card h3 {\n  color: #0b3d91;\n  font-size: 1.3rem;\n  font-weight: 600;\n  margin-bottom: 0.8rem;\n}\n.action-card p {\n  color: #6c757d;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  margin: 0;\n}\n.action-card.solicitudes {\n  position: relative;\n}\n.notification-badge {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: #ff1111;\n  color: white;\n  border-radius: 50%;\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n  font-weight: bold;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% {\n    box-shadow: 0 0 0 0 rgba(194, 28, 28, 0.7);\n  }\n  70% {\n    box-shadow: 0 0 0 10px rgba(194, 28, 28, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(194, 28, 28, 0);\n  }\n}\n.quick-actions {\n  display: flex;\n  justify-content: center;\n  margin-top: 2rem;\n}\n.btn-secondary {\n  padding: 1rem 2.5rem;\n  border: none;\n  border-radius: 25px;\n  font-size: 1.1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  background: #ffffff;\n  color: #0b3d91;\n  border: 2px solid rgba(11, 61, 145, 0.12);\n}\n.btn-secondary:hover {\n  background: #eaf2ff;\n  transform: translateY(-3px);\n  box-shadow: 0 8px 25px rgba(11, 61, 145, 0.08);\n  border-color: rgba(11, 61, 145, 0.2);\n}\n.icon {\n  font-size: 1.1rem;\n}\n@media (max-width: 768px) {\n  .dashboard-container {\n    padding: 1rem;\n  }\n  .welcome-section h1 {\n    font-size: 2rem;\n  }\n  .action-cards {\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n  }\n  .action-card {\n    padding: 1.5rem;\n    flex: 0 0 100%;\n    max-width: 100%;\n    width: 100%;\n    height: 220px;\n    min-height: 220px;\n    box-sizing: border-box;\n    overflow: auto;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .action-card {\n    flex: 0 0 300px;\n    max-width: 300px;\n    min-height: 260px;\n  }\n  .btn-secondary {\n    width: 100%;\n    max-width: 300px;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 14 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-ZUIUMWP2.js.map
