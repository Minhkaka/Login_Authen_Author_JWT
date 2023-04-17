import { Component, OnInit } from '@angular/core';
import { CheckDeactivate } from 'src/app/_helpers/can-leave.guard';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
})
export class AboutViewComponent implements OnInit, CheckDeactivate {
  id$: Observable<string>;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.id$ = this._route.paramMap.pipe(map((params) => params.get('id')));
  }

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
      `Are you sure you want to leave ${currentRoute.routeConfig.path} page ?`
    );
    if (confirmResult === true) {
      return true;
    }
    return false;
  }
}
