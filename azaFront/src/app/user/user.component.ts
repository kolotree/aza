import { Component, OnInit } from '@angular/core';
import { Case } from '../model/case';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  pageTitle: string = 'Moji predmeti';
  cases: Case[] = [];
  
  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.getCases();
  }

  getCases(): void{
    this.cases = this.caseService.getCases();
  }
}
