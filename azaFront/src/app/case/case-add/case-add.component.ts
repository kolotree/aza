import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { CaseService } from 'src/app/services/case.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  pageTitle: string = 'Dodavanje predmeta';
  caseModel: Case = new Case();
  errorMessage: string = '';
  statusHasError: boolean = true;
  caseStatus: string[] = [
    'U procesu',
    'Odbijen',
    'Prihvaćen'
  ]
  clietnId: string = '';

  constructor(private caseService: CaseService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe({
        next: user => {
          this.caseModel.user = user.name + ' ' + user.surname;
          this.clietnId = user.id;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  onSubmit(): void{
    this.caseModel.user = this.clietnId;
    this.caseService.createCase(this.caseModel).subscribe({
      next: c => {
        this.router.navigate(['/case/' + c.id]);
      },
      error: err => this.errorMessage = err
    });
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
