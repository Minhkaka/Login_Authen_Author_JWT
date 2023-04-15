import { Component, OnInit } from '@angular/core';
import { CheckDeactivate } from 'src/app/_helpers/can-leave.guard';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css'],
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
      'Are you sure you want to leave this page ? '
    );
    if (confirmResult === true) {
      return true;
    }
    return false;
  }
}
