import { Component, OnInit } from '@angular/core';
import { CheckDeactivate } from 'src/app/_helpers/can-leave.guard';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
})
export class AboutEditComponent implements OnInit, CheckDeactivate {
  constructor() {}

  ngOnInit() {}

  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const confirmResult = confirm(
      `Are you sure you want to leave ${currentRoute.routeConfig.path} page ? `
    );
    if (confirmResult === true) {
      return true;
    }
    return false;
  }
}
