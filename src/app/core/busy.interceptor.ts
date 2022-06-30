import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) {
   }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appService.enableLoader()
    return next.handle(request).pipe(
      finalize(() => {
        this.appService.disableLoader()
      })
    );
  }
}