import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenInfo } from '../interfaces';
import { NoAuthRequestsService } from '../services/no-auth-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  validation: string = ''
  constructor(private noAuthRequests: NoAuthRequestsService,
    private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    })
  }
  handleLogin() {
    this.noAuthRequests.validateUser(this.loginForm.value).subscribe(
      (res: TokenInfo) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.user_display_name)
      }
    )
  }
  ngOnInit(): void {
  }

}
