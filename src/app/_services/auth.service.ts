import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public roles = [];

  constructor(private router: Router, public dialog: MatDialog) {}

  public setToken(token: string) {
    if (!token) {
      this.removeToken();
      return;
    }
    localStorage.setItem('token', token);

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // console.log('decodedToken', decodedToken);
    this.roles = decodedToken.roles.map((role) => role.toLowerCase());
    console.log('roles', this.roles);

    // const expirationDate = helper.getTokenExpirationDate(token);
    // const isExpired = helper.isTokenExpired(token);

    // console.log('expirationDate', expirationDate);
    // console.log('isExpired', isExpired);
  }

  public removeToken() {
    localStorage.removeItem('token');
    this.roles = [];
  }

  public getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.removeToken();
      return null;
    }

    if (this.roles.length === 0) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      // console.log('decodedToken', decodedToken);
      this.roles = decodedToken.roles.map((role) => role.toLowerCase());
      console.log('roles', this.roles);
    }

    return token;
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public canAccess(url) {
    if (this.roles.includes('admin')) {
      return true;
    }

    const page = url.toString().substr(1);

    if (this.roles.includes(page)) {
      return true;
    }
    console.error('Bạn không thể vào trang ' + page);
    return false;
  }

  public logout() {
    this.router.navigate(['/']);
    this.removeToken();
  }

  public login(backUrl): void {
    this.openDialog(backUrl);
  }

  private openDialog(backUrl): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { username, password, token } = result?.data;

      if (!!username && !!password && !!token) {
        this.setToken(token);
        this.router.navigate([backUrl]);
      } else {
        this.login(backUrl);
      }
    });
  }
}
