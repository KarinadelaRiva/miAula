import {
  RouterLink,
  RouterModule
} from "./chunk-IRPFJV3S.js";
import "./chunk-7FGDNYX4.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext
} from "./chunk-3OUMOY5R.js";

// src/app/pages/gestion-carreras/gestion-carreras.ts
var GestionCarreras = class _GestionCarreras {
  static \u0275fac = function GestionCarreras_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GestionCarreras)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GestionCarreras, selectors: [["app-gestion-carreras"]], decls: 33, vars: 0, consts: [[1, "gestion-container"], [1, "gestion-card"], [1, "gestion-header"], ["routerLink", "/dashboard", 1, "btn-volver"], [1, "opciones-grid"], [1, "opcion-card"], [1, "opcion-icon", "registrar"], ["xmlns", "http://www.w3.org/2000/svg", "width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M3 6h18"], ["d", "M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"], ["d", "M8 10h8"], ["routerLink", "/gestionCarreras/registrarCarrera", 1, "btn-opcion", "registrar"], [1, "opcion-icon", "administrar"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], ["routerLink", "/gestionCarreras/administracionCarreras", 1, "btn-opcion", "administrar"]], template: function GestionCarreras_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Gesti\xF3n de Carreras");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275text(6, "\u2190 Volver");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(10, "svg", 7);
      \u0275\u0275element(11, "path", 8)(12, "path", 9)(13, "path", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(14, "h3");
      \u0275\u0275text(15, "Registrar Carrera");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Agregar una nueva carrera o plan de estudios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 11);
      \u0275\u0275text(19, " Ir a Registro ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 5)(21, "div", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(22, "svg", 7);
      \u0275\u0275element(23, "path", 13)(24, "circle", 14)(25, "path", 15)(26, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(27, "h3");
      \u0275\u0275text(28, "Administrar Carreras");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p");
      \u0275\u0275text(30, "Gestionar planes y asignaturas por carrera");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 17);
      \u0275\u0275text(32, " Ir a Administraci\xF3n ");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [RouterModule, RouterLink], styles: ["\n\n.gestion-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.gestion-card[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gestion-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 20px;\n}\n.gestion-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.opciones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 40px;\n  margin-top: 0;\n  flex: 1;\n  align-content: center;\n}\n.opcion-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 48px 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.btn-opcion[_ngcontent-%COMP%] {\n  width: 100%;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .gestion-container[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .opciones-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=gestion-carreras.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GestionCarreras, [{
    type: Component,
    args: [{ selector: "app-gestion-carreras", imports: [RouterModule], template: '<div class="gestion-container">\r\n  <div class="gestion-card">\r\n    <div class="gestion-header">\r\n      <h1>Gesti\xF3n de Carreras</h1>\r\n      <button routerLink="/dashboard" class="btn-volver">\u2190 Volver</button>\r\n    </div>\r\n\r\n    <div class="opciones-grid">\r\n      <div class="opcion-card">\r\n        <div class="opcion-icon registrar">\r\n          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n            <path d="M3 6h18"></path>\r\n            <path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"></path>\r\n            <path d="M8 10h8"></path>\r\n          </svg>\r\n        </div>\r\n        <h3>Registrar Carrera</h3>\r\n        <p>Agregar una nueva carrera o plan de estudios</p>\r\n        <button routerLink="/gestionCarreras/registrarCarrera" class="btn-opcion registrar">\r\n          Ir a Registro\r\n        </button>\r\n      </div>\r\n\r\n      <div class="opcion-card">\r\n        <div class="opcion-icon administrar">\r\n          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>\r\n            <circle cx="9" cy="7" r="4"></circle>\r\n            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>\r\n            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>\r\n          </svg>\r\n        </div>\r\n        <h3>Administrar Carreras</h3>\r\n        <p>Gestionar planes y asignaturas por carrera</p>\r\n        <button routerLink="/gestionCarreras/administracionCarreras" class="btn-opcion administrar">\r\n          Ir a Administraci\xF3n\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/pages/gestion-carreras/gestion-carreras.css */\n.gestion-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.gestion-card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gestion-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 20px;\n}\n.gestion-header h1 {\n  color: #2d3748;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.opciones-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 40px;\n  margin-top: 0;\n  flex: 1;\n  align-content: center;\n}\n.opcion-card {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 48px 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.btn-opcion {\n  width: 100%;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .gestion-container {\n    padding: 20px;\n  }\n  .opciones-grid {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=gestion-carreras.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GestionCarreras, { className: "GestionCarreras", filePath: "src/app/pages/gestion-carreras/gestion-carreras.ts", lineNumber: 10 });
})();
export {
  GestionCarreras
};
//# sourceMappingURL=chunk-I35777U6.js.map
