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
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadUserProfile();
    this.loadUserImage();
  }

  checkAuthentication() {
    if (!this.authService.checkIsAuthenticated()) {
      throw new Error("Autenticação falhou.");
    }
    this.currentUser = this.authService.getUserByToken();
  }

  loadUserProfile() {
    if (!this.currentUser) {
      throw new Error("Usuário atual não encontrado.");
    }
    this.userService.getUserById(this.currentUser.id).subscribe((user) => {
      this.user = user;
    });
  }

  loadUserImage() {
    if (!this.currentUser) {
      throw new Error("Usuário atual não encontrado.");
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

  getUserImageUrl() {
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
