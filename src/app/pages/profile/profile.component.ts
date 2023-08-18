import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/authService';
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
  user: User | null = null;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserByToken();
    console.log(this.currentUser);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {
      this.menuTrigger!.focus()
    });
  }
}
