import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ForgotPasswordService} from 'src/app/services/forgotPasswordService';
import {isEmailValid} from 'src/app/utils/validadorEmail';
import User from "../../models/User";

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
    const userToRecover = new User();
    userToRecover.email = email;
    const canRecovery = this.validateRecovery(email);
    if (!email) {
      return;
    }
    this.forgotPasswordService.recuperarSenha(userToRecover).subscribe({
        next: () => {
          this.toastr.success('E-mail de recuperação enviado com sucesso.');
        }, error: () => {
          this.toastr.error("Mensagem temporária.");
        }
      }
    );

  }

  validateRecovery(email: string): boolean | null {
    let returnError = false;
    if (email === null || email.length === 0) {
      this.toastr.error('o e-mail é obrigatório')
      returnError = true;
    } else if (!isEmailValid(email)) {
      this.toastr.error('e-mail invalido')
      returnError = true;
    }
    return !returnError;
  }
}
