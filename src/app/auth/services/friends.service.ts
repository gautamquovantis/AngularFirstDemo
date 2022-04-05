import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from 'src/app/shared/Models/profile.model';
import { LocalStorageService } from './localStorage.service';
import { Friends } from 'src/app/shared/Models/friends.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  public baseFriendServiceURL = 'http://localhost:3000/friends';
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService
  ) {}

  public haveFriends(id: string): Observable<Friends> {
    return this.http.get<Friends[]>(this.baseFriendServiceURL).pipe(
      map((friends:Friends[])=>{
        const matchedFriend = friends.filter(x=>x.id === id)[0];
        if(matchedFriend)
        {
          return matchedFriend;
        }
        else{
          return new Friends();
        }
      })
    )
  }

  public getFriends(id: string): Observable<Friends> {
    return this.http.get<Friends>(`${this.baseFriendServiceURL}/${id}`);
  }

  public updateFriends(friends: Friends): Observable<Friends> {
    return this.http.put<Friends>(
      `${this.baseFriendServiceURL}/${friends.id}`,
      friends
    );
  }

  public createFriends(friends: Friends): Observable<Friends> {
    return this.http.post<Friends>(
      `${this.baseFriendServiceURL}`,
      friends
    );
  }
}

