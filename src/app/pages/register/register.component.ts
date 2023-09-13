import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isEmailValid } from 'src/app/utils/validadorEmail';
import { Role } from "../../models/role";
import { RolesService } from "../../services/rolesService";
import User from '../../models/User';
import { AuthService } from '../../services/authService';
import { isPasswordValid } from 'src/app/utils/passwordValid';
import { passwordValidator } from 'src/app/utils/validatorPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  revealedPassword: boolean = false;
  revealedConfirmPassword: boolean = false;
  registerForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private rolesService: RolesService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.initializeForms();
    this.popularRoles();
  }

  initializeForms(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      confirmPassword: ['', Validators.required],
      role: [],
    });
    this.controlForm = this.registerForm.controls;
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

    const canRegister = this.validateRegister(this.registerForm);

    if (!canRegister) {
      this.toastr.error("Existe informacoes a serem preenchidas.")
      return;
    }

    const userToRegister = new User();
    userToRegister.username = this.registerForm.value.username;
    userToRegister.name = this.registerForm.value.name;
    userToRegister.email = this.registerForm.value.email;
    userToRegister.telephone = this.registerForm.value.telephone;
    userToRegister.password = this.registerForm.value.password;
    userToRegister.roles = this.roles.filter(role => role.id === this.registerForm.value.role)
    userToRegister.cnpj = "";
    userToRegister.cpf = this.registerForm.value.cpf;
    this.authService.signUp(userToRegister).subscribe({
      next: () => {
        this.toastr.success("Usuario cadastrado com sucesso!")
        this.router.navigate(['']);
      }, error: () => {
        this.toastr.error("Erro interno, tente mais tarde.")
      }
    });
  }

  validateRegister(form: FormGroup): boolean {
    let returnError = false;
    if (form.value.username === null || form.value.username.length === 0) {
      this.toastr.error('O usuario é obrigatório')
      returnError = true;
    }
    if (form.value.name === null || form.value.name.length === 0) {
      this.toastr.error('O nome é obrigatório')
      returnError = true;
    }
    if (form.value.email === null || form.value.email.length === 0) {
      this.toastr.error('O e-mail é obrigatório')
      returnError = true;
    }
    if (!isEmailValid(form.value.email)) {
      this.toastr.error('O e-mail é inválido')
      returnError = true;
    }
    if (form.value.telephone === null || form.value.telephone.length === 0) {
      this.toastr.error('O telefone é obrigatório')
      returnError = true;
    }
    if (form.value.role === null || form.value.role.length === 0) {
      this.toastr.error('O tipo do cadastro é obrigatório')
      returnError = true;
    }
    if (form.value.password === null || form.value.password.length === 0) {
      this.toastr.error('A senha é obrigatória')
      returnError = true;
    }
    if(!isPasswordValid(form.value.password)){
      this.toastr.error('A senha precisa conter letras maiusculas e minusculas e pelo menos 8 digitos')
      returnError = true;
    }
    if (form.value.password != form.value.confirmPassword) {
      this.toastr.error('As senhas não são iguais')
      returnError = true;
    }
    return !returnError;
  }

  revealPassword(id: String) {
    if(id === 'password'){
      let inputPassword = document.getElementById('password');
      if (this.revealedPassword) {
        inputPassword!.setAttribute('type', 'password');
        this.revealedPassword = false;
      } else {
        inputPassword!.setAttribute('type', 'text');
        this.revealedPassword = true;
      }
    }

    else if(id === 'confirmPassword'){
      let inputPassword = document.getElementById('confirmPassword');
      if (this.revealedConfirmPassword) {
        inputPassword!.setAttribute('type', 'password');
        this.revealedConfirmPassword = false;
      } else {
        inputPassword!.setAttribute('type', 'text');
        this.revealedConfirmPassword = true;
      }
    }
  }

}
