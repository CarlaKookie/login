import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  constructor(private router: Router, private authService: AuthService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();  // Inicializamos el storage
    // Intentamos obtener el nombre de usuario del storage
    const storedName = await this.storage.get('nombre');
    this.nombreUsuario = storedName || 'Usuario';  // Si no está en el storage, usamos un valor por defecto
    console.log('Nombre recuperado desde el storage:', this.nombreUsuario);  // Verificar el nombre recuperado
  }

  canDeactivate(): boolean {
    return confirm('¿Estás seguro que deseas cerrar sesión?');
  }

  logout() {
    if (this.canDeactivate()) {
      this.authService.logout(); // Cerrar sesión
      this.storage.remove('nombre');  // Eliminar nombre del storage
      this.router.navigate(['/home']);
      console.log("Sesión cerrada");
    }
  }
}
