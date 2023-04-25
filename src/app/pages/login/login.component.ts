import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import Constants from '../../components/constants';
import { Permissions } from '../../models/permissions';
import User from '../../models/User';
import { AuthService } from '../../services/authService';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  permissions: Permissions = new Permissions();
  revealedPassword: boolean = false;
  formLogin!: FormGroup;
  controlLogin: { [key: string]: AbstractControl } = {};
  loading: boolean = false;
  authUser: User = new User();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private translateService: TranslateService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.instanceFormLogin();
  }

  instanceFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(10)]]
    });

    this.controlLogin = this.formLogin.controls;
  }

  login(): void {
    this.loading = true;
    const canAuthenticate = this.validateLoginAndPassword(this.formLogin.value.username, this.formLogin.value.password);
    if (canAuthenticate) {
      const {username, password} = this.formLogin.value;
      const user: User = new User();
      user.username = username!;
      user.password = password!;
      this.authService.login(user).subscribe(response => {
        let token = response.object.jwt.access_token;
        this.setRoles(response.object.roles);
        let objectToLocalStorage = {token: token, roles: this.permissions};
        this.authService.setInfoUserLocalStorage(JSON.stringify(objectToLocalStorage));
        let userAuthentication = this.authService.getUserByToken();

        this.router.navigateByUrl('/home', {state: {token: userAuthentication}})
          .then(r => this.toastr.success('Successfully authenticated'));
      }, () => {
      }, () => this.loading = false);

    } else {
      this.loading = false;
    }
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

  validateLoginAndPassword(login: string, password: string): boolean | null {
    let returnError = false;
    if (login === null || login.length === 0) {
      this.toastr.error('Username is required')
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
    return !returnError;
  }

  setRoles(roles: any[]): void {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role === Constants.BARBEARIA_ROLE_ADMIN) {
        this.permissions.BARBEARIA_ROLE_ADMIN = "BARBEARIA_ROLE_ADMIN";
      }
      if (roles[i].role === Constants.BARBEARIA_ROLE_OBJECT_STORAGE) {
        this.permissions.BARBEARIA_ROLE_OBJECT_STORAGE = "BARBEARIA_ROLE_OBJECT_STORAGE";
      }
    }
  }

}