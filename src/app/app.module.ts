import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { CreatePostComponent } from './auth/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'posts', loadChildren: () =>
      import('./shared/home.module').then(m => m.HomeModule)
  },
  { path: '', redirectTo: 'posts', pathMatch: "full" },
  { path: 'create-post', canActivate: [AuthGuard], component: CreatePostComponent },
  { path: 'edit-post/:id', canActivate: [AuthGuard], component: CreatePostComponent },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
