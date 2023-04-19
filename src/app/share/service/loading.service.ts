import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService implements OnInit {
  loading = false;

  constructor() {}

  ngOnInit(): void {}

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
