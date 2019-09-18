import { Injectable } from "@angular/core";
import { Case } from '../model/case';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class CaseService extends BaseService {

    constructor(private http: HttpClient) { 
        super();
    }
    
    getCase(id: string): Observable<Case | undefined>{
        return this.http.get<Case>(environment.apiUrl + "case/" + id)
            .pipe(
                catchError(super.handleError)
            );
    }

    getCasesUser(id: string): Observable<Case[]>{
        return this.http.get<Case[]>(environment.apiUrl + "client/case/" + id)
            .pipe(
                catchError(super.handleError)
            );
    }

    createCase(c: Case): Observable<Case | undefined> {
        return this.http.post<Case>(environment.apiUrl + "case", c)
            .pipe(
                catchError(super.handleError)
            );
    }

    updateCaseStatus(c: Case): Observable<Case | undefined> {
        return this.http.put<Case>(environment.apiUrl + "case", c)
            .pipe(
                catchError(super.handleError)
            );
    }
    
    getStatus(): Observable<string[]> {
        return this.http.get<string[]>(environment.apiUrl + "status")
            .pipe(
                catchError(super.handleError)
            );
    }

}