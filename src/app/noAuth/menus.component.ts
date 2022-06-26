import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoAuthRequestsService } from '../services/no-auth-requests.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit {
  searchItem = ''
  @Input() n: number = 0
  @Output() postEmitter = new EventEmitter<number[]>()
  constructor(private noAuthRequestsService: NoAuthRequestsService) {
  }
  ngOnInit(): void {
  }
  onSearch(event: any) {
    this.searchItem = event.target.value
    this.noAuthRequestsService.searchInPosts(`${this.searchItem}`)
      .subscribe(res => {
        this.n = res.length
        this.postEmitter.emit(res)
      })
  }

}