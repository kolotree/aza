import { Component, OnInit } from '@angular/core';
import { Case } from '../model/case';
import { CaseService } from '../services/case.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  pageTitle: string = 'Moji predmeti';
  cases: Case[] = [];
  errorMessage: string = '';
  
  constructor(
    private caseService: CaseService,
    private route: ActivatedRoute) { }

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
  }
}
