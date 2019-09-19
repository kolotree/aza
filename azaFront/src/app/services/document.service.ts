import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Document } from 'src/app/model/document';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private http: HttpClient) { }

    createDocument(document: Document): Observable<Document | undefined> {
        return this.http.post<Document>(environment.apiUrl + 'document', document);
    }
}
