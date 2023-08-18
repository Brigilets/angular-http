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
    console.log("Request is on it's way");

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    // allows the request to continue the jurney & must be returned
    // return next.handle(req);
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        // must always use event inside interceptor tap()
        console.log('all events from iterceptor', event);
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data: ');
          console.log(event.body);
        }
      })
    );
  }
}
