import { User } from './user';
import { Document } from './document';

export class Case {
    public id: string;
    public user: User;
    public name: string;
    public status: string;
    public date: string;
    public documents: Document[];

    constructor() {
        this.user = new User();
    }
}
