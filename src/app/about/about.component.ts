import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  id$: Observable<string>;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id$ = this._route.paramMap.pipe(map((params) => params.get('id')));
  }
}
