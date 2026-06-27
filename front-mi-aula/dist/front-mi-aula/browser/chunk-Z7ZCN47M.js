import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-6LUZZAF4.js";
import {
  AuthService,
  UsuarioService
} from "./chunk-PLPPL4DU.js";
import {
  Router
} from "./chunk-IRPFJV3S.js";
import {
  CommonModule
} from "./chunk-7FGDNYX4.js";
import {
  Component,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3OUMOY5R.js";

// src/app/pages/perfil/perfil.component.ts
function PerfilComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
function PerfilComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, "El apellido es requerido");
    \u0275\u0275elementEnd();
  }
}
function PerfilComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " El email es requerido ");
  }
}
function PerfilComponent_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingresa un email v\xE1lido ");
  }
}
function PerfilComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, PerfilComponent_Conditional_26_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, PerfilComponent_Conditional_26_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.formPerfil.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.formPerfil.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["email"]) ? 2 : -1);
  }
}
function PerfilComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardando... ");
  }
}
function PerfilComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardar ");
  }
}
function PerfilComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mensajePerfil());
  }
}
function PerfilComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorPerfil());
  }
}
function PerfilComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " La contrase\xF1a actual es requerida ");
  }
}
function PerfilComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " La contrase\xF1a es requerida ");
  }
}
function PerfilComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " La contrase\xF1a debe tener m\xEDnimo 3 caracteres ");
  }
}
function PerfilComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Es necesario que repitas la nueva contrase\xF1a ");
  }
}
function PerfilComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mensajePassword());
  }
}
function PerfilComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorPassword());
  }
}
function PerfilComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Cambiando contrase\xF1a... ");
  }
}
function PerfilComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Cambiar contrase\xF1a ");
  }
}
function PerfilComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275listener("click", function PerfilComponent_Conditional_66_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarAlertaEliminar());
    });
    \u0275\u0275elementStart(1, "div", 31);
    \u0275\u0275listener("click", function PerfilComponent_Conditional_66_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 32)(3, "h2");
    \u0275\u0275text(4, "Confirmar Cierre de Cuenta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33)(6, "p");
    \u0275\u0275text(7, "\xBFEst\xE1s seguro de que deseas cerrar tu cuenta?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 34);
    \u0275\u0275text(9, "Esta acci\xF3n desactivar\xE1 tu cuenta y cerrar\xE1s sesi\xF3n inmediatamente.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 35)(11, "button", 36);
    \u0275\u0275listener("click", function PerfilComponent_Conditional_66_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarAlertaEliminar());
    });
    \u0275\u0275text(12, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 37);
    \u0275\u0275listener("click", function PerfilComponent_Conditional_66_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmarEliminar());
    });
    \u0275\u0275text(14, " Confirmar ");
    \u0275\u0275elementEnd()()()();
  }
}
var PerfilComponent = class _PerfilComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  usuarioActual = signal(null, ...ngDevMode ? [{ debugName: "usuarioActual" }] : []);
  loadingPerfil = false;
  loadingPassword = false;
  mensajePerfil = signal("", ...ngDevMode ? [{ debugName: "mensajePerfil" }] : []);
  mensajePassword = signal("", ...ngDevMode ? [{ debugName: "mensajePassword" }] : []);
  errorPerfil = signal("", ...ngDevMode ? [{ debugName: "errorPerfil" }] : []);
  errorPassword = signal("", ...ngDevMode ? [{ debugName: "errorPassword" }] : []);
  mostrarAlertaEliminar = signal(false, ...ngDevMode ? [{ debugName: "mostrarAlertaEliminar" }] : []);
  formPerfil = this.fb.group({
    nombre: [this.auth.infoUsuario().nombre, [Validators.required, Validators.minLength(2)]],
    apellido: [this.auth.infoUsuario().apellido, [Validators.required, Validators.minLength(2)]],
    email: [this.auth.infoUsuario().email, [Validators.required, Validators.email]]
  });
  formPassword = this.fb.group({
    passwordActual: ["", [Validators.required]],
    passwordNuevo: ["", [Validators.required, Validators.minLength(3)]],
    passwordConfirmar: ["", [Validators.required]]
  });
  ngOnInit() {
    if (!this.auth.usuarioLogueado) {
      this.router.navigate(["/login"]);
      return;
    }
    this.getUsuarioActual();
  }
  getUsuarioActual() {
    this.usuarioService.getUsuarioById(this.auth.infoUsuario().id).subscribe({
      next: (data) => {
        this.usuarioActual.set(data);
      },
      error: () => {
        this.errorPerfil.set("Fallo en el servidor");
        this.errorPassword.set("Fallo en el servidor");
      }
    });
  }
  enviarDatos() {
    if (this.formPerfil.invalid) {
      return;
    }
    this.loadingPerfil = true;
    this.mensajePerfil.set("");
    this.errorPerfil.set("");
    const usuarioActualizado = __spreadProps(__spreadValues({}, this.usuarioActual()), {
      nombre: this.formPerfil.value.nombre,
      apellido: this.formPerfil.value.apellido,
      email: this.formPerfil.value.email
    });
    this.auth.actualizarInfoUsuario(usuarioActualizado).subscribe({
      next: () => {
        this.mensajePerfil.set("\xA1Perfil actualizado correctamente!");
        this.loadingPerfil = false;
        this.formPerfil.markAsUntouched();
        this.getUsuarioActual();
      },
      error: (err) => {
        this.errorPerfil.set("Error al actualizar el perfil");
        console.log(err);
        this.loadingPerfil = false;
      }
    });
  }
  enviarPassword() {
    if (this.formPassword.invalid) {
      return;
    }
    this.loadingPassword = true;
    this.mensajePassword.set("");
    this.errorPassword.set("");
    if (!this.auth.validarPassword(this.usuarioActual().password, this.formPassword.value.passwordActual)) {
      this.errorPassword.set("Contrase\xF1a incorrecta");
      this.loadingPassword = false;
      return;
    }
    if (this.formPassword.value.passwordNuevo !== this.formPassword.value.passwordConfirmar) {
      this.errorPassword.set("Repita correctamente la contrase\xF1a");
      this.loadingPassword = false;
      return;
    }
    this.usuarioService.actualizarPassword(this.usuarioActual()?.id, this.formPassword.value.passwordNuevo).subscribe({
      next: () => {
        this.mensajePassword.set("\xA1Contrase\xF1a actualizada correctamente!");
        this.loadingPassword = false;
        this.formPassword.reset();
        this.formPassword.markAsUntouched();
        this.getUsuarioActual();
      },
      error: (err) => {
        this.errorPassword.set("Error al actualizar la contrase\xF1a");
        console.log(err);
        this.loadingPassword = false;
      }
    });
  }
  volver() {
    this.router.navigate(["/dashboard"]);
  }
  abrirAlertaEliminar() {
    this.mostrarAlertaEliminar.set(true);
  }
  cerrarAlertaEliminar() {
    this.mostrarAlertaEliminar.set(false);
  }
  confirmarEliminar() {
    this.usuarioService.eliminarById(this.usuarioActual().id).subscribe({
      next: () => {
        this.cerrarAlertaEliminar();
        this.auth.logout();
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        alert("Error al intentar eliminar la cuenta...");
        console.log(err);
        this.cerrarAlertaEliminar();
      }
    });
  }
  static \u0275fac = function PerfilComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PerfilComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PerfilComponent, selectors: [["app-perfil"]], decls: 67, vars: 24, consts: [[1, "perfil-container"], [1, "perfil-card"], [1, "perfil-header"], [1, "btn-volver", 3, "click"], [1, "perfil-form", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-row"], [1, "form-group"], ["for", "nombre"], ["id", "nombre", "type", "text", "formControlName", "nombre", 1, "form-control"], [1, "error-message"], ["for", "apellido"], ["id", "apellido", "type", "text", "formControlName", "apellido", 1, "form-control"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", 1, "form-control"], [1, "form-actions-section"], ["type", "submit", 1, "btn-save-info", 3, "disabled"], [1, "success-message"], [1, "error-message", "global-error"], ["for", "passwordActual"], ["id", "passwordActual", "type", "password", "formControlName", "passwordActual", "placeholder", "Ingresa tu contrase\xF1a actual", 1, "form-control"], ["for", "passwordNuevo"], ["id", "passwordNuevo", "type", "password", "formControlName", "passwordNuevo", "placeholder", "Nueva contrase\xF1a", 1, "form-control"], ["for", "passwordConfirmar"], ["id", "passwordConfirmar", "type", "password", "formControlName", "passwordConfirmar", "placeholder", "Confirma la nueva contrase\xF1a", 1, "form-control"], [1, "form-actions"], ["type", "button", 1, "btn-delete", 3, "click"], [1, "form-actions-right"], ["type", "submit", 1, "btn-save-password", 3, "disabled"], [1, "modal-overlay"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-body"], [1, "modal-warning"], [1, "modal-actions"], ["type", "button", 1, "btn-modal-cancelar", 3, "click"], ["type", "button", 1, "btn-modal-confirmar", 3, "click"]], template: function PerfilComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Mi Perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275listener("click", function PerfilComponent_Template_button_click_5_listener() {
        return ctx.volver();
      });
      \u0275\u0275text(6, "\u2190 Volver");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 4);
      \u0275\u0275listener("ngSubmit", function PerfilComponent_Template_form_ngSubmit_7_listener() {
        return ctx.enviarDatos();
      });
      \u0275\u0275elementStart(8, "div", 5)(9, "h3");
      \u0275\u0275text(10, "Informaci\xF3n Personal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 6)(12, "div", 7)(13, "label", 8);
      \u0275\u0275text(14, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 9);
      \u0275\u0275conditionalCreate(16, PerfilComponent_Conditional_16_Template, 2, 0, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 7)(18, "label", 11);
      \u0275\u0275text(19, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 12);
      \u0275\u0275conditionalCreate(21, PerfilComponent_Conditional_21_Template, 2, 0, "div", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
      \u0275\u0275text(24, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 14);
      \u0275\u0275conditionalCreate(26, PerfilComponent_Conditional_26_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 15)(28, "button", 16);
      \u0275\u0275conditionalCreate(29, PerfilComponent_Conditional_29_Template, 1, 0)(30, PerfilComponent_Conditional_30_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(31, PerfilComponent_Conditional_31_Template, 2, 1, "div", 17);
      \u0275\u0275conditionalCreate(32, PerfilComponent_Conditional_32_Template, 2, 1, "div", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "form", 4);
      \u0275\u0275listener("ngSubmit", function PerfilComponent_Template_form_ngSubmit_33_listener() {
        return ctx.enviarPassword();
      });
      \u0275\u0275elementStart(34, "div", 5)(35, "h3");
      \u0275\u0275text(36, "Cambiar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 7)(38, "label", 19);
      \u0275\u0275text(39, "Contrase\xF1a Actual");
      \u0275\u0275elementEnd();
      \u0275\u0275element(40, "input", 20);
      \u0275\u0275elementStart(41, "div", 10);
      \u0275\u0275conditionalCreate(42, PerfilComponent_Conditional_42_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 6)(44, "div", 7)(45, "label", 21);
      \u0275\u0275text(46, "Nueva Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "input", 22);
      \u0275\u0275elementStart(48, "div", 10);
      \u0275\u0275conditionalCreate(49, PerfilComponent_Conditional_49_Template, 1, 0);
      \u0275\u0275conditionalCreate(50, PerfilComponent_Conditional_50_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 7)(52, "label", 23);
      \u0275\u0275text(53, "Confirmar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(54, "input", 24);
      \u0275\u0275elementStart(55, "div", 10);
      \u0275\u0275conditionalCreate(56, PerfilComponent_Conditional_56_Template, 1, 0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(57, PerfilComponent_Conditional_57_Template, 2, 1, "div", 17);
      \u0275\u0275conditionalCreate(58, PerfilComponent_Conditional_58_Template, 2, 1, "div", 18);
      \u0275\u0275elementStart(59, "div", 25)(60, "button", 26);
      \u0275\u0275listener("click", function PerfilComponent_Template_button_click_60_listener() {
        return ctx.abrirAlertaEliminar();
      });
      \u0275\u0275text(61, " Cerrar Cuenta ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div", 27)(63, "button", 28);
      \u0275\u0275conditionalCreate(64, PerfilComponent_Conditional_64_Template, 1, 0)(65, PerfilComponent_Conditional_65_Template, 1, 0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(66, PerfilComponent_Conditional_66_Template, 15, 0, "div", 29);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_12_0;
      let tmp_13_0;
      let tmp_14_0;
      let tmp_15_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.formPerfil);
      \u0275\u0275advance(8);
      \u0275\u0275classProp("error", (tmp_1_0 = ctx.formPerfil.get("nombre")) == null ? null : tmp_1_0.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_2_0 = ctx.formPerfil.get("nombre")) == null ? null : tmp_2_0.invalid) ? 16 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", (tmp_3_0 = ctx.formPerfil.get("apellido")) == null ? null : tmp_3_0.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_4_0 = ctx.formPerfil.get("apellido")) == null ? null : tmp_4_0.invalid) ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", (tmp_5_0 = ctx.formPerfil.get("email")) == null ? null : tmp_5_0.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_6_0 = ctx.formPerfil.get("email")) == null ? null : tmp_6_0.invalid) ? 26 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loadingPerfil || ctx.formPerfil.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loadingPerfil ? 29 : 30);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.mensajePerfil() ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorPerfil() ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.formPassword);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(((tmp_12_0 = ctx.formPassword.get("passwordActual")) == null ? null : tmp_12_0.errors == null ? null : tmp_12_0.errors["required"]) && ((tmp_12_0 = ctx.formPassword.get("passwordActual")) == null ? null : tmp_12_0.touched) && ((tmp_12_0 = ctx.formPassword.get("passwordActual")) == null ? null : tmp_12_0.dirty) ? 42 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(((tmp_13_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_13_0.errors == null ? null : tmp_13_0.errors["required"]) && ((tmp_13_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_13_0.touched) && ((tmp_13_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_13_0.dirty) ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_14_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_14_0.errors == null ? null : tmp_14_0.errors["minlength"]) && ((tmp_14_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_14_0.touched) && ((tmp_14_0 = ctx.formPassword.get("passwordNuevo")) == null ? null : tmp_14_0.dirty) ? 50 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_15_0 = ctx.formPassword.get("passwordConfirmar")) == null ? null : tmp_15_0.errors == null ? null : tmp_15_0.errors["required"]) && ((tmp_15_0 = ctx.formPassword.get("passwordConfirmar")) == null ? null : tmp_15_0.touched) && ((tmp_15_0 = ctx.formPassword.get("passwordConfirmar")) == null ? null : tmp_15_0.dirty) ? 56 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mensajePassword() ? 57 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorPassword() ? 58 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.loadingPassword || ctx.formPassword.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loadingPassword ? 64 : 65);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.mostrarAlertaEliminar() ? 66 : -1);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.perfil-container[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.perfil-card[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  padding: 40px;\n}\n.perfil-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n  border-bottom: 1px solid #e2e8f0;\n  padding-bottom: 20px;\n}\n.perfil-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  background: #4a5568;\n}\n.perfil-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.form-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #667eea;\n}\n.form-actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: 16px;\n  margin-top: 8px;\n  border-top: 1px solid #e2e8f0;\n}\n.btn-save-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);\n}\n.btn-save-info[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);\n}\n.btn-save-info[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.875rem;\n}\n.form-control[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-control.error[_ngcontent-%COMP%] {\n  border-color: #e53e3e;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 0.75rem;\n  margin-top: 4px;\n}\n.global-error[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #c53030;\n  padding: 12px;\n  border-radius: 6px;\n  text-align: center;\n  margin: 0;\n}\n.success-message[_ngcontent-%COMP%] {\n  background: #c6f6d5;\n  color: #276749;\n  padding: 12px;\n  border-radius: 6px;\n  text-align: center;\n  margin: 0;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 20px;\n  border-top: 1px solid #e2e8f0;\n}\n.form-actions-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);\n}\n.btn-delete[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);\n}\n.btn-delete[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.btn-save-password[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.btn-save-password[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n}\n.btn-save-password[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n  max-width: 500px;\n  width: 90%;\n  padding: 0;\n  animation: _ngcontent-%COMP%_modalFadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_modalFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.9);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n  border-bottom: 2px solid #667eea;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 32px;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #2d3748;\n  font-size: 1rem;\n  line-height: 1.5;\n}\n.modal-warning[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-weight: 500;\n  background: #fed7d7;\n  padding: 12px;\n  border-radius: 8px;\n  margin-bottom: 0 !important;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.btn-modal-cancelar[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-modal-cancelar[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n}\n.btn-modal-confirmar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);\n}\n.btn-modal-confirmar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);\n}\n@media (max-width: 768px) {\n  .perfil-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .perfil-card[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .perfil-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=perfil.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PerfilComponent, [{
    type: Component,
    args: [{ selector: "app-perfil", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="perfil-container">\r
  <div class="perfil-card">\r
    <div class="perfil-header">\r
      <h1>Mi Perfil</h1>\r
      <button (click)="volver()" class="btn-volver">\u2190 Volver</button>\r
    </div>\r
\r
    <!-- Formulario perfil -->\r
    <form [formGroup]="formPerfil" (ngSubmit)="enviarDatos()" class="perfil-form">\r
      <div class="form-section">\r
        <h3>Informaci\xF3n Personal</h3>\r
\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label for="nombre">Nombre</label>\r
            <input\r
              id="nombre"\r
              type="text"\r
              formControlName="nombre"\r
              class="form-control"\r
              [class.error]="formPerfil.get('nombre')?.invalid"\r
            />\r
            @if (formPerfil.get('nombre')?.invalid) {\r
            <div class="error-message">El nombre es requerido</div>\r
            }\r
          </div>\r
\r
          <div class="form-group">\r
            <label for="apellido">Apellido</label>\r
            <input\r
              id="apellido"\r
              type="text"\r
              formControlName="apellido"\r
              class="form-control"\r
              [class.error]="\r
                formPerfil.get('apellido')?.invalid"\r
            />\r
            @if (formPerfil.get('apellido')?.invalid) {\r
            <div class="error-message">El apellido es requerido</div>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="form-group">\r
          <label for="email">Email</label>\r
          <input\r
            id="email"\r
            type="email"\r
            formControlName="email"\r
            class="form-control"\r
            [class.error]="formPerfil.get('email')?.invalid"\r
          />\r
          @if (formPerfil.get('email')?.invalid) {\r
          <div class="error-message">\r
            @if (formPerfil.get('email')?.errors?.['required']) { El email es requerido } @if\r
            (formPerfil.get('email')?.errors?.['email']) { Ingresa un email v\xE1lido }\r
          </div>\r
          }\r
        </div>\r
\r
        <div class="form-actions-section">\r
          <button type="submit" class="btn-save-info" [disabled]="loadingPerfil || formPerfil.invalid">\r
            @if (loadingPerfil) { Guardando... } @else { Guardar }\r
          </button>\r
        </div>\r
\r
        @if (mensajePerfil()) {\r
        <div class="success-message">{{ mensajePerfil() }}</div>\r
        } @if (errorPerfil()) {\r
        <div class="error-message global-error">{{ errorPerfil() }}</div>\r
        }\r
      </div>\r
    </form>\r
\r
    <!-- Formulario contrase\xF1a -->\r
    <form [formGroup]="formPassword" (ngSubmit)="enviarPassword()" class="perfil-form">\r
      <div class="form-section">\r
        <h3>Cambiar Contrase\xF1a</h3>\r
\r
        <div class="form-group">\r
          <label for="passwordActual">Contrase\xF1a Actual</label>\r
          <input\r
            id="passwordActual"\r
            type="password"\r
            formControlName="passwordActual"\r
            class="form-control"\r
            placeholder="Ingresa tu contrase\xF1a actual"\r
          />\r
          <div class="error-message">\r
            @if (formPassword.get('passwordActual')?.errors?.['required'] &&\r
            formPassword.get('passwordActual')?.touched &&\r
            formPassword.get('passwordActual')?.dirty) { La contrase\xF1a actual es requerida }\r
          </div>\r
        </div>\r
\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label for="passwordNuevo">Nueva Contrase\xF1a</label>\r
            <input\r
              id="passwordNuevo"\r
              type="password"\r
              formControlName="passwordNuevo"\r
              class="form-control"\r
              placeholder="Nueva contrase\xF1a"\r
            />\r
            <div class="error-message">\r
              @if (formPassword.get('passwordNuevo')?.errors?.['required'] &&\r
              formPassword.get('passwordNuevo')?.touched &&\r
              formPassword.get('passwordNuevo')?.dirty){ La contrase\xF1a es requerida } @if\r
              (formPassword.get('passwordNuevo')?.errors?.['minlength'] &&\r
              formPassword.get('passwordNuevo')?.touched &&\r
              formPassword.get('passwordNuevo')?.dirty) { La contrase\xF1a debe tener m\xEDnimo 3\r
              caracteres }\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label for="passwordConfirmar">Confirmar Contrase\xF1a</label>\r
            <input\r
              id="passwordConfirmar"\r
              type="password"\r
              formControlName="passwordConfirmar"\r
              class="form-control"\r
              placeholder="Confirma la nueva contrase\xF1a"\r
            />\r
            <div class="error-message">\r
              @if (formPassword.get('passwordConfirmar')?.errors?.['required'] &&\r
              formPassword.get('passwordConfirmar')?.touched &&\r
              formPassword.get('passwordConfirmar')?.dirty){ Es necesario que repitas la nueva\r
              contrase\xF1a }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Mensajes -->\r
      @if (mensajePassword()) {\r
      <div class="success-message">{{ mensajePassword() }}</div>\r
      } @if (errorPassword()) {\r
      <div class="error-message global-error">{{ errorPassword() }}</div>\r
      }\r
\r
      <!-- Botones -->\r
      <div class="form-actions">\r
        <button (click)="abrirAlertaEliminar()" type="button" class="btn-delete">\r
          Cerrar Cuenta\r
        </button>\r
\r
        <div class="form-actions-right">\r
          <button\r
            type="submit"\r
            class="btn-save-password"\r
            [disabled]="loadingPassword || formPassword.invalid"\r
          >\r
            @if (loadingPassword) { Cambiando contrase\xF1a... } @else { Cambiar contrase\xF1a }\r
          </button>\r
        </div>\r
      </div>\r
    </form>\r
\r
    <!-- Modal de confirmaci\xF3n -->\r
    @if (mostrarAlertaEliminar()) {\r
      <div class="modal-overlay" (click)="cerrarAlertaEliminar()">\r
        <div class="modal-content" (click)="$event.stopPropagation()">\r
          <div class="modal-header">\r
            <h2>Confirmar Cierre de Cuenta</h2>\r
          </div>\r
          <div class="modal-body">\r
            <p>\xBFEst\xE1s seguro de que deseas cerrar tu cuenta?</p>\r
            <p class="modal-warning">Esta acci\xF3n desactivar\xE1 tu cuenta y cerrar\xE1s sesi\xF3n inmediatamente.</p>\r
          </div>\r
          <div class="modal-actions">\r
            <button type="button" (click)="cerrarAlertaEliminar()" class="btn-modal-cancelar">\r
              Cancelar\r
            </button>\r
            <button type="button" (click)="confirmarEliminar()" class="btn-modal-confirmar">\r
              Confirmar\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/perfil/perfil.component.css */\n.perfil-container {\n  flex: 1;\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n}\n.perfil-card {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  padding: 40px;\n}\n.perfil-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n  border-bottom: 1px solid #e2e8f0;\n  padding-bottom: 20px;\n}\n.perfil-header h1 {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-volver {\n  background: #718096;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-volver:hover {\n  background: #4a5568;\n}\n.perfil-form {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.form-section {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-section h3 {\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #667eea;\n}\n.form-actions-section {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: 16px;\n  margin-top: 8px;\n  border-top: 1px solid #e2e8f0;\n}\n.btn-save-info {\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);\n}\n.btn-save-info:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);\n}\n.btn-save-info:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group label {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.875rem;\n}\n.form-control {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-control.error {\n  border-color: #e53e3e;\n}\n.error-message {\n  color: #e53e3e;\n  font-size: 0.75rem;\n  margin-top: 4px;\n}\n.global-error {\n  background: #fed7d7;\n  color: #c53030;\n  padding: 12px;\n  border-radius: 6px;\n  text-align: center;\n  margin: 0;\n}\n.success-message {\n  background: #c6f6d5;\n  color: #276749;\n  padding: 12px;\n  border-radius: 6px;\n  text-align: center;\n  margin: 0;\n}\n.form-actions {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 20px;\n  border-top: 1px solid #e2e8f0;\n}\n.form-actions-right {\n  display: flex;\n  gap: 16px;\n}\n.btn-delete {\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);\n}\n.btn-delete:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);\n}\n.btn-delete:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.btn-save-password {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.btn-save-password:hover:not(:disabled) {\n  transform: translateY(-2px);\n}\n.btn-save-password:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-content {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n  max-width: 500px;\n  width: 90%;\n  padding: 0;\n  animation: modalFadeIn 0.3s ease;\n}\n@keyframes modalFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.9);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.modal-header {\n  padding: 24px 32px;\n  border-bottom: 2px solid #667eea;\n}\n.modal-header h2 {\n  margin: 0;\n  color: #2d3748;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n.modal-body {\n  padding: 32px;\n}\n.modal-body p {\n  margin: 0 0 16px 0;\n  color: #2d3748;\n  font-size: 1rem;\n  line-height: 1.5;\n}\n.modal-warning {\n  color: #e53e3e;\n  font-weight: 500;\n  background: #fed7d7;\n  padding: 12px;\n  border-radius: 8px;\n  margin-bottom: 0 !important;\n}\n.modal-actions {\n  padding: 24px 32px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.btn-modal-cancelar {\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-modal-cancelar:hover {\n  background: #cbd5e0;\n}\n.btn-modal-confirmar {\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);\n}\n.btn-modal-confirmar:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);\n}\n@media (max-width: 768px) {\n  .perfil-container {\n    padding: 15px;\n  }\n  .perfil-card {\n    padding: 24px;\n  }\n  .perfil-header {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=perfil.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PerfilComponent, { className: "PerfilComponent", filePath: "src/app/pages/perfil/perfil.component.ts", lineNumber: 16 });
})();
export {
  PerfilComponent
};
//# sourceMappingURL=chunk-Z7ZCN47M.js.map
