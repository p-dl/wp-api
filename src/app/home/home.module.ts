import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/auth.guard";
import { HomeComponent } from "./home.component";
import { CreatePostComponent } from "../authComponents/create-post.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { MenusComponent } from "../noAuthComponents/menus.component";
import { AuthSidebarComponent } from "../authComponents/auth-sidebar.component";
import { NoAuthSidebarComponent } from "../noAuthComponents/no-auth-sidebar.component";
import { CommentComponent } from "../authComponents/comment.component";
import { PostComponent } from "../noAuthComponents/post.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreatePostComponent },
  { path: ':id', component: HomeComponent },
  { path: ':id/edit', canActivate: [AuthGuard], component: CreatePostComponent },
]
@NgModule({
  declarations: [
    MenusComponent,
    CreatePostComponent,
    HomeComponent,
    AuthSidebarComponent,
    NoAuthSidebarComponent,
    CommentComponent,
    PostComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
