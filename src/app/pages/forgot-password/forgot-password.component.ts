import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,){
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  onSubmit(){
    const email = this.forgotForm.get('email')!.value;
    console.log(email);
  }

}

