import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  qrCodeData: string = '';
  selectedSection: string = '';
  selectedSubject: string = '';
  nombreUsuario: string = '';
  correoUsuario: string = '';

  sections: string[] = ['004D', '006D', '007D'];
  subjects: string[] = ['Programación de base de datos', 'Programación de aplicaciones móviles'];

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const storedName = await this.storage.get('nombre');
    const storedEmail = await this.storage.get('correo');
    this.nombreUsuario = storedName || 'Usuario';
    this.correoUsuario = storedEmail || 'Correo';
  }

  // Añadir ionViewWillEnter para limpiar los campos cuando se ingresa a la página
  ionViewWillEnter() {
    this.nombreUsuario = '';
    this.correoUsuario = '';
    this.selectedSection = '';
    this.selectedSubject = '';
    this.qrCodeData = ''; // Limpiar el código QR
  }

  async logout() {
    if (this.canDeactivate({ fromLogout: true })) {
      this.authService.logout();
      await this.storage.remove('nombre');
      await this.storage.remove('correo');
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

  generateQRCode() {
    const data = `Asistencia:${this.selectedSection}:${this.selectedSubject}:${this.nombreUsuario}`;
    QRCode.toDataURL(data)
      .then((url) => {
        this.qrCodeData = url;
        console.log(this.qrCodeData);
      })
      .catch((err) => {
        console.error('Error generando el QR', err);
      });
  }
}
