import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  pageTitle: string = 'Predmet';
  case: Case = new Case();
  errorMessage: string = '';
  statusButton: string = 'Izmeni status';
  changeStatus: boolean = false;
  caseStatus: string[] = []

  constructor(private route: ActivatedRoute,
    private caseService: CaseService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCase(id).subscribe(
        (c: Case) => {
          this.case = c;
        }, (err: HttpErrorResponse) => {
          console.log(err)
        });
      this.caseService.getStatus().subscribe(
        (status: string[]) => {
          this.caseStatus = status;
      });
    }
  }

  statusAction(): void{
    if (this.changeStatus === false) {
      this.statusButton = 'Izmeni';
      this.changeStatus = true;
    } else {
      this.caseService.updateCaseStatus(this.case).subscribe({
        next: c => {
          this.case = c;
        },
        error: err => this.errorMessage = err
      });
      this.statusButton = 'Izmeni status';
      this.changeStatus = false;
    }
  }

}
