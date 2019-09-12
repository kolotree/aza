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
  errorMessage: string = '';
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
       this.caseService.getCasesUser(id).subscribe({
        next: cases => {
          this.cases = cases;
        },
        error: err => this.errorMessage = err
      });
    }
    // dodati ako je potrebno za listu svih predmeta nezavisno od toga koji korisnik je u pitanju 
  }

  details(id: string): void{
    this.router.navigate(['/case/' + id]);
  }

  add(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/addCase/' + id]);
  }

}
