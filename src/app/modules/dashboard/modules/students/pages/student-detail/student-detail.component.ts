import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStudent } from '../../models';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  student$: Observable<IStudent | undefined>

  constructor(
    private activatedRoute: ActivatedRoute, 
    private studentService: StudentService
  )
  {
    const studentLegajo = this.activatedRoute.snapshot.params['legajo'];
    this.student$ = this.studentService.getStudentById(studentLegajo); 

    //Query params
    console.log('Estudiante legajo:', studentLegajo);
    console.log('Query params:', this.activatedRoute.snapshot.queryParams);
  }

}
