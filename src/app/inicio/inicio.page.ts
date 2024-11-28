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
      await this.storage.remove('correo'); // Eliminar correo del storage al cerrar sesión
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

        // Verifica si se obtuvo algún contenido del escaneo
        if (result.hasContent) {
          console.log('Scanned content:', result.content); // Muestra el contenido escaneado en la consola
          const scannedData = JSON.parse(result.content); // Decodificar JSON del QR
          const { sessionId, subject, section } = scannedData;

          if (!sessionId || !subject || !section) {
            this.presentAlert('Error', 'Datos incompletos', 'El QR escaneado no contiene todos los datos necesarios.');
            return;
          }

          const correo = this.authService.getUserEmail();
          if (!correo) {
            this.presentAlert('Error', 'Correo no encontrado', 'No se ha encontrado el correo electrónico del usuario.');
            return;
          }

          const userData = {
            user: correo,
            date: new Date().toISOString(),
            section,
            status: 'presente',
            subject,
            sessionId,  
          };

          this.sendData(userData);
        }
      } else {
        console.error('Permission denied');
      }
    } catch (err) {
      console.error('Error al escanear el código QR:', err);
      this.presentAlert('Error', 'Error en el escaneo', 'Hubo un problema al escanear el código QR.');
    }
  }

  sendData(userData: any) {
    this.userDataService.sendUserData(userData).subscribe(
      async (response) => {
        console.log('Datos enviados correctamente', response);
        await this.presentAlert('Asistencia','', 'confirmada');
      },
      async (error) => {
        console.error('Error al enviar los datos', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar una alerta
      }
    );
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
