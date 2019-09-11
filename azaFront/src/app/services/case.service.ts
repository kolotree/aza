import { Injectable } from "@angular/core";
import { Case } from '../model/case';

@Injectable({
    providedIn: 'root'
})
export class CaseService {
    
    cases: Case[] = [
        new Case('1', 'Marko Marković', 'Žalba', "U procesu", '01.01.2001.', ['a', 'b', 'c']),
        new Case('2', 'Marko Marković', 'Žalba', "U procesu", '01.01.2001.', []),
        new Case('3', 'Marko Marković', 'Žalba', "U procesu", '01.01.2001.', []),
        new Case('4', 'Marko Marković', 'Žalba', "U procesu", '01.01.2001.', [])
    ]

    getCase(id: string): Case{
        return this.cases.find((c: Case) => c.id === id);
    }
    getCases(): Case[]{
        return this.cases;
    }

    getCasesUser(id: string): Case[]{
        console.log(id);
        return this.cases;
    }

}