import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  contrasena: string = '';
  recuerdame: boolean = true;

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {}

  changeStatus(value: boolean) {
    this.recuerdame = value;
  }

  async navigateToInicio() {
    if (!this.nombreUsuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su nombre de usuario y/o contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
  
      if (this.authService.login(this.nombreUsuario, this.contrasena)) {
        //aprovechamos de usar state para llevar la informacion al dashboard.
        this.router.navigate(['/inicio'], { state: { username: this.nombreUsuario } });
        } else {
        alert('Nombre de usuario o contraseña incorrectos');
        }
      }
    }
  navigateToRestauracion() {
    this.router.navigate(['/restauracion']);
  }}
