import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorPage } from './profesor.page';
import { of } from 'rxjs';

describe('ProfesorPage', () => {
  let component: ProfesorPage;
  let fixture: ComponentFixture<ProfesorPage>;
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Verificar que el nombre y correo del usuario se cargan correctamente desde el storage
  it('should load user data from storage on ionViewWillEnter', async () => {
    spyOn(component['storage'], 'get').and.returnValue(Promise.resolve('Test User')); // Mock de 'get'
    
    await component.ionViewWillEnter(); // Llamar a ionViewWillEnter

    expect(component.nombreUsuario).toBe('Test User'); // Verificar que el nombre fue cargado correctamente
  });


  // Test 2: Verificar la consulta de asistencia
  it('should fetch attendance records from API', () => {
    const mockAttendanceData = [{ id: 1, name: 'John Doe', status: 'Present' }];
    spyOn(component['apiService'], 'getAttendance').and.returnValue(of(mockAttendanceData)); // Mock de getAttendance

    component.date = '2024-11-28'; // Asignar fecha de prueba
    component.section = 'A'; // Asignar sección de prueba
    component.consultAttendance(); // Llamar a la función consultAttendance

    expect(component.attendanceRecords).toEqual(mockAttendanceData); // Verificar que los registros de asistencia fueron asignados correctamente
  });
});
