import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  recuerdame: boolean = true;

  constructor(private router: Router) {}

  changeStatus(value: boolean) {
    this.recuerdame = value;
  }

  navigateToInicio() {
    this.router.navigate(['/inicio', { nombre: this.nombreUsuario }]);
  }

  navigateToRestauracion() {
    this.router.navigate(['/restauracion']);
  }
}