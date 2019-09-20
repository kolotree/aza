import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmitterService } from 'src/app/services/emitter.service';
import { EventChannels } from 'src/app/model/eventChannels';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  pageTitle = 'Predmeti';
  id: string;
  cases: Case[] = [];
  caseStatus: string[] = [];
  searchName = '';
  searchStatus = '';
  searchDate = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private caseService: CaseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.caseService.getCasesUser(this.id).subscribe(
          (cases: Case[]) => {
           this.cases = cases;
         }, (error: HttpErrorResponse) => {
          EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
      });
      this.caseService.getStatus().subscribe(
        (status: string[]) => {
          this.caseStatus = status;
      });
    }
    // dodati ako je potrebno za listu svih predmeta nezavisno od toga koji korisnik je u pitanju
  }

  searchCases(): void {
    const search = { id: this.id, name: this.searchName, status: this.searchStatus, date: this.searchDate };
    this.caseService.searchCasesClient(search).subscribe(
      (cases: Case[]) => {
        this.cases = cases;
      }, (error: HttpErrorResponse) => {
        EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
      }
    );
  }

  details(id: string): void {
    this.router.navigate(['/case/' + id]);
  }

  add(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/addCase/' + id]);
  }

}
