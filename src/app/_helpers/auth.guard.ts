import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AboutEditComponent } from '../about/about-edit/about-edit.component';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
// canActivate check access permisson navigate to URL
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<AboutEditComponent>
{
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('canActivate', route, state);
    if (state.url.includes('secret')) {
      console.error('Bạn không thể vào phòng bí mật này !');
      return false;
    }

    if (this.authService.isLoggedIn()) {
      if (this.authService.canAccess(state.url)) {
        return true;
      }
      return false;
    } else {
      this.authService.login(state.url);
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authService.canAccess(state.url)) {
      alert('You are not allowed to view this page');
      return false;
    }
    return true;
  }

  canDeactivate(
    component: AboutEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return false;
  }
}
