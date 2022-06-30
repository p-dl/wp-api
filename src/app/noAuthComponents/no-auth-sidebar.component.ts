import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from '../core/requests.service';
import { TokenInfo } from '../interfaces';

@Component({
  selector: 'app-no-auth-sidebar',
  templateUrl: './no-auth-sidebar.component.html',
})
export class NoAuthSidebarComponent implements OnInit {
  @Output() authEvent = new EventEmitter<string>()
  loginForm: FormGroup
  errorMessage = ''

  constructor(private requests: RequestsService,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    })
  }
  onLogin() {
    this.requests.validateUser(this.loginForm.value).subscribe(
      (res: TokenInfo) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.user_display_name)
        this.authEvent.emit(res.user_display_name)
      },
      (err) => this.errorMessage = err.error.message
    )
  }
  ngOnInit(): void {
  }

}
