import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  let headers = req.headers.set('Content-Type', 'application/json');
  if (authService.isAuthorized && isApiUrl) {
    headers = headers.set('Authorization', `Bearer ${authService.accessToken}`);
  }
  req = req.clone({
    headers: headers
  });
  return next(req);
};

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    let headers = request.headers.set('Content-Type', 'application/json');
    if (this.authService.accessToken && isApiUrl) {
      headers = headers.set('Authorization', `Bearer ${this.authService.accessToken}`);
    }
    request = request.clone({
      headers: headers
    });
    return next.handle(request);
  }
}
