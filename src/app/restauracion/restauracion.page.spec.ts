import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestauracionPage } from './restauracion.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RestauracionPage', () => {
  let component: RestauracionPage;
  let fixture: ComponentFixture<RestauracionPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAlertController: jasmine.SpyObj<AlertController>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [RestauracionPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AlertController, useValue: mockAlertController }
      ]
    });

    fixture = TestBed.createComponent(RestauracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Verificar que los campos se limpian al ingresar a la página
  it('should clear the nombreUsuario when ionViewWillEnter is called', () => {
    component.nombreUsuario = 'Test User'; // Asignar un valor al nombreUsuario
    component.ionViewWillEnter(); // Llamar al método ionViewWillEnter
    expect(component.nombreUsuario).toBe(''); // Verificar que el nombreUsuario se haya limpiado
  });

  // Test 2: Verificar que muestra una alerta de éxito cuando se ingresa un nombre de usuario
  it('should show success alert when a username is provided', async () => {
    mockAlertController.create.and.returnValue(Promise.resolve({ present: () => {} } as any)); // Mock de alerta
    component.nombreUsuario = 'Test User'; // Asignar un nombre de usuario

    await component.onSubmit(); // Llamar al método onSubmit

    expect(mockAlertController.create).toHaveBeenCalledWith({
      header: 'Éxito',
      message: 'Se ha enviado un enlace para recuperar la contraseña a la dirección asociada con el usuario Test User.',
      buttons: ['OK']
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']); // Verificar que redirige a la página de inicio
  });

  // Test 3: Verificar que muestra una alerta de error cuando no se ingresa un nombre de usuario
  it('should show error alert when no username is provided', async () => {
    mockAlertController.create.and.returnValue(Promise.resolve({ present: () => {} } as any)); // Mock de alerta
    component.nombreUsuario = ''; // Dejar el nombreUsuario vacío

    await component.onSubmit(); // Llamar al método onSubmit

    expect(mockAlertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, introduce un nombre de usuario.',
      buttons: ['OK']
    });
  });

});

