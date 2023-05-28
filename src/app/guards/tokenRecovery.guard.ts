import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenRecoveryGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    debugger;
    const hasToken = next.paramMap.has('token');
    const token = next.paramMap.get('token');
    if (!hasToken) {
      // Redirecione para uma página de erro ou para algum lugar apropriado
      this.router.navigate(['/error']);
    }
    console.log(token);

    return hasToken;
  }
}
