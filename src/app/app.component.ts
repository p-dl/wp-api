import { Component, OnDestroy } from '@angular/core';
import { delay, takeWhile } from 'rxjs';
import { AppService } from './core/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  isLoading = false;
  title = 'wp-api'
  subscriptionState = true;
  constructor(private appService: AppService) {
    this.appService.loading$.pipe(
      takeWhile(() => this.subscriptionState),
      delay(0)
    ).subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    )
  }

  ngOnDestroy(): void {

    this.subscriptionState = false;
  }

}
