import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  constructor(private httpClient: HttpClient) {}

  public authLogin(username, password): Observable<any> {
    return this.httpClient
      .get('https://my-json-server.typicode.com/Minhkaka/authen-login/db', {
        params: { username, password },
      })
      .pipe(map((data) => data['data']));
  }
}
