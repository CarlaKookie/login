import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestauracionPageRoutingModule } from './restauracion-routing.module';

import { RestauracionPage } from './restauracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauracionPageRoutingModule
  ],
  declarations: [RestauracionPage]
})
export class RestauracionPageModule {}
