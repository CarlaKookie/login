import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; // Importa BarcodeScanner

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializamos el storage
    const storedName = await this.storage.get('nombre');
    this.nombreUsuario = storedName || 'Usuario';
    console.log('Nombre recuperado desde el storage:', this.nombreUsuario);
  }

  async logout() {
    if (this.canDeactivate({ fromLogout: true })) {
      this.authService.logout();
      await this.storage.remove('nombre'); // Eliminar nombre del storage al cerrar sesión
      this.router.navigate(['/home']);
    }
  }

  canDeactivate(navigationState?: { fromLogout?: boolean }): boolean {
    const navigation = this.router.getCurrentNavigation();
    const fromEdit = navigation?.extras.state?.['fromEdit'];
    const fromLogout = navigationState?.fromLogout;

    if (!fromEdit && fromLogout) {
      return confirm('¿Estás seguro que deseas cerrar sesión?');
    }
    return true;
  }

  goToNotas() {
    const navigationExtras: NavigationExtras = {
      state: { fromEdit: true },
    };
    this.router.navigate(['/notas'], navigationExtras);
  }

  async startScan() {
    // Verifica si se tiene permiso para usar la cámara
    const allowed = await BarcodeScanner.checkPermission({ force: true });
    if (allowed.granted) {
      // Oculta la interfaz de usuario web para que la cámara pueda escanear
      document.querySelector('body')?.classList.add('scanner-active');

      // Inicia el escaneo
      const result = await BarcodeScanner.startScan(); // La promesa se resuelve cuando se detecta un código
      document.querySelector('body')?.classList.remove('scanner-active');

      // Verifica si se obtuvo algún contenido del escaneo
      if (result.hasContent) {
        console.log('Scanned content:', result.content); // Muestra el contenido escaneado en la consola
        // Aquí puedes manejar el contenido escaneado como necesites
      }
    } else {
      console.error('Permission denied');
    }
  }
}
