import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3001/api'; // Ruta base del backend

  constructor(private http: HttpClient) {}

  // Método para obtener la asistencia
  getAttendance(date: string, section: string): Observable<any> {
    // Convertir la fecha al formato 'YYYY-MM-DD' (sin la parte de la hora)
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Formato de la fecha solo con 'YYYY-MM-DD'
    const params = new HttpParams()
      .set('date', formattedDate)  // Añadir la fecha al parámetro
      .set('section', section);    // Añadir la sección al parámetro

    return this.http.get(`${this.baseUrl}/get-attendance`, { params }); // Enviar la solicitud GET al backend
  }

  // Método para marcar la asistencia
  markAttendance(attendanceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-attendance`, attendanceData); // Endpoint para marcar la asistencia
  }

  // Método para generar el código QR
  generateQRCode(data: any): Observable<any> {
    const params = new HttpParams()
      .set('sessionId', data.sessionId)
      .set('subject', data.subject);

    return this.http.get(`${this.baseUrl}/generate-qrcode`, { params, responseType: 'text' }); // Generar código QR con parámetros
  }
}
