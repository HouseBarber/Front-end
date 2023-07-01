import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { RolesService } from 'src/app/services/rolesService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;
  addressForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private rolesService: RolesService,
  ) {

  }

  ngOnInit(): void {
    this.initializeForms();
    this.popularRoles();
  }

  initializeForms(): void {
    this.updateForm = this.formBuilder.group({
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      role: [''],
      gender:[''],
      dateBirth: [''],
      description: [''],
      cep: [''],
      city: [''],
      state: [''],
      neighborhood: [''],
      street: [''],
      number: [''],
      complement: [''],
    }),
  this.controlForm = this.updateForm.controls;
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

  onSubmit(){
    console.log("Enviou o form")
  }
}
