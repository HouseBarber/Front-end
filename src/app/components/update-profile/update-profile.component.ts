import { ProfileComponent } from './../../pages/profile/profile.component';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import User from 'src/app/models/User';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/authService';
import { RolesService } from 'src/app/services/rolesService'
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  updateForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];
  currentUser: User | null = null;
  user: User = new User();

  ngOnInit(): void {
    this.initializeForms();
    this.popularRoles();
    if (this.authService.checkIsAuthenticated()) {
      this.currentUser = this.authService.getUserByToken();
      if (this.currentUser) {
        this.userService.getUserById(this.currentUser.id!).subscribe((user) => {
          this.user = user;
          console.log('User Details:', this.user);
          this.updateForm.patchValue({
            username: user.username || '',
            name: user.name || '',
            cpf: user.cpf || '',
            cnpj: user.cnpj || '',
            email: user.email || '',
            telephone: user.telephone || '',
            gender: user.gender || '',
            dateBirth: user.dateBirth || '',
            description: user.description || '',
            roles: user.roles || '',
          });
        });
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private rolesService: RolesService,
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>
  ){}

  initializeForms(): void {
    this.updateForm = this.formBuilder.group({
      username: [''],
      name: [''],
      cpf: [''],
      cnpj: [''],
      email: [''],
      telephone: [''],
      gender: [''],
      dateBirth: [''],
      description: [''],
      roles: [''],

    });
    this.controlForm = this.updateForm.controls;
  }

  popularRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.roles = response;
        }
      },
      error: () => {
        this.toastr.error("Erro ao buscar roles");
      }
    });
  }

  onSubmit() {
    const canUpdate = this.validateUpdate(this.updateForm);

    if (!canUpdate) {
      this.toastr.error("Existem informações a serem preenchidas.");
      return;
    }

    const updatedUser = { ...this.user, ...this.updateForm.value };
    if (this.user.id) { // Certifique-se de que this.user.id não seja nulo
      this.userService.updateUser(this.user.id, updatedUser).subscribe(
        () => {
          this.toastr.success("Perfil atualizado com sucesso!");
          this.router.navigateByUrl('/profile');
          this.dialogRef.close();
        },
        () => {
          this.toastr.error("Erro ao atualizar perfil. Por favor, tente novamente mais tarde.");
        }
      );
    } else {
      console.error("ID do usuário não encontrado.");
    }
  }

  validateUpdate(form: FormGroup): boolean {
    if (form.invalid) {
      // Percorra os controles do formulário
      for (const controlName in form.controls) {
        if (form.controls.hasOwnProperty(controlName)) {
          // Se o controle estiver inválido, adicione a classe CSS
          if (form.controls[controlName].invalid) {
            form.controls[controlName].markAsTouched();
            form.controls[controlName].setErrors({ 'invalid': true });
          }
        }
      }
      return false;
    }
    return true;
  }

}
