import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {map, take} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthenticatedUser().pipe(
      take(1),
      map(user => {
        //console.log(user.id)
        const isAuth = !!user.id;
        if (isAuth && user.role=='admin' ) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }

}
