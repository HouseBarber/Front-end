import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/authService';
import { RolesService } from 'src/app/services/rolesService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  profileForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private rolesService: RolesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.popularRoles();
  }

  initializeForms(): void {
    this.profileForm = this.formBuilder.group({
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
    this.controlForm = this.profileForm.controls;
  }

  popularRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response.object;
      },
      error: () => {
        this.toastr.error("Erro ao buscar roles");
      }
    });
  }


  onSubmit() {

  }
  
}
