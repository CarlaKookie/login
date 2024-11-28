import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa IonicStorageModule para Storage

import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn']);
    storageSpy = jasmine.createSpyObj('Storage', ['create', 'set', 'remove']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,  // Asegúrate de importar HttpClientModule para HttpClient
        IonicStorageModule.forRoot()  // Asegúrate de importar IonicStorageModule para Storage
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Storage, useValue: storageSpy },
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Verificar que el formulario tiene los controles 'nombreUsuario' y 'contrasena'
  it('should create a form group with nombreUsuario and contrasena controls', () => {
    expect(component.loginForm.contains('nombreUsuario')).toBeTruthy();
    expect(component.loginForm.contains('contrasena')).toBeTruthy();
  });

  // Test 2: Verificar que el formulario es inválido cuando 'nombreUsuario' y 'contrasena' están vacíos
  it('should mark the form as invalid when nombreUsuario and contrasena are empty', () => {
    component.loginForm.setValue({ nombreUsuario: '', contrasena: '' });
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // Test 3: Verificar que el formulario es válido cuando 'nombreUsuario' y 'contrasena' tienen valores
  it('should mark the form as valid when nombreUsuario and contrasena are filled in', () => {
    component.loginForm.setValue({ nombreUsuario: 'testuser', contrasena: 'password123' });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
