import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddHeaders implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq: HttpRequest<unknown>
    if (request.method === "GET" || request.url.indexOf(`${environment.apiUrl}/jwt-auth/v1/token`) !== -1) {
      newReq = request.clone()
    } else {
      newReq = request.clone({
        setHeaders: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
    }
    return next.handle(newReq);
  }
}
