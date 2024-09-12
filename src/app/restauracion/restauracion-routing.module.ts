import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauracionPage } from './restauracion.page';

const routes: Routes = [
  {
    path: '',
    component: RestauracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestauracionPageRoutingModule {}
