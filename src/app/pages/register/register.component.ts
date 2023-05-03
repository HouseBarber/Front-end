import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
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
    const name = this.registerForm.get('name')!.value;
    const email = this.registerForm.get('email')!.value;
    const telephone = this.registerForm.get('telephone')!.value;
    const dateBirth = this.registerForm.get('dateBirth')!.value;
    const password = this.registerForm.get('password')!.value;

    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefone:', telephone);
    console.log('Data nascimento:', dateBirth);
    console.log('Senha:', password);
    console.log('Função:', this.selectedRole)
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
