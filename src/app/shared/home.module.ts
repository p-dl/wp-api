import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { MenusComponent } from '../noAuth/menus.component';
import { NoAuthSidebarComponent } from '../noAuth/no-auth-sidebar.component';
import { AuthSidebarComponent } from '../auth/auth-sidebar.component';
import { PostComponent } from './post.component';
import { CommentComponent } from '../auth/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../noAuth/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: ':id', component: HomeComponent },
]


@NgModule({
  declarations: [
    HomeComponent,
    MenusComponent,
    NoAuthSidebarComponent,
    AuthSidebarComponent,
    PostComponent,
    CommentComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
