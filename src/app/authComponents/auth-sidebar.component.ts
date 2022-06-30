import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
})
export class AuthSidebarComponent implements OnInit {
  username = ''
  @Output() authEvent = new EventEmitter<string>()
  constructor() { }
  onLogout() {
    localStorage.clear()
    this.authEvent.emit('')
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username')!
  }

}
