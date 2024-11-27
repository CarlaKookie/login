import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Ruta base del backend

  constructor(private http: HttpClient) {}

  // Método para obtener la asistencia
  getAttendance(date: string, section: string): Observable<any> {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Formato de la fecha
    const params = new HttpParams().set('date', formattedDate).set('section', section);

    return this.http.get(`${this.baseUrl}/get-attendance`, { params }); // Endpoint específico
  }

  // Método para marcar la asistencia
  markAttendance(attendanceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-attendance`, attendanceData); // Endpoint ajustado
  }

  // Método para generar el QR
  generateQRCode(data: any): Observable<any> {
    const params = new HttpParams().set('sessionId', data.sessionId).set('subject', data.subject);
    return this.http.get(`${this.baseUrl}/generate-qrcode`, { params, responseType: 'text' }); // Endpoint para generar QR
  }
}