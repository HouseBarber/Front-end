import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/authService';
import { UserImageService } from 'src/app/services/userImageService';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.scss']
})
export class UploadProfilePicComponent {
  @Input() userImage: string = '';
  @Output() imageUploaded = new EventEmitter<string | ArrayBuffer>();
  currentUser: User | null = this.authService.getUserByToken();

  constructor(
    private authService: AuthService, 
    private userImageService: UserImageService,
    private toastr: ToastrService,
    ) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        if(this.userImage != null){
          return;
        }
        this.imageUploaded.emit(this.userImage);
      };
      this.userImageService.uploadImage(this.currentUser!.id, file).subscribe({
        next: () => {
          this.toastr.success("Foto do perfil atualizada com sucesso!");
        },
        error: () => {
          this.toastr.error("Falha ao foto do perfil.");
        }
      });
    }
  }

}
