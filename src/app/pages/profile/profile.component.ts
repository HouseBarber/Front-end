import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/authService';
import { UserImageService } from 'src/app/services/userImageService';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  opened: boolean = false;
  currentRoute: string = '';
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  currentUser: User | null = null;
  user: User = new User();
  userImage: Blob | null = null;
  profileImageUrl: string | undefined;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private userImageService: UserImageService,
  ) {}

  ngOnInit(): void {
    if (this.authService.checkIsAuthenticated()) {
      this.currentUser = this.authService.getUserByToken();
      if (this.currentUser) {
        this.userService.getUserById(this.currentUser.id!).subscribe((user) => {
          console.log('User Details:', user);
          this.user = user;
          this.userImageService.getImage(user.id!).subscribe((image) => {
            this.userImage = image;
            this.getUserImageUrl();
          });
        });
      }
    }
  }

  getUserImageUrl(): void {
    if (this.userImage) {
      const blob = new Blob([this.userImage], { type: 'image/jpeg' });
      this.profileImageUrl = URL.createObjectURL(blob);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateProfileComponent, { restoreFocus: false });
    dialogRef.componentInstance.profileUpdated.subscribe((updatedUser: User) => {
      this.user = updatedUser;
    });
  }
}
