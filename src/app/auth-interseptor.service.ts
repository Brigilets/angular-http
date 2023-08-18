import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // runs before intercept leaves the app we can log or modify request
    console.log("Request is on it's way");

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    // allows the request to continue the jurney & must be returned
    // return next.handle(req);
    return next.handle(modifiedRequest);
  }
}
