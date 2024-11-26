import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false; // Simula si el usuario está autenticado

  // Almacenar credenciales, tipo de usuario y correo
  private validUsers: { [key: string]: { password: string, tipo: string, correo: string } } = {
    'carla': { password: '1234', tipo: 'alumno', correo: 'carla@ejemplo.com' },
    'ignacio': { password: '1234', tipo: 'alumno', correo: 'ignacio@ejemplo.com' },
    'profesor1': { password: '1234', tipo: 'profesor', correo: 'profesor1@ejemplo.com' },
    'profesor2': { password: '1234', tipo: 'profesor', correo: 'profesor2@ejemplo.com' },
  };

  login(username: string, password: string) {
    // Validar las credenciales
    const user = this.validUsers[username];
    if (user && user.password === password) {
      this.isAuthenticated = true;
      return { nombre: username, tipo: user.tipo, correo: user.correo }; // Devuelve el usuario con sus detalles
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
