import { MaterialModule } from './../../shared/material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './../home.module';
import { MenuModule } from './../menu/menu.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboaredRoutingModule } from './dashboared-routing.module';
import { DashboaredComponent } from './dashboared.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { ProfileComponent } from './profile/profile.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';


@NgModule({
  declarations: [
    DashboaredComponent,
    FindFriendsComponent,
    ProfileComponent,
    MyFriendsComponent
  ],
  imports: [
    CommonModule,
    DashboaredRoutingModule,
    MenuModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ] ,
  exports:[
    SharedModule
  ]
})
export class DashboaredModule { }
