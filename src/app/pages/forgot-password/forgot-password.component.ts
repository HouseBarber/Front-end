import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/services/forgotPasswordService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const email = this.forgotForm.get('email')!.value;

    this.validateRecovery(email);

    if (email) {
      this.toastr.success('E-mail de recuperação enviado com sucesso.');
      this.forgotPasswordService.recuperarSenha(email).subscribe(
        (resposta) => {},
        (erro) => {}
      );
    }
  }

  validateRecovery(email: string): boolean | null {
    let returnError = false;
    if (email === null || email.length === 0) {
      this.toastr.error('email is required');
      returnError = true;
    }
    return !returnError;
  }
}
