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
  case: Case | undefined;
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
      this.getCase(id);
    }
  }

  getCase(id: string): void{
    this.case = this.caseService.getCase(id);
  }

  statusAction(): void{
    if (this.changeStatus === false) {
      this.statusButton = 'Izmeni';
      this.changeStatus = true;
    } else {
      this.statusButton = 'Izmeni status';
      this.changeStatus = false;
    }
  }

}
