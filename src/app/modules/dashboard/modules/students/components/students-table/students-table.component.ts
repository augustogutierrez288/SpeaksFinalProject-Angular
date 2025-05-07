import { Component, Input } from '@angular/core';
import { IStudent } from '../../models';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.component.html',
  styles: ``
})
export class StudentsTableComponent {
  displayedColumns: string[] = [
    'legajo',
    'firstName',
    'lastName',
    'dni',
    'email',
    'phone',
    'address',
    'city',
    'edit',
    'delete'
  ];

  @Input()
  students: IStudent[] = [];
}
