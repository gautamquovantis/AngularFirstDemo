
import { LocalStorageService } from './../../../auth/services/localStorage.service';
import { FriendsService } from './../../../auth/services/friends.service';
import { SharedService } from './../../../auth/services/shared.service';
import { ProfileService } from './../../../auth/services/profile.service';
import { Profile } from './../../../shared/Models/profile.model';


import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Friends } from 'src/app/shared/Models/friends.model';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css'],
})
export class FindFriendsComponent implements OnInit, AfterViewInit {
  userId: string;
  friendList: Profile[] = [];
  displayedColumns: string[] = [
    'name',
    'gender',
    'age',
    'state',
    'country',
    'hobby',
    'Action',
  ];
  dataSource: MatTableDataSource<Profile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _profileService: ProfileService,
    private _sharedService: SharedService,
    private _friendService: FriendsService,
    private _localStorageService: LocalStorageService
  ) {
    this.dataSource = new MatTableDataSource<Profile>();
    this.userId =
      this._localStorageService.getItemInLocalStorageWithoutJSON('UserId') ||
      '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this._profileService.getProfiles().subscribe({
      next: (res: Profile[]) => {
        this.dataSource.data = res;
      },
      error: (error) => {
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  getFriendProfile(id: string) {
    this._profileService.getProfile(id).subscribe({
      next: (res) => {
        this.updateFriendList(res);
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  updateFriendList(newFriend: Profile) {
    this._friendService.haveFriends(this.userId).subscribe({
      next: (res) => {
        let friend = new Friends();
        friend.id = this.userId.toString();

        if (res.id === '') {
          this.friendList.push(newFriend);
          friend.friends = this.friendList;
          this.createFriend(friend);
        } else {
          this.friendList = res.friends;
          let isPresent = this.friendList.some((el) => {
            return el.id === newFriend.id || newFriend.id === this.userId;
          });
          if (!isPresent) {
            this.friendList.push(newFriend);
            friend.friends = this.friendList;
            this.addFriend(friend);
          } else {
            this._sharedService.openSnackBar('Already a friend!!');
          }
        }
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  addFriend(friend: Friends) {
    this._friendService.updateFriends(friend).subscribe({
      next: (res) => {
        this._sharedService.openSnackBar('Friend Added Successfully');
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  createFriend(friend: Friends) {
    this._friendService.createFriends(friend).subscribe({
      next: (res) => {
        this._sharedService.openSnackBar('Friend Added Successfully');
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }
}
