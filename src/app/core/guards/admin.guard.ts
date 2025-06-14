import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.authService$.pipe(
    map((user)=>{
      if(user && user.role === 'admin'){
        return true;
      }else{
        alert('You do not have permission to access this page.');
        return false;
      }
    })
  )

};
