import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './services/auth-service/auth.service';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  insertToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.auth.getToken();
    if (
      token &&
      !request.url.endsWith('users/') &&
      !request.url.endsWith('api-token-generate/') &&
      !request.url.endsWith('api-token-refresh/')
    ) {
      return this.auth.refreshToken({token: this.auth.getToken()})
        .pipe(switchMap((response: any) => {
          const refreshedToken = response.token;
          this.auth.saveToken(refreshedToken);
          const headers = {
            Authorization: `JWT ${refreshedToken}`
          };
          request = request.clone({setHeaders: headers});
          return next.handle(request);
        }));
    }
    return next.handle(request);
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.insertToken(req, next)
      .pipe(
        catchError(
          error => {
            if (
              error.status === 401
              || error.status === 400
              && req.url.endsWith('api-token-refresh/')
            ) {
              this.router.navigateByUrl('auth/login');
            } else {
              return throwError(error);
            }
          }
        )
      );
  }
}
