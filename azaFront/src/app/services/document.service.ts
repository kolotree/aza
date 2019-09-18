import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private http: HttpClient) { }
    
    uploadDocument(): Observable<string | undefined>{
        return this.http.post<any>("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", "C:\Users\Milica Travica\Downloads\credentials.json")
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data)))
            );
    }
}