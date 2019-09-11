export class Case{

    constructor(
        public id: string,
        public user: string,
        public name: string,
        public status: string,
        public date: string,
        public documents: string[]) { }
}