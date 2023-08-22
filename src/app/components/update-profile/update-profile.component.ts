import { ProfileComponent } from './../../pages/profile/profile.component';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
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
  optionSelect: string = "";
  options: string[] = ['CPF', 'CNPJ'];

  updateForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];
  currentUser: User | null = null;

  ngOnInit(): void {
    this.initializeForms();
    this.popularRoles();
    if (this.authService.checkIsAuthenticated()) {
      this.currentUser = this.authService.getUserByToken();
      if (this.currentUser) {
        this.userService.getUserById(this.currentUser.id!).subscribe((user) => {
          console.log('User Details:', user);
          this.updateForm.patchValue({
            username: user.username,
            name: user.name,
            cpf: user.cpf,
            cnpj: user.cnpj,
            email: user.email,
            telephone: user.telephone,
            gender: user.gender,
            dateBirth: user.dateBirth,
            description: user.description,
            roles: user.roles,
            cep: user.address?.cep,
            city: user.address?.city,
            state: user.address?.state,
            street: user.address?.street,
            number: user.address?.number,
            complement: user.address?.complement,
            aboutYou: user.description
          });
        });
        if(this.currentUser.cnpj){
          this.optionSelect = "CNPJ";
        } else {
          this.optionSelect = "CPF";
        }
        console.log(this.optionSelect)
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private rolesService: RolesService,
    private authService: AuthService,
    private userService: UserService
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
      cep: [''],
      city: [''],
      state: [''],
      neighborhood: [''],
      street: [''],
      number: [''],
      complement: [''],
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
    if (this.currentUser) {
      const updatedUser: User = { ...this.currentUser, ...this.updateForm.value };
      this.userService.updateUser(this.currentUser.id!, updatedUser).subscribe(
        (response) => {
          console.log('User updated:', response);
          console.log(updatedUser)
          this.router.navigateByUrl('/home')
          // Você pode fazer mais ações aqui, como mostrar uma mensagem de sucesso.
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

}
