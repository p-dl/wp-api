import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '../core/requests.service';
import { Author } from "../interfaces"
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit {
  authors: Author[] = []
  searchItem = ''
  isValid = true
  @Input() n: number = 0
  @Output() postEmitter = new EventEmitter<number[]>()
  constructor(private requests: RequestsService) {
  }
  ngOnInit(): void {
    this.requests.getAuthors().subscribe(res => {
      this.authors = res
    })

  }
  onSelect(event: any) {
    this.searchItem = event.target.value
    this.requests.authorWise(`${this.searchItem}`)
      .subscribe(res => {
        this.n = res.length
        this.isValid = !this.n ? false : true
        this.postEmitter.emit(res)
      })
  }
  onSearch(event: any) {
    this.searchItem = event.target.value
    this.requests.searchInPosts(`${this.searchItem}`)
      .subscribe(res => {
        this.n = res.length
        this.isValid = !this.n ? false : true
        this.postEmitter.emit(res)
      })
  }
}