import { User } from './user';

export class Case{
    public id: string;
    public user: User;
    public name: string;
    public status: string;
    public date: string;
    public documents: string[];

    constructor() {
        this.user = new User();
    }
}

export class Status {
    public name: string;
}