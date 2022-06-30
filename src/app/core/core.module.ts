import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaders } from './addHeaders.interceptor';
import { BusyInterceptor } from './busy.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
    BrowserModule
      ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BusyInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaders,
    multi: true
  }
],
})
export class CoreModule { }
