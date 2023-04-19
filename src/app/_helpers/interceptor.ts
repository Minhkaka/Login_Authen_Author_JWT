import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../share/service/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    req = req.clone({
      headers: req.headers.set('Accept', 'application/json'),
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          if (error.status === 401) {
            // redirect user to the logout page
            this.authService.removeToken();
            this.router.navigate(['/']);
          }
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        // show popup error message
        // this.errorDialogService.openDialog({
        //   reason: error.message,
        //   status: error.status,
        // });
      })
    );
  }
}
