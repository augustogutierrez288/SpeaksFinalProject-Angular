import { Injectable } from "@angular/core";
import { IUser } from "../models";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, Observable, BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{

    private _authUser$ = new BehaviorSubject<IUser | null>(null);

    authService$: Observable<IUser | null> = this._authUser$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    login(email: string, password: string): void{
        this.http
        .get<IUser[]>(`http://localhost:3000/students?email=${email}&password=${password}`)
        .subscribe({
            next: (response) =>{
                const user = response[0];
                if(user){
                    localStorage.setItem( 'token', user.token);
                    this.router.navigate(['/dashboard']);
                    this._authUser$.next(user);
                }else{
                    alert('Invalid email or password')
                }
            }
        })
    };

    verifyToken(): Observable<IUser | boolean>{
        const storedToken = localStorage.getItem('token');
        return this.http.get<IUser[]>(`http://localhost:3000/students?token=${storedToken}`)
        .pipe(
            map((response) => {
                const user = response[0];
                if(user){
                    localStorage.setItem( 'token', user.token);
                    this._authUser$.next(user);
                    return user;
                }else{
                    return false;
                }
            })
        )
    }

    logout(): void{
        localStorage.removeItem('token');
    }
}