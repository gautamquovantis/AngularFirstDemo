import { AuthService } from './../../../auth/services/auth.service';
import { Profile } from 'src/app/shared/Models/profile.model';
import { SharedService } from './../../../auth/services/shared.service';
import { LocalStorageService } from './../../../auth/services/localStorage.service';
import { ProfileService } from './../../../auth/services/profile.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  userId: string;
  selectedGender: String = this.genderOptions[0];
  profileForm!: FormGroup;
  profileAction: string = 'Update Your Profile!!!';
  action: string = 'Update';
  isNewProfile: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _profileService: ProfileService,
    private _localStorageService: LocalStorageService,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) {
    this.userId =
      this._localStorageService.getItemInLocalStorageWithoutJSON('UserId') ||
      '';
  }

  ngOnInit(): void {
    this.prepareProfile();

    this.profileForm = this._formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      hobby: ['', Validators.required],
    });
  }

  prepareProfile() {
    if (this.userId) {
      this._profileService.haveProfile(this.userId).subscribe({
        next: (profile: Profile) => {
          console.log(profile);
          if (profile.id !== '') {
            this.profileForm.patchValue({
              name: profile ? profile.name : '',
              gender: profile ? profile.gender : 'Male',
              age: profile ? profile.age : '',
              state: profile ? profile.state : '',
              country: profile ? profile.country : '',
              hobby: profile ? profile.hobby : '',
            });
            this.selectedGender = profile.gender;
          } else {
            this.profileAction = 'Create Your Profile!!!';
            this.action = 'Save';
            this.isNewProfile = true;
          }
        },
        error: (err) => {
          console.log(err);
          this._sharedService.openSnackBar('Error occured while processing!!');
        },
      });
    } else {
      this._router.navigate(['login']);
    }
  }

  profileActionHandler(): void {
    if (this.isNewProfile) {
      this.addProfile();
    } else {
      this.updateProfile();
    }

  }

  addProfile(): void {
    let profile = new Profile();
    profile.id = this.userId;
    profile.name = this.profileForm.controls['name'].value;
    profile.gender = this.profileForm.controls['gender'].value;
    profile.age = this.profileForm.controls['age'].value;
    profile.state = this.profileForm.controls['state'].value;
    profile.country = this.profileForm.controls['country'].value;
    profile.hobby = this.profileForm.controls['hobby'].value;

    this._profileService.addProfile(profile).subscribe({
      next: (res) => {
        this._sharedService.openSnackBar('Profile added Successfully !!');
        this.prepareProfile();
      },
      error: (err) => {
        this._sharedService.openSnackBar('Error occured while processing!!');
      },
    });
  }

  updateProfile(): void {
    this._profileService
      .updateProfile(this.userId, this.profileForm.value)
      .subscribe({
        next: (res) => {
          this._sharedService.openSnackBar('Profile Updated Successfully !!');
          this.prepareProfile();
        },
        error: (err) => {
          this._sharedService.openSnackBar('Error occured while processing!!');
        },
      });
  }

  async deleteProfile(): Promise<void> {
    this._profileService.deleteProfile(this.userId).subscribe({
      next: (res) => {
        //To Do: needs to fixed
        // this._authService.deleteUserAsync(this.userId);
        this._sharedService.openSnackBar('Profile deleted Successfully !!');
        this.profileForm.reset();
        this._router.navigate(['Login']);
      },
      error: (err) => {
        this._sharedService.openSnackBar('Error occured while processing!!');
      },
    });
  }

  redirectToFindFriend() {
    this._router.navigate(['home/dashboared/find-friends']);
  }
}
