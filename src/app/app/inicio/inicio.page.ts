import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; // Importa BarcodeScanner
import { UserDataService } from '../user-data.service';

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
    private storage: Storage,
    private userDataService: UserDataService,
    private alertController: AlertController  // Inyectamos el AlertController
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

  async startScan() {
    try {
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
          // Por ejemplo, hacer algo con el contenido
        }
      } else {
        console.error('Permission denied');
      }
    } catch (err) {
      console.error('Error al escanear el código QR:', err);
      this.presentAlert('Error', 'Error en el escaneo', 'Hubo un problema al escanear el código QR.');
    }
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
