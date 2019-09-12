import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';

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
  caseStatus: string[] = [
    'U procesu',
    'Odbijen',
    'Prihvaćen'
  ]

  constructor(private route: ActivatedRoute,
    private caseService: CaseService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCase(id).subscribe({
        next: c => {
          this.case = c;
        },
        error: err => this.errorMessage = err
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
