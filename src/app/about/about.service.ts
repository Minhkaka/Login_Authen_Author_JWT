import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private REST_API_SERVER = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {}

  public getUsers(users: string): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER + users);
  }
}
