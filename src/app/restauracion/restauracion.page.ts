import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restauracion',
  templateUrl: './restauracion.page.html',
  styleUrls: ['./restauracion.page.scss'],
})
export class RestauracionPage implements OnInit {
  nombreUsuario: string = '';
  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  async onSubmit() {
    if (this.nombreUsuario) {
      
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `Se ha enviado un enlace para recuperar la contraseña a la dirección asociada con el usuario ${this.nombreUsuario}.`,
        buttons: ['OK'],
      });
  
      await alert.present();
  
    
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, introduce un nombre de usuario.',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}