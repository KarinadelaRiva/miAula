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

// src/app/pages/gestion-usuarios/gestion-usuarios.ts
var GestionUsuarios = class _GestionUsuarios {
  static \u0275fac = function GestionUsuarios_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GestionUsuarios)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GestionUsuarios, selectors: [["app-gestion-usuarios"]], decls: 34, vars: 0, consts: [[1, "gestion-container"], [1, "gestion-card"], [1, "gestion-header"], ["routerLink", "/dashboard", 1, "btn-volver"], [1, "opciones-grid"], [1, "opcion-card"], [1, "opcion-icon", "registrar"], ["xmlns", "http://www.w3.org/2000/svg", "width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["x1", "19", "y1", "8", "x2", "19", "y2", "14"], ["x1", "22", "y1", "11", "x2", "16", "y2", "11"], ["routerLink", "/gestionUsuarios/registrarUsuario", 1, "btn-opcion", "registrar"], [1, "opcion-icon", "administrar"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], ["routerLink", "/gestionUsuarios/administracionUsuarios", 1, "btn-opcion", "administrar"]], template: function GestionUsuarios_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Gesti\xF3n de Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275text(6, "\u2190 Volver");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(10, "svg", 7);
      \u0275\u0275element(11, "path", 8)(12, "circle", 9)(13, "line", 10)(14, "line", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "h3");
      \u0275\u0275text(16, "Registrar Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18, "Crear una nueva cuenta de usuario en el sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 12);
      \u0275\u0275text(20, " Ir a Registro ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 5)(22, "div", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(23, "svg", 7);
      \u0275\u0275element(24, "path", 14)(25, "circle", 9)(26, "path", 15)(27, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "h3");
      \u0275\u0275text(29, "Administrar Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p");
      \u0275\u0275text(31, "Gestionar usuarios: consultar, eliminar o reactivar cuentas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "button", 17);
      \u0275\u0275text(33, " Ir a Administraci\xF3n ");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [RouterModule, RouterLink], styles: ["\n\n.gestion-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.gestion-card[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gestion-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 20px;\n}\n.gestion-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  background: #4a5568;\n}\n.opciones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 40px;\n  margin-top: 0;\n  flex: 1;\n  align-content: center;\n}\n.opcion-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 48px 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  transition:\n    transform 0.2s,\n    box-shadow 0.2s,\n    border-color 0.2s;\n}\n.opcion-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);\n  border-color: #667eea;\n}\n.opcion-icon[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  transition: transform 0.2s;\n}\n.opcion-card[_ngcontent-%COMP%]:hover   .opcion-icon[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.opcion-icon.registrar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);\n}\n.opcion-icon.administrar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);\n}\n.opcion-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: white;\n}\n.opcion-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.opcion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 0 0 24px 0;\n}\n.btn-opcion[_ngcontent-%COMP%] {\n  width: 100%;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.btn-opcion[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.btn-opcion[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n@media (max-width: 768px) {\n  .gestion-container[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .gestion-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n    margin-bottom: 32px;\n  }\n  .gestion-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .opciones-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n  .opcion-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n}\n/*# sourceMappingURL=gestion-usuarios.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GestionUsuarios, [{
    type: Component,
    args: [{ selector: "app-gestion-usuarios", imports: [RouterModule], template: '<div class="gestion-container">\r\n  <div class="gestion-card">\r\n    <div class="gestion-header">\r\n      <h1>Gesti\xF3n de Usuarios</h1>\r\n      <button routerLink="/dashboard" class="btn-volver">\u2190 Volver</button>\r\n    </div>\r\n\r\n    <div class="opciones-grid">\r\n      <div class="opcion-card">\r\n        <div class="opcion-icon registrar">\r\n          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>\r\n            <circle cx="9" cy="7" r="4"></circle>\r\n            <line x1="19" y1="8" x2="19" y2="14"></line>\r\n            <line x1="22" y1="11" x2="16" y2="11"></line>\r\n          </svg>\r\n        </div>\r\n        <h3>Registrar Usuario</h3>\r\n        <p>Crear una nueva cuenta de usuario en el sistema</p>\r\n        <button routerLink="/gestionUsuarios/registrarUsuario" class="btn-opcion registrar">\r\n          Ir a Registro\r\n        </button>\r\n      </div>\r\n\r\n      <div class="opcion-card">\r\n        <div class="opcion-icon administrar">\r\n          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>\r\n            <circle cx="9" cy="7" r="4"></circle>\r\n            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>\r\n            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>\r\n          </svg>\r\n        </div>\r\n        <h3>Administrar Usuarios</h3>\r\n        <p>Gestionar usuarios: consultar, eliminar o reactivar cuentas</p>\r\n        <button routerLink="/gestionUsuarios/administracionUsuarios" class="btn-opcion administrar">\r\n          Ir a Administraci\xF3n\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/pages/gestion-usuarios/gestion-usuarios.css */\n.gestion-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.gestion-card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gestion-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 20px;\n}\n.gestion-header h1 {\n  color: #2d3748;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver:hover {\n  background: #4a5568;\n}\n.opciones-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 40px;\n  margin-top: 0;\n  flex: 1;\n  align-content: center;\n}\n.opcion-card {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 48px 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  transition:\n    transform 0.2s,\n    box-shadow 0.2s,\n    border-color 0.2s;\n}\n.opcion-card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);\n  border-color: #667eea;\n}\n.opcion-icon {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  transition: transform 0.2s;\n}\n.opcion-card:hover .opcion-icon {\n  transform: scale(1.1);\n}\n.opcion-icon.registrar {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);\n}\n.opcion-icon.administrar {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);\n}\n.opcion-icon svg {\n  color: white;\n}\n.opcion-card h3 {\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.opcion-card p {\n  color: #718096;\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 0 0 24px 0;\n}\n.btn-opcion {\n  width: 100%;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.btn-opcion {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.btn-opcion:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n@media (max-width: 768px) {\n  .gestion-container {\n    padding: 20px;\n  }\n  .gestion-header {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n    margin-bottom: 32px;\n  }\n  .gestion-header h1 {\n    font-size: 1.8rem;\n  }\n  .opciones-grid {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n  .opcion-card {\n    padding: 32px 24px;\n  }\n}\n/*# sourceMappingURL=gestion-usuarios.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GestionUsuarios, { className: "GestionUsuarios", filePath: "src/app/pages/gestion-usuarios/gestion-usuarios.ts", lineNumber: 10 });
})();
export {
  GestionUsuarios
};
//# sourceMappingURL=chunk-KHGEXEOF.js.map
