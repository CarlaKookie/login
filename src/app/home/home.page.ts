import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  contrasena: string = '';
  recuerdame: boolean = true;

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService, private storage: Storage) {
    this.initStorage();
  }

  changeStatus(value: boolean) {
    this.recuerdame = value;
  }

  async initStorage() {
    await this.storage.create(); // Inicializamos el storage antes de usarlo
  }


  ionViewWillEnter() {
    // Limpiar los campos de entrada cada vez que se accede a la página
    this.nombreUsuario = '';
    this.contrasena = '';
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
        // guardamos el nombre de usuario en el storage
        await this.storage.set('nombre', this.nombreUsuario);
        console.log('Nombre guardado:', this.nombreUsuario);  // Ver nombre
        this.router.navigate(['/inicio']);
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  }

  navigateToRestauracion() {
    this.router.navigate(['/restauracion']);
  }
}
