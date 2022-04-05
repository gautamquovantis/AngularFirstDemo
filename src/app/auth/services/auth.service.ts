import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/Models/user.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseAuthServiceURL = 'http://localhost:3000/signupUsers';

  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  public signupUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseAuthServiceURL, user);
  }

  public loginUser(user: User): Observable<User | null> {
    return this.http.get<User[]>(this.baseAuthServiceURL).pipe(
      map((items: User[]) => {
        const matchedUser = items.filter(
          (x) => x.email === user.email && x.password === user.password
        )[0];
        this.saveAuthTokens(matchedUser);
        return matchedUser;
      })
    );
  }

  private async saveAuthTokens(user: User): Promise<void> {
    localStorage.setItem('FullName', user.fullName);
    localStorage.setItem('UserId', user.id);
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseAuthServiceURL}/${id}`);
  }

  // public async deleteUserAsync(id: string): Promise<Boolean> {
  //   return new Promise<boolean>((resolve,reject)=>{
  //      this.deleteUser(id).subscribe({
  //        next:(res)=>{resolve(true)},
  //        error:(err)=>{reject(false)}
  //      })
  //   })

    // return this.deleteUser(id).subscribe({
    //   next: (res) => {},
    //   error: (err) => {},
    // });
  }

