import { Injectable } from "@angular/core";
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class UserService  extends BaseService {

    constructor(private http: HttpClient) { 
        super();
    }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + "user")
            .pipe(
                catchError(super.handleError)
            );
    }

  
    getUser(id: string): Observable<User | undefined> {
        return this.http.get<User>(environment.apiUrl + "user/" + id)
            .pipe(
                catchError(super.handleError)
            );
    }

    createUser(user: User): Observable<User | undefined>{
        return this.http.post<User>(environment.apiUrl + "user", user)
            .pipe(
                catchError(super.handleError)
            );
    }
}