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
    const storedName = await this.storage.get('nombre');
    this.nombreUsuario = storedName || 'Usuario';
    console.log('Nombre recuperado desde el storage:', this.nombreUsuario);
  }

  async logout() {
    const confirmLogout = await this.canDeactivate();
    if (confirmLogout) {
      this.authService.logout(); // Cerrar sesión
      await this.storage.remove('nombre');  // Eliminar nombre del storage
      this.router.navigate(['/home']);
      console.log("Sesión cerrada");
    }
  }

  async canDeactivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const confirmLogout = confirm('¿Estás seguro que deseas cerrar sesión?');
      resolve(confirmLogout);
    });
  }

  goToNotas() {
    this.router.navigate(['/notas']);
  }
}
