import { Injectable } from "@angular/core";
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    users: User[] = [
        new User('Marko', 'Marković', 'mare@mail.com', '1'),
        new User('Nemanja', 'Nemanjić', 'neca@mail.com', '2'),
        new User('Jovan', 'Jovanović', 'jovo@mail.com', '3'),
        new User('Miloje', 'Milivojević', 'milo@mail.com', '4')
    ]
    getUsers(): User[] {
        return this.users;
    }

    getUser(id: string): User {
        return this.users.find((user: User) => user.password === id);
    }

}