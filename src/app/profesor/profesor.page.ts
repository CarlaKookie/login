import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  qrCodeData: string = '';
  selectedSection: string = '';
  selectedSubject: string = '';
  selectedDate: string = ''; // Campo para la fecha seleccionada
  nombreUsuario: string = '';
  correoUsuario: string = '';
  attendanceRecords: any[] = [];

  sections: string[] = ['004D', '006D', '007D'];
  subjects: string[] = ['Programación de base de datos', 'Programación de aplicaciones móviles'];

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  // No es necesario 'ngOnInit' para cargar los datos, lo haremos en 'ionViewWillEnter'
  ngOnInit() {
    // En ngOnInit no es necesario hacer nada relacionado con el storage
  }

  // Cambia la carga de datos al ciclo de vida 'ionViewWillEnter'
  async ionViewWillEnter() {
    // Cargar los datos del almacenamiento (nombre y correo)
    const storedName = await this.storage.get('nombre');
    const storedEmail = await this.storage.get('correo');
    this.nombreUsuario = storedName || 'Usuario'; // Valor por defecto si no se encuentra
    this.correoUsuario = storedEmail || 'Correo'; // Valor por defecto si no se encuentra

    // Limpiar campos relacionados con la sección y asignatura
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
    const dateTime = new Date();
    const timestamp = dateTime.getTime();

    const data = {
      id: timestamp.toString(),
      sessionId: this.selectedSection,
      subject: this.selectedSubject,
      profesor: this.nombreUsuario
    };

    QRCode.toDataURL(JSON.stringify(data), (err, url) => {
      if (err) {
        console.error('Error generando el código QR', err);
      } else {
        this.qrCodeData = url;
        console.log(this.qrCodeData);
      }
    });
  }

  consultAttendance() {
    if (!this.selectedDate || !this.selectedSection) {
      alert('Debe proporcionar una fecha y sección válidas.');
      return;
    }

    // Convertir la fecha seleccionada a formato ISO con zona horaria
    const isoDate = new Date(this.selectedDate).toISOString();

    console.log('Consultando asistencia para:', isoDate, this.selectedSection); // Verificación de los datos

    this.apiService.getAttendance(isoDate, this.selectedSection).subscribe(
      (data) => {
        this.attendanceRecords = data;
        console.log('Asistencia:', data);
      },
      (error) => {
        console.error('Error al consultar la asistencia:', error);
        alert('Hubo un error al consultar los datos.');
      }
    );
  }
}
