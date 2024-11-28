import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';


describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Verificar que la variable nombreUsuario es inicializada correctamente
  it('should initialize nombreUsuario with stored name', async () => {
    const storedName = 'Test User';
    spyOn(component['storage'], 'get').and.returnValue(Promise.resolve(storedName)); // Mock storage.get

    await component.ngOnInit(); // Llamar a ngOnInit

    expect(component.nombreUsuario).toBe(storedName); // Verificar que nombreUsuario fue inicializado correctamente
  });

  // Test 2: Verificar que logout funciona correctamente
  it('should logout and navigate to home', async () => {
    spyOn(component['authService'], 'logout').and.callThrough(); // Mock logout
    spyOn(component['storage'], 'remove').and.callThrough(); // Mock remove
    spyOn(component['router'], 'navigate'); // Mock navigate

    await component.logout(); // Llamar a la función logout

    expect(component['authService'].logout).toHaveBeenCalled(); // Verificar que logout fue llamado
    expect(component['storage'].remove).toHaveBeenCalledWith('nombre'); // Verificar que el nombre fue removido del storage
    expect(component['router'].navigate).toHaveBeenCalledWith(['/home']); // Verificar que se navega a home
  });

});
