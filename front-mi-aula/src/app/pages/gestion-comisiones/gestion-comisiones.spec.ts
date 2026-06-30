import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GestionComisiones } from './gestion-comisiones';

describe('GestionComisiones', () => {
  let component: GestionComisiones;
  let fixture: ComponentFixture<GestionComisiones>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionComisiones],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GestionComisiones);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
    httpMock.expectOne('http://localhost:3000/comisiones').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a comision and reload data', () => {
    component.form.setValue({
      nombre: 'Nueva comisión',
      cantidad_alumnos: 25,
      carrera_id: 1,
      asignatura_id: 10,
      usuario_profesor_id: 2,
    });

    component.registrarComision();

    const postReq = httpMock.expectOne('http://localhost:3000/comisiones');
    expect(postReq.request.method).toBe('POST');
    postReq.flush({ id: '99' });

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
    httpMock.expectOne('http://localhost:3000/comisiones').flush([]);
  });

  it('should delete a comision and reload data', () => {
    component.eliminarComision('1');

    const deleteReq = httpMock.expectOne('http://localhost:3000/comisiones/1');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
    httpMock.expectOne('http://localhost:3000/comisiones').flush([]);
  });
});
