import { Component, OnInit } from '@angular/core';
import { Case } from '../model/case';
import { CaseService } from '../services/case.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  pageTitle: string = 'Moji predmeti';
  cases: Case[] = [];
  casesSearch: Case[] = [];
  errorMessage: string = '';
  searchName: string = '';
  searchDate: string = '';
  
  constructor(
    private caseService: CaseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCasesUser(id).subscribe(
        (cases: Case[]) => {
          this.cases = cases;
          this.casesSearch = cases;
        }, (err: HttpErrorResponse) => {
          console.log(err)
      });
    }
  }

  searchCases(): void{
    this.casesSearch = this.cases.filter((c: Case) =>
      c.name.toLocaleLowerCase().indexOf(this.searchName.toLocaleLowerCase()) !== -1
      && c.date.indexOf(this.searchDate) !== -1);
  }
}
