import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { CaseService } from 'src/app/services/case.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  pageTitle = 'Dodavanje predmeta';
  caseModel: Case = new Case();
  errorMessage: string;
  statusHasError = true;
  caseStatus: string[] = [];

  constructor(private caseService: CaseService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(
        (user: User) => {
          this.caseModel.user = user;
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
      this.caseService.getStatus().subscribe(
        (status: string[]) => {
          this.caseStatus = status;
      });
    }
  }

  onSubmit(): void {
    this.caseService.createCase(this.caseModel).subscribe(
      (c: Case) => {
        this.router.navigate(['/case/' + c.id]);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  validateStatus(value: string): void {
    if (this.caseStatus.includes(value)) {
      this.statusHasError = false;
    } else {
      this.statusHasError = true;
    }
  }

}
