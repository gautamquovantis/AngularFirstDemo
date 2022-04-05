import { SharedService } from './../services/shared.service';
import { User } from 'src/app/shared/Models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _sharedService: SharedService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this._authService.loginUser(this.loginForm.value).subscribe({
      next: (res: User | null) => {
        if (res) {
          const FullName =
            this._localStorageService.getItemInLocalStorageWithoutJSON(
              'FullName'
            );
          this._sharedService.openSnackBar('Welcome ' + FullName + '!!!');
          this.loginForm.reset();
          this._router.navigate(['home']);
        } else {
          this._sharedService.openSnackBar('User Not Found');
        }
      },
      error: (error: any) => {
        this._sharedService.openSnackBar('Error occured while processing');
        console.log(error);
      },
    });
  }
}
