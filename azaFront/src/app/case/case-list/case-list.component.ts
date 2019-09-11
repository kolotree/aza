import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  
  pageTitle: string = 'Predmeti';
  cases: Case[] = [];
  caseStatus: string[] = [
    'U procesu',
    'Odbijen',
    'Prihvaćen'
  ]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserCases(id);
    }
    this.getCases();
  }

  getUserCases(id: string): void {
    this.cases = this.caseService.getCasesUser(id);
  }

  getCases(): void{
    this.cases = this.caseService.getCases();
  }

  details(id: string): void{
    this.router.navigate(['/case/' + id]);
  }

  add(): void{
    this.router.navigate(['/addCase']);
  }

}
