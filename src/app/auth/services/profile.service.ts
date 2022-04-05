import { AuthService } from './auth.service';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable } from 'rxjs';
import { Profile } from 'src/app/shared/Models/profile.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public baseProfileServiceURL = 'http://localhost:3000/profile';
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _authService : AuthService
  ) { }

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseProfileServiceURL);
  }

  public haveProfile(id:string): Observable<Profile> {
    return this.http.get<Profile[]>(this.baseProfileServiceURL).pipe(
      map((profiles:Profile[])=>{
        const matchedProfile = profiles.filter(
          (x) => x.id ===id
        )[0];
       if(matchedProfile)
       {
         return matchedProfile
       }
       else{
         return new Profile();
       }
      })
    )
  }

  public getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseProfileServiceURL}/${id}`);
  }
  public addProfile(profile:Profile): Observable<Profile> {
    return this.http.post<Profile>(this.baseProfileServiceURL,profile);
  }

  public updateProfile(id: string, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseProfileServiceURL}/${id}`, profile);
  }
  public deleteProfile(id: string): Observable<Profile> {
    return this.http.delete<Profile>(`${this.baseProfileServiceURL}/${id}`);
  }



  public deleteProfileWithUser(id: string): void {
   //TO DO:

  }


}
