import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  pageTitle: string = 'Dodavanje predmeta';
  caseModel: Case = new Case('', 'Mile Milic', '', '', '', ['']);
  statusHasError: boolean = true;
  caseStatus: string[] = [
    'U procesu',
    'Odbijen',
    'Prihvaćen'
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void{
    console.log(this.caseModel);
  }

  validateStatus(value: string) {
    if (value === "") {
      this.statusHasError = true;
    } else {
      this.statusHasError = false;
    }
    console.log(this.statusHasError)
  }

}
