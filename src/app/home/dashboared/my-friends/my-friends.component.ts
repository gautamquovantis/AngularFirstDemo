import { FriendsService } from './../../../auth/services/friends.service';
import { SharedService } from './../../../auth/services/shared.service';
import { Profile } from './../../../shared/Models/profile.model';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/auth/services/localStorage.service';
import { Friends } from 'src/app/shared/Models/friends.model';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
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
    private _friendService: FriendsService,
    private _snackBar: MatSnackBar,
    private _sharedService: SharedService,
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
    this.getFriendList();
  }

  getFriendList() {
    this._friendService.haveFriends(this.userId).subscribe({
      next: (res: Friends) => {
        if (res.id !== '') {
          this.friendList = res.friends;
          this.dataSource.data = res.friends;
        }
      },
      error: (error) => {
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  updateFriendList(friendId: string) {
    this._friendService.getFriends(this.userId).subscribe({
      next: (res) => {
        const index: number = this.friendList.findIndex(
          (x) => x.id === friendId
        );
        if (index !== -1) {
          this.friendList.splice(index, 1);
          this.deleteFriend();
        }
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }

  deleteFriend() {
    let friend = new Friends();
    friend.id = this.userId.toString();
    friend.friends = this.friendList;

    this._friendService.updateFriends(friend).subscribe({
      next: (res) => {
        this.getFriendList();
        this._sharedService.openSnackBar('Friend deleted Successfully');
      },
      error: (err) => {
        console.log(err);
        this._sharedService.openSnackBar('Error occured while processing');
      },
    });
  }
}
