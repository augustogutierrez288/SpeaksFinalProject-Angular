import { RouterModule, Router} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  standalone: false,
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  constructor(private router: Router){}

  logout(){
    console.log('logout');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}
