import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
})
export class AuthSidebarComponent implements OnInit {
  @Output() authEvent = new EventEmitter<string>()
  username = localStorage.getItem('username')
  constructor(private router: Router) { }
  onLogout() {
    localStorage.clear()
    this.authEvent.emit('')
  }
  ngOnInit(): void {
  }

}
