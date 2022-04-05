import { SharedModule } from './../../shared/shared.module';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }
