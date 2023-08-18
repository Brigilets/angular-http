import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // runs before intercept leaves the app we can log or modify request

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    // allows the request to continue the jurney & must be returned
    // return next.handle(req);
    return next.handle(modifiedRequest);
  }
}
