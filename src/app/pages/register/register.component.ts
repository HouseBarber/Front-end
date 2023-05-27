import { RegisterService } from '../../services/registerService';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isEmailValid } from 'src/app/utils/validadorEmail';

interface Role {
  value: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  revealedPassword: boolean = false;
  revealedPassword2: boolean = false;
  registerForm!: FormGroup;
  selectedRole!: string;

  roles: Role[] = [
    {value: "Cliente"},
    {value: "Barbeiro"}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit(){

    const canRegister = this.validateRegister(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.telephone,
      this.registerForm.value.dateBirth,
      this.registerForm.value.role,
      this.registerForm.value.password,
      this.registerForm.value.confirmPassword
    );

    if (canRegister) {
      this.toastr.success('cadastro realizado com sucesso')
      this.registerService.adicionarDadosCadastro(this.registerForm.value);
      if(this.registerForm.value.role == 'Barbeiro'){
        this.router.navigate(['/register/establishment']);
      }
    }
  }

  validateRegister(name: string, email: string, telephone: string, dateBirth: string,
    role: string, password: string, confirmPassword: string): boolean | null{
    let returnError = false;
    if (name === null || name.length === 0) {
      this.toastr.error('O nome é obrigatório')
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
    if (dateBirth === null || dateBirth.length === 0) {
      this.toastr.error('A data de nascimento é obrigatório')
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

  revealPassword(){
    let inputPassword = document.getElementById('password');
    if (this.revealedPassword) {
      inputPassword!.setAttribute('type', 'password');
      this.revealedPassword = false;
    } else {
      inputPassword!.setAttribute('type', 'text');
      this.revealedPassword = true;
    }
  }

  revealPassword2(){
    let inputPassword = document.getElementById('confirmPassword');
    if (this.revealedPassword2) {
      inputPassword!.setAttribute('type', 'password');
      this.revealedPassword2 = false;
    } else {
      inputPassword!.setAttribute('type', 'text');
      this.revealedPassword2 = true;
    }
  }
}
