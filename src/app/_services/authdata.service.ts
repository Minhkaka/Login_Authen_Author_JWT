import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthdataService {
  constructor(private httpClient: HttpClient) {}

  public authLogin(username, password): Observable<any> {
    // const httpParams = new HttpParams();
    // const payload = { username, password };
    // return this.httpClient.post(this.REST_API_SERVER, payload, {
    //   params: httpParams,
    // })
    // .pipe(delay(3000))
    // .pipe(map(data => {
    //   console.log('DataService: login', data);
    //   return data;
    // }))

    return of(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWluaG5jMTIiLCJyb2xlcyI6WyJBZG1pbiIsIkFib3V0IiwiUHJvamVjdCJdLCJleHAiOiIxMjM0NTY3ODkifQ.b5nFhSyFivgeith95BpESlZg63x3PsACAh8P5aXa5NM'
    );
  }
}
