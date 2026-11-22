import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../auth/service/auth-service';
import { UsuarioService } from '../../../services/usuario-service/usuario-service';

import { RegistrarUsuario } from './registrar-usuario';

describe('RegistrarUsuario', () => {
  let component: RegistrarUsuario;
  let fixture: ComponentFixture<RegistrarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarUsuario],
      providers: [
        { provide: AuthService, useValue: { validarPassword: () => true } },
        { provide: UsuarioService, useValue: {} },
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requires a long password with uppercase, lowercase, number, and special character', () => {
    const password = component.form.get('password')!;
    const invalidPasswords = ['abcdefg1!', 'ABCDEFG1!', 'Abcdefgh!', 'Abcdefg1', 'Ab1!xyz'];

    for (const value of invalidPasswords) {
      password.setValue(value);
      expect(password.invalid).withContext(value).toBeTrue();
    }

    password.setValue('Abcdef1!');
    expect(password.valid).toBeTrue();
  });
});
