import { Injectable } from "@angular/core";
import { Case } from '../model/case';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CaseService {

    constructor(private http: HttpClient) { }
    
    getCase(id: string): Observable<Case | undefined>{
        return this.http.get<Case>(environment.apiUrl + "case/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    getCasesUser(id: string): Observable<Case[]>{
        return this.http.get<Case[]>(environment.apiUrl + "client/case/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    createCase(c: Case): Observable<Case | undefined> {
        return this.http.post<Case>(environment.apiUrl + "case", c)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateCaseStatus(c: Case): Observable<Case | undefined> {
        return this.http.put<Case>(environment.apiUrl + "case", c)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    getStatus(): Observable<string[]> {
        return this.http.get<string[]>(environment.apiUrl + "status")
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