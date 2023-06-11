import {ErrorMessage} from '../../utils/constants/error/errorMessage';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Component, OnInit} from '@angular/core';
import {ForgotPasswordService} from 'src/app/services/forgotPasswordService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private forgotPasswordService: ForgotPasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loading = true;
    const token = this.route.snapshot.paramMap.get('token');
    const password = this.changePasswordForm.get('password');
    const confirmPassword = this.changePasswordForm.get('confirmPassword');
    if (password && confirmPassword) {
      this.validatePassword(password, confirmPassword);
    }
    if (!password || !password.value) {
      this.toastr.error("Senha inválida.");
      return;
    }
    if (!token) {
      this.toastr.error("Token inválido.");
      return;
    }
    this.forgotPasswordService.changePassword(password.value, token).subscribe({
      next: (response) => {
        this.toastr.success("Senha atualizada com sucesso.");
        this.router.navigate(['']);
      }, error: (error) => {
        this.toastr.error(ErrorMessage.INVALID_ERROR);
        this.loading = false;
      }, complete: () => {
        this.loading = false;
      }
    })
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
