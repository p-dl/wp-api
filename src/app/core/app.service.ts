import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  loading$ = new Subject<boolean>();

  constructor() {

  }
  enableLoader() {
    this.loading$.next(true);
  }
  disableLoader() {
    this.loading$.next(false);
  }
}