import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false; // Simula si el usuario está autenticado

  // Almacenar credenciales 
  private validCredentials: { [key: string]: string } = {
    'carla': '1234',
    'ignacio': '1234'
  };

  login(username: string, password: string): boolean {
    // Validar las credenciales
    if (this.validCredentials[username] && this.validCredentials[username] === password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
