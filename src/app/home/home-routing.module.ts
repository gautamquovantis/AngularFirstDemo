

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboared',
    loadChildren: () => import('./dashboared/dashboared.module').then(mod => mod.DashboaredModule),
  },
  {
    path: '',
    loadChildren: () => import('./dashboared/dashboared.module').then(mod => mod.DashboaredModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
