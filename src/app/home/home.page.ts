import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  contrasena: string = '';
  recuerdame: boolean = true;

  constructor(private router: Router, private alertController: AlertController) {}

  changeStatus(value: boolean) {
    this.recuerdame = value;
  }

  async navigateToInicio() {
    if (!this.nombreUsuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su nombre de usuario y/o contraseña, no sea imbécil.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
  
      this.router.navigate(['/inicio'], {
        state: { nombre_usuario: this.nombreUsuario } 
      });
    }
  }
  navigateToRestauracion() {
    this.router.navigate(['/restauracion']);
  }
}