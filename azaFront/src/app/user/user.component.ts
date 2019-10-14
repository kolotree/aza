import { Component, OnInit } from '@angular/core';
import { Case } from '../model/case';
import { CaseService } from '../services/case.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmitterService } from '../services/emitter.service';
import { EventChannels } from '../model/eventChannels';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  pageTitle = 'Moji predmeti';
  id: string;
  cases: Case[] = [];
  searchName = '';
  searchDate = '';
  subject: Subject<object> = new Subject();

  constructor(
    private caseService: CaseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.caseService.getCasesUser(this.id).subscribe(
        (cases: Case[]) => {
          this.cases = cases;
        }, (error: HttpErrorResponse) => {
          EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
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

  onKeyUp() {
    this.subject.next({ id: this.id, name: this.searchName, status: '', date: this.searchDate });
  }
}
