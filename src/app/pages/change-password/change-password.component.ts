import { ErrorMessage } from './../../utils/constants/error/errorMessage';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ForgotPasswordService } from 'src/app/services/forgotPasswordService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit() {
    const password = this.changePasswordForm.get('password');
    const confirmPassword = this.changePasswordForm.get('confirmPassword');
    if (password && confirmPassword) {
      this.validatePassword(password, confirmPassword);
    }

    return password && password.value
      ? this.forgotPasswordService.changePassword(password.value)
      : this.toastr.error(ErrorMessage.INVALID_ERROR);
  }

  validatePassword(
    password: AbstractControl,
    confirmPassword: AbstractControl
  ) {
    if (password.errors?.['required']) {
      this.toastr.error(ErrorMessage.PASSWORD_EMPTY);
      return false;
    }
    if (confirmPassword.errors?.['required']) {
      this.toastr.error(ErrorMessage.CONFIRM_PASSWORD_EMPTY);
      return false;
    }
    if (confirmPassword.value !== password.value) {
      this.toastr.error(ErrorMessage.CONFIRM_PASSWORD_DIFF);
      return false;
    }

    return true;
  }
}