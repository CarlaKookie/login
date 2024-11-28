import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false; // Simula si el usuario está autenticado
  private currentUser: string | null = null; // Almacena el nombre del usuario autenticado

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
      this.currentUser = username; // Guardar el nombre del usuario autenticado
      return { nombre: username, tipo: user.tipo, correo: user.correo }; // Devuelve el usuario con sus detalles
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserEmail(): string | null {
    if (this.currentUser) {
      return this.validUsers[this.currentUser].correo;
    }
    return null;
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null; // Limpiar el nombre del usuario autenticado
  }
}
