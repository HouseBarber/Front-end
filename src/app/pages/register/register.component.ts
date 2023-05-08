import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService';

interface Role {
  value: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
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
    private authService: AuthService,
    private toastr: ToastrService
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

  ngOnInit() {
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit(){
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const telephone = this.registerForm.get('telephone')?.value;
    const dateBirth = this.registerForm.get('dateBirth')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    const role = this.registerForm.get('role')?.value;
    const canRegister = this.validateRegister(name, email, telephone, dateBirth, role, password, confirmPassword);

    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefone:', telephone);
    console.log('Data nascimento:', dateBirth);
    console.log('Senha:', password);
    console.log('Confirmar Senha:', confirmPassword);
    console.log('Função:', role);

    if (canRegister) {
      this.toastr.success('successful registration')
    }
  }

  validateRegister(name: string, email: string, telephone: string, dateBirth: string,
    role: string, password: string, confirmPassword: string): boolean | null{
    let returnError = false;
    if (name === null || name.length === 0) {
      this.toastr.error('name is required')
      returnError = true;
    }
    if (email === null || email.length === 0) {
      this.toastr.error('email is required')
      returnError = true;
    }
    if (telephone === null || telephone.length === 0) {
      this.toastr.error('telephone is required')
      returnError = true;
    }
    if (dateBirth === null || dateBirth.length === 0) {
      this.toastr.error('date of birth is required')
      returnError = true;
    }
    if (role === null || role.length === 0) {
      this.toastr.error('role is required')
      returnError = true;
    }
    if (password === null || password.length === 0) {
      this.toastr.error('Password is required')
      returnError = true;
    }
    if (password.length && password.length <= 5) {
      this.toastr.error('The password must have at least 5 characters')
      returnError = true;
    }
    if (password.length && password.length > 100) {
      this.toastr.error('The password must have a maximum of 100 characters')
      returnError = true;
    }
    if (password != confirmPassword) {
      this.toastr.error('passwords need to be the same')
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
