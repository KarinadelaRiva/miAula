import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GestionCarreras } from './gestion-carreras';

describe('GestionCarreras', () => {
  let component: GestionCarreras;
  let fixture: ComponentFixture<GestionCarreras>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCarreras],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GestionCarreras);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register carrera and reload list', () => {
    component.form.setValue({ nombre: 'Nueva carrera' });
    component.registrarCarrera();

    const postReq = httpMock.expectOne('http://localhost:3000/carreras');
    expect(postReq.request.method).toBe('POST');
    postReq.flush({ id: '6' });

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
  });

  it('should delete carrera and reload list', () => {
    component.eliminarCarrera('1');

    const deleteReq = httpMock.expectOne('http://localhost:3000/carreras/1');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    httpMock.expectOne('http://localhost:3000/carreras').flush([]);
  });
});
