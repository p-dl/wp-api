import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './noAuthComponents/page-not-found.component';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'posts', loadChildren: () => import(`./home/home.module`).then(m => HomeModule),
  },
  { path: '', redirectTo: 'posts', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
