import { Component, Input } from '@angular/core';
import { IStudent } from '../../models';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
 @Input()
 students: IStudent[] = [];
}
