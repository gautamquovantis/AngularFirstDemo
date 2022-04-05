import { SharedService } from './../../auth/services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/auth/services/localStorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _localStorageService: LocalStorageService,
    private _sharedService : SharedService
  ) {}

  ngOnInit(): void {}

  logout(): void {

    this._localStorageService.resetLocalStorage();
    this._sharedService.openSnackBar('Logout Successfully!!');
    this._router.navigate(['login']);
  }

  redirectToFindFriend() {
    this._router.navigate(['home/dashboared/find-friends']);
  }

  redirectToProfile() {
    this._router.navigate(['home/dashboared/profile']);
  }

  redirectToMyFriends() {
    this._router.navigate(['home/dashboared/my-friends']);
  }

}
