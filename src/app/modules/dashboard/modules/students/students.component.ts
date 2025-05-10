import { Component, OnDestroy } from '@angular/core';
import { IStudent } from './models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from './student.service';
import { first, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnDestroy {

  isEditing: boolean = false;
  studentForm: FormGroup;
  isLoading: boolean = false;

  students: IStudent[] = [
    { legajo: 1, firstName: 'Juan', lastName: 'Pérez', dni: '12345678', email: 'juan.perez@example.com', phone: '3811234567', address: 'Calle Falsa 123', city: 'Tucumán' },
    { legajo: 2, firstName: 'María', lastName: 'Gómez', dni: '23456789', email: 'maria.gomez@example.com', phone: '3812345678', address: 'Av. Siempre Viva 456', city: 'Tucumán' },
    { legajo: 3, firstName: 'Carlos', lastName: 'López', dni: '34567890', email: 'carlos.lopez@example.com', phone: '3813456789', address: 'Calle San Martín 789', city: 'Tucumán' },
    { legajo: 4, firstName: 'Ana', lastName: 'Martínez', dni: '45678901', email: 'ana.martinez@example.com', phone: '3814567890', address: 'Calle Belgrano 101', city: 'Tucumán' },
    { legajo: 5, firstName: 'Luis', lastName: 'Fernández', dni: '56789012', email: 'luis.fernandez@example.com', phone: '3815678901', address: 'Calle Rivadavia 202', city: 'Tucumán' },
    { legajo: 6, firstName: 'Sofía', lastName: 'Rodríguez', dni: '67890123', email: 'sofia.rodriguez@example.com', phone: '3816789012', address: 'Calle Mitre 303', city: 'Tucumán' },
    { legajo: 7, firstName: 'Diego', lastName: 'González', dni: '78901234', email: 'diego.gonzalez@example.com', phone: '3817890123', address: 'Calle Sarmiento 404', city: 'Tucumán' },
    { legajo: 8, firstName: 'Lucía', lastName: 'Ramírez', dni: '89012345', email: 'lucia.ramirez@example.com', phone: '3818901234', address: 'Calle Alberdi 505', city: 'Tucumán' },
    { legajo: 9, firstName: 'Jorge', lastName: 'Herrera', dni: '90123456', email: 'jorge.herrera@example.com', phone: '3819012345', address: 'Calle Laprida 606', city: 'Tucumán' },
    { legajo: 10, firstName: 'Camila', lastName: 'Ruiz', dni: '12345679', email: 'camila.ruiz@example.com', phone: '3811234568', address: 'Calle Mendoza 707', city: 'Tucumán' }
  ];

  studentsSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {

   this.studentForm = this.fb.group({
    legajo: [''],
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

  ngOnDestroy(): void {
    console.log('Destruyendo el componente');
    this.studentsSubscription?.unsubscribe();
  }

  loadStudentsObservable(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentService.getStudent$().pipe(take(1)) // con esta funcion me evito destruir el componente
      .subscribe({
        next: (students: IStudent[]) => {
          console.table(students);
        },
        error: (error) => {
          console.error(error.message);
        },
        complete: () => {
          this.isLoading = false;
        } 
      })
  }

  loadStudents():void{
    this.isLoading = true;
    this.studentService.getStudents()
      .then((students : IStudent[]) => {console.table(students)})
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        this.isLoading = false;
      })
  }

  onSubmit(): void {

    if (this.isEditing) {
      this.students = this.students.map(student => student.legajo === this.studentForm.value.legajo ?  {...student, ...this.studentForm.value } : student);

      this.isEditing = false;
      console.log(this.students);
    } else {
      this.studentForm.value.legajo = this.students.length + 1;
      this.students = [...this.students, this.studentForm.value];
    }

    this.studentForm.reset();
  };

  onEdit(student: IStudent): void {
    this.isEditing = true;
    this.studentForm.patchValue(student); 
  };

  onDelete(student: IStudent): void {
    this.students = this.students.filter ( s => s.legajo !== student.legajo);
  };
}