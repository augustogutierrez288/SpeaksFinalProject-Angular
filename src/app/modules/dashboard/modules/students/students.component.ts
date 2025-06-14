import { Component, OnDestroy } from '@angular/core';
import { IStudent } from './models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from './student.service';
import { first, Observable, Subscription, take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { IUser } from '../../../../core/models';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  isEditing: boolean = false;
  studentForm: FormGroup;
  isLoading: boolean = false;

  students: IStudent[] = [];

  studentsSubscription: Subscription | null = null;
  authUser$: Observable<IUser | null>;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    authService: AuthService
  ) {
    this.authUser$ = authService.authService$;
   this.studentForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    dni: [''],
    email: [''],
    phone: [''],
    address: [''],
    city: ['']
   });

   this.loadStudentsObservable();
  }

  loadStudentsObservable(): void{
    this.isLoading = true;
    this.studentsSubscription = this.studentService
      .getStudent$()
      .subscribe({
        next: (data) =>{
          this.students = data;
        },
        error: (error) => console.error(error),
        complete: () =>{
          this.isLoading = false;
        }
      })
  }

  onSubmit(): void {

    if (this.isEditing) {
      this.students = this.students.map(student => student.id === this.studentForm.value.id ?  {...student, ...this.studentForm.value } : student);
      this.isEditing = false;
    } else {
      this.students = [...this.students, this.studentForm.value];
      this.studentService.createStudent(this.studentForm.value).subscribe({
        next: (response) => {
          console.log('Estudiante creado: ', response);
          this.students.push(response);
        },
        error: (error) => console.error(error),
        complete: ()=>{
          console.log("Estudiante creado exitosamente");
        }
      })
    }

    this.studentForm.reset();
  };

  onEdit(student: IStudent): void {
    this.isEditing = true;
    this.studentForm.patchValue(student); 
  };

  onDelete(id: number | string): void {
    if(confirm('¿Esta seguro que desea eliminar el estudiante?')){
      this.studentService.deleteStudent(id.toLocaleString()).subscribe({
        next: (response) =>{
          this.students = response
        }
      })
    }
  };
}