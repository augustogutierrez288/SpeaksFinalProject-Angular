import { AuthService } from './../../../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required],
    })
  }

  login(){
    if(this.loginForm.invalid){
      alert('Please fill in all fields');
    }else{
      const {email, password} = this.loginForm.value;
      const user = this.authService.login(email, password)

      // if(user){
      //   this.router.navigate(['/dashboard'])
      // }else{
      //   alert('Invalid email or password');
      // }
    }
  }
}
