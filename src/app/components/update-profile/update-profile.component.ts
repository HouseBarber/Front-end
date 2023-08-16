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
            city: user.address?.cidade,
            state: user.address?.estado,
            street: user.address?.rua,
            number: user.address?.numero,
            complement: user.address?.complemento,
            aboutYou: user.description
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
      specialties: [''],
      aboutYou: ['']
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

  onSubmit(){
    console.log(this.updateForm.value);
  }
  
}
