import { SharedModule } from './../shared/shared.module';
import { MenuModule } from './menu/menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MenuModule
  ],
  exports:[
   SharedModule
  ]
})
export class HomeModule { }
