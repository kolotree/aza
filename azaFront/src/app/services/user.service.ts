import { Injectable } from "@angular/core";
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private http: HttpClient) { }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + "user")
            .pipe(
                catchError(this.handleError)
            );
    }

  
    getUser(id: string): Observable<User | undefined> {
        return this.http.get<User>(environment.apiUrl + "user/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    createUser(user: User): Observable<User | undefined>{
        return this.http.post<User>(environment.apiUrl + "user", user)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}