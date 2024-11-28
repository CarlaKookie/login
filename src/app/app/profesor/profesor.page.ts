import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  qrCodes: Array<{ section: string; url: string }> = [];
  selectedSection: string = '';
  selectedSubject: string = '';
  selectedDate: string = ''; // Campo para la fecha seleccionada
  nombreUsuario: string = '';
  correoUsuario: string = '';
  date: string = '';
  section: string = '';
  attendanceRecords: any[] = [];
  selectedQRCode: string | null = null;
  qrCodeUrl: string = '';

  sections = [
    { id: 'A', name: '006D', subject: 'Programación de aplicaciones móviles' },
    { id: 'B', name: '007D', subject: 'Programación de base de datos' },
    { id: 'C', name: '004D', subject: 'Programación de base de datos' },
    { id: 'D', name: '002D', subject: 'Programación de aplicaciones móviles' },
  ];

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // Carga datos almacenados al entrar en la vista
  async ionViewWillEnter() {
    this.nombreUsuario = (await this.storage.get('nombre')) || 'Usuario';
    this.correoUsuario = (await this.storage.get('correo')) || 'Correo';

    this.resetInputs(); // Limpia campos relacionados
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

  async generateQRCode(section: any) {
    const data = {
      section: section.name,
      subject: section.subject,
      sessionId: new Date().toISOString(), // Identificador único
    };

    try {
      const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(data));

      if (!this.qrCodes.some((qr) => qr.section === section.name)) {
        this.qrCodes.push({ section: section.name, url: qrCodeUrl });
      }

      this.selectedQRCode = qrCodeUrl; // Actualiza la imagen del QR
    } catch (err) {
      console.error('Error al generar el código QR:', err);
    }
  }

  async ngOnInit() {
    await this.storage.create();
    this.nombreUsuario = (await this.storage.get('nombre')) || 'Usuario';
  }

  // Consulta asistencia con validaciones
  consultAttendance() {
    if (!this.date.trim() || !this.section.trim()) {
      alert('Debe proporcionar una fecha y sección válidas.');
      return;
    }

    this.apiService.getAttendance(this.date, this.section).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.attendanceRecords = data;
          console.log('Asistencia:', data);
          
        } else {
          console.warn('No se encontraron registros para los parámetros ingresados.');
          alert('No se encontraron registros de asistencia.');
          
        }
      },
      (error) => {
        console.error('Error al consultar la asistencia:', error);
        alert('Hubo un error al consultar los datos.');
      }
    );
  }

  resetInputs() {
    this.selectedSection = '';
    this.selectedSubject = '';
    this.qrCodeUrl = ''; // Limpia la URL del QR
    this.date = '';
    this.section = '';
    this.attendanceRecords = [];
  }
}
