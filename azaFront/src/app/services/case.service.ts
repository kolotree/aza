import { Injectable } from '@angular/core';
import { Case } from '../model/case';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CaseService {

    constructor(private http: HttpClient) { }

    getCase(id: string): Observable<Case | undefined> {
        return this.http.get<Case>(environment.apiUrl + 'case/' + id);
    }

    getCasesUser(id: string): Observable<Case[]> {
        return this.http.get<Case[]>(environment.apiUrl + 'client/case/' + id);
    }

    createCase(c: Case): Observable<Case | undefined> {
        return this.http.post<Case>(environment.apiUrl + 'case', c);
    }

    updateCaseStatus(c: Case): Observable<Case | undefined> {
        return this.http.put<Case>(environment.apiUrl + 'case', c);
    }

    getStatus(): Observable<string[]> {
        return this.http.get<string[]>(environment.apiUrl + 'status');
    }
}
