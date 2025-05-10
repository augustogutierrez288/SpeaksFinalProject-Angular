import { Injectable } from "@angular/core";
import { IStudent } from "./models";
import { delay, map, Observable, of, filter } from "rxjs";

const MY_FAKE_STUDENTS: IStudent[] = [
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
]

@Injectable({providedIn: 'root'})
export class StudentService{

    getStudentsName(name: string): Observable<string>{
        return of(...MY_FAKE_STUDENTS).pipe(
            filter((s) => s.firstName.length > 5),
            map((s) => s.firstName),
        )
    }

    getStudents(){
        console.log('Llamada al servicio de estudiantes');

        const studentsPromise = new Promise<IStudent[]>((resolve, reject) =>{
            setTimeout(() => {
                resolve(MY_FAKE_STUDENTS);
            }, 2000);
        } )
        return studentsPromise;
    }

    getStudent$(): Observable<IStudent[]>{

        const studentsObservable = new Observable<IStudent[]>( (observer) => {
            setTimeout( () => {
                //observer.error(new Error('Error al cargar los estudiantes'));
                observer.next(MY_FAKE_STUDENTS)
                observer.complete();
            }, 3000);
        })

        return studentsObservable;
    }
}

