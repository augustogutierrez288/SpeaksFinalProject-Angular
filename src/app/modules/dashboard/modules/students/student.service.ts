import { Injectable } from "@angular/core";
import { IStudent } from "./models";
import { delay, map, Observable, of, filter, concatMap } from "rxjs";
import { HttpClient } from "@angular/common/http";

const MY_FAKE_STUDENTS: IStudent[] = [
    { id: '1', firstName: 'Juan', lastName: 'Pérez', dni: '12345678', email: 'juan.perez@example.com', phone: '3811234567', address: 'Calle Falsa 123', city: 'Tucumán' },
]

@Injectable({providedIn: 'root'})
export class StudentService{

    constructor(
        private http: HttpClient
    ){}

    getStudent$(): Observable<IStudent[]>{
        return this.http.get<IStudent[]>(`http://localhost:3000/students`)
    }

    createStudent(student: IStudent): Observable<IStudent>{
        return this.http.post<IStudent>(`http://localhost:3000/students`, student)
    }

    getStudentById(id: string): Observable<IStudent | undefined>{
        return of([...MY_FAKE_STUDENTS]).pipe(
            map((student) => student.find((s) => s.id === id || undefined))
        )
    }

    deleteStudent(id:string): Observable<IStudent[]>{
        return this.http.delete<IStudent[]>(`http://localhost:3000/students/${id}`)
        .pipe(concatMap(() => this.getStudent$()));
    }
}

