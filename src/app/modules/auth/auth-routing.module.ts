import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthRegisterComponent } from './modules/auth-register/auth-register.component';
import { AuthLoginComponent } from './modules/auth-login/auth-login.component';

const routes: Routes = [
  {
    path:'',
    component: AuthLoginComponent
  },
  {
    path:'register',
    component: AuthRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
