import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder, FormGroup y Validators

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup; // Añadir FormGroup
  recuerdame: boolean = true;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private storage: Storage,
    private fb: FormBuilder // Inyectar FormBuilder
  ) {
    this.initStorage();
    this.loginForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  changeStatus(value: boolean) {
    this.recuerdame = value;
  }

  async initStorage() {
    await this.storage.create(); // Inicializamos el storage antes de usarlo
  }

  ionViewWillEnter() {
    // Limpiar los campos de entrada cada vez que se accede a la página
    this.loginForm.reset();

    if (!this.authService.isLoggedIn()) {
      this.storage.remove('nombre'); // Eliminar nombre del storage al cerrar sesión
      this.storage.remove('correo'); // Eliminar correo del storage al cerrar sesión
    }
  }

  async navigateToInicio() {
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su nombre de usuario y/o contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const { nombreUsuario, contrasena } = this.loginForm.value;
      const user = this.authService.login(nombreUsuario, contrasena);
      if (user) {
        // Guardar el nombre de usuario y correo en el storage
        await this.storage.set('nombre', user.nombre);
        await this.storage.set('correo', user.correo);
        console.log('Nombre guardado:', user.nombre); // Ver nombre

        // Redirigir según el tipo de usuario
        if (user.tipo === 'profesor') {
          this.router.navigate(['/profesor']);
        } else {
          this.router.navigate(['/inicio']);
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Nombre de usuario o contraseña incorrectos',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  navigateToRestauracion() {
    this.router.navigate(['/restauracion']);
  }
}
