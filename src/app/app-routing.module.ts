import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PageNotFoundComponent } from './modules/page-not-found/components/page-not-found/page-not-found.component';
import { authenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [authenticationGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(file => file.DashboardModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(file => file.AuthModule)
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
