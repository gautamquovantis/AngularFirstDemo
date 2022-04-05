import { LocalStorageService } from 'src/app/auth/services/localStorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _localStorageService: LocalStorageService, private _router: Router) {}

  canActivate(): boolean {
    if (this._localStorageService.getItemInLocalStorageWithoutJSON("UserId") !== ''
    && this._localStorageService.getItemInLocalStorageWithoutJSON("") !== '') {
      return true;
    } else {
      this._router.navigate(['/auth/login']);
      return false;
  }
}
}
