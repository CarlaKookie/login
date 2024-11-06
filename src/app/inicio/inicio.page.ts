import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../candeactivate.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, CanComponentDeactivate {
  nombreUsuario: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.nombreUsuario = state?.['username'] || 'Usuario';
    }

  canDeactivate(): boolean {
    return confirm('¿Estás seguro que deseas cerrar sesión?');
    }    
    

    logout() {
      if (this.canDeactivate()) {
      this.authService.logout(); // Cerrar sesión
      this.router.navigate(['/home']);
      console.log("Sesion cerrada")
      }
    }
  }
