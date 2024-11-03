import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from './canactivate.guard';
import { CanmatchGuard } from './canmatch.guard';
import { CanDeactivateGuard } from './candeactivate.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'restauracion',
    loadChildren: () => import('./restauracion/restauracion.module').then(m => m.RestauracionPageModule)
  },

  {
  path: 'inicio',
  loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
  canActivate: [canActivate],
  canMatch: [CanmatchGuard],
  canDeactivate: [CanDeactivateGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }