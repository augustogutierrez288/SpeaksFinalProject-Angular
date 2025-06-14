import { AuthService } from './../../../../../../core/services/auth.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IStudent } from '../../models';
import { Observable } from 'rxjs';
import { IUser } from '../../../../../../core/models';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.component.html',
  styles: ``
})
export class StudentsTableComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dni',
    'email',
    'phone',
    'address',
    'city',
    'actions'
  ];

  @Input()
  students: IStudent[] = [];

  @Output()
  onEdit = new EventEmitter<IStudent>();
  
  @Output()
  onDelete = new EventEmitter<IStudent>();

  authUser$: Observable<IUser | null>;

  constructor(private AuthService: AuthService){
    this.authUser$ = this.AuthService.authService$;
  }
}
