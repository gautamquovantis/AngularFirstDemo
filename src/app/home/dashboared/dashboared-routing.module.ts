import { MyFriendsComponent } from './my-friends/my-friends.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'find-friends',
    component: FindFriendsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'my-friends',
    component: MyFriendsComponent,
  },
  {
    path:'',
    redirectTo: 'find-friends',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboaredRoutingModule {}
