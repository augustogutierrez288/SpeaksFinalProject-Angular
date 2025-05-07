import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStudent } from '../../models';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.scss'
})
export class StudentsFormComponent {

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
   this.studentForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    dni: [''],
    email: [''],
    phone: [''],
    address: [''],
    city: ['']
   })
  }

  @Output()
  onSubmit = new EventEmitter<IStudent>();
}
