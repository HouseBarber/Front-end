import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ForgotPasswordService } from '../services/forgotPasswordService';
import { InfoDTO } from '../models/infoDTO';
import { TokenRecovery } from '../models/tokenRecovery';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TokenRecoveryGuard implements CanActivate {
  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    private toastr: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasToken = next.paramMap.has('token');
    const token = next.paramMap.get('token');
    if (!hasToken) {
      this.router.navigate(['/error']);
    }

    return token
      ? this.forgotPasswordService.validToken(token).pipe(
          map((response) => {
            debugger;
            console.log(response);
            if (response) {
              return true;
            } else {
              this.router.navigate(['/error']);
              return false;
            }
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/error']);
            this.toastr.error(error.error.message);
            return of(false);
          })
        )
      : false;
  }

  checkToken() {}
}
