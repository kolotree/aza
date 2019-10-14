import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmitterService } from 'src/app/services/emitter.service';
import { EventChannels } from 'src/app/model/eventChannels';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  subject: Subject<object> = new Subject();

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
    this.subject.pipe(
      debounceTime(750)
    ).subscribe(
      (search) => this.searchCases(search)
    );
  }

  searchCases(search: object): void {
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

  onKeyUp() {
    this.subject.next({ id: this.id, name: this.searchName, status: this.searchStatus, date: this.searchDate });
  }
}
