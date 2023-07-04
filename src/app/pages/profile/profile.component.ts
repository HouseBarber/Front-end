import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Address from 'src/app/models/Address';
import User from 'src/app/models/User';
import { Role } from 'src/app/models/role';
import { RolesService } from 'src/app/services/rolesService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];
  selectedValue: string = '1';
  changeValue(newValue: string): void {
    this.selectedValue = newValue;
  }

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
    const user = new User();
    user.username = this.updateForm.value.username;
    user.name = this.updateForm.value.name;
    user.email = this.updateForm.value.email;
    user.telephone = this.updateForm.value.telephone;
    user.password = this.updateForm.value.password;
    user.roles = this.roles.filter(role => role.id === this.updateForm.value.role)
    user.cnpj = "";
    user.cpf = this.updateForm.value.cpf;
    user.dateBirth = this.updateForm.value.dateBirth;
    user.gender = this.updateForm.value.gender;
    user.description = this.updateForm.value.description;
    console.log("User:", user);
    const address = new Address();
    address.cep = this.updateForm.value.cep;
    address.city = this.updateForm.value.city;
    address.state = this.updateForm.value.state;
    address.neighborhood = this.updateForm.value.neighborhood;
    address.street = this.updateForm.value.street;
    address.complement = this.updateForm.value.complement;
    address.number = this.updateForm.value.number;
    console.log("Address:", address);
  }
}
