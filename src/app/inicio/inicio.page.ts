import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { CanComponentDeactivate } from '../candeactivate.guard';
import { AuthService } from '../auth.service';
=======
>>>>>>> e1da53ff74fcec491a69ab4f2ac5ad8c9e041a50

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, CanComponentDeactivate {
  nombreUsuario: string = '';

<<<<<<< HEAD
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.nombreUsuario = state?.['username'] || 'Usuario';
    }
=======
  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.nombreUsuario = navigation.extras.state['nombre_usuario'] || '';  
    }
  }
>>>>>>> e1da53ff74fcec491a69ab4f2ac5ad8c9e041a50

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
<<<<<<< HEAD
=======
}
>>>>>>> e1da53ff74fcec491a69ab4f2ac5ad8c9e041a50
