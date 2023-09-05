import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadUserProfile();
    this.loadUserImage();
  }

  checkAuthentication(): void {
    if (!this.authService.checkIsAuthenticated()) {
      this.toastr.error("Autenticação falhou");
      return;
    }
    this.currentUser = this.authService.getUserByToken();
  }

  loadUserProfile(): void {
    if (!this.currentUser) {
      this.toastr.error("Falha ao buscar usuario");
      return;
    }
    this.userService.getUserById(this.currentUser.id).subscribe({
      next: user => {
        this.user = user;
      },
      error: () => {
        this.toastr.error("Falha ao buscar usuario");
      }
    })
  }

  loadUserImage(): void {
    if (!this.currentUser) {
      this.toastr.error("Usuario não encontrado");
      return;
    }
    this.userImageService.getImage(this.currentUser.id).subscribe({
      next: (image) => {
        this.userImage = image;
        this.getUserImageUrl();
      },
      error: () => {
        this.toastr.error("Falha ao buscar foto de perfil.");
      }
    })
  }

  getUserImageUrl(): void {
    if (this.userImage) {
      const blob = new Blob([this.userImage], { type: 'image/jpeg' });
      this.profileImageUrl = URL.createObjectURL(blob);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, { restoreFocus: false });
    dialogRef.componentInstance.profileUpdated.subscribe((updatedUser: User) => {
      this.user = updatedUser;
    });
  }

}
