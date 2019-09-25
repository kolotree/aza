import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    login(password: any): Observable<User> {
        return this.http.post<User>(environment.apiUrl + 'login', password);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + 'user');
    }

    getUser(id: string): Observable<User | undefined> {
        return this.http.get<User>(environment.apiUrl + 'user/' + id);
    }

    createUser(user: User): Observable<User | undefined> {
        return this.http.post<User>(environment.apiUrl + 'user', user);
    }

    searchUsers(search: any) {
        return this.http.post<User[]>(environment.apiUrl + '/user/search', search);
  }
}
