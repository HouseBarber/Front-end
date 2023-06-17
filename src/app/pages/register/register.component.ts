import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isEmailValid } from 'src/app/utils/validadorEmail';
import { Role } from "../../models/role";
import { RolesService } from "../../services/rolesService";
import User from '../../models/User';
import { AuthService } from '../../services/authService';

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
      cpf: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: [],
    }, {
      validator: this.passwordMatchValidator
    });
    this.controlForm = this.registerForm.controls;
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

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    return password === confirmPassword ? null : {'passwordMismatch': true};
  }

  onSubmit() {

    const canRegister = this.validateRegister(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.telephone,
      this.registerForm.value.role,
      this.registerForm.value.password,
      this.registerForm.value.confirmPassword
    );

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

  validateRegister(username: string, email: string, telephone: string,
                   role: string, password: string, confirmPassword: string): boolean | null {
    let returnError = false;
    if (username === null || username.length === 0) {
      this.toastr.error('O username é obrigatório')
      returnError = true;
    }
    if (email === null || email.length === 0) {
      this.toastr.error('O e-mail é obrigatório')
      returnError = true;
    }
    if (!isEmailValid(email)) {
      this.toastr.error('O e-mail é inválido')
      returnError = true;
    }
    if (telephone === null || telephone.length === 0) {
      this.toastr.error('O telefone é obrigatório')
      returnError = true;
    }
    if (role === null || role.length === 0) {
      this.toastr.error('O tipo do cadastro é obrigatório')
      returnError = true;
    }
    if (password === null || password.length === 0) {
      this.toastr.error('A senha é obrigatória')
      returnError = true;
    }
    if (password.length && password.length <= 5) {
      this.toastr.error('A senha precisa ter pelo menos 5 digitos')
      returnError = true;
    }
    if (password.length && password.length > 100) {
      this.toastr.error('A senha pode ter no máximo 100 caracteres')
      returnError = true;
    }
    if (password != confirmPassword) {
      this.toastr.error('As senhas não são iguais')
      returnError = true;
    }
    return !returnError;
  }

  revealPassword() {
    let inputPassword = document.getElementById('password');
    if (this.revealedPassword) {
      inputPassword!.setAttribute('type', 'password');
      this.revealedPassword = false;
    } else {
      inputPassword!.setAttribute('type', 'text');
      this.revealedPassword = true;
    }
  }

  revealConfirmPassword() {
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
