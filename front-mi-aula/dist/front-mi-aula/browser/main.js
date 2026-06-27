import {
  Solicitud
} from "./chunk-QMBGUYZJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-6LUZZAF4.js";
import {
  AuthService,
  UsuarioService
} from "./chunk-PLPPL4DU.js";
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-IRPFJV3S.js";
import {
  CommonModule,
  HttpClient,
  NgForOf,
  NgIf,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from "./chunk-7FGDNYX4.js";
import {
  Component,
  __spreadProps,
  __spreadValues,
  effect,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3OUMOY5R.js";

// src/app/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  console.log("AuthGuard: verificando autenticaci\xF3n...", auth.usuarioLogueado());
  if (!auth.usuarioLogueado()) {
    window.alert("No tienes permiso para acceder a esta p\xE1gina");
    router.navigate(["/login"]);
    return false;
  }
  console.log("AuthGuard: Usuario autenticado, acceso permitido");
  return true;
};

// src/app/guards/admin.guard.ts
var adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  console.log("AdminGuard: verificando rol admin...", auth.usuarioLogueado());
  if (!auth.usuarioLogueado()) {
    window.alert("No tienes permiso para acceder a esta p\xE1gina");
    console.log("AdminGuard: Usuario no logueado, redirigiendo a login");
    router.navigate(["/login"]);
    return false;
  }
  const usuario = auth.infoUsuario();
  console.log("AdminGuard: Usuario rol:", usuario.rol);
  if (usuario.rol !== "ADMIN") {
    window.alert("No tienes permiso para acceder a esta p\xE1gina");
    if (usuario.rol === "PROFESOR") {
      router.navigate(["/dashboard"]);
    } else {
      router.navigate(["/home"]);
    }
    return false;
  }
  console.log("AdminGuard: Usuario admin autenticado, acceso permitido");
  return true;
};

// src/app/pages/login/login.ts
var Login = class _Login {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  constructor() {
    effect(() => {
      if (this.authService.usuarioLogueado()) {
        this.router.navigateByUrl("/dashboard");
      }
    });
  }
  form = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });
  mensajeError = signal("", ...ngDevMode ? [{ debugName: "mensajeError" }] : []);
  Enviar() {
    if (this.form.invalid) {
      return;
    }
    this.mensajeError.set("");
    this.authService.validarCredenciales(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl("/dashboard");
      },
      error: (error) => {
        this.mensajeError.set(error.message);
      }
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 44, vars: 3, consts: [[1, "login-form"], [3, "ngSubmit", "formGroup"], [1, "campo"], ["for", "email"], ["id", "email", "type", "text", "formControlName", "email"], ["for", "contrase\xF1a"], ["id", "contrase\xF1a", "type", "password", "formControlName", "password"], ["type", "submit", 1, "btn-enviar", 3, "disabled"], [1, "error-general"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 600 600", "aria-hidden", "true", 1, "calendar-illustration"], ["id", "g", "x1", "0", "x2", "1"], ["offset", "0", "stop-color", "#5ee1df", "stop-opacity", "0.95"], ["offset", "1", "stop-color", "#3b82f6", "stop-opacity", "0.95"], ["x", "40", "y", "70", "width", "520", "height", "440", "rx", "18", "fill", "#ffffff", "stroke", "rgba(0,0,0,0.06)"], ["x", "40", "y", "30", "width", "520", "height", "80", "rx", "14", "fill", "url(#g)"], ["fill", "#ffffff", "opacity", "0.9"], ["x", "120", "y", "18", "width", "20", "height", "20", "rx", "4"], ["x", "260", "y", "18", "width", "20", "height", "20", "rx", "4"], ["x", "400", "y", "18", "width", "20", "height", "20", "rx", "4"], ["transform", "translate(65,110)", "fill", "#f6f9ff"], ["x", "0", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "0", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "0", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "150", "width", "85", "height", "60", "rx", "8"], ["d", "M210 310 L260 360 L350 250", "stroke", "#10b981", "stroke-width", "18", "fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "opacity", "0.95"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "h3");
      \u0275\u0275text(2, "Inicio de Sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function Login_Template_form_ngSubmit_3_listener() {
        return ctx.Enviar();
      });
      \u0275\u0275elementStart(4, "div", 2)(5, "label", 3);
      \u0275\u0275text(6, "Email ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 2)(9, "label", 5);
      \u0275\u0275text(10, "contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275text(13, "Ingresar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 8);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 9)(17, "defs")(18, "linearGradient", 10);
      \u0275\u0275element(19, "stop", 11)(20, "stop", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(21, "rect", 13)(22, "rect", 14);
      \u0275\u0275elementStart(23, "g", 15);
      \u0275\u0275element(24, "rect", 16)(25, "rect", 17)(26, "rect", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "g", 19);
      \u0275\u0275element(28, "rect", 20)(29, "rect", 21)(30, "rect", 22)(31, "rect", 23)(32, "rect", 24)(33, "rect", 25)(34, "rect", 26)(35, "rect", 27)(36, "rect", 28)(37, "rect", 29)(38, "rect", 30)(39, "rect", 31)(40, "rect", 32)(41, "rect", 33)(42, "rect", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "path", 35);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.form.invalid);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.mensajeError());
    }
  }, dependencies: [RouterModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nhtml[_ngcontent-%COMP%], \nbody[_ngcontent-%COMP%], \napp-root[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n}\n.login-form[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 20;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  width: 100%;\n  max-width: 460px;\n  margin: 6vh auto;\n  background: rgba(255, 255, 255, 0.78);\n  -webkit-backdrop-filter: blur(6px) saturate(120%);\n  backdrop-filter: blur(6px) saturate(120%);\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow: 0 12px 30px rgba(6, 24, 50, 0.18);\n  border-radius: calc(var(--border-radius) + 4px);\n}\n.login-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: var(--font-size-2xl);\n  color: var(--color-primary);\n  margin-bottom: 2rem;\n  text-align: center;\n}\n.login-form[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.campo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.campo[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: var(--font-size-md);\n  color: var(--color-text-primary);\n  font-weight: 600;\n}\n.campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-md);\n  transition: all var(--transition-speed);\n}\n.campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: var(--shadow-light);\n}\n.campo[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: red;\n  font-size: var(--font-size-sm);\n  min-height: 1.25rem;\n}\n.btn-enviar[_ngcontent-%COMP%] {\n  padding: 0.875rem 2rem;\n  background-color: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  border-radius: var(--border-radius);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-speed);\n  margin-top: 1rem;\n}\n.btn-enviar[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.btn-enviar[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary-dark);\n  box-shadow: var(--shadow-medium);\n  transform: translateY(-2px);\n}\n.btn-enviar[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n  box-shadow: var(--shadow-light);\n}\n.btn-enviar[_ngcontent-%COMP%]:disabled {\n  background-color: var(--color-border);\n  color: var(--color-text-primary);\n  cursor: not-allowed;\n  opacity: 0.6;\n  box-shadow: none;\n  transform: none;\n}\n.error-general[_ngcontent-%COMP%] {\n  color: red;\n  font-size: var(--font-size-sm);\n  margin-top: 1rem;\n  display: block;\n  text-align: center;\n  min-height: 1.25rem;\n}\n.calendar-illustration[_ngcontent-%COMP%] {\n  position: fixed;\n  right: -6%;\n  bottom: -8%;\n  width: 72vw;\n  max-width: 1200px;\n  height: auto;\n  opacity: 0.70;\n  transform: rotate(-6deg) scale(1.02);\n  filter: drop-shadow(0 26px 56px rgba(37, 100, 235, 0.45));\n  pointer-events: none;\n  mix-blend-mode: multiply;\n  z-index: 1;\n  will-change: transform;\n}\n@media (max-width: 1200px) {\n  .calendar-illustration[_ngcontent-%COMP%] {\n    width: 60%;\n    right: 6%;\n    bottom: -8%;\n    opacity: 0.55;\n    transform: rotate(-6deg) scale(0.92);\n  }\n}\n@media (max-width: 900px) {\n  .calendar-illustration[_ngcontent-%COMP%] {\n    width: 72%;\n    left: 50%;\n    top: 55%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -45%) rotate(-6deg) scale(0.82);\n    opacity: 0.45;\n  }\n  .login-form[_ngcontent-%COMP%] {\n    margin: 4vh auto;\n    padding: 1.6rem;\n  }\n}\n@media (max-width: 520px) {\n  .calendar-illustration[_ngcontent-%COMP%] {\n    display: block;\n    width: 88%;\n    max-width: 760px;\n    left: 50%;\n    top: 52%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -50%) rotate(-6deg) scale(0.6);\n    opacity: 0.36;\n    filter: drop-shadow(0 18px 34px rgba(37, 100, 235, 0.45));\n    mix-blend-mode: normal;\n    z-index: 1;\n  }\n  .login-form[_ngcontent-%COMP%] {\n    width: calc(100% - 3rem);\n    max-width: 420px;\n    padding: 1.25rem;\n    margin: 3vh auto;\n  }\n}\n@media (min-width: 1400px) {\n  .login-form[_ngcontent-%COMP%] {\n    max-width: 520px;\n    margin: 8vh auto;\n    padding: 2.25rem;\n  }\n  .calendar-illustration[_ngcontent-%COMP%] {\n    width: auto;\n    max-width: 1000px;\n    right: 4%;\n    bottom: -6%;\n    transform: rotate(-6deg) scale(1);\n    opacity: 0.6;\n  }\n}\n@media (min-width: 1800px) {\n  .calendar-illustration[_ngcontent-%COMP%] {\n    max-width: 1200px;\n    right: 2%;\n  }\n  .login-form[_ngcontent-%COMP%] {\n    margin: 10vh auto;\n  }\n}\n/*# sourceMappingURL=login.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", imports: [RouterModule, ReactiveFormsModule], template: '<main class="login-form">\r\n    <h3>Inicio de Sesi\xF3n</h3>\r\n    <form [formGroup]="form" (ngSubmit)="Enviar()">\r\n        <div class="campo">\r\n            <label for="email">Email </label>\r\n            <input id="email" type="text" formControlName="email">\r\n        </div>\r\n        <div class="campo">\r\n            <label for="contrase\xF1a">contrase\xF1a</label>\r\n            <input id="contrase\xF1a" type="password" formControlName="password">\r\n        </div>\r\n        <button class="btn-enviar" type="submit" [disabled]="form.invalid">Ingresar</button>\r\n        <span class="error-general">{{ mensajeError() }}</span>\r\n    </form>\r\n</main>\r\n\r\n<!-- Ilustraci\xF3n decorativa tipo calendario/agenda (solo visual) -->\r\n	<svg class="calendar-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" aria-hidden="true">\r\n		<defs>\r\n			<linearGradient id="g" x1="0" x2="1">\r\n				<stop offset="0" stop-color="#5ee1df" stop-opacity="0.95"/>\r\n				<stop offset="1" stop-color="#3b82f6" stop-opacity="0.95"/>\r\n			</linearGradient>\r\n		</defs>\r\n		<rect x="40" y="70" width="520" height="440" rx="18" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>\r\n		<rect x="40" y="30" width="520" height="80" rx="14" fill="url(#g)"/>\r\n		<!-- anillas -->\r\n		<g fill="#ffffff" opacity="0.9">\r\n			<rect x="120" y="18" width="20" height="20" rx="4"/>\r\n			<rect x="260" y="18" width="20" height="20" rx="4"/>\r\n			<rect x="400" y="18" width="20" height="20" rx="4"/>\r\n		</g>\r\n		<!-- grid de d\xEDas -->\r\n		<g transform="translate(65,110)" fill="#f6f9ff">\r\n			<!-- 5 columnas x 3 filas simples -->\r\n			<rect x="0"   y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="190" y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="285" y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="380" y="0"   width="85" height="60" rx="8"/>\r\n\r\n			<rect x="0"   y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="190" y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="285" y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="380" y="75"  width="85" height="60" rx="8"/>\r\n\r\n			<rect x="0"   y="150" width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="150" width="85" height="60" rx="8"/>\r\n			<rect x="190" y="150" width="85" height="60" rx="8"/>\r\n			<rect x="285" y="150" width="85" height="60" rx="8"/>\r\n			<rect x="380" y="150" width="85" height="60" rx="8"/>\r\n		</g>\r\n\r\n		<!-- check decorativo -->\r\n		<path d="M210 310 L260 360 L350 250" stroke="#10b981" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>\r\n	</svg>', styles: ["/* src/app/pages/login/login.css */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nhtml,\nbody,\napp-root {\n  overflow-x: hidden;\n}\n.login-form {\n  position: relative;\n  z-index: 20;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  width: 100%;\n  max-width: 460px;\n  margin: 6vh auto;\n  background: rgba(255, 255, 255, 0.78);\n  -webkit-backdrop-filter: blur(6px) saturate(120%);\n  backdrop-filter: blur(6px) saturate(120%);\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow: 0 12px 30px rgba(6, 24, 50, 0.18);\n  border-radius: calc(var(--border-radius) + 4px);\n}\n.login-form h3 {\n  font-family: var(--font-sans);\n  font-size: var(--font-size-2xl);\n  color: var(--color-primary);\n  margin-bottom: 2rem;\n  text-align: center;\n}\n.login-form form {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.campo {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.campo label {\n  font-family: var(--font-sans);\n  font-size: var(--font-size-md);\n  color: var(--color-text-primary);\n  font-weight: 600;\n}\n.campo input {\n  padding: 0.75rem 1rem;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-md);\n  transition: all var(--transition-speed);\n}\n.campo input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: var(--shadow-light);\n}\n.campo .error {\n  color: red;\n  font-size: var(--font-size-sm);\n  min-height: 1.25rem;\n}\n.btn-enviar {\n  padding: 0.875rem 2rem;\n  background-color: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  border-radius: var(--border-radius);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-speed);\n  margin-top: 1rem;\n}\n.btn-enviar {\n  width: 100%;\n}\n.btn-enviar:hover {\n  background-color: var(--color-primary-dark);\n  box-shadow: var(--shadow-medium);\n  transform: translateY(-2px);\n}\n.btn-enviar:active {\n  transform: translateY(0);\n  box-shadow: var(--shadow-light);\n}\n.btn-enviar:disabled {\n  background-color: var(--color-border);\n  color: var(--color-text-primary);\n  cursor: not-allowed;\n  opacity: 0.6;\n  box-shadow: none;\n  transform: none;\n}\n.error-general {\n  color: red;\n  font-size: var(--font-size-sm);\n  margin-top: 1rem;\n  display: block;\n  text-align: center;\n  min-height: 1.25rem;\n}\n.calendar-illustration {\n  position: fixed;\n  right: -6%;\n  bottom: -8%;\n  width: 72vw;\n  max-width: 1200px;\n  height: auto;\n  opacity: 0.70;\n  transform: rotate(-6deg) scale(1.02);\n  filter: drop-shadow(0 26px 56px rgba(37, 100, 235, 0.45));\n  pointer-events: none;\n  mix-blend-mode: multiply;\n  z-index: 1;\n  will-change: transform;\n}\n@media (max-width: 1200px) {\n  .calendar-illustration {\n    width: 60%;\n    right: 6%;\n    bottom: -8%;\n    opacity: 0.55;\n    transform: rotate(-6deg) scale(0.92);\n  }\n}\n@media (max-width: 900px) {\n  .calendar-illustration {\n    width: 72%;\n    left: 50%;\n    top: 55%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -45%) rotate(-6deg) scale(0.82);\n    opacity: 0.45;\n  }\n  .login-form {\n    margin: 4vh auto;\n    padding: 1.6rem;\n  }\n}\n@media (max-width: 520px) {\n  .calendar-illustration {\n    display: block;\n    width: 88%;\n    max-width: 760px;\n    left: 50%;\n    top: 52%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -50%) rotate(-6deg) scale(0.6);\n    opacity: 0.36;\n    filter: drop-shadow(0 18px 34px rgba(37, 100, 235, 0.45));\n    mix-blend-mode: normal;\n    z-index: 1;\n  }\n  .login-form {\n    width: calc(100% - 3rem);\n    max-width: 420px;\n    padding: 1.25rem;\n    margin: 3vh auto;\n  }\n}\n@media (min-width: 1400px) {\n  .login-form {\n    max-width: 520px;\n    margin: 8vh auto;\n    padding: 2.25rem;\n  }\n  .calendar-illustration {\n    width: auto;\n    max-width: 1000px;\n    right: 4%;\n    bottom: -6%;\n    transform: rotate(-6deg) scale(1);\n    opacity: 0.6;\n  }\n}\n@media (min-width: 1800px) {\n  .calendar-illustration {\n    max-width: 1200px;\n    right: 2%;\n  }\n  .login-form {\n    margin: 10vh auto;\n  }\n}\n/*# sourceMappingURL=login.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/pages/login/login.ts", lineNumber: 14 });
})();

// src/app/pages/home/home.ts
var Home = class _Home {
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], decls: 36, vars: 0, consts: [[1, "home-hero"], [1, "content"], [1, "welcome"], [1, "app-name"], [1, "slogan"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 600 600", "aria-hidden", "true", 1, "calendar-illustration"], ["id", "g", "x1", "0", "x2", "1"], ["offset", "0", "stop-color", "#5ee1df", "stop-opacity", "0.95"], ["offset", "1", "stop-color", "#3b82f6", "stop-opacity", "0.95"], ["x", "40", "y", "70", "width", "520", "height", "440", "rx", "18", "fill", "#ffffff", "stroke", "rgba(0,0,0,0.06)"], ["x", "40", "y", "30", "width", "520", "height", "80", "rx", "14", "fill", "url(#g)"], ["fill", "#ffffff", "opacity", "0.9"], ["x", "120", "y", "18", "width", "20", "height", "20", "rx", "4"], ["x", "260", "y", "18", "width", "20", "height", "20", "rx", "4"], ["x", "400", "y", "18", "width", "20", "height", "20", "rx", "4"], ["transform", "translate(65,110)", "fill", "#f6f9ff"], ["x", "0", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "0", "width", "85", "height", "60", "rx", "8"], ["x", "0", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "75", "width", "85", "height", "60", "rx", "8"], ["x", "0", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "95", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "190", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "285", "y", "150", "width", "85", "height", "60", "rx", "8"], ["x", "380", "y", "150", "width", "85", "height", "60", "rx", "8"], ["d", "M210 310 L260 360 L350 250", "stroke", "#10b981", "stroke-width", "18", "fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "opacity", "0.95"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Bienvenido/a");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h2", 3);
      \u0275\u0275text(5, "Gestor de Aulas");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "p", 4);
      \u0275\u0275text(7, "Organiza tus espacios, simplifica tus reservas.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(8, "svg", 5)(9, "defs")(10, "linearGradient", 6);
      \u0275\u0275domElement(11, "stop", 7)(12, "stop", 8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(13, "rect", 9)(14, "rect", 10);
      \u0275\u0275domElementStart(15, "g", 11);
      \u0275\u0275domElement(16, "rect", 12)(17, "rect", 13)(18, "rect", 14);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "g", 15);
      \u0275\u0275domElement(20, "rect", 16)(21, "rect", 17)(22, "rect", 18)(23, "rect", 19)(24, "rect", 20)(25, "rect", 21)(26, "rect", 22)(27, "rect", 23)(28, "rect", 24)(29, "rect", 25)(30, "rect", 26)(31, "rect", 27)(32, "rect", 28)(33, "rect", 29)(34, "rect", 30);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(35, "path", 31);
      \u0275\u0275domElementEnd()();
    }
  }, styles: ['\n\n[_ngcontent-%COMP%]:root {\n  --bg-start: #e6f6ff;\n  --bg-end: #ffffff;\n  --text: #07102a;\n  --accent: #2563eb;\n}\n.home-hero[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 70px - 115px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  padding: 56px 24px;\n  background-image:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(56, 189, 248, 0.06),\n      transparent 12%),\n    linear-gradient(\n      135deg,\n      var(--bg-start) 0%,\n      var(--bg-end) 60%),\n    repeating-linear-gradient(\n      135deg,\n      rgba(0, 0, 0, 0.01) 0 2px,\n      transparent 2px 8px);\n  overflow: hidden;\n}\n.home-hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: -6%;\n  bottom: -10%;\n  width: 72%;\n  height: 88%;\n  background:\n    radial-gradient(\n      circle at 20% 30%,\n      rgba(37, 99, 235, 0.14),\n      transparent 25%),\n    radial-gradient(\n      circle at 80% 70%,\n      rgba(59, 130, 246, 0.08),\n      transparent 22%);\n  transform: rotate(-8deg);\n  filter: blur(36px);\n  z-index: 0;\n  pointer-events: none;\n}\n.content[_ngcontent-%COMP%] {\n  z-index: 3;\n  text-align: left;\n  max-width: 820px;\n  width: 100%;\n  padding: 40px 48px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.68),\n      rgba(255, 255, 255, 0.5));\n  box-shadow: 0 18px 54px rgba(16, 24, 40, 0.10);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.welcome[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: clamp(28px, 5.2vw, 46px);\n  color: var(--text);\n  font-weight: 700;\n}\n.app-name[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: clamp(18px, 3.2vw, 26px);\n  color: var(--accent);\n  font-weight: 700;\n}\n.slogan[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(14px, 2.2vw, 18px);\n  color: rgba(7, 16, 42, 0.85);\n}\n.calendar-illustration[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -6%;\n  bottom: -8%;\n  width: 72%;\n  max-width: 1300px;\n  height: auto;\n  opacity: 0.90;\n  transform: rotate(-6deg) scale(1.06);\n  filter: drop-shadow(0 26px 56px rgba(37, 100, 235, 0.61));\n  pointer-events: none;\n  mix-blend-mode: multiply;\n  z-index: 2;\n}\n@media (max-width: 1200px) {\n  .home-hero[_ngcontent-%COMP%]::before {\n    width: 86%;\n    right: -8%;\n    bottom: -12%;\n  }\n  .calendar-illustration[_ngcontent-%COMP%] {\n    width: 60%;\n    right: 6%;\n    bottom: -8%;\n    opacity: 0.40;\n    transform: rotate(-6deg) scale(0.92);\n  }\n}\n@media (min-width: 760px) {\n  .home-hero[_ngcontent-%COMP%] {\n    min-height: calc(100vh - 70px - 50px);\n  }\n}\n@media (max-width: 900px) {\n  .content[_ngcontent-%COMP%] {\n    padding: 28px 20px;\n    border-radius: 10px;\n  }\n  .calendar-illustration[_ngcontent-%COMP%] {\n    width: 72%;\n    left: 50%;\n    top: 55%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -45%) rotate(-6deg) scale(0.82);\n    opacity: 0.42;\n  }\n}\n@media (max-width: 520px) {\n  .content[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .app-name[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .calendar-illustration[_ngcontent-%COMP%] {\n    display: block;\n    width: 88%;\n    max-width: 760px;\n    left: 50%;\n    top: 52%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -50%) rotate(-6deg) scale(0.6);\n    opacity: 0.36;\n    filter: drop-shadow(0 18px 34px rgba(37, 100, 235, 0.61));\n    mix-blend-mode: normal;\n    z-index: 1;\n  }\n}\n.home-hero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.02) 25%,\n      rgba(0, 0, 0, 0.00) 25%,\n      rgba(0, 0, 0, 0.00) 50%,\n      rgba(255, 255, 255, 0.02) 50%,\n      rgba(255, 255, 255, 0.02) 75%,\n      rgba(0, 0, 0, 0.00) 75%,\n      rgba(0, 0, 0, 0.00));\n  background-size: 28px 28px;\n  pointer-events: none;\n  z-index: 0;\n  opacity: 0.6;\n  mix-blend-mode: overlay;\n}\n/*# sourceMappingURL=home.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ selector: "app-home", imports: [], template: '<div class="home-hero">\r\n	<div class="content">\r\n		<h1 class="welcome">Bienvenido/a</h1>\r\n		<h2 class="app-name">Gestor de Aulas</h2>\r\n		<p class="slogan">Organiza tus espacios, simplifica tus reservas.</p>\r\n	</div>\r\n\r\n	<!-- Ilustraci\xF3n decorativa tipo calendario/agenda (solo visual) -->\r\n	<svg class="calendar-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" aria-hidden="true">\r\n		<defs>\r\n			<linearGradient id="g" x1="0" x2="1">\r\n				<stop offset="0" stop-color="#5ee1df" stop-opacity="0.95"/>\r\n				<stop offset="1" stop-color="#3b82f6" stop-opacity="0.95"/>\r\n			</linearGradient>\r\n		</defs>\r\n		<rect x="40" y="70" width="520" height="440" rx="18" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>\r\n		<rect x="40" y="30" width="520" height="80" rx="14" fill="url(#g)"/>\r\n		<!-- anillas -->\r\n		<g fill="#ffffff" opacity="0.9">\r\n			<rect x="120" y="18" width="20" height="20" rx="4"/>\r\n			<rect x="260" y="18" width="20" height="20" rx="4"/>\r\n			<rect x="400" y="18" width="20" height="20" rx="4"/>\r\n		</g>\r\n		<!-- grid de d\xEDas -->\r\n		<g transform="translate(65,110)" fill="#f6f9ff">\r\n			<!-- 5 columnas x 3 filas simples -->\r\n			<rect x="0"   y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="190" y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="285" y="0"   width="85" height="60" rx="8"/>\r\n			<rect x="380" y="0"   width="85" height="60" rx="8"/>\r\n\r\n			<rect x="0"   y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="190" y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="285" y="75"  width="85" height="60" rx="8"/>\r\n			<rect x="380" y="75"  width="85" height="60" rx="8"/>\r\n\r\n			<rect x="0"   y="150" width="85" height="60" rx="8"/>\r\n			<rect x="95"  y="150" width="85" height="60" rx="8"/>\r\n			<rect x="190" y="150" width="85" height="60" rx="8"/>\r\n			<rect x="285" y="150" width="85" height="60" rx="8"/>\r\n			<rect x="380" y="150" width="85" height="60" rx="8"/>\r\n		</g>\r\n\r\n		<!-- check decorativo -->\r\n		<path d="M210 310 L260 360 L350 250" stroke="#10b981" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>\r\n	</svg>\r\n</div>\r\n\r\n', styles: ['/* src/app/pages/home/home.css */\n:root {\n  --bg-start: #e6f6ff;\n  --bg-end: #ffffff;\n  --text: #07102a;\n  --accent: #2563eb;\n}\n.home-hero {\n  min-height: calc(100vh - 70px - 115px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  padding: 56px 24px;\n  background-image:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(56, 189, 248, 0.06),\n      transparent 12%),\n    linear-gradient(\n      135deg,\n      var(--bg-start) 0%,\n      var(--bg-end) 60%),\n    repeating-linear-gradient(\n      135deg,\n      rgba(0, 0, 0, 0.01) 0 2px,\n      transparent 2px 8px);\n  overflow: hidden;\n}\n.home-hero::before {\n  content: "";\n  position: absolute;\n  right: -6%;\n  bottom: -10%;\n  width: 72%;\n  height: 88%;\n  background:\n    radial-gradient(\n      circle at 20% 30%,\n      rgba(37, 99, 235, 0.14),\n      transparent 25%),\n    radial-gradient(\n      circle at 80% 70%,\n      rgba(59, 130, 246, 0.08),\n      transparent 22%);\n  transform: rotate(-8deg);\n  filter: blur(36px);\n  z-index: 0;\n  pointer-events: none;\n}\n.content {\n  z-index: 3;\n  text-align: left;\n  max-width: 820px;\n  width: 100%;\n  padding: 40px 48px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.68),\n      rgba(255, 255, 255, 0.5));\n  box-shadow: 0 18px 54px rgba(16, 24, 40, 0.10);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.welcome {\n  margin: 0 0 8px 0;\n  font-size: clamp(28px, 5.2vw, 46px);\n  color: var(--text);\n  font-weight: 700;\n}\n.app-name {\n  margin: 0 0 12px 0;\n  font-size: clamp(18px, 3.2vw, 26px);\n  color: var(--accent);\n  font-weight: 700;\n}\n.slogan {\n  margin: 0;\n  font-size: clamp(14px, 2.2vw, 18px);\n  color: rgba(7, 16, 42, 0.85);\n}\n.calendar-illustration {\n  position: absolute;\n  right: -6%;\n  bottom: -8%;\n  width: 72%;\n  max-width: 1300px;\n  height: auto;\n  opacity: 0.90;\n  transform: rotate(-6deg) scale(1.06);\n  filter: drop-shadow(0 26px 56px rgba(37, 100, 235, 0.61));\n  pointer-events: none;\n  mix-blend-mode: multiply;\n  z-index: 2;\n}\n@media (max-width: 1200px) {\n  .home-hero::before {\n    width: 86%;\n    right: -8%;\n    bottom: -12%;\n  }\n  .calendar-illustration {\n    width: 60%;\n    right: 6%;\n    bottom: -8%;\n    opacity: 0.40;\n    transform: rotate(-6deg) scale(0.92);\n  }\n}\n@media (min-width: 760px) {\n  .home-hero {\n    min-height: calc(100vh - 70px - 50px);\n  }\n}\n@media (max-width: 900px) {\n  .content {\n    padding: 28px 20px;\n    border-radius: 10px;\n  }\n  .calendar-illustration {\n    width: 72%;\n    left: 50%;\n    top: 55%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -45%) rotate(-6deg) scale(0.82);\n    opacity: 0.42;\n  }\n}\n@media (max-width: 520px) {\n  .content {\n    text-align: center;\n  }\n  .app-name {\n    font-size: 18px;\n  }\n  .calendar-illustration {\n    display: block;\n    width: 88%;\n    max-width: 760px;\n    left: 50%;\n    top: 52%;\n    right: auto;\n    bottom: auto;\n    transform: translate(-50%, -50%) rotate(-6deg) scale(0.6);\n    opacity: 0.36;\n    filter: drop-shadow(0 18px 34px rgba(37, 100, 235, 0.61));\n    mix-blend-mode: normal;\n    z-index: 1;\n  }\n}\n.home-hero::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.02) 25%,\n      rgba(0, 0, 0, 0.00) 25%,\n      rgba(0, 0, 0, 0.00) 50%,\n      rgba(255, 255, 255, 0.02) 50%,\n      rgba(255, 255, 255, 0.02) 75%,\n      rgba(0, 0, 0, 0.00) 75%,\n      rgba(0, 0, 0, 0.00));\n  background-size: 28px 28px;\n  pointer-events: none;\n  z-index: 0;\n  opacity: 0.6;\n  mix-blend-mode: overlay;\n}\n/*# sourceMappingURL=home.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/app/pages/home/home.ts", lineNumber: 9 });
})();

// src/app/pages/solicitud/nueva/nueva.ts
function Nueva_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    \u0275\u0275property("value", c_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r1.nombre);
  }
}
function Nueva_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "La comisi\xF3n es requerida.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    \u0275\u0275property("value", e_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r2.nombre);
  }
}
function Nueva_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "El espacio es requerido.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "El d\xEDa es requerido.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "La fecha de inicio es requerida.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_span_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "La fecha de fin es requerida.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_span_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "La hora de inicio es requerida.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_span_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "La hora de fin es requerida.");
    \u0275\u0275elementEnd();
  }
}
function Nueva_div_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.mensaje);
  }
}
function Nueva_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
var Nueva = class _Nueva {
  fb = inject(FormBuilder);
  router = inject(Router);
  http = inject(HttpClient);
  solicitudService = inject(Solicitud);
  auth = inject(AuthService);
  form;
  espacios = [];
  comisiones = [];
  loading = false;
  mensaje = null;
  error = null;
  ngOnInit() {
    const usuario = this.auth.infoUsuario();
    if (!usuario || !usuario.id) {
      this.router.navigate(["/login"]);
      return;
    }
    this.form = this.fb.group({
      comentario_profesor: [""],
      dia_semana: ["LUNES", [Validators.required]],
      fecha_inicio: ["", [Validators.required]],
      fecha_fin: ["", [Validators.required]],
      hora_inicio: ["", [Validators.required]],
      hora_fin: ["", [Validators.required]],
      nuevo_espacio_id: [null, [Validators.required]],
      comision_id: [null, [Validators.required]]
    });
    this.cargarEspacios();
    this.cargarComisionesDelProfesor(Number(usuario.id));
  }
  cargarEspacios() {
    this.http.get("http://localhost:3000/espacios").subscribe({
      next: (r) => this.espacios = r || [],
      error: () => this.espacios = []
    });
  }
  cargarComisionesDelProfesor(profesorId) {
    this.http.get(`http://localhost:3000/comisiones?usuario_profesor_id=${profesorId}`).subscribe({
      next: (r) => {
        this.comisiones = r || [];
        if (this.comisiones.length > 0 && !this.form.value.comision_id) {
          this.form.patchValue({ comision_id: this.comisiones[0].id });
        }
      },
      error: () => this.comisiones = []
    });
  }
  formatDate(dateStr) {
    return dateStr;
  }
  formatTime(timeStr) {
    if (!timeStr)
      return "";
    return `${timeStr}:00.000000`;
  }
  fechaHoraSolicitudNow() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  parseTimeToMinutes(timeStr) {
    if (!timeStr)
      return 0;
    const parts = timeStr.split(":");
    const hh = Number(parts[0] || 0);
    const mm = Number(parts[1] || 0);
    return hh * 60 + mm;
  }
  datesOverlap(startA, endA, startB, endB) {
    return !(endA < startB || endB < startA);
  }
  timesOverlap(startA, endA, startB, endB) {
    const a1 = this.parseTimeToMinutes(startA);
    const a2 = this.parseTimeToMinutes(endA);
    const b1 = this.parseTimeToMinutes(startB);
    const b2 = this.parseTimeToMinutes(endB);
    return a1 < b2 && b1 < a2;
  }
  onSubmit() {
    this.mensaje = null;
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const usuario = this.auth.infoUsuario();
    const form = this.form.value;
    if (form.fecha_inicio > form.fecha_fin) {
      this.error = "La fecha de inicio no puede ser posterior a la fecha de fin.";
      return;
    }
    this.loading = true;
    const payload = {
      comentario_estado: null,
      comentario_profesor: form.comentario_profesor || null,
      dia_semana: form.dia_semana,
      estado: "PENDIENTE",
      fecha_fin: this.formatDate(form.fecha_fin),
      fecha_inicio: this.formatDate(form.fecha_inicio),
      fecha_hora_solicitud: this.fechaHoraSolicitudNow(),
      hora_inicio: this.formatTime(form.hora_inicio),
      hora_fin: this.formatTime(form.hora_fin),
      comision_id: Number(form.comision_id),
      nuevo_espacio_id: Number(form.nuevo_espacio_id),
      reserva_original_id: null,
      usuario_id: Number(usuario.id)
    };
    this.http.get(`http://localhost:3000/solicitudes?nuevo_espacio_id=${payload.nuevo_espacio_id}`).subscribe({
      next: (existing) => {
        const conflictos = (existing || []).filter((s) => s && s.estado !== "RECHAZADA" && s.estado !== "CANCELADA").some((s) => {
          const exFi = s.fecha_inicio;
          const exFf = s.fecha_fin;
          const fechasSeSolapan = this.datesOverlap(payload.fecha_inicio, payload.fecha_fin, exFi, exFf);
          const horasSeSolapan = this.timesOverlap(payload.hora_inicio, payload.hora_fin, s.hora_inicio || "", s.hora_fin || "");
          return fechasSeSolapan && horasSeSolapan;
        });
        if (conflictos) {
          this.loading = false;
          this.error = "Existe una reserva solapada en el espacio y horario seleccionado.";
          return;
        }
        this.solicitudService.createSolicitud(payload).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(["/solicitud/mis-solicitudes"]);
          },
          error: (err) => {
            this.loading = false;
            this.error = err?.message || "Error al crear la solicitud";
          }
        });
      },
      error: () => {
        this.solicitudService.createSolicitud(payload).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(["/solicitud/mis-solicitudes"]);
          },
          error: (err) => {
            this.loading = false;
            this.error = err?.message || "Error al crear la solicitud";
          }
        });
      }
    });
  }
  cancelar() {
    this.router.navigate(["/dashboard"]);
  }
  static \u0275fac = function Nueva_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Nueva)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Nueva, selectors: [["app-nueva"]], decls: 74, vars: 15, consts: [[1, "nueva-solicitud"], [1, "nueva-card"], [3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-group"], ["for", "comision"], ["id", "comision", "formControlName", "comision_id", 1, "form-control"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "error-message", 4, "ngIf"], ["for", "espacio"], ["id", "espacio", "formControlName", "nuevo_espacio_id", 1, "form-control"], ["for", "dia"], ["id", "dia", "formControlName", "dia_semana", 1, "form-control"], ["value", "LUNES"], ["value", "MARTES"], ["value", "MI\xC9RCOLES"], ["value", "JUEVES"], ["value", "VIERNES"], ["for", "fecha_inicio"], ["id", "fecha_inicio", "type", "date", "formControlName", "fecha_inicio", 1, "form-control"], ["for", "fecha_fin"], ["id", "fecha_fin", "type", "date", "formControlName", "fecha_fin", 1, "form-control"], ["for", "hora_inicio"], ["id", "hora_inicio", "type", "time", "formControlName", "hora_inicio", 1, "form-control"], ["for", "hora_fin"], ["id", "hora_fin", "type", "time", "formControlName", "hora_fin", 1, "form-control"], [1, "form-row", "single"], ["for", "comentario"], ["id", "comentario", "formControlName", "comentario_profesor", "rows", "3", 1, "form-control"], [1, "small-note"], [1, "acciones"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["type", "button", 1, "btn-secondary", 3, "click"], ["class", "mensaje", 4, "ngIf"], ["class", "error", 4, "ngIf"], [3, "value"], [1, "error-message"], [1, "mensaje"], [1, "error"]], template: function Nueva_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Nueva solicitud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 2);
      \u0275\u0275listener("ngSubmit", function Nueva_Template_form_ngSubmit_4_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4)(7, "label", 5);
      \u0275\u0275text(8, "Comisi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "select", 6)(10, "option", 7);
      \u0275\u0275text(11, "-- Seleccione --");
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, Nueva_option_12_Template, 2, 2, "option", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, Nueva_span_13_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 4)(15, "label", 10);
      \u0275\u0275text(16, "Espacio solicitado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "select", 11)(18, "option", 7);
      \u0275\u0275text(19, "-- Seleccione --");
      \u0275\u0275elementEnd();
      \u0275\u0275template(20, Nueva_option_20_Template, 2, 2, "option", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(21, Nueva_span_21_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 3)(23, "div", 4)(24, "label", 12);
      \u0275\u0275text(25, "D\xEDa de la semana");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "select", 13)(27, "option", 14);
      \u0275\u0275text(28, "LUNES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "option", 15);
      \u0275\u0275text(30, "MARTES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "option", 16);
      \u0275\u0275text(32, "MI\xC9RCOLES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "option", 17);
      \u0275\u0275text(34, "JUEVES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "option", 18);
      \u0275\u0275text(36, "VIERNES");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(37, Nueva_span_37_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 3)(39, "div", 4)(40, "label", 19);
      \u0275\u0275text(41, "Fecha inicio");
      \u0275\u0275elementEnd();
      \u0275\u0275element(42, "input", 20);
      \u0275\u0275template(43, Nueva_span_43_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 4)(45, "label", 21);
      \u0275\u0275text(46, "Fecha fin");
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "input", 22);
      \u0275\u0275template(48, Nueva_span_48_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 3)(50, "div", 4)(51, "label", 23);
      \u0275\u0275text(52, "Hora inicio");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "input", 24);
      \u0275\u0275template(54, Nueva_span_54_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 4)(56, "label", 25);
      \u0275\u0275text(57, "Hora fin");
      \u0275\u0275elementEnd();
      \u0275\u0275element(58, "input", 26);
      \u0275\u0275template(59, Nueva_span_59_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 27)(61, "div", 4)(62, "label", 28);
      \u0275\u0275text(63, "Comentario para el administrador (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(64, "textarea", 29);
      \u0275\u0275elementStart(65, "div", 30);
      \u0275\u0275text(66, "(opcional) Anota detalles o motivos de la solicitud");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(67, "div", 31)(68, "button", 32);
      \u0275\u0275text(69, "Enviar solicitud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "button", 33);
      \u0275\u0275listener("click", function Nueva_Template_button_click_70_listener() {
        return ctx.cancelar();
      });
      \u0275\u0275text(71, "Cancelar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(72, Nueva_div_72_Template, 2, 1, "div", 34)(73, Nueva_div_73_Template, 2, 1, "div", 35);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_10_0;
      let tmp_11_0;
      \u0275\u0275advance(4);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.comisiones);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("comision_id")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.form.get("comision_id")) == null ? null : tmp_3_0.hasError("required")));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.espacios);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("nuevo_espacio_id")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx.form.get("nuevo_espacio_id")) == null ? null : tmp_6_0.hasError("required")));
      \u0275\u0275advance(16);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("dia_semana")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctx.form.get("dia_semana")) == null ? null : tmp_7_0.hasError("required")));
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("fecha_inicio")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx.form.get("fecha_inicio")) == null ? null : tmp_8_0.hasError("required")));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.form.get("fecha_fin")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx.form.get("fecha_fin")) == null ? null : tmp_9_0.hasError("required")));
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ((tmp_10_0 = ctx.form.get("hora_inicio")) == null ? null : tmp_10_0.touched) && ((tmp_10_0 = ctx.form.get("hora_inicio")) == null ? null : tmp_10_0.hasError("required")));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_11_0 = ctx.form.get("hora_fin")) == null ? null : tmp_11_0.touched) && ((tmp_11_0 = ctx.form.get("hora_fin")) == null ? null : tmp_11_0.hasError("required")));
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.mensaje);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.nueva-solicitud[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #eef2ff 100%);\n  min-height: 100vh;\n}\n.nueva-card[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 14px;\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);\n  padding: 32px;\n}\n.nueva-solicitud[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0 0 18px 0;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row.single[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.9rem;\n}\ninput[type=date][_ngcontent-%COMP%], \ninput[type=time][_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[type=text][_ngcontent-%COMP%], \ninput[type=number][_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border: 2px solid #e6eef8;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.18s, box-shadow 0.18s;\n  background: #fff;\n}\nselect[_ngcontent-%COMP%] {\n  appearance: none;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.08);\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 84px;\n}\n.acciones[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 6px;\n}\n.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border-radius: 10px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n  box-shadow: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-secondary-dark);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #edf2f7;\n  color: #334155;\n}\n.mensaje[_ngcontent-%COMP%] {\n  background: #e6fffa;\n  color: #065f46;\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}\n.error[_ngcontent-%COMP%] {\n  background: #fff5f5;\n  color: #9b2c2c;\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 0.85rem;\n  margin-top: 6px;\n}\n@media (max-width: 800px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .acciones[_ngcontent-%COMP%] {\n    justify-content: stretch;\n    flex-direction: column;\n  }\n}\n.small-note[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=nueva.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Nueva, [{
    type: Component,
    args: [{ selector: "app-nueva", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="nueva-solicitud">\r
	<div class="nueva-card">\r
		<h2>Nueva solicitud</h2>\r
\r
		<form [formGroup]="form" (ngSubmit)="onSubmit()">\r
			<div class="form-row">\r
				<div class="form-group">\r
					<label for="comision">Comisi\xF3n</label>\r
					<select id="comision" class="form-control" formControlName="comision_id">\r
						<option [ngValue]="null">-- Seleccione --</option>\r
						<option *ngFor="let c of comisiones" [value]="c.id">{{c.nombre}}</option>\r
					</select>\r
					<span *ngIf="form.get('comision_id')?.touched && form.get('comision_id')?.hasError('required')" class="error-message">La comisi\xF3n es requerida.</span>\r
				</div>\r
\r
				<div class="form-group">\r
					<label for="espacio">Espacio solicitado</label>\r
					<select id="espacio" class="form-control" formControlName="nuevo_espacio_id">\r
						<option [ngValue]="null">-- Seleccione --</option>\r
						<option *ngFor="let e of espacios" [value]="e.id">{{e.nombre}}</option>\r
					</select>\r
					<span *ngIf="form.get('nuevo_espacio_id')?.touched && form.get('nuevo_espacio_id')?.hasError('required')" class="error-message">El espacio es requerido.</span>\r
				</div>\r
			</div>\r
\r
			<div class="form-row">\r
				<div class="form-group">\r
					<label for="dia">D\xEDa de la semana</label>\r
					<select id="dia" class="form-control" formControlName="dia_semana">\r
						<option value="LUNES">LUNES</option>\r
						<option value="MARTES">MARTES</option>\r
						<option value="MI\xC9RCOLES">MI\xC9RCOLES</option>\r
						<option value="JUEVES">JUEVES</option>\r
						<option value="VIERNES">VIERNES</option>\r
					</select>\r
					<span *ngIf="form.get('dia_semana')?.touched && form.get('dia_semana')?.hasError('required')" class="error-message">El d\xEDa es requerido.</span>\r
				</div>\r
			</div>\r
\r
			<div class="form-row">\r
				<div class="form-group">\r
					<label for="fecha_inicio">Fecha inicio</label>\r
					<input id="fecha_inicio" class="form-control" type="date" formControlName="fecha_inicio" />\r
					<span *ngIf="form.get('fecha_inicio')?.touched && form.get('fecha_inicio')?.hasError('required')" class="error-message">La fecha de inicio es requerida.</span>\r
				</div>\r
\r
				<div class="form-group">\r
					<label for="fecha_fin">Fecha fin</label>\r
					<input id="fecha_fin" class="form-control" type="date" formControlName="fecha_fin" />\r
					<span *ngIf="form.get('fecha_fin')?.touched && form.get('fecha_fin')?.hasError('required')" class="error-message">La fecha de fin es requerida.</span>\r
				</div>\r
			</div>\r
\r
			<div class="form-row">\r
				<div class="form-group">\r
					<label for="hora_inicio">Hora inicio</label>\r
					<input id="hora_inicio" class="form-control" type="time" formControlName="hora_inicio" />\r
					<span *ngIf="form.get('hora_inicio')?.touched && form.get('hora_inicio')?.hasError('required')" class="error-message">La hora de inicio es requerida.</span>\r
				</div>\r
\r
				<div class="form-group">\r
					<label for="hora_fin">Hora fin</label>\r
					<input id="hora_fin" class="form-control" type="time" formControlName="hora_fin" />\r
					<span *ngIf="form.get('hora_fin')?.touched && form.get('hora_fin')?.hasError('required')" class="error-message">La hora de fin es requerida.</span>\r
				</div>\r
			</div>\r
\r
			<div class="form-row single">\r
				<div class="form-group">\r
					<label for="comentario">Comentario para el administrador (opcional)</label>\r
					<textarea id="comentario" class="form-control" formControlName="comentario_profesor" rows="3"></textarea>\r
					<div class="small-note">(opcional) Anota detalles o motivos de la solicitud</div>\r
				</div>\r
			</div>\r
\r
			<div class="acciones">\r
				<button type="submit" class="btn-primary" [disabled]="loading">Enviar solicitud</button>\r
				<button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>\r
			</div>\r
		</form>\r
\r
		<div *ngIf="mensaje" class="mensaje">{{mensaje}}</div>\r
		<div *ngIf="error" class="error">{{error}}</div>\r
	</div>\r
</div>\r
\r
`, styles: ["/* src/app/pages/solicitud/nueva/nueva.css */\n.nueva-solicitud {\n  flex: 1;\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #eef2ff 100%);\n  min-height: 100vh;\n}\n.nueva-card {\n  max-width: 900px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 14px;\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);\n  padding: 32px;\n}\n.nueva-solicitud h2 {\n  color: #2d3748;\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0 0 18px 0;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row.single {\n  grid-template-columns: 1fr;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group label {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.9rem;\n}\ninput[type=date],\ninput[type=time],\nselect,\ntextarea,\ninput[type=text],\ninput[type=number] {\n  padding: 10px 14px;\n  border: 2px solid #e6eef8;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.18s, box-shadow 0.18s;\n  background: #fff;\n}\nselect {\n  appearance: none;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.08);\n}\ntextarea {\n  resize: vertical;\n  min-height: 84px;\n}\n.acciones {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 6px;\n}\n.acciones button {\n  padding: 10px 18px;\n  border-radius: 10px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n}\n.btn-primary {\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n  box-shadow: none;\n}\n.btn-primary:hover:not(:disabled) {\n  background: var(--color-secondary-dark);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-secondary {\n  background: #edf2f7;\n  color: #334155;\n}\n.mensaje {\n  background: #e6fffa;\n  color: #065f46;\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}\n.error {\n  background: #fff5f5;\n  color: #9b2c2c;\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}\n.error-message {\n  color: #e53e3e;\n  font-size: 0.85rem;\n  margin-top: 6px;\n}\n@media (max-width: 800px) {\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .acciones {\n    justify-content: stretch;\n    flex-direction: column;\n  }\n}\n.small-note {\n  color: #718096;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=nueva.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Nueva, { className: "Nueva", filePath: "src/app/pages/solicitud/nueva/nueva.ts", lineNumber: 16 });
})();

// src/app/pages/solicitud/mis-solicitudes/mis-solicitudes.ts
var _forTrack0 = ($index, $item) => $item.id;
function MisSolicitudes_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 3)(1, "div", 6)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7)(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 9)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 10)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 11)(16, "div");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 12)(19, "a", 13);
    \u0275\u0275listener("click", function MisSolicitudes_For_7_Template_a_click_19_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r2));
    });
    \u0275\u0275text(20, "Ver Detalles");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Solicitud #", s_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r2.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(s_r2.hora_inicio), " - ", ctx_r2.formatHora(s_r2.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(s_r2.fecha_inicio), " - ", ctx_r2.formatFecha(s_r2.fecha_fin));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("status-bubble status-", s_r2.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2.estado);
  }
}
function MisSolicitudes_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "No hay solicitudes para mostrar.");
    \u0275\u0275elementEnd();
  }
}
function MisSolicitudes_Conditional_9_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function MisSolicitudes_Conditional_9_Conditional_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelarSolicitud(ctx_r2.selectedSolicitud()));
    });
    \u0275\u0275text(1, "Cancelar solicitud");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.isCancelling());
  }
}
function MisSolicitudes_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function MisSolicitudes_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275elementStart(1, "div", 15);
    \u0275\u0275listener("click", function MisSolicitudes_Conditional_9_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 16)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 17);
    \u0275\u0275listener("click", function MisSolicitudes_Conditional_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 18)(8, "p")(9, "strong");
    \u0275\u0275text(10, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "D\xEDa:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p")(17, "strong");
    \u0275\u0275text(18, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p")(21, "strong");
    \u0275\u0275text(22, "Fechas:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p")(25, "strong");
    \u0275\u0275text(26, "Comentario profesor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p")(29, "strong");
    \u0275\u0275text(30, "Comentario estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "footer", 19);
    \u0275\u0275conditionalCreate(33, MisSolicitudes_Conditional_9_Conditional_33_Template, 2, 1, "button", 20);
    \u0275\u0275elementStart(34, "button", 13);
    \u0275\u0275listener("click", function MisSolicitudes_Conditional_9_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275text(35, "Cerrar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Detalle - Solicitud #", (tmp_1_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_1_0.id);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_2_0.estado);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_3_0.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora((tmp_4_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_4_0.hora_inicio), " - ", ctx_r2.formatHora((tmp_4_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_4_0.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha((tmp_5_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_5_0.fecha_inicio), " - ", ctx_r2.formatFecha((tmp_5_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_5_0.fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_6_0.comentario_profesor) || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_7_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_7_0.comentario_estado) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_8_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_8_0.estado) === "PENDIENTE" ? 33 : -1);
  }
}
var MisSolicitudes = class _MisSolicitudes {
  solicitudService = inject(Solicitud);
  authService = inject(AuthService);
  // Signal que contendrá el array de solicitudes para renderizar en el template
  solicitudes = signal([], ...ngDevMode ? [{ debugName: "solicitudes" }] : []);
  // Signal para la solicitud seleccionada y mostrar modal
  selectedSolicitud = signal(null, ...ngDevMode ? [{ debugName: "selectedSolicitud" }] : []);
  // Signal para indicar que se está procesando la cancelación
  isCancelling = signal(false, ...ngDevMode ? [{ debugName: "isCancelling" }] : []);
  constructor() {
  }
  ngOnInit() {
    this.loadSolicitudes();
  }
  // Carga las solicitudes desde el servidor y filtra las del usuario logueado
  loadSolicitudes() {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data) => {
        const currentUser = this.authService.infoUsuario();
        const userId = currentUser?.id ?? "";
        const filtered = data.filter((s) => String(s.usuario_id) === String(userId));
        const parseValue = (item) => {
          if (item?.fecha_hora_solicitud) {
            const d = Date.parse(item.fecha_hora_solicitud);
            if (!isNaN(d))
              return d;
          }
          return 0;
        };
        filtered.sort((a, b) => {
          const va = parseValue(a);
          const vb = parseValue(b);
          return vb - va;
        });
        this.solicitudes.set(filtered);
      },
      error: (err) => {
        console.error("Error cargando solicitudes", err);
      }
    });
  }
  openDetails(solicitud) {
    this.selectedSolicitud.set(solicitud);
  }
  closeDetails() {
    this.selectedSolicitud.set(null);
  }
  // Cancela la solicitud: actualiza el estado a 'CANCELADA' y persiste en el servidor
  cancelarSolicitud(solicitud) {
    if (!solicitud)
      return;
    const confirmado = window.confirm("\xBFEst\xE1s seguro que deseas cancelar esta solicitud?");
    if (!confirmado)
      return;
    const currentUser = this.authService.infoUsuario();
    const currentUserIdStr = currentUser?.id ? String(currentUser.id) : "";
    if (solicitud.estado !== "PENDIENTE")
      return;
    if (solicitud.id == null || currentUserIdStr === "") {
      console.warn("Faltan datos para cancelar la solicitud");
      return;
    }
    this.isCancelling.set(true);
    this.solicitudService.cancelarSolicitudIfAllowed(String(solicitud.id), solicitud, currentUserIdStr).subscribe({
      next: (updated) => {
        this.loadSolicitudes();
        this.isCancelling.set(false);
        this.closeDetails();
      },
      error: (err) => {
        console.error("Error cancelando solicitud", err);
        this.isCancelling.set(false);
      }
    });
  }
  // Ejemplo de helper para formatear la fecha (puedes personalizarlo)
  formatFecha(fechaIso) {
    if (!fechaIso)
      return "";
    try {
      const d = new Date(fechaIso);
      return d.toLocaleDateString();
    } catch {
      return fechaIso;
    }
  }
  // Formatea una cadena de hora a HH:MM. Acepta formatos como 'HH:MM', 'HH:MM:SS',
  // o una parte horaria de un ISO datetime. Devuelve '-' si no hay valor.
  formatHora(hora) {
    if (!hora)
      return "-";
    const isoMatch = hora.match(/(\d{2}:\d{2})(:\d{2})?/);
    if (isoMatch) {
      return isoMatch[1];
    }
    const hmMatch = hora.match(/^(\d{1,2})([:.])(\d{2})$/);
    if (hmMatch) {
      const hh = hmMatch[1].padStart(2, "0");
      const mm = hmMatch[3];
      return `${hh}:${mm}`;
    }
    const d = new Date(hora);
    if (!isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    return hora;
  }
  static \u0275fac = function MisSolicitudes_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MisSolicitudes)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MisSolicitudes, selectors: [["app-mis-solicitudes"]], decls: 10, vars: 2, consts: [[1, "header"], ["type", "button", "routerLink", "/dashboard", 1, "btn-secondary"], [1, "grid-container"], [1, "card"], [1, "empty"], [1, "modal-overlay"], [1, "card-content"], [1, "meta"], [1, "day"], [1, "horas"], [1, "fechas"], [1, "right"], [1, "card-footer"], [1, "btn", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], ["aria-label", "Cerrar", 1, "close", 3, "click"], [1, "modal-body"], [1, "modal-footer"], [1, "btn", "btn-danger", 3, "disabled"], [1, "btn", "btn-danger", 3, "click", "disabled"]], template: function MisSolicitudes_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "h1");
      \u0275\u0275text(2, "Mis Solicitudes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "button", 1);
      \u0275\u0275text(4, " \u2190 Volver ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "section", 2);
      \u0275\u0275repeaterCreate(6, MisSolicitudes_For_7_Template, 21, 10, "article", 3, _forTrack0);
      \u0275\u0275conditionalCreate(8, MisSolicitudes_Conditional_8_Template, 2, 0, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, MisSolicitudes_Conditional_9_Template, 36, 10, "div", 5);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.solicitudes());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.solicitudes().length === 0 ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedSolicitud() ? 9 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: var(--font-size-3xl);\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  box-sizing: border-box;\n}\n.card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 8px;\n  box-shadow: 0 2px 6px rgba(10, 10, 10, 0.04);\n  padding: 1rem;\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 0.75rem;\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 6px 18px rgba(10, 10, 10, 0.08);\n}\n.card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  padding-bottom: 0.25rem;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 0.95rem;\n}\n.card-content[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.5rem;\n  color: #444;\n  font-size: 0.95rem;\n}\n.comentario[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #333;\n}\n.status-bubble[_ngcontent-%COMP%] {\n  min-width: 72px;\n  height: 40px;\n  border-radius: 999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 0.85rem;\n  text-transform: uppercase;\n}\n.status-APROBADA[_ngcontent-%COMP%] {\n  background: #2ecc71;\n}\n.status-PENDIENTE[_ngcontent-%COMP%] {\n  background: #f6c23e;\n  color: #2b2b2b;\n}\n.status-RECHAZADA[_ngcontent-%COMP%], \n.status-CANCELADA[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.card-actions[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  gap: 0.5rem;\n}\n.status-bubble[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 0 1rem;\n}\n.right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-left: auto;\n  white-space: nowrap;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.btn[_ngcontent-%COMP%] {\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  background: #234f86;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #c43a33;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.5rem 1rem;\n  color: #666;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 6px;\n}\n@media (max-width: 720px) {\n  .card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    padding: 0.75rem;\n  }\n  .card-content[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  .meta[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .right[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    align-items: center;\n    gap: 0.5rem;\n  }\n  .status-bubble[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 40px;\n    border-radius: 8px;\n    margin-left: 0;\n  }\n  .card-footer[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    justify-content: center;\n  }\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: _ngcontent-%COMP%_overlay-fade 160ms ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: _ngcontent-%COMP%_modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(2, 6, 23, 0.12);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.modal-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n@keyframes _ngcontent-%COMP%_overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_modal-pop {\n  from {\n    transform: translateY(-6px) scale(0.98);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.modal-header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 1.5rem;\n  line-height: 1;\n  cursor: pointer;\n}\n@media (max-width: 420px) {\n  .modal-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n/*# sourceMappingURL=mis-solicitudes.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MisSolicitudes, [{
    type: Component,
    args: [{ selector: "app-mis-solicitudes", imports: [CommonModule, RouterLink], template: `<section class="header">\r
    <h1>Mis Solicitudes</h1>\r
	<button type="button" routerLink="/dashboard" class="btn-secondary">\r
        \u2190 Volver\r
    </button>\r
</section>\r
\r
<section class="grid-container">\r
	@for (s of solicitudes(); track s.id) {\r
		<article class="card">\r
			<div class="card-content">\r
				<h2>Solicitud #{{ s.id }}</h2>\r
				<div class="meta">\r
					<span class="day">{{ s.dia_semana }}</span>\r
					  <span class="horas"><strong>Horario:</strong> {{ formatHora(s.hora_inicio) }} - {{ formatHora(s.hora_fin) }}</span>\r
					<span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(s.fecha_inicio) }} - {{ formatFecha(s.fecha_fin) }}</span>\r
				</div>\r
			</div>\r
			<div class="right">\r
				<div class="status-bubble status-{{ s.estado }}">{{ s.estado }}</div>\r
				<div class="card-footer">\r
					<a class="btn" (click)="openDetails(s)">Ver Detalles</a>\r
				</div>\r
			</div>\r
		</article>\r
	}\r
\r
	@if (solicitudes().length === 0) {\r
		<div class="empty">No hay solicitudes para mostrar.</div>\r
	}\r
</section>\r
\r
@if (selectedSolicitud()) {\r
	<div class="modal-overlay" (click)="closeDetails()">\r
		<div class="modal-card" (click)="$event.stopPropagation()">\r
			<header class="modal-header">\r
				<h3>Detalle - Solicitud #{{ selectedSolicitud()?.id }}</h3>\r
				<button class="close" aria-label="Cerrar" (click)="closeDetails()">\xD7</button>\r
			</header>\r
\r
			<div class="modal-body">\r
				<p><strong>Estado:</strong> {{ selectedSolicitud()?.estado }}</p>\r
				<p><strong>D\xEDa:</strong> {{ selectedSolicitud()?.dia_semana }}</p>\r
				<p><strong>Horario:</strong> {{ formatHora(selectedSolicitud()?.hora_inicio) }} - {{ formatHora(selectedSolicitud()?.hora_fin) }}</p>\r
				<p><strong>Fechas:</strong> {{ formatFecha(selectedSolicitud()?.fecha_inicio) }} - {{ formatFecha(selectedSolicitud()?.fecha_fin) }}</p>\r
				<p><strong>Comentario profesor:</strong> {{ selectedSolicitud()?.comentario_profesor || '-' }}</p>\r
				<p><strong>Comentario estado:</strong> {{ selectedSolicitud()?.comentario_estado || '-' }}</p>\r
			</div>\r
\r
			<footer class="modal-footer">\r
				@if (selectedSolicitud()?.estado === 'PENDIENTE') {\r
					<button class="btn btn-danger" (click)="cancelarSolicitud(selectedSolicitud())" [disabled]="isCancelling()">Cancelar solicitud</button>\r
				}\r
				<button class="btn" (click)="closeDetails()">Cerrar</button>\r
			</footer>\r
		</div>\r
	</div>\r
}\r
\r
`, styles: ["/* src/app/pages/solicitud/mis-solicitudes/mis-solicitudes.css */\n.header {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header h1 {\n  color: var(--color-primary);\n  font-size: var(--font-size-3xl);\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header .btn-secondary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n}\n.header .btn-secondary:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container {\n  display: block;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  box-sizing: border-box;\n}\n.card {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 8px;\n  box-shadow: 0 2px 6px rgba(10, 10, 10, 0.04);\n  padding: 1rem;\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 0.75rem;\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 6px 18px rgba(10, 10, 10, 0.08);\n}\n.card h2 {\n  margin: 0 0 0.25rem 0;\n  padding-bottom: 0.25rem;\n}\n.card p {\n  margin: 0;\n  color: #333;\n  font-size: 0.95rem;\n}\n.card-content {\n  flex: 1 1 auto;\n}\n.meta {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.5rem;\n  color: #444;\n  font-size: 0.95rem;\n}\n.comentario {\n  margin-top: 0.25rem;\n  color: #333;\n}\n.status-bubble {\n  min-width: 72px;\n  height: 40px;\n  border-radius: 999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 0.85rem;\n  text-transform: uppercase;\n}\n.status-APROBADA {\n  background: #2ecc71;\n}\n.status-PENDIENTE {\n  background: #f6c23e;\n  color: #2b2b2b;\n}\n.status-RECHAZADA,\n.status-CANCELADA {\n  background: #e74c3c;\n}\n.card-actions {\n  margin-top: 0.5rem;\n  display: flex;\n  gap: 0.5rem;\n}\n.status-bubble {\n  margin-left: auto;\n  padding: 0 1rem;\n}\n.right {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-left: auto;\n  white-space: nowrap;\n}\n.card-footer {\n  display: flex;\n  align-items: center;\n}\n.btn {\n  white-space: nowrap;\n}\n.btn {\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn:hover {\n  background: #234f86;\n}\n.btn-danger {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.btn-danger:hover {\n  background: #c43a33;\n}\n.empty {\n  text-align: center;\n  padding: 1.5rem 1rem;\n  color: #666;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 6px;\n}\n@media (max-width: 720px) {\n  .card {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    padding: 0.75rem;\n  }\n  .card-content {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  .meta {\n    justify-content: center;\n  }\n  .right {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    align-items: center;\n    gap: 0.5rem;\n  }\n  .status-bubble {\n    width: 100%;\n    height: 40px;\n    border-radius: 8px;\n    margin-left: 0;\n  }\n  .card-footer {\n    width: 100%;\n    display: flex;\n    justify-content: center;\n  }\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: overlay-fade 160ms ease;\n}\n.modal-card {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header h3 {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.modal-header .close {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(2, 6, 23, 0.12);\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n.modal-body {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body p {\n  margin: 0.5rem 0;\n}\n.modal-body strong {\n  color: var(--color-text-secondary);\n}\n.modal-footer {\n  padding: 0.5rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.modal-footer .btn {\n  margin-left: 0.5rem;\n}\n@keyframes overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes modal-pop {\n  from {\n    transform: translateY(-6px) scale(0.98);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.modal-header .close {\n  background: transparent;\n  border: none;\n  font-size: 1.5rem;\n  line-height: 1;\n  cursor: pointer;\n}\n@media (max-width: 420px) {\n  .modal-card {\n    max-width: 100%;\n  }\n}\n/*# sourceMappingURL=mis-solicitudes.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MisSolicitudes, { className: "MisSolicitudes", filePath: "src/app/pages/solicitud/mis-solicitudes/mis-solicitudes.ts", lineNumber: 14 });
})();

// src/app/pages/solicitud/list-solicitudes/list-solicitudes.ts
var _forTrack02 = ($index, $item) => $item.id;
function ListSolicitudes_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17);
    \u0275\u0275listener("click", function ListSolicitudes_For_14_Template_article_click_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r2));
    })("keydown.enter", function ListSolicitudes_For_14_Template_article_keydown_enter_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r2));
    })("keydown.space", function ListSolicitudes_For_14_Template_article_keydown_space_0_listener($event) {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r2));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 22)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 23);
    \u0275\u0275element(16, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Solicitud #", s_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r2.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(s_r2.hora_inicio), " - ", ctx_r2.formatHora(s_r2.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(s_r2.fecha_inicio), " - ", ctx_r2.formatFecha(s_r2.fecha_fin));
  }
}
function ListSolicitudes_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "No hay solicitudes pendientes.");
    \u0275\u0275elementEnd();
  }
}
function ListSolicitudes_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17);
    \u0275\u0275listener("click", function ListSolicitudes_For_24_Template_article_click_0_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r5));
    })("keydown.enter", function ListSolicitudes_For_24_Template_article_keydown_enter_0_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r5));
    })("keydown.space", function ListSolicitudes_For_24_Template_article_keydown_space_0_listener($event) {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r5));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 22)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 23);
    \u0275\u0275element(16, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Solicitud #", s_r5.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r5.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(s_r5.hora_inicio), " - ", ctx_r2.formatHora(s_r5.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(s_r5.fecha_inicio), " - ", ctx_r2.formatFecha(s_r5.fecha_fin));
  }
}
function ListSolicitudes_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "No hay solicitudes aprobadas.");
    \u0275\u0275elementEnd();
  }
}
function ListSolicitudes_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17);
    \u0275\u0275listener("click", function ListSolicitudes_For_34_Template_article_click_0_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r7));
    })("keydown.enter", function ListSolicitudes_For_34_Template_article_keydown_enter_0_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r7));
    })("keydown.space", function ListSolicitudes_For_34_Template_article_keydown_space_0_listener($event) {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r7));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 22)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 23);
    \u0275\u0275element(16, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Solicitud #", s_r7.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r7.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(s_r7.hora_inicio), " - ", ctx_r2.formatHora(s_r7.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(s_r7.fecha_inicio), " - ", ctx_r2.formatFecha(s_r7.fecha_fin));
  }
}
function ListSolicitudes_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "No hay solicitudes rechazadas.");
    \u0275\u0275elementEnd();
  }
}
function ListSolicitudes_For_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17);
    \u0275\u0275listener("click", function ListSolicitudes_For_44_Template_article_click_0_listener() {
      const s_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r9));
    })("keydown.enter", function ListSolicitudes_For_44_Template_article_keydown_enter_0_listener() {
      const s_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r9));
    })("keydown.space", function ListSolicitudes_For_44_Template_article_keydown_space_0_listener($event) {
      const s_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.openDetails(s_r9));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21)(8, "strong");
    \u0275\u0275text(9, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 22)(12, "strong");
    \u0275\u0275text(13, "Fecha inicio - fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 23);
    \u0275\u0275element(16, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Solicitud #", s_r9.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r9.dia_semana);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora(s_r9.hora_inicio), " - ", ctx_r2.formatHora(s_r9.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha(s_r9.fecha_inicio), " - ", ctx_r2.formatFecha(s_r9.fecha_fin));
  }
}
function ListSolicitudes_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "No hay solicitudes canceladas por usuarios.");
    \u0275\u0275elementEnd();
  }
}
function ListSolicitudes_Conditional_46_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "button", 37);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Conditional_58_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmApprove());
    });
    \u0275\u0275text(2, "Aceptar Solicitud");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 38);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Conditional_58_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmReject());
    });
    \u0275\u0275text(4, "Rechazar Solicitud");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSavingComment());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isSavingComment());
  }
}
function ListSolicitudes_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 27)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetails());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29)(8, "p")(9, "strong");
    \u0275\u0275text(10, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "D\xEDa:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p")(17, "strong");
    \u0275\u0275text(18, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p")(21, "strong");
    \u0275\u0275text(22, "Fecha inicio:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p")(25, "strong");
    \u0275\u0275text(26, "Fecha fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p")(29, "strong");
    \u0275\u0275text(30, "Fecha/Hora solicitud:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p")(33, "strong");
    \u0275\u0275text(34, "Solicitante:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p")(37, "strong");
    \u0275\u0275text(38, "Comisi\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p")(41, "strong");
    \u0275\u0275text(42, "Espacio:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "p")(45, "strong");
    \u0275\u0275text(46, "Comentario profesor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 30)(49, "label", 31)(50, "strong");
    \u0275\u0275text(51, "Comentario estado:");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(52, "hr");
    \u0275\u0275elementStart(53, "textarea", 32);
    \u0275\u0275listener("input", function ListSolicitudes_Conditional_46_Template_textarea_input_53_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setComentarioEditing($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 33)(55, "button", 34);
    \u0275\u0275listener("click", function ListSolicitudes_Conditional_46_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveComentarioEstado());
    });
    \u0275\u0275text(56, "Guardar comentario");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(57, "footer", 35);
    \u0275\u0275conditionalCreate(58, ListSolicitudes_Conditional_46_Conditional_58_Template, 5, 2, "div", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_14_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Detalle - Solicitud #", (tmp_1_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_1_0.id);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ((tmp_2_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_2_0.estado) || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_3_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_3_0.dia_semana) || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatHora((tmp_4_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_4_0.hora_inicio), " - ", ctx_r2.formatHora((tmp_4_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_4_0.hora_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatFecha((tmp_5_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_5_0.fecha_inicio));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatFecha((tmp_6_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_6_0.fecha_fin));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formatFecha((tmp_7_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_7_0.fecha_hora_solicitud), " ", ctx_r2.formatHora((tmp_7_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_7_0.fecha_hora_solicitud));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_8_0 = ctx_r2.selectedUsuario()) == null ? null : tmp_8_0.nombre) ? ((tmp_8_0 = ctx_r2.selectedUsuario()) == null ? null : tmp_8_0.nombre) + " " + ((tmp_8_0 = ctx_r2.selectedUsuario()) == null ? null : tmp_8_0.apellido) : ((tmp_8_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_8_0.usuario_id) ?? "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_9_0 = ctx_r2.selectedComision()) == null ? null : tmp_9_0.nombre) ? (tmp_9_0 = ctx_r2.selectedComision()) == null ? null : tmp_9_0.nombre : ((tmp_9_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_9_0.comision_id) ?? "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_10_0 = ctx_r2.selectedEspacio()) == null ? null : tmp_10_0.nombre) ? (tmp_10_0 = ctx_r2.selectedEspacio()) == null ? null : tmp_10_0.nombre : ((tmp_10_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_10_0.nuevo_espacio_id) ?? "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_11_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_11_0.comentario_profesor) || "-");
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.comentarioEditing());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isSavingComment());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.isAdmin() && ((tmp_14_0 = ctx_r2.selectedSolicitud()) == null ? null : tmp_14_0.estado) === "PENDIENTE" ? 58 : -1);
  }
}
var ListSolicitudes = class _ListSolicitudes {
  solicitudService = inject(Solicitud);
  authService = inject(AuthService);
  usuarioService = inject(UsuarioService);
  http = inject(HttpClient);
  // Señales públicas para usar en la plantilla separadas por estado
  solicitudes = signal([], ...ngDevMode ? [{ debugName: "solicitudes" }] : []);
  pendientes = signal([], ...ngDevMode ? [{ debugName: "pendientes" }] : []);
  aprobadas = signal([], ...ngDevMode ? [{ debugName: "aprobadas" }] : []);
  rechazadas = signal([], ...ngDevMode ? [{ debugName: "rechazadas" }] : []);
  otras = signal([], ...ngDevMode ? [{ debugName: "otras" }] : []);
  // Señal privada para la solicitud seleccionada (usada por los helpers siguientes)
  _selected = signal(null, ...ngDevMode ? [{ debugName: "_selected" }] : []);
  // Señal privada para el usuario (solicitante) de la solicitud seleccionada
  _selectedUsuario = signal(null, ...ngDevMode ? [{ debugName: "_selectedUsuario" }] : []);
  // Señal privada para la comisión de la solicitud seleccionada
  _selectedComision = signal(null, ...ngDevMode ? [{ debugName: "_selectedComision" }] : []);
  // Señal privada para el espacio (nuevo_espacio) de la solicitud seleccionada
  _selectedEspacio = signal(null, ...ngDevMode ? [{ debugName: "_selectedEspacio" }] : []);
  // Flag para operaciones asíncronas (ej. cancelar)
  _isCancelling = signal(false, ...ngDevMode ? [{ debugName: "_isCancelling" }] : []);
  // Señal para editar el comentario de estado en la UI
  _comentarioEditing = signal("", ...ngDevMode ? [{ debugName: "_comentarioEditing" }] : []);
  _isSavingComment = signal(false, ...ngDevMode ? [{ debugName: "_isSavingComment" }] : []);
  constructor() {
  }
  ngOnInit() {
    this.loadSolicitudes();
  }
  // === Helpers y acciones de detalle (usados por la plantilla) ===
  selectedSolicitud() {
    return this._selected();
  }
  selectedUsuario() {
    return this._selectedUsuario();
  }
  selectedComision() {
    return this._selectedComision();
  }
  selectedEspacio() {
    return this._selectedEspacio();
  }
  openDetails(s) {
    this._selected.set(s);
    this._comentarioEditing.set(s.comentario_estado || "");
    const uid = s.usuario_id ?? s.usuario?.id ?? null;
    if (uid) {
      this.usuarioService.getUsuarioById(String(uid)).subscribe({
        next: (u) => this._selectedUsuario.set(u),
        error: (err) => {
          console.error("Error cargando usuario", err);
          this._selectedUsuario.set(null);
        }
      });
    } else {
      this._selectedUsuario.set(null);
    }
    const cid = s.comision_id ?? null;
    if (cid !== null && cid !== void 0) {
      this.http.get(`http://localhost:3000/comisiones/${cid}`).subscribe({
        next: (c) => this._selectedComision.set(c),
        error: (err) => {
          console.error("Error cargando comisi\xF3n", err);
          this._selectedComision.set(null);
        }
      });
    } else {
      this._selectedComision.set(null);
    }
    const eid = s.nuevo_espacio_id ?? null;
    if (eid !== null && eid !== void 0) {
      this.http.get(`http://localhost:3000/espacios/${eid}`).subscribe({
        next: (e) => this._selectedEspacio.set(e),
        error: (err) => {
          console.error("Error cargando espacio", err);
          this._selectedEspacio.set(null);
        }
      });
    } else {
      this._selectedEspacio.set(null);
    }
  }
  comentarioEditing() {
    return this._comentarioEditing();
  }
  isSavingComment() {
    return this._isSavingComment();
  }
  setComentarioEditing(v) {
    this._comentarioEditing.set(v);
  }
  isAdmin() {
    return String(this.authService.infoUsuario().rol) === "ADMIN";
  }
  saveComentarioEstado() {
    const s = this._selected();
    if (!s || s.id == null)
      return;
    const idStr = String(s.id);
    const nuevo = this._comentarioEditing();
    this._isSavingComment.set(true);
    this.solicitudService.patchComentarioEstado(idStr, nuevo).subscribe({
      next: (updated) => {
        this._isSavingComment.set(false);
        const newS = __spreadProps(__spreadValues({}, s), { comentario_estado: updated.comentario_estado });
        this._selected.set(newS);
        this.updateLocalSolicitud(newS);
      },
      error: (err) => {
        console.error("Error guardando comentario", err);
        this._isSavingComment.set(false);
      }
    });
  }
  // Aprobar la solicitud y guardar comentario de estado
  approveSolicitud() {
    this.changeEstadoConComentario("APROBADA");
  }
  // Rechazar la solicitud y guardar comentario de estado
  rejectSolicitud() {
    this.changeEstadoConComentario("RECHAZADA");
  }
  // Mostrar confirmación al usuario antes de acciones irreversibles
  confirmApprove() {
    const s = this._selected();
    if (!s)
      return;
    const ok = window.confirm("Esta acci\xF3n aceptar\xE1 la solicitud y no tiene vuelta atr\xE1s. \xBFDesea continuar?");
    if (ok)
      this.approveSolicitud();
  }
  confirmReject() {
    const s = this._selected();
    if (!s)
      return;
    const ok = window.confirm("Esta acci\xF3n rechazar\xE1 la solicitud y no tiene vuelta atr\xE1s. \xBFDesea continuar?");
    if (ok)
      this.rejectSolicitud();
  }
  changeEstadoConComentario(estado) {
    const s = this._selected();
    if (!s || s.id == null)
      return;
    const idStr = String(s.id);
    const comentario = this._comentarioEditing();
    this._isSavingComment.set(true);
    this.solicitudService.patchEstadoComentario(idStr, estado, comentario).subscribe({
      next: (updated) => {
        this._isSavingComment.set(false);
        const newS = __spreadProps(__spreadValues({}, s), { estado: updated.estado, comentario_estado: updated.comentario_estado });
        this._selected.set(newS);
        this.updateLocalSolicitud(newS);
      },
      error: (err) => {
        console.error(`Error cambiando estado a ${estado}`, err);
        this._isSavingComment.set(false);
      }
    });
  }
  updateLocalSolicitud(updated) {
    const all = this.solicitudes();
    const mapped = all.map((x) => x.id === updated.id ? updated : x);
    this.solicitudes.set(mapped);
    this.categorizeSolicitudes(mapped);
  }
  closeDetails() {
    this._selected.set(null);
    this._selectedUsuario.set(null);
    this._selectedComision.set(null);
    this._selectedEspacio.set(null);
  }
  isCancelling() {
    return this._isCancelling();
  }
  loadSolicitudes() {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes.set(data);
        this.categorizeSolicitudes(data);
      },
      error: (err) => {
        console.error("Error cargando solicitudes", err);
      }
    });
  }
  categorizeSolicitudes(data) {
    const pendientes = [];
    const aprobadas = [];
    const rechazadas = [];
    const otras = [];
    for (const s of data) {
      const estado = s.estado ?? "";
      const norm = String(estado).toLowerCase();
      if (norm.includes("pend")) {
        pendientes.push(s);
      } else if (norm.includes("aprob")) {
        aprobadas.push(s);
      } else if (norm.includes("rech")) {
        rechazadas.push(s);
      } else {
        otras.push(s);
      }
    }
    this.pendientes.set(pendientes);
    this.aprobadas.set(aprobadas);
    this.rechazadas.set(rechazadas);
    this.otras.set(otras);
  }
  // Ejemplo de helper para formatear la fecha 
  formatFecha(fechaIso) {
    if (!fechaIso)
      return "";
    try {
      const d = new Date(fechaIso);
      return d.toLocaleDateString();
    } catch {
      return fechaIso;
    }
  }
  formatHora(hora) {
    if (!hora)
      return "-";
    const isoMatch = hora.match(/(\d{2}:\d{2})(:\d{2})?/);
    if (isoMatch) {
      return isoMatch[1];
    }
    const hmMatch = hora.match(/^(\d{1,2})([:.])(\d{2})$/);
    if (hmMatch) {
      const hh = hmMatch[1].padStart(2, "0");
      const mm = hmMatch[3];
      return `${hh}:${mm}`;
    }
    const d = new Date(hora);
    if (!isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    return hora;
  }
  static \u0275fac = function ListSolicitudes_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListSolicitudes)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListSolicitudes, selectors: [["app-list-solicitudes"]], decls: 47, vars: 9, consts: [[1, "container"], [1, "header"], ["type", "button", "routerLink", "/dashboard", 1, "btn-secondary"], [1, "grid-container", "sector", "pendientes"], [1, "section-header"], [1, "list-title"], [1, "section-count", "pendientes-count"], [1, "grid-list"], ["role", "button", "tabindex", "0", 1, "card"], [1, "empty"], [1, "grid-container", "sector", "aprobadas"], [1, "section-count", "aprobadas-count"], [1, "grid-container", "sector", "rechazadas"], [1, "section-count", "rechazadas-count"], [1, "grid-container", "sector", "otras"], [1, "section-count", "otras-count"], [1, "modal-overlay"], ["role", "button", "tabindex", "0", 1, "card", 3, "click", "keydown.enter", "keydown.space"], [1, "card-content"], [1, "meta"], [1, "day"], [1, "horas"], [1, "fechas"], [1, "right"], [1, "card-footer"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], ["aria-label", "Cerrar", 1, "close", 3, "click"], [1, "modal-body"], [1, "comentario-edit"], ["for", "comentario_estado"], ["id", "comentario_estado", "rows", "3", 1, "form-control", 3, "input", "value"], [1, "actions"], [1, "btn", 3, "click", "disabled"], [1, "modal-footer"], [1, "admin-actions"], [1, "btn", "primary", 3, "click", "disabled"], [1, "btn", "danger", 3, "click", "disabled"]], template: function ListSolicitudes_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "h1");
      \u0275\u0275text(3, "Solicitudes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275text(5, " \u2190 Volver ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "section", 3)(7, "div", 4)(8, "h2", 5);
      \u0275\u0275text(9, "Solicitudes Pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7);
      \u0275\u0275repeaterCreate(13, ListSolicitudes_For_14_Template, 17, 6, "article", 8, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ListSolicitudes_Conditional_15_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "section", 10)(17, "div", 4)(18, "h2", 5);
      \u0275\u0275text(19, "Solicitudes Aprobadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 11);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 7);
      \u0275\u0275repeaterCreate(23, ListSolicitudes_For_24_Template, 17, 6, "article", 8, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(25, ListSolicitudes_Conditional_25_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "section", 12)(27, "div", 4)(28, "h2", 5);
      \u0275\u0275text(29, "Solicitudes Rechazadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 13);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 7);
      \u0275\u0275repeaterCreate(33, ListSolicitudes_For_34_Template, 17, 6, "article", 8, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, ListSolicitudes_Conditional_35_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "section", 14)(37, "div", 4)(38, "h2", 5);
      \u0275\u0275text(39, "Solicitudes Canceladas por los Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 15);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 7);
      \u0275\u0275repeaterCreate(43, ListSolicitudes_For_44_Template, 17, 6, "article", 8, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(45, ListSolicitudes_Conditional_45_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(46, ListSolicitudes_Conditional_46_Template, 59, 16, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.pendientes().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.pendientes());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.pendientes().length === 0 ? 15 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.aprobadas().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.aprobadas());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.aprobadas().length === 0 ? 25 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.rechazadas().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.rechazadas());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.rechazadas().length === 0 ? 35 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.otras().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.otras());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.otras().length === 0 ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedSolicitud() ? 46 : -1);
    }
  }, dependencies: [RouterLink], styles: ['\n\n[_ngcontent-%COMP%]:root {\n  --bg: #f5f7fb;\n  --card: #ffffff;\n  --muted: #6b7280;\n  --accent: #0366d6;\n  --success: #2a9d8f;\n  --danger: #d9534f;\n  --border: #e6e9ef;\n  --color-primary: var(--accent);\n  --color-primary-dark: #234f86;\n  --color-text-inverse: #ffffff;\n  --color-text-secondary: #475569;\n  --shadow-light: 0 2px 6px rgba(2,6,23,0.08);\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\nbody[_ngcontent-%COMP%] {\n  background: var(--bg);\n  color: #111827;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    "Segoe UI",\n    Roboto,\n    "Helvetica Neue",\n    Arial;\n}\n.header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 2rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n}\n.header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.75rem 0;\n}\n.grid-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: .25rem 0 0.75rem;\n  font-size: 1.125rem;\n  color: var(--muted);\n}\n.grid-list[_ngcontent-%COMP%] {\n  display: block;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: 0.25rem;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 10px;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(15, 23, 42, 0.08);\n  border-radius: 6px;\n}\n.grid-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 23, 42, 0.12);\n}\narticle.card[_ngcontent-%COMP%] {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.9rem;\n  margin-bottom: 0.6rem;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\n  transition: box-shadow .12s ease, transform .08s ease;\n}\narticle.card[_ngcontent-%COMP%]:hover {\n  background: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);\n}\narticle.card[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\narticle.card[_ngcontent-%COMP%]:focus {\n  outline: 3px solid rgba(3, 102, 214, 0.16);\n  outline-offset: 3px;\n}\narticle.card[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.card-content[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  padding-right: 0.75rem;\n}\n.card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1rem;\n  color: #0b1220;\n  display: block;\n  font-weight: 600;\n}\n.meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--muted);\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n.meta[_ngcontent-%COMP%]   .fechas[_ngcontent-%COMP%], \n.meta[_ngcontent-%COMP%]   .horas[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.card-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  background: #234f86;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 8px;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: _ngcontent-%COMP%_overlay-fade 160ms ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: _ngcontent-%COMP%_modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: var(--shadow-light);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.modal-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.comentario-edit[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  padding: 0.75rem;\n  border: 2px solid var(--color-primary);\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(250, 250, 252, 0.6),\n      transparent);\n}\n.comentario-edit[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary-dark);\n  box-shadow: 0 8px 24px rgba(3, 102, 214, 0.08);\n}\n.comentario-edit[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.comentario-edit[_ngcontent-%COMP%]   textarea.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 84px;\n  max-height: 240px;\n  resize: vertical;\n  padding: 0.5rem;\n  border: 1px solid var(--border);\n  border-radius: 6px;\n  font-family: inherit;\n  font-size: 0.95rem;\n  color: #0b1220;\n  box-shadow: none;\n}\n.comentario-edit[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.comentario-edit[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.45rem 0.9rem;\n  font-size: 0.95rem;\n}\n.admin-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: 1rem;\n}\n.btn.primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border-radius: 8px;\n}\n.btn.primary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.btn.danger[_ngcontent-%COMP%] {\n  background: #ff4137;\n  color: #fff;\n  border-radius: 8px;\n}\n.btn.danger[_ngcontent-%COMP%]:hover {\n  background: #c43b35;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border-radius: 8px;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: var(--danger);\n  color: #fff;\n  border-radius: 8px;\n  border: none;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #c43b35;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n.modal-footer[_ngcontent-%COMP%]   .admin-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: 1rem;\n  flex-wrap: wrap;\n}\n.modal-footer[_ngcontent-%COMP%]   .admin-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-left: 0;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: space-between;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n  min-width: 88px;\n}\n.admin-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  text-align: center;\n}\n.btn-danger[_ngcontent-%COMP%], \n.btn.btn-danger[_ngcontent-%COMP%] {\n  background: var(--danger) !important;\n  color: #fff !important;\n  border: none !important;\n  box-shadow: none;\n}\n.btn-primary[_ngcontent-%COMP%], \n.btn.btn-primary[_ngcontent-%COMP%] {\n  background: var(--color-primary) !important;\n  color: var(--color-text-inverse) !important;\n  border: none !important;\n}\n@media (max-width: 520px) {\n  .modal-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.5rem;\n  }\n  .modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n    order: 0;\n    align-self: flex-start;\n  }\n  .admin-actions[_ngcontent-%COMP%] {\n    order: 1;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .admin-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_modal-pop {\n  from {\n    transform: translateY(-6px) scale(0.98);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.raw-json[_ngcontent-%COMP%] {\n  background: #0f172a;\n  color: #e6edf3;\n  padding: .75rem;\n  border-radius: 6px;\n  font-size: 12px;\n  overflow: auto;\n}\n.muted[_ngcontent-%COMP%] {\n  color: var(--muted);\n}\n@media (max-width: 720px) {\n  .grid-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-card[_ngcontent-%COMP%] {\n    margin: 0 0.5rem;\n    max-width: calc(100% - 1rem);\n  }\n  article.card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: .5rem;\n  }\n  .right[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n}\n.sector[_ngcontent-%COMP%] {\n  padding: 0.6rem;\n  margin-bottom: 1rem;\n  border-radius: 10px;\n  border: 1px solid transparent;\n}\n.sector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin: 0 0 0.75rem 0;\n  padding: 0.25rem 0.5rem;\n  border-radius: 6px;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.section-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-weight: 700;\n  color: #fff;\n}\n.section-count.pendientes-count[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.section-count.aprobadas-count[_ngcontent-%COMP%] {\n  background: #2a9d8f;\n}\n.section-count.rechazadas-count[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.section-count.otras-count[_ngcontent-%COMP%] {\n  background: #6b7280;\n}\n.sector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 700;\n  font-size: 1.05rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  line-height: 1.1;\n  margin: 0;\n}\n@media (max-width: 720px) {\n  .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.05rem;\n  }\n}\n.sector.pendientes[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 250, 240, 0.6),\n      transparent 60%);\n  border-left: 6px solid #f59e0b;\n}\n.sector.pendientes[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n  color: #92400e;\n}\n.sector.aprobadas[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(236, 253, 245, 0.6),\n      transparent 60%);\n  border-left: 6px solid #2a9d8f;\n}\n.sector.aprobadas[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  background: rgba(42, 157, 143, 0.06);\n  color: #14532d;\n}\n.sector.rechazadas[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 241, 242, 0.6),\n      transparent 60%);\n  border-left: 6px solid #ef4444;\n}\n.sector.rechazadas[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.06);\n  color: #7f1d1d;\n}\n.sector.otras[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(243, 244, 246, 0.6),\n      transparent 60%);\n  border-left: 6px solid #6b7280;\n}\n.sector.otras[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  background: rgba(107, 114, 128, 0.04);\n  color: #374151;\n}\n.grid-container[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=list-solicitudes.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListSolicitudes, [{
    type: Component,
    args: [{ selector: "app-list-solicitudes", imports: [RouterLink], template: `<main class="container">\r
    <section class="header">\r
        <h1>Solicitudes</h1>\r
        <button type="button" routerLink="/dashboard" class="btn-secondary">\r
            \u2190 Volver\r
        </button>\r
    </section>\r
\r
\r
    <section class="grid-container sector pendientes">\r
        <div class="section-header">\r
            <h2 class="list-title">Solicitudes Pendientes</h2>\r
            <span class="section-count pendientes-count">{{ pendientes().length }}</span>\r
        </div>\r
        <div class="grid-list">\r
            @for(s of pendientes(); track s.id) {\r
            <article class="card" role="button" tabindex="0" (click)="openDetails(s)" (keydown.enter)="openDetails(s)" (keydown.space)="$event.preventDefault(); openDetails(s)">\r
                <div class="card-content">\r
                    <h2>Solicitud #{{ s.id }}</h2>\r
                    <div class="meta">\r
                        <span class="day">{{ s.dia_semana }}</span>\r
                        <span class="horas"><strong>Horario:</strong> {{ formatHora(s.hora_inicio) }} - {{\r
                            formatHora(s.hora_fin) }}</span>\r
                        <span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(s.fecha_inicio) }} - {{\r
                            formatFecha(s.fecha_fin) }}</span>\r
                    </div>\r
                </div>\r
                <div class="right">\r
                    <div class="card-footer">\r
                    </div>\r
                </div>\r
            </article>\r
            }\r
        </div>\r
        @if (pendientes().length === 0) {\r
            <div class="empty">No hay solicitudes pendientes.</div>\r
        }\r
    </section>\r
\r
    <section class="grid-container sector aprobadas">\r
        <div class="section-header">\r
            <h2 class="list-title">Solicitudes Aprobadas</h2>\r
            <span class="section-count aprobadas-count">{{ aprobadas().length }}</span>\r
        </div>\r
        <div class="grid-list">\r
            @for(s of aprobadas(); track s.id) {\r
            <article class="card" role="button" tabindex="0" (click)="openDetails(s)" (keydown.enter)="openDetails(s)" (keydown.space)="$event.preventDefault(); openDetails(s)">\r
                <div class="card-content">\r
                    <h2>Solicitud #{{ s.id }}</h2>\r
                    <div class="meta">\r
                        <span class="day">{{ s.dia_semana }}</span>\r
                        <span class="horas"><strong>Horario:</strong> {{ formatHora(s.hora_inicio) }} - {{\r
                            formatHora(s.hora_fin) }}</span>\r
                        <span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(s.fecha_inicio) }} - {{\r
                            formatFecha(s.fecha_fin) }}</span>\r
                    </div>\r
                </div>\r
                <div class="right">\r
                    <div class="card-footer">\r
                    </div>\r
                </div>\r
            </article>\r
            }\r
        </div>\r
        @if (aprobadas().length === 0) {\r
            <div class="empty">No hay solicitudes aprobadas.</div>\r
        }\r
    </section>\r
\r
    <section class="grid-container sector rechazadas">\r
        <div class="section-header">\r
            <h2 class="list-title">Solicitudes Rechazadas</h2>\r
            <span class="section-count rechazadas-count">{{ rechazadas().length }}</span>\r
        </div>\r
        <div class="grid-list">\r
            @for(s of rechazadas(); track s.id) {\r
            <article class="card" role="button" tabindex="0" (click)="openDetails(s)" (keydown.enter)="openDetails(s)" (keydown.space)="$event.preventDefault(); openDetails(s)">\r
                <div class="card-content">\r
                    <h2>Solicitud #{{ s.id }}</h2>\r
                    <div class="meta">\r
                        <span class="day">{{ s.dia_semana }}</span>\r
                        <span class="horas"><strong>Horario:</strong> {{ formatHora(s.hora_inicio) }} - {{\r
                            formatHora(s.hora_fin) }}</span>\r
                        <span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(s.fecha_inicio) }} - {{\r
                            formatFecha(s.fecha_fin) }}</span>\r
                    </div>\r
                </div>\r
                <div class="right">\r
                    <div class="card-footer">\r
                    </div>\r
                </div>\r
            </article>\r
            }\r
        </div>\r
        @if (rechazadas().length === 0) {\r
            <div class="empty">No hay solicitudes rechazadas.</div>\r
        }\r
    </section>\r
\r
    <section class="grid-container sector otras">\r
        <div class="section-header">\r
            <h2 class="list-title">Solicitudes Canceladas por los Usuarios</h2>\r
            <span class="section-count otras-count">{{ otras().length }}</span>\r
        </div>\r
        <div class="grid-list">\r
            @for(s of otras(); track s.id) {\r
            <article class="card" role="button" tabindex="0" (click)="openDetails(s)" (keydown.enter)="openDetails(s)" (keydown.space)="$event.preventDefault(); openDetails(s)">\r
                <div class="card-content">\r
                    <h2>Solicitud #{{ s.id }}</h2>\r
                    <div class="meta">\r
                        <span class="day">{{ s.dia_semana }}</span>\r
                        <span class="horas"><strong>Horario:</strong> {{ formatHora(s.hora_inicio) }} - {{\r
                            formatHora(s.hora_fin) }}</span>\r
                        <span class="fechas"><strong>Fecha inicio - fin:</strong> {{ formatFecha(s.fecha_inicio) }} - {{\r
                            formatFecha(s.fecha_fin) }}</span>\r
                    </div>\r
                </div>\r
                <div class="right">\r
                    <div class="card-footer">\r
                    </div>\r
                </div>\r
            </article>\r
            }\r
        </div>\r
        @if (otras().length === 0) {\r
            <div class="empty">No hay solicitudes canceladas por usuarios.</div>\r
        }\r
    </section>\r
\r
    @if (selectedSolicitud()) {\r
    <div class="modal-overlay" (click)="closeDetails()">\r
        <div class="modal-card" (click)="$event.stopPropagation()">\r
            <header class="modal-header">\r
                <h3>Detalle - Solicitud #{{ selectedSolicitud()?.id }}</h3>\r
                <button class="close" aria-label="Cerrar" (click)="closeDetails()">\xD7</button>\r
            </header>\r
\r
            <div class="modal-body">\r
                <p><strong>Estado:</strong> {{ selectedSolicitud()?.estado || '-' }}</p>\r
                <p><strong>D\xEDa:</strong> {{ selectedSolicitud()?.dia_semana || '-' }}</p>\r
                <p><strong>Horario:</strong> {{ formatHora(selectedSolicitud()?.hora_inicio) }} - {{\r
                    formatHora(selectedSolicitud()?.hora_fin) }}</p>\r
                <p><strong>Fecha inicio:</strong> {{ formatFecha(selectedSolicitud()?.fecha_inicio) }}</p>\r
                <p><strong>Fecha fin:</strong> {{ formatFecha(selectedSolicitud()?.fecha_fin) }}</p>\r
                <p><strong>Fecha/Hora solicitud:</strong> {{ formatFecha(selectedSolicitud()?.fecha_hora_solicitud) }}\r
                    {{ formatHora(selectedSolicitud()?.fecha_hora_solicitud) }}</p>\r
                <p><strong>Solicitante:</strong> {{ selectedUsuario()?.nombre ? (selectedUsuario()?.nombre + ' ' + selectedUsuario()?.apellido) : (selectedSolicitud()?.usuario_id ?? '-') }}</p>\r
                <p><strong>Comisi\xF3n:</strong> {{ selectedComision()?.nombre ? selectedComision()?.nombre : (selectedSolicitud()?.comision_id ?? '-') }}</p>\r
                <p><strong>Espacio:</strong> {{ selectedEspacio()?.nombre ? selectedEspacio()?.nombre : (selectedSolicitud()?.nuevo_espacio_id ?? '-') }}</p>\r
                <p><strong>Comentario profesor:</strong> {{ selectedSolicitud()?.comentario_profesor || '-' }}</p>\r
\r
                <div class="comentario-edit">\r
                    <label for="comentario_estado"><strong>Comentario estado:</strong></label>\r
                    <hr />\r
                    <textarea id="comentario_estado" rows="3" class="form-control" [value]="comentarioEditing()" (input)="setComentarioEditing($any($event.target).value)"></textarea>\r
                    <div class="actions">\r
                        <button class="btn" (click)="saveComentarioEstado()" [disabled]="isSavingComment()">Guardar comentario</button>\r
                    </div>\r
                </div>\r
                \r
            </div>\r
\r
            <footer class="modal-footer">\r
                    @if (isAdmin() && selectedSolicitud()?.estado === 'PENDIENTE') {\r
                    <div class="admin-actions">\r
                        <button class="btn primary" (click)="confirmApprove()" [disabled]="isSavingComment()">Aceptar Solicitud</button>\r
                        <button class="btn danger" (click)="confirmReject()" [disabled]="isSavingComment()">Rechazar Solicitud</button>\r
                    </div>\r
                    }\r
            </footer>\r
        </div>\r
    </div>\r
    }\r
</main>`, styles: ['/* src/app/pages/solicitud/list-solicitudes/list-solicitudes.css */\n:root {\n  --bg: #f5f7fb;\n  --card: #ffffff;\n  --muted: #6b7280;\n  --accent: #0366d6;\n  --success: #2a9d8f;\n  --danger: #d9534f;\n  --border: #e6e9ef;\n  --color-primary: var(--accent);\n  --color-primary-dark: #234f86;\n  --color-text-inverse: #ffffff;\n  --color-text-secondary: #475569;\n  --shadow-light: 0 2px 6px rgba(2,6,23,0.08);\n}\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\nbody {\n  background: var(--bg);\n  color: #111827;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    "Segoe UI",\n    Roboto,\n    "Helvetica Neue",\n    Arial;\n}\n.header {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header h1 {\n  color: var(--color-primary);\n  font-size: 2rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n.header .btn-secondary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.5rem 0.9rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  box-shadow: var(--shadow-light);\n}\n.header .btn-secondary:hover {\n  background: var(--color-primary-dark);\n}\n.grid-container {\n  display: block;\n  padding: 0.75rem 0;\n}\n.grid-container h2 {\n  margin: .25rem 0 0.75rem;\n  font-size: 1.125rem;\n  color: var(--muted);\n}\n.grid-list {\n  display: block;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: 0.25rem;\n}\n.grid-list::-webkit-scrollbar {\n  width: 10px;\n}\n.grid-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n.grid-list::-webkit-scrollbar-thumb {\n  background: rgba(15, 23, 42, 0.08);\n  border-radius: 6px;\n}\n.grid-list::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 23, 42, 0.12);\n}\narticle.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.9rem;\n  margin-bottom: 0.6rem;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\n  transition: box-shadow .12s ease, transform .08s ease;\n}\narticle.card:hover {\n  background: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);\n}\narticle.card {\n  cursor: pointer;\n}\narticle.card:focus {\n  outline: 3px solid rgba(3, 102, 214, 0.16);\n  outline-offset: 3px;\n}\narticle.card:active {\n  transform: translateY(0);\n}\n.card-content {\n  flex: 1 1 auto;\n  padding-right: 0.75rem;\n}\n.card-content h2 {\n  margin: 0 0 0.25rem 0;\n  font-size: 1rem;\n  color: #0b1220;\n  display: block;\n  font-weight: 600;\n}\n.meta {\n  font-size: 0.85rem;\n  color: var(--muted);\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n.meta .fechas,\n.meta .horas {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.card-footer {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.card-footer .btn {\n  font-size: 0.9rem;\n}\n.btn {\n  white-space: nowrap;\n  background: #2b6cb0;\n  color: white;\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.05rem;\n}\n.btn:hover {\n  background: #234f86;\n}\n.btn-secondary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border: none;\n  padding: 0.45rem 0.75rem;\n  border-radius: 8px;\n}\n.btn-secondary:hover {\n  background: var(--color-primary-dark);\n}\n.btn-danger {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 1rem;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: overlay-fade 160ms ease;\n}\n.modal-card {\n  background:\n    linear-gradient(\n      180deg,\n      #fff,\n      #fbfdff);\n  border-radius: 12px;\n  max-width: 720px;\n  width: 100%;\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.25);\n  overflow: hidden;\n  border: 3px solid var(--color-primary);\n  transform-origin: center center;\n  animation: modal-pop 200ms cubic-bezier(.2, .9, .25, 1);\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n}\n.modal-header h3 {\n  font-size: 1.125rem;\n  margin: 0;\n}\n.modal-header .close {\n  background: #fff;\n  color: var(--color-primary);\n  border: none;\n  width: 36px;\n  height: 36px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  font-size: 1.25rem;\n  cursor: pointer;\n  box-shadow: var(--shadow-light);\n}\n.modal-body {\n  padding: 1rem;\n  color: #222;\n  line-height: 1.4;\n}\n.modal-body p {\n  margin: 0.5rem 0;\n}\n.modal-body strong {\n  color: var(--color-text-secondary);\n}\n.comentario-edit {\n  margin-top: 0.75rem;\n  padding: 0.75rem;\n  border: 2px solid var(--color-primary);\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(250, 250, 252, 0.6),\n      transparent);\n}\n.comentario-edit:focus-within {\n  border-color: var(--color-primary-dark);\n  box-shadow: 0 8px 24px rgba(3, 102, 214, 0.08);\n}\n.comentario-edit label {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.comentario-edit textarea.form-control {\n  width: 100%;\n  min-height: 84px;\n  max-height: 240px;\n  resize: vertical;\n  padding: 0.5rem;\n  border: 1px solid var(--border);\n  border-radius: 6px;\n  font-family: inherit;\n  font-size: 0.95rem;\n  color: #0b1220;\n  box-shadow: none;\n}\n.comentario-edit .actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.comentario-edit .actions .btn {\n  padding: 0.45rem 0.9rem;\n  font-size: 0.95rem;\n}\n.admin-actions {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: 1rem;\n}\n.btn.primary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border-radius: 8px;\n}\n.btn.primary:hover {\n  background: var(--color-primary-dark);\n}\n.btn.danger {\n  background: #ff4137;\n  color: #fff;\n  border-radius: 8px;\n}\n.btn.danger:hover {\n  background: #c43b35;\n}\n.btn-primary {\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  border-radius: 8px;\n  border: none;\n}\n.btn-primary:hover {\n  background: var(--color-primary-dark);\n}\n.btn-danger {\n  background: var(--danger);\n  color: #fff;\n  border-radius: 8px;\n  border: none;\n}\n.btn-danger:hover {\n  background: #c43b35;\n}\n.modal-footer {\n  padding: 0.75rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n.modal-footer .admin-actions {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: 1rem;\n  flex-wrap: wrap;\n}\n.modal-footer .admin-actions .btn {\n  margin-left: 0;\n}\n.modal-footer {\n  padding: 0.5rem 1rem 1rem 1rem;\n  display: flex;\n  justify-content: space-between;\n}\n.modal-footer .btn {\n  margin-left: 0.5rem;\n  min-width: 88px;\n}\n.admin-actions .btn {\n  display: inline-block;\n  text-align: center;\n}\n.btn-danger,\n.btn.btn-danger {\n  background: var(--danger) !important;\n  color: #fff !important;\n  border: none !important;\n  box-shadow: none;\n}\n.btn-primary,\n.btn.btn-primary {\n  background: var(--color-primary) !important;\n  color: var(--color-text-inverse) !important;\n  border: none !important;\n}\n@media (max-width: 520px) {\n  .modal-footer {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.5rem;\n  }\n  .modal-footer .btn-secondary {\n    order: 0;\n    align-self: flex-start;\n  }\n  .admin-actions {\n    order: 1;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .admin-actions .btn {\n    width: 100%;\n    min-width: 0;\n  }\n}\n@keyframes overlay-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes modal-pop {\n  from {\n    transform: translateY(-6px) scale(0.98);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.raw-json {\n  background: #0f172a;\n  color: #e6edf3;\n  padding: .75rem;\n  border-radius: 6px;\n  font-size: 12px;\n  overflow: auto;\n}\n.muted {\n  color: var(--muted);\n}\n@media (max-width: 720px) {\n  .grid-list {\n    grid-template-columns: 1fr;\n  }\n  .modal-card {\n    margin: 0 0.5rem;\n    max-width: calc(100% - 1rem);\n  }\n  article.card {\n    flex-direction: column;\n    gap: .5rem;\n  }\n  .right {\n    align-items: flex-start;\n  }\n}\n.sector {\n  padding: 0.6rem;\n  margin-bottom: 1rem;\n  border-radius: 10px;\n  border: 1px solid transparent;\n}\n.sector h2 {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin: 0 0 0.75rem 0;\n  padding: 0.25rem 0.5rem;\n  border-radius: 6px;\n}\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.section-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-weight: 700;\n  color: #fff;\n}\n.section-count.pendientes-count {\n  background: #f59e0b;\n}\n.section-count.aprobadas-count {\n  background: #2a9d8f;\n}\n.section-count.rechazadas-count {\n  background: #ef4444;\n}\n.section-count.otras-count {\n  background: #6b7280;\n}\n.sector h2 {\n  margin: 0;\n  font-weight: 700;\n  font-size: 1.05rem;\n}\n.section-header h2 {\n  font-size: 1.25rem;\n  line-height: 1.1;\n  margin: 0;\n}\n@media (max-width: 720px) {\n  .section-header h2 {\n    font-size: 1.05rem;\n  }\n}\n.sector.pendientes {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 250, 240, 0.6),\n      transparent 60%);\n  border-left: 6px solid #f59e0b;\n}\n.sector.pendientes h2 {\n  background: rgba(245, 158, 11, 0.08);\n  color: #92400e;\n}\n.sector.aprobadas {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(236, 253, 245, 0.6),\n      transparent 60%);\n  border-left: 6px solid #2a9d8f;\n}\n.sector.aprobadas h2 {\n  background: rgba(42, 157, 143, 0.06);\n  color: #14532d;\n}\n.sector.rechazadas {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 241, 242, 0.6),\n      transparent 60%);\n  border-left: 6px solid #ef4444;\n}\n.sector.rechazadas h2 {\n  background: rgba(239, 68, 68, 0.06);\n  color: #7f1d1d;\n}\n.sector.otras {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(243, 244, 246, 0.6),\n      transparent 60%);\n  border-left: 6px solid #6b7280;\n}\n.sector.otras h2 {\n  background: rgba(107, 114, 128, 0.04);\n  color: #374151;\n}\n.grid-container {\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=list-solicitudes.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListSolicitudes, { className: "ListSolicitudes", filePath: "src/app/pages/solicitud/list-solicitudes/list-solicitudes.ts", lineNumber: 18 });
})();

// src/app/pages/gestion-usuarios/registrar-usuario/registrar-usuario.ts
function RegistrarUsuario_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "El nombre debe tener al menos 2 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegistrarUsuario_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "El apellido debe tener al menos 2 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegistrarUsuario_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "Ingrese un correo electr\xF3nico v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function RegistrarUsuario_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "La contrase\xF1a debe tener al menos 3 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegistrarUsuario_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function RegistrarUsuario_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mensajeExito());
  }
}
var RegistrarUsuario = class _RegistrarUsuario {
  usuarioService = inject(UsuarioService);
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  mensajeExito = signal("", ...ngDevMode ? [{ debugName: "mensajeExito" }] : []);
  form = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(2)]],
    apellido: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(3)]],
    passwordConfirmar: ["", [Validators.required]],
    rol: ["", [Validators.required]]
  });
  enviar() {
    if (this.form.invalid) {
      return;
    }
    this.mensajeExito.set("");
    this.error.set("");
    if (!this.auth.validarPassword(this.form.value.password, this.form.value.passwordConfirmar)) {
      this.error.set("Repita correctamente la contrase\xF1a");
      return;
    }
    this.usuarioService.getUsuarioByEmail(this.form.value.email).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.error.set("Ya existe un usuario registrado con este Email");
          return;
        }
        this.usuarioService.crear(this.buildUsuario()).subscribe({
          next: () => {
            this.mensajeExito.set("\xA1Usuario creado exitosamente!");
            this.form.reset();
          },
          error: (err) => {
            console.log(err);
            this.error.set("Error al registrar el nuevo usuario");
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.error.set("Error al verificar el email");
      }
    });
  }
  buildUsuario() {
    return {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      password: this.form.value.password,
      rol: this.usuarioService.convertirRol(this.form.value.rol),
      email: this.form.value.email
    };
  }
  static \u0275fac = function RegistrarUsuario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegistrarUsuario)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegistrarUsuario, selectors: [["app-registrar-usuario"]], decls: 49, vars: 7, consts: [[1, "registrar-container"], [1, "registrar-content"], [1, "registrar-header"], ["routerLink", "/gestionUsuarios", 1, "btn-volver"], [1, "registrar-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "campo"], ["for", "nombre"], ["formControlName", "nombre", "id", "nombre", "type", "text", "placeholder", "Ingrese el nombre"], [1, "error"], ["for", "apellido"], ["formControlName", "apellido", "id", "apellido", "type", "text", "placeholder", "Ingrese el apellido"], ["for", "email"], ["formControlName", "email", "id", "email", "type", "email", "placeholder", "ejemplo@correo.com"], ["for", "password"], ["formControlName", "password", "id", "password", "type", "password", "placeholder", "M\xEDnimo 3 caracteres"], ["for", "confirmar-password"], ["formControlName", "passwordConfirmar", "id", "confirmar-password", "type", "password", "placeholder", "Repita la contrase\xF1a"], ["for", "rol"], ["formControlName", "rol", "id", "rol"], ["value", ""], ["value", "ADMIN"], ["value", "PROFESOR"], [1, "form-actions"], ["type", "submit", 1, "btn-registrar", 3, "disabled"], [1, "mensaje-resultado", "error"], [1, "mensaje-resultado", "exito"]], template: function RegistrarUsuario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Registrar Nuevo Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275text(6, "\u2190 Volver");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 4);
      \u0275\u0275listener("ngSubmit", function RegistrarUsuario_Template_form_ngSubmit_7_listener() {
        return ctx.enviar();
      });
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "label", 7);
      \u0275\u0275text(11, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 8);
      \u0275\u0275conditionalCreate(13, RegistrarUsuario_Conditional_13_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 6)(15, "label", 10);
      \u0275\u0275text(16, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 11);
      \u0275\u0275conditionalCreate(18, RegistrarUsuario_Conditional_18_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 6)(20, "label", 12);
      \u0275\u0275text(21, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 13);
      \u0275\u0275conditionalCreate(23, RegistrarUsuario_Conditional_23_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 5)(25, "div", 6)(26, "label", 14);
      \u0275\u0275text(27, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 15);
      \u0275\u0275conditionalCreate(29, RegistrarUsuario_Conditional_29_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 6)(31, "label", 16);
      \u0275\u0275text(32, "Confirmar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "input", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 6)(35, "label", 18);
      \u0275\u0275text(36, "Rol del Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "select", 19)(38, "option", 20);
      \u0275\u0275text(39, "Seleccione un rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "option", 21);
      \u0275\u0275text(41, "Administrador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "option", 22);
      \u0275\u0275text(43, "Profesor");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(44, "div", 23)(45, "button", 24);
      \u0275\u0275text(46, " Registrar Usuario ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(47, RegistrarUsuario_Conditional_47_Template, 2, 1, "span", 25)(48, RegistrarUsuario_Conditional_48_Template, 2, 1, "span", 26);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_1_0 = ctx.form.get("nombre")) == null ? null : tmp_1_0.dirty) && ((tmp_1_0 = ctx.form.get("nombre")) == null ? null : tmp_1_0.hasError("minlength")) ? 13 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("apellido")) == null ? null : tmp_2_0.dirty) && ((tmp_2_0 = ctx.form.get("apellido")) == null ? null : tmp_2_0.hasError("minlength")) ? 18 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.dirty) && ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.hasError("email")) ? 23 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.dirty) && ((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.hasError("minlength")) ? 29 : -1);
      \u0275\u0275advance(16);
      \u0275\u0275property("disabled", ctx.form.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.error() ? 47 : ctx.mensajeExito() ? 48 : -1);
    }
  }, dependencies: [RouterLink, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.registrar-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.registrar-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n  width: 100%;\n  margin: 0 auto;\n}\n.registrar-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.registrar-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  background: #4a5568;\n}\n.registrar-form[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 40px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.campo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.campo[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.campo[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  color: #2d3748;\n  transition: all 0.2s;\n  background: white;\n}\n.campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.campo[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #a0aec0;\n}\n.campo[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.campo[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 0.875rem;\n  min-height: 1.25rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  justify-content: center;\n}\n.btn-registrar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 14px 48px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-registrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.btn-registrar[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-registrar[_ngcontent-%COMP%]:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.mensaje-resultado[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.95rem;\n  font-weight: 500;\n  min-height: 1.5rem;\n  margin-top: 8px;\n}\n.mensaje-resultado.exito[_ngcontent-%COMP%] {\n  color: #38a169;\n}\n.mensaje-resultado.error[_ngcontent-%COMP%] {\n  color: #e53e3e;\n}\n@media (max-width: 768px) {\n  .registrar-container[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .registrar-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .registrar-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .registrar-form[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .btn-registrar[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=registrar-usuario.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegistrarUsuario, [{
    type: Component,
    args: [{ selector: "app-registrar-usuario", imports: [RouterLink, ReactiveFormsModule], template: `<div class="registrar-container">\r
  <div class="registrar-content">\r
    <div class="registrar-header">\r
      <h1>Registrar Nuevo Usuario</h1>\r
      <button routerLink="/gestionUsuarios" class="btn-volver">\u2190 Volver</button>\r
    </div>\r
\r
    <form [formGroup]="form" (ngSubmit)="enviar()" class="registrar-form">\r
      <div class="form-row">\r
        <div class="campo">\r
          <label for="nombre">Nombre</label>\r
          <input formControlName="nombre" id="nombre" type="text" placeholder="Ingrese el nombre">\r
          @if (form.get('nombre')?.dirty && form.get('nombre')?.hasError('minlength')) {\r
            <span class="error">El nombre debe tener al menos 2 caracteres</span>\r
          }\r
        </div>\r
\r
        <div class="campo">\r
          <label for="apellido">Apellido</label>\r
          <input formControlName="apellido" id="apellido" type="text" placeholder="Ingrese el apellido">\r
          @if (form.get('apellido')?.dirty && form.get('apellido')?.hasError('minlength')) {\r
            <span class="error">El apellido debe tener al menos 2 caracteres</span>\r
          }\r
        </div>\r
      </div>\r
\r
      <div class="campo">\r
        <label for="email">Correo Electr\xF3nico</label>\r
        <input formControlName="email" id="email" type="email" placeholder="ejemplo@correo.com">\r
        @if (form.get('email')?.dirty && form.get('email')?.hasError('email')) {\r
          <span class="error">Ingrese un correo electr\xF3nico v\xE1lido</span>\r
        }\r
      </div>\r
\r
      <div class="form-row">\r
        <div class="campo">\r
          <label for="password">Contrase\xF1a</label>\r
          <input formControlName="password" id="password" type="password" placeholder="M\xEDnimo 3 caracteres">\r
          @if (form.get('password')?.dirty && form.get('password')?.hasError('minlength')) {\r
            <span class="error">La contrase\xF1a debe tener al menos 3 caracteres</span>\r
          }\r
        </div>\r
\r
        <div class="campo">\r
          <label for="confirmar-password">Confirmar Contrase\xF1a</label>\r
          <input formControlName="passwordConfirmar" id="confirmar-password" type="password" placeholder="Repita la contrase\xF1a">\r
        </div>\r
      </div>\r
\r
      <div class="campo">\r
        <label for="rol">Rol del Usuario</label>\r
        <select formControlName="rol" id="rol">\r
          <option value="">Seleccione un rol</option>\r
          <option value="ADMIN">Administrador</option>\r
          <option value="PROFESOR">Profesor</option>\r
        </select>\r
      </div>\r
\r
      <div class="form-actions">\r
        <button [disabled]="form.invalid" type="submit" class="btn-registrar">\r
          Registrar Usuario\r
        </button>\r
      </div>\r
\r
      @if (error()) {\r
        <span class="mensaje-resultado error">{{ error() }}</span>\r
      } @else if (mensajeExito()) {\r
        <span class="mensaje-resultado exito">{{ mensajeExito() }}</span>\r
      }\r
    </form>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/gestion-usuarios/registrar-usuario/registrar-usuario.css */\n.registrar-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.registrar-content {\n  max-width: 800px;\n  width: 100%;\n  margin: 0 auto;\n}\n.registrar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.registrar-header h1 {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver:hover {\n  background: #4a5568;\n}\n.registrar-form {\n  background: white;\n  border-radius: 16px;\n  padding: 40px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.campo {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.campo label {\n  color: #2d3748;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.campo input,\n.campo select {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  color: #2d3748;\n  transition: all 0.2s;\n  background: white;\n}\n.campo input:focus,\n.campo select:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.campo input::placeholder {\n  color: #a0aec0;\n}\n.campo select {\n  cursor: pointer;\n}\n.campo .error {\n  color: #e53e3e;\n  font-size: 0.875rem;\n  min-height: 1.25rem;\n}\n.form-actions {\n  margin-top: 16px;\n  display: flex;\n  justify-content: center;\n}\n.btn-registrar {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 14px 48px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-registrar:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.btn-registrar:active {\n  transform: translateY(0);\n}\n.btn-registrar:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.mensaje-resultado {\n  text-align: center;\n  font-size: 0.95rem;\n  font-weight: 500;\n  min-height: 1.5rem;\n  margin-top: 8px;\n}\n.mensaje-resultado.exito {\n  color: #38a169;\n}\n.mensaje-resultado.error {\n  color: #e53e3e;\n}\n@media (max-width: 768px) {\n  .registrar-container {\n    padding: 20px;\n  }\n  .registrar-header {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .registrar-header h1 {\n    font-size: 1.5rem;\n  }\n  .registrar-form {\n    padding: 24px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .btn-registrar {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=registrar-usuario.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegistrarUsuario, { className: "RegistrarUsuario", filePath: "src/app/pages/gestion-usuarios/registrar-usuario/registrar-usuario.ts", lineNumber: 20 });
})();

// src/app/pages/gestion-usuarios/administrar-usuario/administrar-usuario.ts
var _forTrack03 = ($index, $item) => $item.id;
function AdministrarUsuario_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275listener("click", function AdministrarUsuario_For_25_Template_div_click_0_listener() {
      const u_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModal(u_r2));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", u_r2.nombre, " ", u_r2.apellido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r2.email);
  }
}
function AdministrarUsuario_Conditional_33_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " activo ");
  }
}
function AdministrarUsuario_Conditional_33_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " eliminado ");
  }
}
function AdministrarUsuario_Conditional_33_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function AdministrarUsuario_Conditional_33_Conditional_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.eliminar());
    });
    \u0275\u0275text(1, "Eliminar Usuario");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.seleccionadoIgualLogueado());
  }
}
function AdministrarUsuario_Conditional_33_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function AdministrarUsuario_Conditional_33_Conditional_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.reactivar());
    });
    \u0275\u0275text(1, "Reactivar Usuario");
    \u0275\u0275elementEnd();
  }
}
function AdministrarUsuario_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function AdministrarUsuario_Conditional_33_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cerrarModal());
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275listener("click", function AdministrarUsuario_Conditional_33_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function AdministrarUsuario_Conditional_33_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cerrarModal());
    });
    \u0275\u0275text(3, "\u2715");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Detalles del Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22)(7, "label");
    \u0275\u0275text(8, "ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 22)(12, "label");
    \u0275\u0275text(13, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 22)(17, "label");
    \u0275\u0275text(18, "Apellido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 22)(22, "label");
    \u0275\u0275text(23, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 22)(27, "label");
    \u0275\u0275text(28, "Rol:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 22)(32, "label");
    \u0275\u0275text(33, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275conditionalCreate(35, AdministrarUsuario_Conditional_33_Conditional_35_Template, 1, 0)(36, AdministrarUsuario_Conditional_33_Conditional_36_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(37, AdministrarUsuario_Conditional_33_Conditional_37_Template, 2, 1, "button", 23)(38, AdministrarUsuario_Conditional_33_Conditional_38_Template, 2, 0, "button", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.usuarioSeleccionado().id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.usuarioSeleccionado().nombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.usuarioSeleccionado().apellido);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.usuarioSeleccionado().email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.usuarioSeleccionado().rol);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.usuarioSeleccionado().activo === true ? 35 : 36);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.usuarioSeleccionado().activo ? 37 : 38);
  }
}
var AdministrarUsuario = class _AdministrarUsuario {
  usuarioService = inject(UsuarioService);
  auth = inject(AuthService);
  paginaActual = signal(1, ...ngDevMode ? [{ debugName: "paginaActual" }] : []);
  limite = 8;
  totalPaginas = signal(0, ...ngDevMode ? [{ debugName: "totalPaginas" }] : []);
  filtroRol = signal("", ...ngDevMode ? [{ debugName: "filtroRol" }] : []);
  filtroBusqueda = signal("", ...ngDevMode ? [{ debugName: "filtroBusqueda" }] : []);
  filtroActivo = signal("", ...ngDevMode ? [{ debugName: "filtroActivo" }] : []);
  usuarioSeleccionado = signal(null, ...ngDevMode ? [{ debugName: "usuarioSeleccionado" }] : []);
  listaUsuarios = signal([], ...ngDevMode ? [{ debugName: "listaUsuarios" }] : []);
  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    const activo = this.filtroActivo() === "" ? void 0 : this.filtroActivo();
    this.usuarioService.obtenerUsuariosPaginados(this.paginaActual(), this.limite, this.filtroBusqueda(), this.filtroRol(), activo).subscribe({
      next: (data) => {
        this.listaUsuarios.set(data.usuarios);
        this.totalPaginas.set(Math.ceil(data.total / this.limite));
      }
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
  abrirModal(usuario) {
    this.usuarioSeleccionado.set(usuario);
  }
  cerrarModal() {
    this.usuarioSeleccionado.set(null);
  }
  eliminar() {
    this.usuarioService.eliminarById(this.usuarioSeleccionado().id).subscribe({
      next: () => {
        this.usuarioSeleccionado.set(null);
        this.cargarUsuarios();
      }
    });
  }
  reactivar() {
    this.usuarioService.reactivarById(this.usuarioSeleccionado().id).subscribe({
      next: () => {
        this.usuarioSeleccionado.set(null);
        this.cargarUsuarios();
      }
    });
  }
  seleccionadoIgualLogueado() {
    if (this.auth.infoUsuario().id === this.usuarioSeleccionado()?.id) {
      return true;
    }
    return false;
  }
  static \u0275fac = function AdministrarUsuario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdministrarUsuario)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdministrarUsuario, selectors: [["app-administrar-usuario"]], decls: 34, vars: 10, consts: [[1, "eliminar-container"], [1, "eliminar-content"], [1, "eliminar-header"], ["routerLink", "/gestionUsuarios", 1, "btn-volver"], [1, "filtros-section"], ["type", "text", "placeholder", "Buscar por nombre, apellido o email...", 1, "input-buscar", 3, "ngModelChange", "ngModel"], [1, "select-filtro", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "ADMIN"], ["value", "PROFESOR"], [3, "value"], [1, "usuarios-grid"], [1, "usuario-card"], [1, "paginacion"], [1, "btn-paginacion", 3, "click", "disabled"], [1, "pagina-info"], [1, "modal-overlay"], [1, "usuario-card", 3, "click"], [1, "usuario-info"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "btn-cerrar", 3, "click"], [1, "detalle-grupo"], [1, "btn-eliminar-usuario", 3, "disabled"], [1, "btn-reactivar-usuario"], [1, "btn-eliminar-usuario", 3, "click", "disabled"], [1, "btn-reactivar-usuario", 3, "click"]], template: function AdministrarUsuario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Administrar Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275text(6, "\u2190 Volver");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function AdministrarUsuario_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroBusqueda, $event) || (ctx.filtroBusqueda = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdministrarUsuario_Template_input_ngModelChange_8_listener() {
        return ctx.aplicarFiltros();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "select", 6);
      \u0275\u0275twoWayListener("ngModelChange", function AdministrarUsuario_Template_select_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroRol, $event) || (ctx.filtroRol = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdministrarUsuario_Template_select_ngModelChange_9_listener() {
        return ctx.aplicarFiltros();
      });
      \u0275\u0275elementStart(10, "option", 7);
      \u0275\u0275text(11, "Todos los roles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "option", 8);
      \u0275\u0275text(13, "Administrador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "option", 9);
      \u0275\u0275text(15, "Profesor");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "select", 6);
      \u0275\u0275twoWayListener("ngModelChange", function AdministrarUsuario_Template_select_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroActivo, $event) || (ctx.filtroActivo = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdministrarUsuario_Template_select_ngModelChange_16_listener() {
        return ctx.aplicarFiltros();
      });
      \u0275\u0275elementStart(17, "option", 7);
      \u0275\u0275text(18, "Todos los estados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 10);
      \u0275\u0275text(20, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 10);
      \u0275\u0275text(22, "Eliminados");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 11);
      \u0275\u0275repeaterCreate(24, AdministrarUsuario_For_25_Template, 6, 3, "div", 12, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 13)(27, "button", 14);
      \u0275\u0275listener("click", function AdministrarUsuario_Template_button_click_27_listener() {
        return ctx.anteriorPagina();
      });
      \u0275\u0275text(28, " \u2190 Anterior ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span", 15);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 14);
      \u0275\u0275listener("click", function AdministrarUsuario_Template_button_click_31_listener() {
        return ctx.siguientePagina();
      });
      \u0275\u0275text(32, " Siguiente \u2192 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(33, AdministrarUsuario_Conditional_33_Template, 39, 7, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroBusqueda);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroRol);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroActivo);
      \u0275\u0275advance(3);
      \u0275\u0275property("value", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", false);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.listaUsuarios());
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.paginaActual() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" P\xE1gina ", ctx.paginaActual(), " de ", ctx.totalPaginas() || 1, " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.paginaActual() >= ctx.totalPaginas() || ctx.totalPaginas() === 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.usuarioSeleccionado() ? 33 : -1);
    }
  }, dependencies: [RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.eliminar-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.eliminar-content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  width: 100%;\n  margin: 0 auto;\n}\n.eliminar-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.eliminar-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  background: #4a5568;\n}\n.filtros-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.input-buscar[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}\n.input-buscar[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.select-filtro[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  background: white;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  min-width: 200px;\n}\n.select-filtro[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.usuarios-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.usuario-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition:\n    transform 0.2s,\n    box-shadow 0.2s,\n    border-color 0.2s;\n}\n.usuario-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  border-color: #667eea;\n}\n.usuario-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n}\n.usuario-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.paginacion[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n  margin-top: 40px;\n}\n.btn-paginacion[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.btn-paginacion[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.btn-paginacion[_ngcontent-%COMP%]:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.pagina-info[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 500px;\n  width: 90%;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  position: relative;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n}\n.btn-cerrar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  font-size: 1.2rem;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-cerrar[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n  transform: rotate(90deg);\n}\n.modal-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0 0 24px 0;\n}\n.detalle-grupo[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.detalle-grupo[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 0.9rem;\n  font-weight: 600;\n  display: block;\n  margin-bottom: 4px;\n}\n.detalle-grupo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1rem;\n  margin: 0;\n  padding: 8px 0;\n}\n.btn-eliminar-usuario[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 14px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  margin-top: 24px;\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);\n}\n.btn-eliminar-usuario[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(245, 101, 101, 0.4);\n}\n.btn-eliminar-usuario[_ngcontent-%COMP%]:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.btn-reactivar-usuario[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  padding: 14px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  margin-top: 24px;\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);\n}\n.btn-reactivar-usuario[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(72, 187, 120, 0.4);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .eliminar-container[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .eliminar-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .eliminar-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .filtros-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .select-filtro[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .usuarios-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n/*# sourceMappingURL=administrar-usuario.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdministrarUsuario, [{
    type: Component,
    args: [{ selector: "app-administrar-usuario", imports: [RouterLink, FormsModule], template: '<div class="eliminar-container">\r\n  <div class="eliminar-content">\r\n    <div class="eliminar-header">\r\n      <h1>Administrar Usuarios</h1>\r\n      <button routerLink="/gestionUsuarios" class="btn-volver">\u2190 Volver</button>\r\n    </div>\r\n\r\n    <div class="filtros-section">\r\n      <input\r\n        type="text"\r\n        class="input-buscar"\r\n        placeholder="Buscar por nombre, apellido o email..."\r\n        [(ngModel)]="filtroBusqueda"\r\n        (ngModelChange)="aplicarFiltros()"\r\n      />\r\n      <select class="select-filtro" [(ngModel)]="filtroRol" (ngModelChange)="aplicarFiltros()">\r\n        <option value="">Todos los roles</option>\r\n        <option value="ADMIN">Administrador</option>\r\n        <option value="PROFESOR">Profesor</option>\r\n      </select>\r\n      <select class="select-filtro" [(ngModel)]="filtroActivo" (ngModelChange)="aplicarFiltros()">\r\n        <option value="">Todos los estados</option>\r\n        <option [value]="true">Activos</option>\r\n        <option [value]="false">Eliminados</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="usuarios-grid">\r\n      @for (u of listaUsuarios(); track u.id) {\r\n      <div class="usuario-card" (click)="abrirModal(u)">\r\n        <div class="usuario-info">\r\n          <h3>{{ u.nombre }} {{ u.apellido }}</h3>\r\n          <p>{{ u.email }}</p>\r\n        </div>\r\n      </div>\r\n      }\r\n    </div>\r\n\r\n    <div class="paginacion">\r\n      <button class="btn-paginacion" [disabled]="paginaActual() === 1" (click)="anteriorPagina()">\r\n        \u2190 Anterior\r\n      </button>\r\n      <span class="pagina-info"> P\xE1gina {{ paginaActual() }} de {{ totalPaginas() || 1 }} </span>\r\n      <button\r\n        class="btn-paginacion"\r\n        [disabled]="paginaActual() >= totalPaginas() || totalPaginas() === 0"\r\n        (click)="siguientePagina()"\r\n      >\r\n        Siguiente \u2192\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Modal de detalles del usuario -->\r\n  @if (usuarioSeleccionado()) {\r\n  <div class="modal-overlay" (click)="cerrarModal()">\r\n    <div class="modal-content" (click)="$event.stopPropagation()">\r\n      <button class="btn-cerrar" (click)="cerrarModal()">\u2715</button>\r\n\r\n      <h2>Detalles del Usuario</h2>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>ID:</label>\r\n        <p>{{ usuarioSeleccionado()!.id }}</p>\r\n      </div>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>Nombre:</label>\r\n        <p>{{ usuarioSeleccionado()!.nombre }}</p>\r\n      </div>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>Apellido:</label>\r\n        <p>{{ usuarioSeleccionado()!.apellido }}</p>\r\n      </div>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>Email:</label>\r\n        <p>{{ usuarioSeleccionado()!.email }}</p>\r\n      </div>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>Rol:</label>\r\n        <p>{{ usuarioSeleccionado()!.rol }}</p>\r\n      </div>\r\n\r\n      <div class="detalle-grupo">\r\n        <label>Estado:</label>\r\n        <p>@if (usuarioSeleccionado()!.activo === true) { activo } @else { eliminado }</p>\r\n      </div>\r\n\r\n      @if (usuarioSeleccionado()!.activo) {\r\n      <button (click)="eliminar()" [disabled]="seleccionadoIgualLogueado()" class="btn-eliminar-usuario">Eliminar Usuario</button>\r\n      } @else {\r\n      <button (click)="reactivar()" class="btn-reactivar-usuario">Reactivar Usuario</button>\r\n      }\r\n    </div>\r\n  </div>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/pages/gestion-usuarios/administrar-usuario/administrar-usuario.css */\n.eliminar-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.eliminar-content {\n  max-width: 1200px;\n  width: 100%;\n  margin: 0 auto;\n}\n.eliminar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.eliminar-header h1 {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver:hover {\n  background: #4a5568;\n}\n.filtros-section {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.input-buscar {\n  flex: 1;\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}\n.input-buscar:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.select-filtro {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  background: white;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  min-width: 200px;\n}\n.select-filtro:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.usuarios-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.usuario-card {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition:\n    transform 0.2s,\n    box-shadow 0.2s,\n    border-color 0.2s;\n}\n.usuario-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  border-color: #667eea;\n}\n.usuario-info h3 {\n  color: #2d3748;\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n}\n.usuario-info p {\n  color: #718096;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.paginacion {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n  margin-top: 40px;\n}\n.btn-paginacion {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.btn-paginacion:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.btn-paginacion:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.pagina-info {\n  color: #2d3748;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.modal-overlay {\n  display: flex;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  align-items: center;\n  justify-content: center;\n  animation: fadeIn 0.2s ease-out;\n}\n.modal-content {\n  background: white;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 500px;\n  width: 90%;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  position: relative;\n  animation: slideUp 0.3s ease-out;\n}\n.btn-cerrar {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  font-size: 1.2rem;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-cerrar:hover {\n  background: #cbd5e0;\n  transform: rotate(90deg);\n}\n.modal-content h2 {\n  color: #2d3748;\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0 0 24px 0;\n}\n.detalle-grupo {\n  margin-bottom: 20px;\n}\n.detalle-grupo label {\n  color: #4a5568;\n  font-size: 0.9rem;\n  font-weight: 600;\n  display: block;\n  margin-bottom: 4px;\n}\n.detalle-grupo p {\n  color: #2d3748;\n  font-size: 1rem;\n  margin: 0;\n  padding: 8px 0;\n}\n.btn-eliminar-usuario {\n  width: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 14px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  margin-top: 24px;\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);\n}\n.btn-eliminar-usuario:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(245, 101, 101, 0.4);\n}\n.btn-eliminar-usuario:disabled {\n  background: #cbd5e0;\n  cursor: not-allowed;\n  box-shadow: none;\n  opacity: 0.6;\n}\n.btn-reactivar-usuario {\n  width: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  padding: 14px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  margin-top: 24px;\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);\n}\n.btn-reactivar-usuario:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(72, 187, 120, 0.4);\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .eliminar-container {\n    padding: 20px;\n  }\n  .eliminar-header {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .eliminar-header h1 {\n    font-size: 1.5rem;\n  }\n  .filtros-section {\n    flex-direction: column;\n  }\n  .select-filtro {\n    width: 100%;\n  }\n  .usuarios-grid {\n    grid-template-columns: 1fr;\n  }\n  .modal-content {\n    padding: 24px;\n  }\n}\n/*# sourceMappingURL=administrar-usuario.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdministrarUsuario, { className: "AdministrarUsuario", filePath: "src/app/pages/gestion-usuarios/administrar-usuario/administrar-usuario.ts", lineNumber: 14 });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "home",
    component: Home
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-ZUIUMWP2.js").then((m) => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: "perfil",
    loadComponent: () => import("./chunk-Z7ZCN47M.js").then((m) => m.PerfilComponent),
    canActivate: [authGuard]
  },
  {
    path: "solicitud/nueva",
    component: Nueva,
    canActivate: [authGuard]
  },
  {
    path: "solicitud/mis-solicitudes",
    component: MisSolicitudes,
    canActivate: [authGuard]
  },
  {
    path: "solicitudes",
    component: ListSolicitudes,
    canActivate: [adminGuard]
  },
  {
    path: "agenda",
    loadComponent: () => import("./chunk-CTPLG6SL.js").then((m) => m.CalendarioComponent)
  },
  {
    path: "reservas-todas",
    loadComponent: () => import("./chunk-4UCQ6BWB.js").then((m) => m.GestorReservasComponent),
    canActivate: [adminGuard]
  },
  {
    path: "mis-reservas",
    loadComponent: () => import("./chunk-CTPLG6SL.js").then((m) => m.CalendarioComponent),
    canActivate: [authGuard]
  },
  {
    path: "gestionUsuarios",
    loadComponent: () => import("./chunk-KHGEXEOF.js").then((m) => m.GestionUsuarios),
    canActivate: [adminGuard]
  },
  {
    path: "gestionUsuarios/registrarUsuario",
    component: RegistrarUsuario,
    canActivate: [adminGuard]
  },
  {
    path: "gestionUsuarios/administracionUsuarios",
    component: AdministrarUsuario,
    canActivate: [adminGuard]
  },
  {
    path: "coming-soon",
    loadComponent: () => import("./chunk-FUKWMV2T.js").then((m) => m.ComingSoon)
  },
  {
    path: "**",
    redirectTo: "/home"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};

// src/app/shared/footer/footer.ts
var Footer = class _Footer {
  static \u0275fac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Footer, selectors: [["app-footer"]], decls: 12, vars: 0, consts: [[1, "footer"], [1, "footer__brand"], ["src", "/logo.ico", "alt", "MiAula logo", 1, "footer__logo"], [1, "footer__name"], [1, "footer__links"], ["routerLink", "/coming-soon", 1, "footer__link"], [1, "footer__copy"]], template: function Footer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "span", 3);
      \u0275\u0275text(4, "MiAula");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "nav", 4)(6, "a", 5);
      \u0275\u0275text(7, "Leer m\xE1s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 5);
      \u0275\u0275text(9, "Soporte");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6);
      \u0275\u0275text(11, " \xA9 Proyecto Final - UTN Regional MdP ");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [RouterLink], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.8rem;\n  font-family: var(--font-sans);\n  text-align: center;\n  min-height: 60px;\n  flex-shrink: 0;\n}\n.footer__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.footer__logo[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.footer__name[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n}\n.footer__links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3rem;\n}\n.footer__link[_ngcontent-%COMP%] {\n  color: var(--color-text-inverse);\n  text-decoration: none;\n  font-size: var(--font-size-lg);\n  transition: color var(--transition-speed);\n}\n.footer__link[_ngcontent-%COMP%]:hover {\n  color: var(--color-accent);\n}\n.footer__copy[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--color-text-inverse);\n}\n@media (min-width: 768px) {\n  .footer[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    gap: 2rem;\n    padding: 1rem 2rem;\n    min-height: 30px;\n  }\n  .footer__brand[_ngcontent-%COMP%] {\n    gap: 0.8rem;\n  }\n  .footer__copy[_ngcontent-%COMP%] {\n    font-size: var(--font-size-xs);\n  }\n}\n/*# sourceMappingURL=footer.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{ selector: "app-footer", imports: [RouterLink], template: '<footer class="footer">\r\n  <!-- Logo + Nombre -->\r\n  <div class="footer__brand">\r\n    <img class="footer__logo" src="/logo.ico" alt="MiAula logo" />\r\n    <span class="footer__name">MiAula</span>\r\n  </div>\r\n\r\n  <!-- Links -->\r\n  <nav class="footer__links">\r\n    <a routerLink="/coming-soon" class="footer__link">Leer m\xE1s</a>\r\n    <a routerLink="/coming-soon" class="footer__link">Soporte</a>\r\n  </nav>\r\n\r\n  <!-- Copy -->\r\n  <div class="footer__copy">\r\n   \xA9 Proyecto Final - UTN Regional MdP\r\n  </div>\r\n</footer>\r\n', styles: ["/* src/app/shared/footer/footer.css */\n.footer {\n  width: 100%;\n  padding: 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.8rem;\n  font-family: var(--font-sans);\n  text-align: center;\n  min-height: 60px;\n  flex-shrink: 0;\n}\n.footer__brand {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.footer__logo {\n  width: 24px;\n  height: 24px;\n}\n.footer__name {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n}\n.footer__links {\n  display: flex;\n  gap: 3rem;\n}\n.footer__link {\n  color: var(--color-text-inverse);\n  text-decoration: none;\n  font-size: var(--font-size-lg);\n  transition: color var(--transition-speed);\n}\n.footer__link:hover {\n  color: var(--color-accent);\n}\n.footer__copy {\n  font-size: var(--font-size-xs);\n  color: var(--color-text-inverse);\n}\n@media (min-width: 768px) {\n  .footer {\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    gap: 2rem;\n    padding: 1rem 2rem;\n    min-height: 30px;\n  }\n  .footer__brand {\n    gap: 0.8rem;\n  }\n  .footer__copy {\n    font-size: var(--font-size-xs);\n  }\n}\n/*# sourceMappingURL=footer.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Footer, { className: "Footer", filePath: "src/app/shared/footer/footer.ts", lineNumber: 10 });
})();

// src/app/shared/header/header.ts
function Header_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 1);
    \u0275\u0275text(1, "MiAula");
    \u0275\u0275elementEnd();
  }
}
function Header_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 2);
    \u0275\u0275text(1, "MiAula");
    \u0275\u0275elementEnd();
  }
}
function Header_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function Header_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.login());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Login");
    \u0275\u0275elementEnd()();
  }
}
function Header_Conditional_9_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function Header_Conditional_9_Conditional_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.viewProfile();
      return \u0275\u0275resetView(ctx_r1.closeProfileMenu());
    });
    \u0275\u0275text(2, "Ver perfil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function Header_Conditional_9_Conditional_18_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.logout();
      return \u0275\u0275resetView(ctx_r1.closeProfileMenu());
    });
    \u0275\u0275text(4, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function Header_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "button", 7);
    \u0275\u0275listener("click", function Header_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewProfile());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 8);
    \u0275\u0275element(3, "path", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Perfil");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 7);
    \u0275\u0275listener("click", function Header_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 8);
    \u0275\u0275element(8, "path", 11)(9, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "Salir");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 13)(13, "button", 14);
    \u0275\u0275listener("click", function Header_Conditional_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleProfileMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 8);
    \u0275\u0275element(15, "path", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Perfil");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, Header_Conditional_9_Conditional_18_Template, 5, 0, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275attribute("aria-expanded", ctx_r1.showProfileMenu);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.showProfileMenu ? 18 : -1);
  }
}
var Header = class _Header {
  authService = inject(AuthService);
  router = inject(Router);
  showProfileMenu = false;
  constructor() {
  }
  isLoggedIn() {
    return this.authService.usuarioLogueado();
  }
  login() {
    this.router.navigate(["/login"]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
  viewProfile() {
    this.router.navigate(["/perfil"]);
  }
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }
  closeProfileMenu() {
    this.showProfileMenu = false;
  }
  comingSoon() {
    this.router.navigate(["/coming-soon"]);
  }
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], decls: 10, vars: 4, consts: [[1, "header"], ["routerLink", "/dashboard", 1, "header__logo"], ["routerLink", "/home", 1, "header__logo"], [1, "header__actions"], ["routerLink", "/agenda", "aria-label", "Ir a Agenda", 1, "icon-btn"], ["src", "/calendar.png", "alt", "Agenda"], [1, "icon-btn"], [1, "icon-btn", 3, "click"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M12 12a5 5 0 1 0 -5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"], [1, "desktop-only"], ["d", "M16 13v-2H7V8l-5 4 5 4v-3z"], ["d", "M20 3h-8v2h8v14h-8v2h8c1.1 0 2-0.9 2-2V5c0-1.1-0.9-2-2-2z"], [1, "profile-menu", "mobile-only"], ["aria-haspopup", "true", "aria-label", "Abrir men\xFA de perfil", 1, "icon-btn", 3, "click"], [1, "profile-dropdown", "mobile-only"], [1, "dropdown-item", 3, "click"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0);
      \u0275\u0275conditionalCreate(1, Header_Conditional_1_Template, 2, 0, "a", 1);
      \u0275\u0275conditionalCreate(2, Header_Conditional_2_Template, 2, 0, "a", 2);
      \u0275\u0275elementStart(3, "nav", 3)(4, "button", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "Agenda");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, Header_Conditional_8_Template, 5, 0, "button", 6);
      \u0275\u0275conditionalCreate(9, Header_Conditional_9_Template, 19, 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoggedIn() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoggedIn() ? 2 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.isLoggedIn() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoggedIn() ? 9 : -1);
    }
  }, dependencies: [RouterLink], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: var(--shadow-medium);\n}\n.header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 90;\n}\n.header__logo[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: var(--color-text-inverse);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-xl);\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition-speed);\n}\n.header__logo[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 8px;\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n  border: none;\n  border-radius: var(--border-radius);\n  cursor: pointer;\n  transition: background var(--transition-speed), box-shadow var(--transition-speed);\n}\n.icon-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  fill: currentColor;\n}\n.icon-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n}\n.icon-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: none;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n.profile-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.profile-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 6px;\n  top: calc(100% + 10px);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.98),\n      rgba(250, 250, 250, 0.98));\n  color: var(--color-text, #222);\n  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.25), 0 3px 8px rgba(2, 6, 23, 0.08);\n  border-radius: 12px;\n  min-width: 170px;\n  display: flex;\n  flex-direction: column;\n  padding: 6px 6px;\n  z-index: 80;\n  transform-origin: top right;\n  animation: _ngcontent-%COMP%_dropdown-in 160ms ease-out;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: rgba(0, 0, 0, 0.06);\n  margin: 6px 8px;\n  border-radius: 1px;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  text-align: left;\n  padding: 10px 12px;\n  cursor: pointer;\n  color: inherit;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  border-radius: 8px;\n  transition: background 120ms, transform 120ms;\n  font-size: var(--font-size-md);\n}\n.dropdown-item[_ngcontent-%COMP%]   .item-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  fill: currentColor;\n  opacity: 0.9;\n}\n.dropdown-item[_ngcontent-%COMP%]   .item-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.04);\n  transform: translateY(-1px);\n}\n.dropdown-item.danger[_ngcontent-%COMP%] {\n  color: var(--color-danger, #c62828);\n}\n.dropdown-item.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(198, 40, 40, 0.08);\n}\n@keyframes _ngcontent-%COMP%_dropdown-in {\n  from {\n    opacity: 0;\n    transform: scale(0.98) translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  text-align: left;\n  padding: 8px 12px;\n  cursor: pointer;\n  color: inherit;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-secondary-dark);\n  box-shadow: var(--shadow-light);\n}\n@media (min-width: 768px) {\n  .header__logo[_ngcontent-%COMP%] {\n    font-size: var(--font-size-3xl);\n  }\n  .icon-btn[_ngcontent-%COMP%] {\n    padding: 8px 14px;\n    font-size: var(--font-size-md);\n  }\n  .icon-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .icon-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n  .icon-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: inline-flex;\n  }\n  .profile-dropdown[_ngcontent-%COMP%] {\n    min-width: 220px;\n    right: 12px;\n    top: calc(100% + 12px);\n    padding: 8px 8px;\n  }\n  .dropdown-item[_ngcontent-%COMP%] {\n    padding: 12px 14px;\n    font-size: var(--font-size-md);\n  }\n}\n/*# sourceMappingURL=header.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", imports: [RouterLink], template: '<header class="header">\r\n  @if (isLoggedIn()) {\r\n    <a class="header__logo" routerLink="/dashboard">MiAula</a>\r\n  }\r\n  @if (!isLoggedIn()) {\r\n   <a class="header__logo" routerLink="/home">MiAula</a>\r\n  }\r\n\r\n  <nav class="header__actions">\r\n\r\n\r\n    <!-- Agenda -->\r\n    <button class="icon-btn" routerLink="/agenda" aria-label="Ir a Agenda">\r\n      <img src="/calendar.png" alt="Agenda" />\r\n      <span>Agenda</span>\r\n    </button>\r\n\r\n\r\n    <!-- Si NO est\xE1 logueado -->\r\n    @if (!isLoggedIn()) {\r\n    <button class="icon-btn" (click)="login()">\r\n      <svg viewBox="0 0 24 24" aria-hidden="true">\r\n        <path d="M12 12a5 5 0 1 0 -5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />\r\n      </svg>\r\n      <span>Login</span>\r\n    </button>\r\n    }\r\n\r\n    <!-- Si est\xE1 logueado -->\r\n    @if (isLoggedIn()) {\r\n    <!-- Desktop: botones separados -->\r\n    <div class="desktop-only">\r\n      <button class="icon-btn" (click)="viewProfile()">\r\n        <svg viewBox="0 0 24 24" aria-hidden="true">\r\n          <path d="M12 12a5 5 0 1 0 -5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />\r\n        </svg>\r\n        <span>Perfil</span>\r\n      </button>\r\n      <button class="icon-btn" (click)="logout()">\r\n        <svg viewBox="0 0 24 24" aria-hidden="true">\r\n          <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />\r\n          <path d="M20 3h-8v2h8v14h-8v2h8c1.1 0 2-0.9 2-2V5c0-1.1-0.9-2-2-2z" />\r\n        </svg>\r\n        <span>Salir</span>\r\n      </button>\r\n    </div>\r\n\r\n    <!-- Mobile: bot\xF3n perfil con men\xFA desplegable -->\r\n    <div class="profile-menu mobile-only">\r\n      <button class="icon-btn" (click)="toggleProfileMenu()" aria-haspopup="true" [attr.aria-expanded]="showProfileMenu" aria-label="Abrir men\xFA de perfil">\r\n        <svg viewBox="0 0 24 24" aria-hidden="true">\r\n          <path d="M12 12a5 5 0 1 0 -5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />\r\n        </svg>\r\n        <span>Perfil</span>\r\n      </button>\r\n\r\n      @if (showProfileMenu) {\r\n      <div class="profile-dropdown mobile-only">\r\n        <button class="dropdown-item" (click)="viewProfile(); closeProfileMenu()">Ver perfil</button>\r\n        <button class="dropdown-item" (click)="logout(); closeProfileMenu()">Cerrar sesi\xF3n</button>\r\n      </div>\r\n      }\r\n    </div>\r\n    }\r\n\r\n  </nav>\r\n</header>\r\n', styles: ["/* src/app/shared/header/header.css */\n.header {\n  width: 100%;\n  padding: 0.8rem 1rem;\n  background: var(--color-primary);\n  color: var(--color-text-inverse);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: var(--shadow-medium);\n}\n.header {\n  position: relative;\n  z-index: 90;\n}\n.header__logo {\n  text-decoration: none;\n  color: var(--color-text-inverse);\n  font-family: var(--font-sans);\n  font-size: var(--font-size-xl);\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition-speed);\n}\n.header__logo:hover {\n  opacity: 0.9;\n}\n.header__actions {\n  display: flex;\n  gap: 0.6rem;\n}\n.icon-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 8px;\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n  border: none;\n  border-radius: var(--border-radius);\n  cursor: pointer;\n  transition: background var(--transition-speed), box-shadow var(--transition-speed);\n}\n.icon-btn svg {\n  width: 18px;\n  height: 18px;\n  fill: currentColor;\n}\n.icon-btn img {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n}\n.icon-btn span {\n  display: none;\n}\n.desktop-only {\n  display: none;\n}\n.mobile-only {\n  display: inline-flex;\n}\n.profile-menu {\n  position: relative;\n}\n.profile-dropdown {\n  position: absolute;\n  right: 6px;\n  top: calc(100% + 10px);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.98),\n      rgba(250, 250, 250, 0.98));\n  color: var(--color-text, #222);\n  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.25), 0 3px 8px rgba(2, 6, 23, 0.08);\n  border-radius: 12px;\n  min-width: 170px;\n  display: flex;\n  flex-direction: column;\n  padding: 6px 6px;\n  z-index: 80;\n  transform-origin: top right;\n  animation: dropdown-in 160ms ease-out;\n}\n.divider {\n  height: 1px;\n  background: rgba(0, 0, 0, 0.06);\n  margin: 6px 8px;\n  border-radius: 1px;\n}\n.dropdown-item {\n  background: transparent;\n  border: none;\n  text-align: left;\n  padding: 10px 12px;\n  cursor: pointer;\n  color: inherit;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  border-radius: 8px;\n  transition: background 120ms, transform 120ms;\n  font-size: var(--font-size-md);\n}\n.dropdown-item .item-icon svg {\n  width: 18px;\n  height: 18px;\n  fill: currentColor;\n  opacity: 0.9;\n}\n.dropdown-item .item-text {\n  flex: 1;\n}\n.dropdown-item:hover {\n  background: rgba(0, 0, 0, 0.04);\n  transform: translateY(-1px);\n}\n.dropdown-item.danger {\n  color: var(--color-danger, #c62828);\n}\n.dropdown-item.danger:hover {\n  background: rgba(198, 40, 40, 0.08);\n}\n@keyframes dropdown-in {\n  from {\n    opacity: 0;\n    transform: scale(0.98) translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.dropdown-item {\n  background: transparent;\n  border: none;\n  text-align: left;\n  padding: 8px 12px;\n  cursor: pointer;\n  color: inherit;\n}\n.dropdown-item:hover {\n  background: var(--color-secondary);\n  color: var(--color-text-inverse);\n}\n.icon-btn:hover {\n  background: var(--color-secondary-dark);\n  box-shadow: var(--shadow-light);\n}\n@media (min-width: 768px) {\n  .header__logo {\n    font-size: var(--font-size-3xl);\n  }\n  .icon-btn {\n    padding: 8px 14px;\n    font-size: var(--font-size-md);\n  }\n  .icon-btn span {\n    display: inline;\n  }\n  .icon-btn svg {\n    width: 20px;\n    height: 20px;\n  }\n  .icon-btn img {\n    width: 20px;\n    height: 20px;\n  }\n  .desktop-only {\n    display: none;\n  }\n  .mobile-only {\n    display: inline-flex;\n  }\n  .profile-dropdown {\n    min-width: 220px;\n    right: 12px;\n    top: calc(100% + 12px);\n    padding: 8px 8px;\n  }\n  .dropdown-item {\n    padding: 12px 14px;\n    font-size: var(--font-size-md);\n  }\n}\n/*# sourceMappingURL=header.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/shared/header/header.ts", lineNumber: 12 });
})();

// src/app/app.ts
var App = class _App {
  title = signal("gestor-aulas", ...ngDevMode ? [{ debugName: "title" }] : []);
  auth = inject(AuthService);
  get isLoggedIn() {
    return this.auth.usuarioLogueado();
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 4, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "main");
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-footer");
    }
  }, dependencies: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nmain[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [
      CommonModule,
      RouterOutlet,
      Header,
      Footer
    ], template: "<app-header></app-header>\r\n\r\n<main>\r\n  <router-outlet></router-outlet>\r\n</main>\r\n\r\n<app-footer></app-footer>", styles: ["/* src/app/app.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nmain {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 19 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
