import { ProfileComponent } from './../../pages/profile/profile.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import User from 'src/app/models/User';
import Address from 'src/app/models/address';
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
  @Output() profileUpdated = new EventEmitter<User>();
  genderSelect?: string;
  genders: String[] = [
    'Masculino',
    'Feminino',
    'Prefiro não informar',
    'Outros',
  ];
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
            cep: user.address?.cep || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            neighborhood: user.address?.neighborhood || '',
            street: user.address?.state || '',
            number: user.address?.number || '',
            complement: user.address?.complement || '',
          });
        });
        this.genderSelect = this.user.gender;
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
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
    this.user.cpf = this.updateForm.value.cpf
    this.user.cnpj = this.updateForm.value.cnpj
    this.user.dateBirth = this.updateForm.value.dateBirth
    this.user.email = this.updateForm.value.email 
    this.user.telephone = this.updateForm.value.telephone 
    this.user.description = this.updateForm.value.description
    this.user.name = this.updateForm.value.name 
    this.user.roles = this.roles.filter(role => role.id === this.updateForm.value.role)
    this.user.username = this.updateForm.value.username
    const addressUser: Address = new Address();
    addressUser.cep = this.updateForm.value.cep
    addressUser.city = this.updateForm.value.city
    addressUser.complement = this.updateForm.value.complement
    addressUser.neighborhood = this.updateForm.value.neighborhood
    addressUser.street = this.updateForm.value.street
    addressUser.state = this.updateForm.value.state
    addressUser.number = this.updateForm.value.number
    addressUser.id = this.user.address?.id
    console.log(addressUser)
    this.user.address = addressUser;
    console.log(this.user)

    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          this.toastr.success("Perfil atualizado com sucesso!");
          this.dialogRef.close();
          this.profileUpdated.emit(this.user);
        },
        error: () => {
          this.toastr.error("Erro ao atualizar perfil. Por favor, tente novamente mais tarde.");
        }, complete: () => {}
      });
    } else {
      console.error("ID do usuário não encontrado.");
    }
  }

  validateUpdate(form: FormGroup): boolean {
    if (form.invalid) {
      for (const controlName in form.controls) {
        if (form.controls.hasOwnProperty(controlName)) {
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
