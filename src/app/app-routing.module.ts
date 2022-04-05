
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.gurard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
