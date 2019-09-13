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
  casesSearch: Case[] = [];
  errorMessage: string = '';
  caseStatus: string[] = [
    'U procesu',
    'Odbijen',
    'Prihvaćen'
  ];
  searchName: string = '';
  searchStatus: string = '';
  searchDate: string = '';


  constructor(private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
       this.caseService.getCasesUser(id).subscribe({
        next: cases => {
           this.cases = cases;
           this.casesSearch = cases;
        },
        error: err => this.errorMessage = err
      });
    }
    // dodati ako je potrebno za listu svih predmeta nezavisno od toga koji korisnik je u pitanju 
  }

  searchCases(): void{
    this.casesSearch = this.cases.filter((c: Case) =>
      c.name.toLocaleLowerCase().indexOf(this.searchName.toLocaleLowerCase()) !== -1
      && c.status.toLocaleLowerCase().indexOf(this.searchStatus.toLocaleLowerCase()) !== -1
      && c.date.indexOf(this.searchDate) !== -1);
  }

  details(id: string): void{
    this.router.navigate(['/case/' + id]);
  }

  add(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/addCase/' + id]);
  }

}
