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
    { id: 'B', name: '007D', subject: 'Programación de aplicaciones móviles' },
    { id: 'C', name: '004D', subject: 'Programación de base de datos' },
    { id: 'D', name: '005D', subject: 'Programación de base de datos' },
  ];

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}


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
    this.qrCodeUrl = ''; // Limpiar el código QR
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

      // Solo se añade si no existe un QR con esta sección
      if (!this.qrCodes.some(qr => qr.section === section.name)) {
        this.qrCodes.push({ section: section.name, url: qrCodeUrl });
      }

      this.selectedQRCode = qrCodeUrl; // Actualiza la imagen del QR
    } catch (err) {
      console.error('Error al generar el código QR:', err);
    }
  }

  generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15); 
  }

  async ngOnInit() {
    await this.storage.create();
    this.obtenerNombre();

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.nombreUsuario = navigation.extras.state['nombre_usuario'] || 'profesor';
    } else {
      this.nombreUsuario = this.nombreUsuario || 'profesor';
    }
  }

  async obtenerNombre() {
    this.nombreUsuario = await this.storage.get('nombre');
    console.log('Nombre almacenado:', this.nombreUsuario);
  }

  consultAttendance() {
    if (!this.date || !this.section) {
      alert('Debe proporcionar una fecha y sección válidas.');
      return;
    }
  
    this.apiService.getAttendance(this.date, this.section).subscribe(
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
