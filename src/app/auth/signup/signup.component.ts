import { SharedService } from './../services/shared.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router :Router,
    private _sharedService:SharedService

  ) {}

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signup() {
    this._authService.signupUser(this.signupForm.value).subscribe({
      next: (res) => {
        this._sharedService.openSnackBar('User Registered successfully');
        this.signupForm.reset();
        this._router.navigate(["login"]);
      },
      error: (error) => {
        this._sharedService.openSnackBar('Error occured while processing');
        this.signupForm.reset();
      },
    });
  }
}
