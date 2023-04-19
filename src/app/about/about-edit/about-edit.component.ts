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
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
})
export class AboutEditComponent implements OnInit, CheckDeactivate {
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
    console.log(currentRoute, currentState);
    const confirmResult = confirm(
      `Are you sure you want to leave ${currentState.url} page ? `
    );
    if (confirmResult === true) {
      return true;
    }
    return false;
  }
}
