import { Component } from '@angular/core';
import * as QRCode from 'qrcode'; // Importa la librería de QRCode

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  qrCodeData: string = ''; // Variable para almacenar el QR generado

  constructor() {}

  // Función que genera el QR cuando se hace clic en el botón
  generateQRCode() {
    const data = 'Asistencia:Clase1:Profesor'; // Esta es la cadena que vas a codificar en el QR
    QRCode.toDataURL(data) // Usamos QRCode para generar el URL del QR
      .then((url) => {
        this.qrCodeData = url; // Guardamos la URL generada
        console.log(this.qrCodeData); // Muestra el QR como una URL en consola
      })
      .catch((err) => {
        console.error('Error generando el QR', err);
      });
  }
}
